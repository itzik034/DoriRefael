import { Navigate, Route, Routes } from "react-router-dom";
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

export function Routing() {
    return (
        <Routes>
            <Route path={appConfig.baseUrl + "/"} element={<Home />} />
            <Route path={appConfig.baseUrl + "/home"} element={<Navigate to={appConfig.baseUrl + "/"} />} />
            <Route path={appConfig.baseUrl + "/עמוד-בית"} element={<Navigate to={appConfig.baseUrl + "/"} />} />
            
            <Route path={appConfig.baseUrl + "/accessibility"} element={<AccessibilityStatement />} />
            <Route path={appConfig.baseUrl + "/הצהרת-נגישות/"} element={<AccessibilityStatement />} />
            
            <Route path={appConfig.baseUrl + "/about"} element={<About />} />
            <Route path={appConfig.baseUrl + "/אודות"} element={<About />} />
            
            <Route path={appConfig.baseUrl + "/en"} element={<EnglishPage />} />
            <Route path={appConfig.baseUrl + "/english-2"} element={<EnglishPage />} />
            
            <Route path={appConfig.baseUrl + "/reviews"} element={<Reviews />} />
            <Route path={appConfig.baseUrl + "/ביקורות"} element={<Reviews />} />
            
            <Route path={appConfig.baseUrl + "/contact"} element={<Contact />} />
            <Route path={appConfig.baseUrl + "/צור-קשר"} element={<Contact />} />
            <Route path={appConfig.baseUrl + "/אשמח-לדעתך"} element={<Contact />} />


            <Route path={appConfig.baseUrl + "/treatments/warts"} element={<WartsTreatment />} />
            <Route path={appConfig.baseUrl + "/טיפולים/יבלות-מכאניות/"} element={<WartsTreatment />} />

            <Route path={appConfig.baseUrl + "/treatments/diabetes"} element={<DiabetesTreatment />} />
            <Route path={appConfig.baseUrl + "/טיפולים/פדיקור-רפואי-מבוקר-ומוסמך-בחולי-סוכרת/"} element={<DiabetesTreatment />} />
            
            <Route path={appConfig.baseUrl + "/treatments/ingrown"} element={<IngrownTreatment />} />
            <Route path={appConfig.baseUrl + "/טיפולים/ציפורן-חודרנית/"} element={<IngrownTreatment />} />
            
            <Route path={appConfig.baseUrl + "/treatments/elderly"} element={<ElderlyPedicure />} />
            <Route path={appConfig.baseUrl + "/טיפולים/טיפול-בגבר-המבוגר/"} element={<ElderlyPedicure />} />
            
            <Route path={appConfig.baseUrl + "/treatments/clinical"} element={<ClinicalPedicure />} />
            
            <Route path={appConfig.baseUrl + "/treatments/sports"} element={<SportsTreatments />} />
            <Route path={appConfig.baseUrl + "/טיפולים/פדיקור-רפואי-לשיקום-פציעות-ספורט/"} element={<SportsTreatments />} />
            
            <Route path={appConfig.baseUrl + "/treatments/fungus"} element={<FungusTreatment />} />
            <Route path={appConfig.baseUrl + "/טיפולים/פטרת-עור-וציפורניים/"} element={<FungusTreatment />} />
            
            <Route path={appConfig.baseUrl + "/treatments/viral"} element={<ViralWarts />} />
            
            <Route path={appConfig.baseUrl + "/articles/viral-vs-mechanical"} element={<ViralVsMechanicalWarts />} />
            <Route path={appConfig.baseUrl + "/טיפולים/יבלות-מכאניות/"} element={<ViralVsMechanicalWarts />} />
            <Route path={appConfig.baseUrl + "/טיפולים/יבלת-ויראלית/"} element={<ViralVsMechanicalWarts />} />
            
            <Route path={appConfig.baseUrl + "/articles/dry-skin-and-cracks"} element={<DrySkinAndCracks />} />
            <Route path={appConfig.baseUrl + "/טיפולים/יובש-בעור-כפות-הרגליים/"} element={<DrySkinAndCracks />} />
            
            <Route path={appConfig.baseUrl + "/articles/athletes-load-rehabilitation"} element={<AthletesLoadRehabilitation />} />
            
            <Route path={appConfig.baseUrl + "*"} element={<Page404 />} />
        </Routes>
    );
}
