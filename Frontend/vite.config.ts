import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Sitemap from 'vite-plugin-sitemap'

export default defineConfig({
    plugins: [
        react(),
        Sitemap({
            hostname: 'https://dorirefael.co.il',
            dynamicRoutes: [
                '/',
                '/about',
                '/אודות',
                '/contact',
                '/צור-קשר',
                '/reviews',
                '/ביקורות',
                '/en',
                '/accessibility',
                '/הצהרת-נגישות/',
                '/treatments/warts',
                '/טיפולים/יבלות-מכאניות/',
                '/treatments/diabetes',
                '/טיפולים/פדיקור-רפואי-מבוקר-ומוסמך-בחולי-סוכרת/',
                '/treatments/ingrown',
                '/טיפולים/ציפורן-חודרנית/',
                '/treatments/elderly',
                '/טיפולים/טיפול-בגבר-המבוגר/',
                '/treatments/clinical',
                '/treatments/sports',
                '/טיפולים/פדיקור-רפואי-לשיקום-פציעות-ספורט/',
                '/treatments/fungus',
                '/טיפולים/פטרת-עור-וציפורניים/',
                '/treatments/viral',
                '/טיפולים/יבלת-ויראלית/',
                '/articles/viral-vs-mechanical',
                '/articles/dry-skin-and-cracks',
                '/טיפולים/יובש-בעור-כפות-הרגליים/',
                '/articles/athletes-load-rehabilitation'
            ]
        })
    ],
    server: { open: true },
    base: "/"
})
