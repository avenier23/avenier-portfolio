# Avenier Arellano Portfolio

React + Vite + Motion portfolio with a Claude-powered AI assistant and a booking form.

## Run locally

```bash
npm install
cp .env.example .env   # then add your ANTHROPIC_API_KEY
npm run dev            # http://localhost:5173
```

The chat assistant is free by default: it answers from the topics in [`src/data/assistant.js`](src/data/assistant.js) (edit answers there).
To switch to the Claude-powered AI assistant later, set `VITE_AI_ENABLED=true` and `ANTHROPIC_API_KEY` (in `.env` locally and in Vercel), then redeploy.

## Edit content

Everything you'd normally change (text, stats, services, portfolio items, FAQ, certifications) is in
[`src/data/content.js`](src/data/content.js). What the AI assistant knows lives in [`api/_knowledge.js`](api/_knowledge.js).

To add a portfolio piece: put the file in `public/media/img` (or `public/media/video` plus a `.webp` poster) and add one line to the `work` list.

## Booking form

- Default: submitting opens a pre-filled email to avenierarellano06@gmail.com.
- Recommended: get a free access key at https://web3forms.com, set `VITE_WEB3FORMS_KEY`, and requests land in your inbox directly.

## Deploy (Vercel)

1. Push this `website` folder to a GitHub repo.
2. Import it at https://vercel.com/new (framework: Vite, detected automatically).
3. Add `ANTHROPIC_API_KEY` (and optionally `VITE_WEB3FORMS_KEY`) under Project Settings → Environment Variables.
4. Deploy. `api/chat.js` runs as a serverless function automatically.
