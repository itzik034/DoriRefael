import { NavLink } from "react-router-dom";
import { appConfig } from "../../../Utils/AppConfig";
import "./Page404.css";
import { SEO } from "../../SharedArea/SEO/SEO";

export function Page404() {
    return (
        <div className="page-404">
            <SEO
                title="404 - העמוד לא נמצא | דורי רפאל"
                description="העמוד שחיפשת אינו קיים."
                noindex={true}
            />
            <div className="page-404__content">
                <h1 className="page-404__title">404</h1>
                <h2 className="page-404__subtitle">אופס! הדף לא נמצא</h2>
                <p className="page-404__text">
                    נראה שהגעת לקישור שבור או שהדף הוסר. אל דאגה, אפשר תמיד לחזור הביתה.
                </p>
                <NavLink to={appConfig.baseUrl + "/"} className="page-404__btn">
                    חזרה לעמוד הבית
                </NavLink>
            </div>
        </div>
    );
}
