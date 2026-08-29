import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Sitemap from 'vite-plugin-sitemap'
import fs from 'node:fs'
import path from 'node:path'

// Helper function to read all dynamic article slugs for sitemap generation
function getArticleRoutes(): string[] {
    const articlesDirs = [
        path.resolve(__dirname, 'src/Content/Articles'),
        path.resolve(__dirname, 'src/content/Articles')
    ];
    const routes = new Set<string>();

    for (const dir of articlesDirs) {
        if (fs.existsSync(dir)) {
            const files = fs.readdirSync(dir);
            for (const file of files) {
                if (file.endsWith('.json')) {
                    try {
                        const fileContent = fs.readFileSync(path.join(dir, file), 'utf-8');
                        const data = JSON.parse(fileContent);
                        const slug = (data.slug || path.basename(file, '.json')).trim();
                        if (slug) {
                            routes.add(`/articles/${slug}`);
                        }
                    } catch {
                        const slug = path.basename(file, '.json').trim();
                        if (slug) {
                            routes.add(`/articles/${slug}`);
                        }
                    }
                }
            }
        }
    }

    return Array.from(routes);
}

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
                '/articles/athletes-load-rehabilitation',
                ...getArticleRoutes()
            ]
        })
    ],
    server: { open: true },
    base: "/"
})

