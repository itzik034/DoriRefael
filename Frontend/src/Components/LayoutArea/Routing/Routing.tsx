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

export const routes: RouteRecord[] = [
    {
        path: appConfig.baseUrl + "/",
        element: <Layout />,
        children: [
            { index: true, element: <Home /> },
            { path: "home", element: <Navigate to={appConfig.baseUrl + "/"} replace /> },
            { path: "עמוד-בית", element: <Navigate to={appConfig.baseUrl + "/"} replace /> },
            
            { path: "accessibility", element: <AccessibilityStatement /> },
            { path: "הצהרת-נגישות", element: <AccessibilityStatement /> },
            { path: "הצהרת-נגישות/", element: <AccessibilityStatement /> },
            
            { path: "about", element: <About /> },
            { path: "אודות", element: <About /> },
            
            { path: "en", element: <EnglishPage /> },
            { path: "english-2", element: <EnglishPage /> },
            
            { path: "reviews", element: <Reviews /> },
            { path: "ביקורות", element: <Reviews /> },
            
            { path: "contact", element: <Contact /> },
            { path: "צור-קשר", element: <Contact /> },
            { path: "אשמח-לדעתך", element: <Contact /> },

            { path: "treatments/warts", element: <WartsTreatment /> },
            { path: "טיפולים/יבלות-מכאניות", element: <WartsTreatment /> },
            { path: "טיפולים/יבלות-מכאניות/", element: <WartsTreatment /> },

            { path: "treatments/diabetes", element: <DiabetesTreatment /> },
            { path: "טיפולים/פדיקור-רפואי-מבוקר-ומוסמך-בחולי-סוכרת", element: <DiabetesTreatment /> },
            { path: "טיפולים/פדיקור-רפואי-מבוקר-ומוסמך-בחולי-סוכרת/", element: <DiabetesTreatment /> },
            
            { path: "treatments/ingrown", element: <IngrownTreatment /> },
            { path: "טיפולים/ציפורן-חודרנית", element: <IngrownTreatment /> },
            { path: "טיפולים/ציפורן-חודרנית/", element: <IngrownTreatment /> },
            
            { path: "treatments/elderly", element: <ElderlyPedicure /> },
            { path: "טיפולים/טיפול-בגבר-המבוגר", element: <ElderlyPedicure /> },
            { path: "טיפולים/טיפול-בגבר-המבוגר/", element: <ElderlyPedicure /> },
            
            { path: "treatments/clinical", element: <ClinicalPedicure /> },
            
            { path: "treatments/sports", element: <SportsTreatments /> },
            { path: "טיפולים/פדיקור-רפואי-לשיקום-פציעות-ספורט", element: <SportsTreatments /> },
            { path: "טיפולים/פדיקור-רפואי-לשיקום-פציעות-ספורט/", element: <SportsTreatments /> },
            
            { path: "treatments/fungus", element: <FungusTreatment /> },
            { path: "טיפולים/פטרת-עור-וציפורניים", element: <FungusTreatment /> },
            { path: "טיפולים/פטרת-עור-וציפורניים/", element: <FungusTreatment /> },
            
            { path: "treatments/viral", element: <ViralWarts /> },
            { path: "טיפולים/יבלת-ויראלית", element: <ViralWarts /> },
            { path: "טיפולים/יבלת-ויראלית/", element: <ViralWarts /> },
            
            { path: "articles/viral-vs-mechanical", element: <ViralVsMechanicalWarts /> },
            
            { path: "articles/dry-skin-and-cracks", element: <DrySkinAndCracks /> },
            { path: "טיפולים/יובש-בעור-כפות-הרגליים", element: <DrySkinAndCracks /> },
            { path: "טיפולים/יובש-בעור-כפות-הרגליים/", element: <DrySkinAndCracks /> },
            
            { path: "articles/athletes-load-rehabilitation", element: <AthletesLoadRehabilitation /> },
            
            { path: "*", element: <Page404 /> }
        ]
    }
];

export function Routing() {
    return useRoutes(routes);
}

