// All site copy and media live here so the portfolio can be updated without touching components.

export const profile = {
  name: 'Avenier Arellano',
  shortName: 'Ave',
  roles: ['Virtual Assistant', 'E-commerce', 'Digital Creative'],
  location: 'Gingoog City, Philippines',
  email: 'avenierarellano06@gmail.com',
  linkedin: 'https://www.linkedin.com/in/avenierarellano',
  whatsapp: 'https://wa.me/639954973679',
  whatsappDisplay: '+63 995 497 3679',
  resume: '/Avenier-Arellano-Resume.pdf',
  logo: '/media/img/ave-logo-mark.png',
  timezones: 'US (EST/PST) · UK (GMT) · AU (AEST)',
}

export const socials = [
  { name: 'whatsapp', label: 'WhatsApp', href: profile.whatsapp },
  { name: 'linkedin', label: 'LinkedIn', href: profile.linkedin },
  { name: 'facebook', label: 'Facebook (Ave Tech)', href: 'https://www.facebook.com/avetech.io/' },
  { name: 'youtube', label: 'YouTube (Avenier Tech)', href: 'https://www.youtube.com/@aveniertech' },
]

export const nav = [
  { label: 'About', href: '#about' },
  { label: 'Results', href: '#results' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'FAQ', href: '#faq' },
]

export const heroStats = [
  { value: 'HK$2.2M+', label: 'Crowdfunding pledges from campaigns I created assets for' },
  { value: '58K+', label: 'TikTok views from my content strategy' },
  { value: '5+', label: 'E-commerce brands managed at once' },
]

export const brands = [
  { name: 'Jomoteam', logo: '/media/img/logo-651.webp' },
  { name: 'iBlockCube', logo: '/media/img/iblockcube-logo.webp' },
  { name: 'BizBear', logo: '/media/img/logo-bizbear-mark.webp', dark: true },
  { name: 'DynoRank', logo: '/media/img/logo-597.webp', dark: true },
  { name: 'Tala Pet Shop', logo: '/media/img/tala-logo.webp' },
  { name: 'Lorytea', logo: '/media/img/logo-198.webp' },
]

export const about = {
  paragraphs: [
    'I’m a results-driven Virtual Assistant with 2+ years of supporting UK-based executives across advertising reporting, social media, video editing, graphic design and e-commerce operations.',
    'I run several brands at once, adapting strategy, content and messaging to each niche and audience. My background in Economics shapes how I work: analytical, detail-oriented, and focused on what actually moves the numbers.',
  ],
  highlights: [
    { value: '2+ yrs', label: 'Remote experience with UK & international clients' },
    { value: '36K+', label: 'LinkedIn views generated' },
    { value: '20+', label: 'Social graphics & videos delivered monthly' },
    { value: 'BA', label: 'Economics, Gingoog City United Colleges' },
  ],
}

export const results = [
  {
    id: 'bolt',
    tag: 'Kickstarter · Ad creatives',
    title: 'iBlockCube Bolt 205W Travel Adapter',
    metric: '8,083%',
    metricLabel: 'funded',
    points: ['HK$808,336 pledged', '672 backers', 'Launch, feature and pre-launch ad creatives'],
    image: '/media/img/result-bolt-kickstarter.webp',
  },
  {
    id: 'coulf',
    tag: 'Kickstarter · Campaign assets',
    title: 'COULF DeskDock 250W GaN Charger',
    metric: 'HK$1.39M',
    metricLabel: 'pledged',
    points: ['Goal was HK$39,130', '895 backers', 'Product visuals and ad creative support'],
    image: '/media/img/result-coulf-kickstarter.webp',
  },
  {
    id: 'tiktok',
    tag: 'TikTok · Organic content',
    title: 'Viral review content',
    metric: '39K',
    metricLabel: 'views on one video',
    points: ['57.9% watched the full video', '98.8% of traffic from For You', '96 new followers from one post'],
    image: '/media/img/result-tiktok-39k.webp',
  },
  {
    id: 'calendar',
    tag: 'Social media management',
    title: 'Multi-platform content calendar',
    metric: '4',
    metricLabel: 'platforms scheduled',
    points: ['Facebook, Instagram, TikTok & YouTube', 'Daily posting cadence', 'Images, reels and carousels'],
    image: '/media/img/result-content-calendar.webp',
  },
]

export const process = [
  {
    step: '01',
    title: 'Strategy',
    text: 'I learn your business, goals and audience, then map out the systems, content and priorities that will move you forward.',
    tags: ['Discovery call', 'Planning', 'Setup'],
  },
  {
    step: '02',
    title: 'Execution',
    text: 'I handle the day-to-day: store operations, creatives, content and admin, so you can focus on growth instead of busywork.',
    tags: ['Content', 'Marketing', 'Operations'],
  },
  {
    step: '03',
    title: 'Optimize & Scale',
    text: 'I review performance, automate repetitive work and refine what’s working so results compound month after month.',
    tags: ['Reporting', 'Automation', 'Scaling'],
  },
]

export const services = [
  {
    icon: 'ShoppingBag',
    title: 'E-commerce Operations',
    label: 'Shopify · Amazon · TikTok Shop',
    text: 'Store management, product research, listings and daily operations across multiple brands and marketplaces.',
  },
  {
    icon: 'Megaphone',
    title: 'Ad Creatives & UGC',
    label: 'Facebook Ads · Crowdfunding',
    text: 'Scroll-stopping static and video ads, UGC content and competitor research that feed winning campaigns.',
  },
  {
    icon: 'Clapperboard',
    title: 'Video Editing & Reels',
    label: 'CapCut · AI video tools',
    text: 'Short-form reels, product videos and AI-assisted edits built for retention on TikTok, Reels and Shorts.',
  },
  {
    icon: 'Palette',
    title: 'Graphic Design & Branding',
    label: 'Canva · Illustrator · Figma',
    text: 'Logos, social templates, posters and brand assets that keep every touchpoint consistent and on-brand.',
  },
  {
    icon: 'CalendarCheck',
    title: 'Social Media Management',
    label: 'Content calendars · Analytics',
    text: 'Planning, scheduling and reporting across LinkedIn, Facebook, Instagram and TikTok with data-driven tweaks.',
  },
  {
    icon: 'BriefcaseBusiness',
    title: 'Executive & Admin Support',
    label: 'CRM · Email · Automation',
    text: 'Calendar and inbox management, lead generation, CRM upkeep (HubSpot, Zoho, GHL) and Zapier/Make automations.',
  },
]

export const tools = [
  'Shopify', 'Amazon Seller', 'TikTok Shop', 'Meta Business Suite', 'Canva', 'CapCut', 'Figma',
  'Adobe Illustrator', 'HeyGen', 'ElevenLabs', 'HubSpot', 'GoHighLevel', 'Zapier', 'Make.com',
  'Notion', 'ClickUp', 'Asana', 'WordPress', 'Wix', 'Framer', 'ChatGPT', 'Claude Code',
]

export const workFilters = ['All', 'Ad Creatives', 'Video & Reels', 'Social Media', 'Branding', 'Print']

// type: 'image' | 'video'. Videos use a .webp poster generated from the clip.
export const work = [
  { type: 'image', category: 'Ad Creatives', title: 'Bolt 205W pre-launch ad', client: 'iBlockCube', src: '/media/img/bolt-prelaunch.webp' },
  { type: 'video', category: 'Ad Creatives', title: 'Bolt 205W product loop', client: 'iBlockCube', src: '/media/video/bolt-loop.mp4', poster: '/media/video/bolt-loop.webp', landscape: true },
  { type: 'image', category: 'Ad Creatives', title: 'Bolt feature callouts', client: 'iBlockCube', src: '/media/img/bolt-features.webp' },
  { type: 'image', category: 'Ad Creatives', title: 'Bolt 170W & 205W launch ad', client: 'iBlockCube', src: '/media/img/bolt-variants.webp' },
  { type: 'image', category: 'Ad Creatives', title: 'Bolt “Coming soon” teaser', client: 'iBlockCube', src: '/media/img/bolt-blue.webp' },
  { type: 'image', category: 'Ad Creatives', title: 'Bolt “Launching soon” ad', client: 'iBlockCube', src: '/media/img/bolt-launching.webp' },
  { type: 'video', category: 'Ad Creatives', title: 'Blueberry product ad mockup', client: 'Ad concept', src: '/media/video/ad-mockup-1.mp4', poster: '/media/video/ad-mockup-1.webp' },
  { type: 'video', category: 'Ad Creatives', title: 'Cinematic brand ad mockup', client: 'Ad concept', src: '/media/video/ad-mockup-2.mp4', poster: '/media/video/ad-mockup-2.webp' },
  { type: 'image', category: 'Ad Creatives', title: 'Customer results testimonial', client: 'E-commerce agency', src: '/media/img/testimonial-1.webp' },
  { type: 'image', category: 'Ad Creatives', title: 'Store rebuild testimonial', client: 'E-commerce agency', src: '/media/img/testimonial-2.webp' },

  { type: 'video', category: 'Video & Reels', title: 'Ave Tech: “Ever felt like…”', client: 'AI-edited reel', src: '/media/video/reel-avetech-1.mp4', poster: '/media/video/reel-avetech-1.webp' },
  { type: 'video', category: 'Video & Reels', title: 'Ave Tech: “What if…”', client: 'AI-edited reel', src: '/media/video/reel-avetech-2.mp4', poster: '/media/video/reel-avetech-2.webp' },
  { type: 'video', category: 'Video & Reels', title: 'Ave Tech: “The missing memory”', client: 'AI-edited reel', src: '/media/video/reel-avetech-3.mp4', poster: '/media/video/reel-avetech-3.webp' },
  { type: 'video', category: 'Video & Reels', title: 'Ave Tech: explainer reel', client: 'AI-edited reel', src: '/media/video/reel-avetech-4.mp4', poster: '/media/video/reel-avetech-4.webp' },
  { type: 'video', category: 'Video & Reels', title: 'Mighty Techie: vibe coding', client: 'Creator reel', src: '/media/video/reel-mightytechie-1.mp4', poster: '/media/video/reel-mightytechie-1.webp' },
  { type: 'video', category: 'Video & Reels', title: 'Mighty Techie: design with Claude Code', client: 'Creator reel', src: '/media/video/reel-mightytechie-2.mp4', poster: '/media/video/reel-mightytechie-2.webp' },
  { type: 'video', category: 'Video & Reels', title: 'Blueberry Smoothie animation', client: 'Motion graphics', src: '/media/video/anim-blueberry.mp4', poster: '/media/video/anim-blueberry.webp' },
  { type: 'video', category: 'Video & Reels', title: 'Fresh Juice animation', client: 'Motion graphics', src: '/media/video/anim-fresh.mp4', poster: '/media/video/anim-fresh.webp' },

  { type: 'image', category: 'Social Media', title: 'Virtual Assistant services post', client: 'Jomoteam', src: '/media/img/social-02.webp' },
  { type: 'image', category: 'Social Media', title: '“Changing your opinion” post', client: 'Jomoteam', src: '/media/img/social-01.webp' },
  { type: 'image', category: 'Social Media', title: 'When to hire a VA', client: 'Jomoteam', src: '/media/img/social-03.webp' },
  { type: 'image', category: 'Social Media', title: 'Build your dream business', client: 'Jomoteam', src: '/media/img/social-05.webp' },
  { type: 'image', category: 'Social Media', title: 'Benefits of hiring a VA', client: 'Jomoteam', src: '/media/img/social-07.webp' },
  { type: 'image', category: 'Social Media', title: 'VA services overview', client: 'Jomoteam', src: '/media/img/social-08.webp' },
  { type: 'image', category: 'Social Media', title: 'Social post template', client: 'Jomoteam', src: '/media/img/social-04.webp' },
  { type: 'image', category: 'Social Media', title: 'Social post template', client: 'Jomoteam', src: '/media/img/social-06.webp' },
  { type: 'image', category: 'Social Media', title: 'Social post template', client: 'Jomoteam', src: '/media/img/social-09.webp' },

  { type: 'image', category: 'Branding', title: 'BizBear logo', client: 'Digital marketing agency', src: '/media/img/logo-bizbear.webp' },
  { type: 'image', category: 'Branding', title: 'Tala Pet Shop signage mockup', client: 'Tala Pet Shop', src: '/media/img/tala-sign.webp' },
  { type: 'image', category: 'Branding', title: 'Tala Pet Shop apparel mockup', client: 'Tala Pet Shop', src: '/media/img/tala-646.webp' },
  { type: 'image', category: 'Branding', title: 'Tala Pet Shop logo', client: 'Tala Pet Shop', src: '/media/img/tala-603.webp', light: true },
  { type: 'image', category: 'Branding', title: 'DynoRank logo', client: 'SEO brand', src: '/media/img/logo-597.webp', light: true },
  { type: 'image', category: 'Branding', title: 'Lorytea logo', client: 'Milk tea brand', src: '/media/img/logo-198.webp', light: true },

  { type: 'image', category: 'Print', title: 'Coffee Talk event poster', client: 'Event poster', src: '/media/img/poster-coffee.webp' },
  { type: 'image', category: 'Print', title: 'Fashion Sale flyer', client: 'Retail promo', src: '/media/img/poster-fashion.webp' },
  { type: 'image', category: 'Print', title: 'Pet Shop promo flyer', client: 'Tala Pet Shop', src: '/media/img/poster-petshop.webp' },
]

export const certifications = [
  { title: 'Masterclass Virtual Assistant (MVA)', issuer: 'Surge Marketplace', date: 'May 2024', note: '40-hour program', src: '/media/img/cert-mva.webp' },
  { title: 'AI in Virtual Assistant Tasks and Success', issuer: 'Surge Marketplace', date: 'Dec 2024', src: '/media/img/cert-2.webp' },
  { title: 'A Complete Guide: How to Start Working as a VA in 2025', issuer: 'Surge Marketplace', date: 'Dec 2024', src: '/media/img/cert-3.webp' },
  { title: 'Getting Hired with Amazon VA Tasks', issuer: 'Surge Marketplace', date: 'Jun 2024', src: '/media/img/cert-amazon.webp' },
]

export const extraCredentials = ['Civil Service Eligibility, Civil Service Commission (2026)']

export const meeting = {
  name: 'Client Strategy Meeting',
  duration: '30 min',
  platform: 'Zoom',
  calendly: 'https://calendly.com/avenierarellano06/client-strategy-meeting',
  agenda: [
    { time: '0–5 min', title: 'Get to know you', text: 'Your business, brand, audience and how things run today.' },
    { time: '5–15 min', title: 'Goals & challenges', text: 'What’s eating your time, what’s not working, and what success looks like.' },
    { time: '15–25 min', title: 'Action plan', text: 'Where I can help across operations, creatives, content and admin, plus quick wins you can use right away.' },
    { time: '25–30 min', title: 'Next steps', text: 'Scope, timeline and how we’d work together. You get a clear proposal within 24 hours.' },
  ],
}

export const bookingServices = [
  'E-commerce operations',
  'Ad creatives & UGC',
  'Video editing & reels',
  'Graphic design & branding',
  'Social media management',
  'Executive & admin support',
  'Not sure yet, let’s talk',
]

export const timeSlots = ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM', '8:00 PM']

export const faqs = [
  {
    q: 'What do I need to get started?',
    a: 'Just book a free 30-minute Client Strategy Meeting on Zoom. We’ll go over your goals, current workload and tools, and I’ll suggest where I can take the most off your plate first. You’ll get a clear proposal within 24 hours.',
  },
  {
    q: 'Which time zones can you work in?',
    a: 'I work full-time and flexibly across US (EST/PST), UK (GMT) and AU (AEST) hours, with overlap for live meetings and fast replies.',
  },
  {
    q: 'What tools and platforms do you know?',
    a: 'Shopify, Amazon Seller tools, TikTok Shop, Meta Business Suite, Canva, CapCut, Figma, HubSpot, GoHighLevel, Zapier, Make.com, Notion, ClickUp, WordPress, Wix and AI tools like ChatGPT and Claude Code. If you use something else, I learn fast.',
  },
  {
    q: 'Can you handle both creative and admin work?',
    a: 'Yes. Most of my clients use me for a mix: e.g. managing the store and inbox during the day while also producing weekly ad creatives and reels.',
  },
  {
    q: 'How do you price your services?',
    a: 'It depends on scope, hours and deliverables. Part-time, full-time and per-project arrangements are all possible. Book a call and I’ll send a clear proposal.',
  },
  {
    q: 'Is my business data safe with you?',
    a: 'Absolutely. I’m used to handling financial transactions and sensitive client data with strict accuracy and confidentiality, and I’m happy to sign an NDA.',
  },
]
