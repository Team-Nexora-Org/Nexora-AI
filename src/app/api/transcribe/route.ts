import { NextRequest, NextResponse } from 'next/server'
import Groq from 'groq-sdk'

// POST /api/transcribe — quick raw speech-to-text using Groq whisper-large-v3-turbo.
// Uploaded audio (multipart "file") is transcribed as-is (Hinglish/mixed kept raw);
// the NEXORA extractor normalizes the text later. Keeps the voice flow mock-free.
export async function POST(req: NextRequest) {
  const apiKey = process.env.GROQ_API_KEY
  if (!apiKey) {
    return NextResponse.json(
      { ok: false, error: 'GROQ_API_KEY is not configured.' },
      { status: 500 },
    )
  }

  const form = await req.formData()
  const file = form.get('file')
  if (!(file instanceof File)) {
    return NextResponse.json({ ok: false, error: 'No audio file uploaded.' }, { status: 400 })
  }
  if (file.size > 25 * 1024 * 1024) {
    return NextResponse.json(
      { ok: false, error: 'Audio file exceeds the 25 MB limit.' },
      { status: 413 },
    )
  }

  try {
    const client = new Groq({ apiKey })
    const transcription = await client.audio.transcriptions.create({
      file,
      model: 'whisper-large-v3-turbo',
      response_format: 'json',
      temperature: 0,
    })
    return NextResponse.json({ ok: true, text: transcription.text ?? '' })
  } catch (err) {
    console.error('[nexora] /api/transcribe failed:', err)
    return NextResponse.json(
      { ok: false, error: (err as Error).message },
      { status: 500 },
    )
  }
}
