import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// GitHub Pages repo name - set via GITHUB_REPOSITORY env var or default
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] || ''
const base = repoName ? `/${repoName}/` : '/'

export default defineConfig({
  base,
  plugins: [
    react(),
    {
      name: 'html-transform',
      transformIndexHtml(html) {
        return html
          .replace(/"\/favicon\.svg"/g, `"${base}favicon.svg"`)
          .replace(/"\/og-image\.png"/g, `"${base}og-image.png"`)
      },
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})