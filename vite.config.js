import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// Serves api/chat.js during `npm run dev` so the AI assistant works locally the same way it does on Vercel.
function apiDevServer() {
  return {
    name: 'api-dev-server',
    configureServer(server) {
      server.middlewares.use('/api/chat', async (req, res) => {
        let raw = ''
        for await (const chunk of req) raw += chunk
        try {
          req.body = raw ? JSON.parse(raw) : {}
        } catch {
          req.body = {}
        }
        const { default: handler } = await server.ssrLoadModule('/api/chat.js')
        await handler(req, res)
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  // Expose server-only secrets (e.g. ANTHROPIC_API_KEY from .env) to the dev API handler, not the client bundle.
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''))
  return {
    plugins: [react(), apiDevServer()],
  }
})
