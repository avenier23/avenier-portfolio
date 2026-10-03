// Free, offline answers for the chat widget (used when the AI assistant is disabled).
// Each topic matches on keywords; the best match wins. Edit answers here like any other site copy.
import { profile, workCount } from './content.js'

const book = { label: 'Book a strategy call', href: '#book' }
const whatsapp = { label: 'WhatsApp Avenier', href: profile.whatsapp, external: true }
const email = { label: 'Email Avenier', href: `mailto:${profile.email}`, external: true }

export const topics = [
  {
    id: 'services',
    label: 'What services do you offer?',
    keywords: ['service', 'offer', 'help with', 'what do you do', 'what can', 'skills', 'do you do'],
    answer:
      'Avenier helps with six things:\n• E-commerce operations (Shopify, Amazon, TikTok Shop)\n• Ad creatives & UGC\n• Video editing & reels\n• Graphic design & branding\n• Social media management\n• Executive & admin support (CRM, email, automation)',
    actions: [{ label: 'See services', href: '#services' }, book],
  },
  {
    id: 'results',
    label: 'What results have you delivered?',
    keywords: ['result', 'kickstarter', 'crowdfund', 'proof', 'achievement', 'success', 'case', 'numbers', 'views'],
    answer:
      'A few highlights:\n• iBlockCube Bolt Kickstarter: HK$808K pledged, 8,083% funded (Avenier made the ad creatives)\n• COULF DeskDock Kickstarter: HK$1.39M pledged\n• 39K views on a single TikTok, with 57.9% watching to the end\n• 36K+ LinkedIn and 58K+ TikTok views overall',
    actions: [{ label: 'See the proof', href: '#results' }],
  },
  {
    id: 'work',
    label: 'Can I see your work?',
    keywords: ['portfolio', 'work', 'sample', 'example', 'video', 'reel', 'design', 'logo', 'graphic', 'creative', 'capcut', 'mock'],
    answer:
      `Sure! The portfolio has ${workCount} pieces in six sections: AI Video Reels, CapCut Reels, Kickstarter Ad Creatives, Mock-up & AI Product Videos, Graphic Design, and Brands I’ve Worked With.`,
    actions: [
      { label: 'AI reels', href: '#work-ai-reels' },
      { label: 'CapCut & dental reels', href: '#work-capcut-reels' },
      { label: 'Kickstarter ads', href: '#work-kickstarter' },
      { label: 'All work', href: '#work' },
    ],
  },
  {
    id: 'ecommerce',
    label: 'Can you manage my online store?',
    keywords: ['shopify', 'amazon', 'tiktok shop', 'store', 'ecommerce', 'e-commerce', 'product', 'listing'],
    answer:
      'Yes. Avenier manages 5+ e-commerce brands across Shopify, Amazon, TikTok Shop and crowdfunding platforms: store operations, product research, listings, ad creatives and email campaigns.',
    actions: [book],
  },
  {
    id: 'pricing',
    label: 'How much do you charge?',
    keywords: ['price', 'pricing', 'rate', 'cost', 'charge', 'budget', 'how much', 'fee', 'salary', 'hourly'],
    answer:
      'Rates depend on the scope, hours and deliverables. Part-time, full-time and per-project work are all possible. Book a free call or send a WhatsApp message and Avenier will send a clear proposal.',
    actions: [book, whatsapp],
  },
  {
    id: 'availability',
    label: 'What time zones do you work in?',
    keywords: ['time zone', 'timezone', 'available', 'availability', 'hours', 'schedule', 'full-time', 'part-time', 'when'],
    answer:
      'Avenier works full-time and flexibly across US (EST/PST), UK (GMT) and AU (AEST) hours, from a dedicated home office with backup internet and power.',
    actions: [book],
  },
  {
    id: 'tools',
    label: 'Which tools do you use?',
    keywords: ['tool', 'software', 'canva', 'capcut', 'figma', 'hubspot', 'zapier', 'notion', 'clickup', 'crm', 'ai', 'chatgpt'],
    answer:
      'Canva, CapCut, Figma, Illustrator, HeyGen and ElevenLabs for creative work; Shopify, Amazon Seller and TikTok Shop for e-commerce; HubSpot, GoHighLevel, Zoho, Zapier and Make.com for CRM and automation; plus Notion, ClickUp, Asana, ChatGPT and Claude Code.',
    actions: [{ label: 'See services', href: '#services' }],
  },
  {
    id: 'experience',
    label: 'Tell me about your experience',
    keywords: ['experience', 'background', 'about', 'who are you', 'resume', 'résumé', 'cv', 'education', 'certif'],
    answer:
      'Avenier has 2+ years as a remote Virtual Assistant for UK-based executives, currently an E-commerce VA at Jomoteam. Avenier holds a BA in Economics, a Masterclass Virtual Assistant certificate, and Civil Service eligibility.',
    actions: [{ label: 'Download résumé', href: profile.resume, external: true }, { label: 'About Avenier', href: '#about' }],
  },
  {
    id: 'contact',
    label: 'How do I book a call?',
    keywords: ['book', 'call', 'meeting', 'contact', 'hire', 'reach', 'whatsapp', 'email', 'talk', 'start', 'interview'],
    answer: `Book a free 30-minute Client Strategy Meeting on Zoom: pick any open time in the booking section and you’ll get the Zoom link by email instantly. Agenda: get to know your business → goals & challenges → action plan → next steps. You can also WhatsApp ${profile.whatsappDisplay} or email ${profile.email}.`,
    actions: [book, whatsapp, email],
  },
]

const greetings = ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening', 'kumusta', 'musta']

export const fallback = {
  answer:
    'I’m not sure about that one, but Avenier can answer directly. Send a quick WhatsApp message or book a free call. You can also tap one of the topics below.',
  actions: [whatsapp, book],
  showTopics: true,
}

export function findAnswer(text) {
  const q = ` ${text.toLowerCase().replace(/[^\p{L}\p{N}\s'-]/gu, ' ')} `
  if (greetings.some((g) => q.trim() === g || q.startsWith(` ${g} `))) {
    return { answer: 'Hi there! What would you like to know about Avenier?', showTopics: true }
  }
  let best = null
  let bestScore = 0
  for (const t of topics) {
    const score = t.keywords.reduce((s, k) => s + (q.includes(k) ? k.length : 0), 0)
    if (score > bestScore) {
      best = t
      bestScore = score
    }
  }
  return best || fallback
}
