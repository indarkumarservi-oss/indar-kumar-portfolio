import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'
import { VitePWA } from 'vite-plugin-pwa'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// GitHub Pages repo name - set via GITHUB_REPOSITORY env var or default
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] || ''
const base = repoName ? `/${repoName}/` : '/'

export default defineConfig({
  base,
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'og-image.png'],
      manifest: {
        name: 'Indar Kumar - Portfolio',
        short_name: 'Indar Kumar',
        description: 'Computer Science Engineering & Data Science Student | Developer | AI & Technology Enthusiast',
        theme_color: '#00d4ff',
        background_color: '#0a0f1a',
        display: 'standalone',
        orientation: 'portrait-primary',
        scope: base,
        start_url: base,
        icons: [
          {
            src: `${base}favicon.svg`,
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          }
        ],
        categories: ['technology', 'developer', 'portfolio'],
        shortcuts: [
          {
            name: 'Projects',
            short_name: 'Projects',
            description: 'View my featured projects',
            url: `${base}#projects`,
            icons: [{ src: `${base}favicon.svg`, sizes: '192x192' }]
          },
          {
            name: 'Contact',
            short_name: 'Contact',
            description: 'Get in touch',
            url: `${base}#contact`,
            icons: [{ src: `${base}favicon.svg`, sizes: '192x192' }]
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    }),
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