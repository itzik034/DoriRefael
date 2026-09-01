import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../../../Services/AuthService";
import { notify } from "../../../Utils/Notify";
import "./Login.css";

export function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // If user is already authenticated, redirect them directly to dashboard
    useEffect(() => {
        if (typeof window !== "undefined" && authService.isLoggedIn()) {
            navigate("/dashboard", { replace: true });
        }
    }, [navigate]);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrorMessage("");

        const cleanUsername = username.trim();
        if (!cleanUsername) {
            setErrorMessage("נא להזין שם משתמש.");
            return;
        }

        if (!password) {
            setErrorMessage("נא להזין סיסמה.");
            return;
        }

        try {
            setIsLoading(true);
            await authService.login({ username: cleanUsername, password }, rememberMe);
            notify.success("התחברת בהצלחה למערכת!");
            navigate("/dashboard");
        } catch (err: any) {
            const message = err?.message || "שם משתמש או סיסמה שגויים.";
            setErrorMessage(message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="Login">
            {/* Ambient decorative lighting elements */}
            <div className="login-ambient-blob-1" aria-hidden="true" />
            <div className="login-ambient-blob-2" aria-hidden="true" />

            <div className="login-card">
                {/* Header section */}
                <div className="login-header">
                    <div className="login-icon-wrap" aria-hidden="true">
                        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                    </div>

                    <h1 className="login-title">כניסה למערכת</h1>
                    <p className="login-subtitle">דורי רפאל – קליניקה לפדיקור רפואי ושיקום כף הרגל</p>
                </div>

                {/* Error alert message */}
                {errorMessage && (
                    <div className="login-alert" role="alert">
                        <div className="login-alert-content">
                            <span className="login-alert-icon" aria-hidden="true">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="12" y1="8" x2="12" y2="12" />
                                    <line x1="12" y1="16" x2="12.01" y2="16" />
                                </svg>
                            </span>
                            <span>{errorMessage}</span>
                        </div>
                        <button 
                            type="button" 
                            className="login-alert-close" 
                            onClick={() => setErrorMessage("")}
                            aria-label="סגור הודעה"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>
                )}

                {/* Form section */}
                <form className="login-form" onSubmit={handleSubmit} noValidate>
                    {/* Username field */}
                    <div className="login-field">
                        <label className="login-label" htmlFor="username">
                            <span>שם משתמש</span>
                        </label>
                        <div className="login-input-wrapper">
                            <span className="login-field-icon" aria-hidden="true">
                                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                    <circle cx="12" cy="7" r="4" />
                                </svg>
                            </span>
                            <input
                                id="username"
                                type="text"
                                className="login-input"
                                placeholder="הזן שם משתמש"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                autoComplete="username"
                                disabled={isLoading}
                                autoFocus
                            />
                        </div>
                    </div>

                    {/* Password field */}
                    <div className="login-field">
                        <label className="login-label" htmlFor="password">
                            <span>סיסמה</span>
                        </label>
                        <div className="login-input-wrapper">
                            <span className="login-field-icon" aria-hidden="true">
                                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                </svg>
                            </span>
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                className={`login-input login-input-has-toggle ${showPassword ? "login-input-password-visible" : ""}`}
                                placeholder="הזן סיסמה"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password"
                                disabled={isLoading}
                            />
                            <button
                                type="button"
                                className="login-toggle-password-btn"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label={showPassword ? "הסתר סיסמה" : "הצג סיסמה"}
                                tabIndex={0}
                            >
                                {showPassword ? (
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                                        <line x1="1" y1="1" x2="23" y2="23" />
                                    </svg>
                                ) : (
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                        <circle cx="12" cy="12" r="3" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Remember me option */}
                    <div className="login-options-row">
                        <label className="login-checkbox-label">
                            <input
                                type="checkbox"
                                className="login-checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                disabled={isLoading}
                            />
                            <span>זכור אותי במכשיר זה</span>
                        </label>
                    </div>

                    {/* Submit button */}
                    <button
                        type="submit"
                        className="login-submit-btn"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <span className="login-spinner" aria-hidden="true" />
                                <span>מאמת נתונים...</span>
                            </>
                        ) : (
                            <>
                                <span>התחברות למערכת</span>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <line x1="19" y1="12" x2="5" y2="12" />
                                    <polyline points="12 19 5 12 12 5" />
                                </svg>
                            </>
                        )}
                    </button>
                </form>

                {/* Footer section */}
                <div className="login-footer">
                    <div className="login-ssl-badge">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                        <span>חיבור מוצפן ומאובטח</span>
                    </div>

                    <Link to="/" className="login-back-link">
                        <span>חזרה לאתר הראשי</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <polyline points="15 18 9 12 15 6" />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
}
