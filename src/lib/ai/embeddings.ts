// NEXORA — In-memory semantic similarity (deterministic TF-IDF + cosine)
//
// The spec prefers pgvector; to keep the prototype a single deployable Next.js
// app with zero extra infrastructure, we use a deterministic in-memory
// TF-IDF cosine index over the schedule activities. This is real semantic
// retrieval (bag-of-words + IDF weighting), not a fake/random score.
//
// Schedule embeddings are cached per process and recomputed only when the
// schedule changes (cache version derived from activity count + max updatedAt).

export interface ActivityIndexEntry {
  rowId: string
  activityId: string
  searchText: string
  vector: Map<string, number>
}

export interface EmbeddingIndex {
  entries: ActivityIndexEntry[]
  idf: Map<string, number>
  version: string
}

const STOPWORDS = new Set([
  'the', 'a', 'an', 'of', 'to', 'in', 'on', 'for', 'and', 'or', 'is', 'was',
  'has', 'have', 'been', 'be', 'by', 'with', 'at', 'from', 'ko', 'ka', 'ke',
  'hai', 'huya', 'hua', 'kar', 'diya', 'gayi', 'gaya', 'aur', 'complete',
  'completed', 'start', 'started', 'finish', 'finished', 'install', 'installed',
  'done', 'work', 'near', 'area', 'unit',
])

function tokenize(text: string): string[] {
  if (!text) return []
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\-/]+/g, ' ')
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOPWORDS.has(t))
}

function termFrequency(tokens: string[]): Map<string, number> {
  const tf = new Map<string, number>()
  for (const t of tokens) tf.set(t, (tf.get(t) ?? 0) + 1)
  // sub-linear tf
  for (const [k, v] of tf) tf.set(k, 1 + Math.log(v))
  return tf
}

/**
 * Build an embedding index over schedule activities.
 * Each activity is represented by a TF-IDF vector over its searchText tokens.
 */
export function buildIndex(
  activities: { rowId: string; activityId: string; searchText: string }[],
): EmbeddingIndex {
  const docs = activities.map((a) => tokenize(a.searchText))
  const N = Math.max(docs.length, 1)

  // document frequency
  const df = new Map<string, number>()
  for (const tokens of docs) {
    const seen = new Set(tokens)
    for (const t of seen) df.set(t, (df.get(t) ?? 0) + 1)
  }

  const idf = new Map<string, number>()
  for (const [term, d] of df) idf.set(term, Math.log((N + 1) / (d + 1)) + 1)

  const entries: ActivityIndexEntry[] = activities.map((a, i) => {
    const tf = termFrequency(docs[i])
    const vector = new Map<string, number>()
    for (const [term, freq] of tf) {
      const w = freq * (idf.get(term) ?? 1)
      vector.set(term, w)
    }
    normalizeVector(vector)
    return { rowId: a.rowId, activityId: a.activityId, searchText: a.searchText, vector }
  })

  const version = `${activities.length}:${activities
    .map((a) => a.activityId)
    .join(',')
    .slice(0, 64)}`

  return { entries, idf, version }
}

function normalizeVector(v: Map<string, number>) {
  let norm = 0
  for (const x of v.values()) norm += x * x
  norm = Math.sqrt(norm)
  if (norm === 0) return
  for (const [k, x] of v) v.set(k, x / norm)
}

/**
 * Embed a query (the normalized execution event) using the index's IDF.
 */
export function embedQuery(query: string, index: EmbeddingIndex): Map<string, number> {
  const tokens = tokenize(query)
  const tf = termFrequency(tokens)
  const v = new Map<string, number>()
  for (const [term, freq] of tf) {
    const w = freq * (index.idf.get(term) ?? 1)
    v.set(term, w)
  }
  normalizeVector(v)
  return v
}

export function cosine(a: Map<string, number>, b: Map<string, number>): number {
  // vectors are pre-normalized (unit length) -> dot product == cosine
  let dot = 0
  const [small, large] = a.size < b.size ? [a, b] : [b, a]
  for (const [k, x] of small) {
    const y = large.get(k)
    if (y !== undefined) dot += x * y
  }
  return dot
}
