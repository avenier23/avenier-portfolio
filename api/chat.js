// POST /api/chat: portfolio AI assistant backed by Claude.
// Runs as a Vercel serverless function in production and as Vite dev middleware locally (see vite.config.js).
// Requires ANTHROPIC_API_KEY in the environment; the key never reaches the browser.
import Anthropic from '@anthropic-ai/sdk'
import { SYSTEM_PROMPT } from './_knowledge.js'

const MAX_MESSAGES = 20
const MAX_CHARS = 2000
const RATE_LIMIT = 20 // requests per IP per window
const WINDOW_MS = 10 * 60 * 1000

// Best-effort per-instance rate limit to deter abuse of the API key.
const hits = new Map()
function rateLimited(ip) {
  const now = Date.now()
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  return recent.length > RATE_LIMIT
}

let client
function getClient() {
  client ??= new Anthropic()
  return client
}

function send(res, status, payload) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(payload))
}

// Keep only well-formed user/assistant text turns, starting with a user turn.
function sanitize(messages) {
  if (!Array.isArray(messages)) return null
  const clean = messages
    .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .map((m) => ({ role: m.role, content: m.content.trim().slice(0, MAX_CHARS) }))
    .filter((m) => m.content)
    .slice(-MAX_MESSAGES)
  while (clean.length && clean[0].role !== 'user') clean.shift()
  if (!clean.length || clean[clean.length - 1].role !== 'user') return null
  return clean
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return send(res, 405, { error: 'Method not allowed' })
  }
  if (!process.env.ANTHROPIC_API_KEY) {
    return send(res, 503, { error: 'The assistant is not configured yet.' })
  }

  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.socket?.remoteAddress || 'unknown'
  if (rateLimited(ip)) {
    return send(res, 429, { error: 'You’re sending messages quickly. Please wait a few minutes and try again.' })
  }

  const body = typeof req.body === 'string' ? safeParse(req.body) : req.body
  const messages = sanitize(body?.messages)
  if (!messages) return send(res, 400, { error: 'Please send a message.' })

  try {
    const response = await getClient().beta.messages.create({
      model: 'claude-opus-5-5',
      max_tokens: 1024,
      // Chat replies are short, so low effort keeps them fast and inexpensive.
      output_config: { effort: 'low' },
      // On a safety decline, the API retries on a fallback model inside the same call.
      betas: ['server-side-fallback-2026-07-01'],
      fallbacks: 'default',
      system: [{ type: 'text', text: SYSTEM_PROMPT, cache_control: { type: 'ephemeral' } }],
      messages,
    })

    if (response.stop_reason === 'refusal') {
      return send(res, 200, {
        reply: 'I can’t help with that one, but I’m happy to answer questions about Avenier’s services and experience.',
      })
    }

    const reply = response.content
      .filter((b) => b.type === 'text')
      .map((b) => b.text)
      .join('\n')
      .trim()
    return send(res, 200, { reply: reply || 'Sorry, I didn’t catch that. Could you rephrase?' })
  } catch (err) {
    if (err instanceof Anthropic.RateLimitError) {
      return send(res, 429, { error: 'The assistant is busy right now. Please try again in a moment.' })
    }
    if (err instanceof Anthropic.AuthenticationError) {
      console.error('Anthropic auth failed: check ANTHROPIC_API_KEY')
      return send(res, 503, { error: 'The assistant is temporarily unavailable.' })
    }
    if (err instanceof Anthropic.APIError) {
      console.error(`Anthropic API error ${err.status}:`, err.message)
      return send(res, 502, { error: 'The assistant is temporarily unavailable.' })
    }
    console.error('Chat handler error:', err)
    return send(res, 500, { error: 'Something went wrong. Please try again.' })
  }
}

function safeParse(text) {
  try {
    return JSON.parse(text)
  } catch {
    return null
  }
}
