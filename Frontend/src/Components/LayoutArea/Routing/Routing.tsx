import { Navigate, useRoutes } from "react-router-dom";
import type { RouteRecord } from "vite-react-ssg";
import { Layout } from "../Layout/Layout";
import { Home } from "../../PagesArea/Home/Home";
import { Page404 } from "../../PagesArea/Page404/Page404";
import { About } from "../../PagesArea/About/About";
import { Reviews } from "../../PagesArea/Reviews/Reviews";
import { Contact } from "../../PagesArea/Contact/Contact";
import { DiabetesTreatment } from "../../PagesArea/Treatments/DiabetesTreatment";
import { IngrownTreatment } from "../../PagesArea/Treatments/IngrownTreatment";
import { ElderlyPedicure } from "../../PagesArea/Treatments/ElderlyPedicure";
import { FungusTreatment } from "../../PagesArea/Treatments/FungusTreatment";
import { WartsTreatment } from "../../PagesArea/Treatments/WartsTreatment";
import { ViralVsMechanicalWarts } from "../../PagesArea/Articles/ViralVsMechanicalWarts";
import { DrySkinAndCracks } from "../../PagesArea/Articles/DrySkinAndCracks";
import { AthletesLoadRehabilitation } from "../../PagesArea/Articles/AthletesLoadRehabilitation";
import { EnglishPage } from "../../PagesArea/English/EnglishPage";
import { ClinicalPedicure } from "../../PagesArea/Treatments/ClinicalPedicure";
import { SportsTreatments } from "../../PagesArea/Treatments/SportsTreatments";
import { ViralWarts } from "../../PagesArea/Treatments/ViralWarts";
import { appConfig } from "../../../Utils/AppConfig";
import { AccessibilityStatement } from "../../PagesArea/AccessibilityStatement/AccessibilityStatement";

const baseUrl = appConfig.baseUrl;

export const routes: RouteRecord[] = [
    {
        path: baseUrl + "/",
        element: <Layout />,
        children: [
            // Home page and legacy home redirects
            { index: true, element: <Home /> },
            { path: "home", element: <Navigate to={baseUrl + "/"} replace /> },
            { path: "עמוד-בית", element: <Navigate to={baseUrl + "/"} replace /> },

            // Accessibility statement
            { path: "accessibility", element: <AccessibilityStatement /> },
            { path: "הצהרת-נגישות", element: <Navigate to={baseUrl + "/accessibility"} replace /> },

            // About page
            { path: "about", element: <About /> },
            { path: "אודות", element: <Navigate to={baseUrl + "/about"} replace /> },

            // English page
            { path: "en", element: <EnglishPage /> },
            { path: "english-2", element: <Navigate to={baseUrl + "/en"} replace /> },

            // Reviews page
            { path: "reviews", element: <Reviews /> },
            { path: "ביקורות", element: <Navigate to={baseUrl + "/reviews"} replace /> },

            // Contact page
            { path: "contact", element: <Contact /> },
            { path: "צור-קשר", element: <Navigate to={baseUrl + "/contact"} replace /> },
            { path: "אשמח-לדעתך", element: <Navigate to={baseUrl + "/contact"} replace /> },

            // Treatments
            { path: "treatments/warts", element: <WartsTreatment /> },
            { path: "טיפולים/יבלות-מכאניות", element: <Navigate to={baseUrl + "/treatments/warts"} replace /> },

            { path: "treatments/diabetes", element: <DiabetesTreatment /> },
            { path: "טיפולים/פדיקור-רפואי-מבוקר-ומוסמך-בחולי-סוכרת", element: <Navigate to={baseUrl + "/treatments/diabetes"} replace /> },

            { path: "treatments/ingrown", element: <IngrownTreatment /> },
            { path: "טיפולים/ציפורן-חודרנית", element: <Navigate to={baseUrl + "/treatments/ingrown"} replace /> },

            { path: "treatments/elderly", element: <ElderlyPedicure /> },
            { path: "טיפולים/טיפול-בגבר-המבוגר", element: <Navigate to={baseUrl + "/treatments/elderly"} replace /> },

            { path: "treatments/clinical", element: <ClinicalPedicure /> },

            { path: "treatments/sports", element: <SportsTreatments /> },
            { path: "טיפולים/פדיקור-רפואי-לשיקום-פציעות-ספורט", element: <Navigate to={baseUrl + "/treatments/sports"} replace /> },

            { path: "treatments/fungus", element: <FungusTreatment /> },
            { path: "טיפולים/פטרת-עור-וציפורניים", element: <Navigate to={baseUrl + "/treatments/fungus"} replace /> },

            { path: "treatments/viral", element: <ViralWarts /> },
            { path: "טיפולים/יבלת-ויראלית", element: <Navigate to={baseUrl + "/treatments/viral"} replace /> },

            // Articles
            { path: "articles/viral-vs-mechanical", element: <ViralVsMechanicalWarts /> },
            { path: "articles/dry-skin-and-cracks", element: <DrySkinAndCracks /> },
            { path: "טיפולים/יובש-בעור-כפות-הרגליים", element: <Navigate to={baseUrl + "/articles/dry-skin-and-cracks"} replace /> },
            { path: "articles/athletes-load-rehabilitation", element: <AthletesLoadRehabilitation /> },

            // 404 Fallback
            { path: "*", element: <Page404 /> }
        ]
    }
];

export function Routing() {
    return useRoutes(routes);
}

