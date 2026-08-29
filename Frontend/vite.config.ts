import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Sitemap from 'vite-plugin-sitemap'

export default defineConfig({
    plugins: [
        react(),
        Sitemap({
            hostname: 'https://dorirefael.co.il',
            generateRobotsTxt: false,
            dynamicRoutes: [
                '/',
                '/accessibility',
                '/about',
                '/en',
                '/reviews',
                '/contact',
                '/treatments/warts',
                '/treatments/diabetes',
                '/treatments/ingrown',
                '/treatments/elderly',
                '/treatments/clinical',
                '/treatments/sports',
                '/treatments/fungus',
                '/treatments/viral',
                '/articles/viral-vs-mechanical',
                '/articles/dry-skin-and-cracks',
                '/articles/athletes-load-rehabilitation'
            ]
        })
    ],
    server: { open: true },
    base: "/"
})
