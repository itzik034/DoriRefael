import { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArticleModel } from "../../../Models/ArticleModel";
import { articlesService } from "../../../Services/ArticlesService";
import { authService } from "../../../Services/AuthService";
import { notify } from "../../../Utils/Notify";
import { ArticleViewModal } from "./ArticleViewModal";
import { ArticleFormModal } from "./ArticleFormModal";
import { DeleteConfirmModal } from "./DeleteConfirmModal";
import { SEO } from "../../SharedArea/SEO/SEO";
import "./Dashboard.css";

export function Dashboard() {
    const navigate = useNavigate();

    // Data state
    const [articles, setArticles] = useState<ArticleModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    // Modal states
    const [viewingArticle, setViewingArticle] = useState<ArticleModel | null>(null);
    const [editingArticle, setEditingArticle] = useState<ArticleModel | null>(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [deletingArticle, setDeletingArticle] = useState<ArticleModel | null>(null);
    const [isDeletingInProgress, setIsDeletingInProgress] = useState(false);

    // Authentication Guard: Redirect to /login if unauthenticated
    useEffect(() => {
        if (typeof window !== "undefined" && !authService.isLoggedIn()) {
            notify.error("נא להתחבר למערכת לצורך גישה לפאנל הניהול.");
            navigate("/login", { replace: true });
        }
    }, [navigate]);

    // Load articles on component mount
    const loadArticles = async () => {
        try {
            setIsLoading(true);
            const fetched = await articlesService.fetchArticlesFromBackend();
            setArticles(fetched);
        } catch (err: any) {
            notify.error(err?.message || "אירעה שגיאה בטעינת המאמרים.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadArticles();
    }, []);

    // Filtered articles based on search query
    const filteredArticles = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();
        if (!query) return articles;

        return articles.filter(article => {
            const titleMatch = article.title.toLowerCase().includes(query);
            const slugMatch = article.slug.toLowerCase().includes(query);
            const excerptMatch = article.excerpt?.toLowerCase().includes(query) ?? false;
            const descMatch = article.description?.toLowerCase().includes(query) ?? false;
            return titleMatch || slugMatch || excerptMatch || descMatch;
        });
    }, [articles, searchQuery]);

    // Format date string to localized Hebrew presentation
    const formatDisplayDate = (dateStr?: string): string => {
        if (!dateStr) return "לא הוגדר";
        try {
            const d = new Date(dateStr);
            if (isNaN(d.getTime())) return dateStr;
            return new Intl.DateTimeFormat("he-IL", {
                day: "numeric",
                month: "short",
                year: "numeric"
            }).format(d);
        } catch {
            return dateStr;
        }
    };

    // Logout handler
    const handleLogout = () => {
        authService.logout();
        notify.success("התנתקת בהצלחה מהמערכת.");
        navigate("/login", { replace: true });
    };

    // Save article handler (handles both Add and Edit)
    const handleSaveArticle = async (articleData: ArticleModel) => {
        if (editingArticle) {
            // Updating existing article
            const updated = await articlesService.updateArticle(editingArticle.slug, articleData);
            setArticles(prev =>
                prev.map(item => (item.slug === editingArticle.slug ? updated : item))
            );
            notify.success(`המאמר "${updated.title}" עודכן בהצלחה!`);
            setEditingArticle(null);
        } else {
            // Creating new article
            const created = await articlesService.addArticle(articleData);
            setArticles(prev => [created, ...prev]);
            notify.success(`המאמר "${created.title}" נוסף בהצלחה!`);
            setIsAddModalOpen(false);
        }
    };

    // Confirm deletion handler
    const handleConfirmDelete = async () => {
        if (!deletingArticle) return;

        try {
            setIsDeletingInProgress(true);
            await articlesService.deleteArticle(deletingArticle.slug);
            setArticles(prev => prev.filter(item => item.slug !== deletingArticle.slug));
            notify.success(`המאמר "${deletingArticle.title}" נמחק בהצלחה.`);
            setDeletingArticle(null);
        } catch (err: any) {
            notify.error(err?.message || "אירעה שגיאה במחיקת המאמר.");
        } finally {
            setIsDeletingInProgress(false);
        }
    };

    // Copy article link to clipboard
    const handleCopySlug = (slug: string) => {
        const fullUrl = `${window.location.origin}/articles/${slug}`;
        navigator.clipboard.writeText(fullUrl);
        notify.success("קישור המאמר הועתק ללוח!");
    };

    // Count statistics
    const totalCount = articles.length;
    const latestDate = articles[0]?.publishedAt ? formatDisplayDate(articles[0].publishedAt) : "–";

    return (
        <div className="Dashboard">
            <SEO
                title="לוח בקרה | דורי רפאל"
                description="פאנל ניהול מאמרים ותוכן באתר דורי רפאל."
                canonical="/dashboard"
                noindex={true}
            />
            {/* Top Navigation Bar */}
            <header className="dashboard-topbar">
                <div className="topbar-container">
                    {/* Right side: Back to website button & brand */}
                    <div className="topbar-brand-section">
                        <Link to="/" className="topbar-back-site-btn" title="חזרה לאתר הראשי">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <polyline points="9 18 15 12 9 6" />
                            </svg>
                            <span>חזרה לאתר</span>
                        </Link>

                        <div className="topbar-divider" aria-hidden="true" />

                        <div className="topbar-title-wrap">
                            <div className="topbar-logo-badge">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="topbar-main-title">ניהול מאמרים</h1>
                                <span className="topbar-badge-pill">פאנל ניהול תוכן ראשי</span>
                            </div>
                        </div>
                    </div>

                    {/* Left side: Add Article & Logout Buttons */}
                    <div className="topbar-actions-section">
                        <button
                            type="button"
                            className="btn-add-article-top"
                            onClick={() => {
                                setEditingArticle(null);
                                setIsAddModalOpen(true);
                            }}
                        >
                            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <line x1="12" y1="5" x2="12" y2="19" />
                                <line x1="5" y1="12" x2="19" y2="12" />
                            </svg>
                            <span>הוספת מאמר חדש</span>
                        </button>

                        <button
                            type="button"
                            className="btn-logout-top"
                            onClick={handleLogout}
                            title="התנתקות מהמערכת"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                <polyline points="16 17 21 12 16 7" />
                                <line x1="21" y1="12" x2="9" y2="12" />
                            </svg>
                            <span>התנתקות</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Dashboard Workspace */}
            <main className="dashboard-content-wrapper">
                <div className="dashboard-container">
                    {/* Header Summary Stats Row */}
                    <section className="dashboard-stats-grid" aria-label="נתוני סיכום">
                        <div className="stat-card">
                            <div className="stat-card-icon stat-icon-navy">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                    <polyline points="14 2 14 8 20 8" />
                                    <line x1="16" y1="13" x2="8" y2="13" />
                                    <line x1="16" y1="17" x2="8" y2="17" />
                                    <polyline points="10 9 9 9 8 9" />
                                </svg>
                            </div>
                            <div className="stat-card-info">
                                <span className="stat-label">סה״כ מאמרים באתר</span>
                                <span className="stat-number">{totalCount}</span>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-card-icon stat-icon-blue">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                    <line x1="16" y1="2" x2="16" y2="6" />
                                    <line x1="8" y1="2" x2="8" y2="6" />
                                    <line x1="3" y1="10" x2="21" y2="10" />
                                </svg>
                            </div>
                            <div className="stat-card-info">
                                <span className="stat-label">עדכון אחרון</span>
                                <span className="stat-value-text">{latestDate}</span>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-card-icon stat-icon-green">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                    <polyline points="22 4 12 14.01 9 11.01" />
                                </svg>
                            </div>
                            <div className="stat-card-info">
                                <span className="stat-label">סטטוס סנכרון</span>
                                <span className="stat-status-badge">מערכת פעילה ומסונכרנת</span>
                            </div>
                        </div>
                    </section>

                    {/* Table Controls Row (Search & Refresh) */}
                    <div className="dashboard-table-controls">
                        <div className="search-bar-wrapper">
                            <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <circle cx="11" cy="11" r="8" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                            <input
                                type="text"
                                className="search-input"
                                placeholder="חיפוש לפי כותרת, מזהה (slug) או תקציר..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            {searchQuery && (
                                <button
                                    type="button"
                                    className="search-clear-btn"
                                    onClick={() => setSearchQuery("")}
                                    title="נקה חיפוש"
                                >
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="18" y1="6" x2="6" y2="18" />
                                        <line x1="6" y1="6" x2="18" y2="18" />
                                    </svg>
                                </button>
                            )}
                        </div>

                        <div className="table-controls-right">
                            <span className="results-count-badge">
                                מוצגים {filteredArticles.length} מתוך {articles.length} מאמרים
                            </span>

                            <button
                                type="button"
                                className="btn-refresh-table"
                                onClick={loadArticles}
                                title="רענן רשימת מאמרים"
                                disabled={isLoading}
                            >
                                <svg className={isLoading ? "spin-animation" : ""} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="23 4 23 10 17 10" />
                                    <polyline points="1 20 1 14 7 14" />
                                    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
                                </svg>
                                <span>רענן</span>
                            </button>
                        </div>
                    </div>

                    {/* Articles Table Card */}
                    <div className="dashboard-table-card">
                        {isLoading ? (
                            <div className="dashboard-loading-state">
                                <span className="table-spinner" aria-hidden="true" />
                                <p>טוען את רשימת המאמרים...</p>
                            </div>
                        ) : filteredArticles.length === 0 ? (
                            <div className="dashboard-empty-state">
                                <div className="empty-state-icon" aria-hidden="true">
                                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="11" cy="11" r="8" />
                                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                        <line x1="8" y1="11" x2="14" y2="11" />
                                    </svg>
                                </div>
                                <h3>לא נמצאו מאמרים</h3>
                                <p>
                                    {searchQuery
                                        ? "לא נמצאו תוצאות התואמות לחיפוש שלך. נסה מילת חיפוש אחרת."
                                        : "עדיין לא נוספו מאמרים למערכת. לחץ על הכפתור למעלה כדי להוסיף את המאמר הראשון!"}
                                </p>
                                {searchQuery ? (
                                    <button
                                        type="button"
                                        className="btn-secondary"
                                        onClick={() => setSearchQuery("")}
                                    >
                                        איפוס חיפוש
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        className="btn-primary"
                                        onClick={() => setIsAddModalOpen(true)}
                                    >
                                        + הוסף מאמר ראשון
                                    </button>
                                )}
                            </div>
                        ) : (
                            <div className="table-responsive-wrapper">
                                <table className="articles-table">
                                    <thead>
                                        <tr>
                                            <th className="th-thumbnail">תמונה</th>
                                            <th className="th-title">כותרת המאמר (לחץ לצפייה בתוכן)</th>
                                            <th className="th-slug">מזהה קישור (Slug)</th>
                                            <th className="th-date">תאריך פרסום</th>
                                            <th className="th-excerpt">תקציר</th>
                                            <th className="th-actions">פעולות</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredArticles.map((article) => (
                                            <tr key={article.slug} className="article-table-row">
                                                {/* Thumbnail */}
                                                <td className="td-thumbnail">
                                                    {article.image ? (
                                                        <img
                                                            src={article.image}
                                                            alt={article.title}
                                                            className="table-thumb-img"
                                                            loading="lazy"
                                                            onError={(e) => {
                                                                (e.currentTarget as HTMLImageElement).classList.add("thumb-fallback");
                                                            }}
                                                        />
                                                    ) : (
                                                        <div className="table-thumb-placeholder">
                                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                                                <circle cx="8.5" cy="8.5" r="1.5" />
                                                                <polyline points="21 15 16 10 5 21" />
                                                            </svg>
                                                        </div>
                                                    )}
                                                </td>

                                                {/* Title - Click opens ArticleViewModal */}
                                                <td className="td-title">
                                                    <button
                                                        type="button"
                                                        className="article-title-link-btn"
                                                        onClick={() => setViewingArticle(article)}
                                                        title="לחץ לפתיחת המאמר המלא וכל המידע"
                                                    >
                                                        <span>{article.title}</span>
                                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                                            <circle cx="12" cy="12" r="3" />
                                                        </svg>
                                                    </button>
                                                </td>

                                                {/* Slug */}
                                                <td className="td-slug">
                                                    <div className="slug-cell-wrapper">
                                                        <span className="slug-badge">/{article.slug}</span>
                                                        <button
                                                            type="button"
                                                            className="btn-copy-slug"
                                                            onClick={() => handleCopySlug(article.slug)}
                                                            title="העתק קישור מאמר"
                                                        >
                                                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </td>

                                                {/* Date */}
                                                <td className="td-date">
                                                    <div className="date-cell-wrapper">
                                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                                            <line x1="16" y1="2" x2="16" y2="6" />
                                                            <line x1="8" y1="2" x2="8" y2="6" />
                                                            <line x1="3" y1="10" x2="21" y2="10" />
                                                        </svg>
                                                        <span>{formatDisplayDate(article.publishedAt)}</span>
                                                    </div>
                                                </td>

                                                {/* Excerpt */}
                                                <td className="td-excerpt">
                                                    <span className="excerpt-truncate" title={article.excerpt || article.description || ""}>
                                                        {article.excerpt || article.description || "–"}
                                                    </span>
                                                </td>

                                                {/* Actions */}
                                                <td className="td-actions">
                                                    <div className="actions-cluster">
                                                        {/* View Details Button */}
                                                        <button
                                                            type="button"
                                                            className="action-btn action-view"
                                                            onClick={() => setViewingArticle(article)}
                                                            title="צפה בתוכן המאמר"
                                                        >
                                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                                                <circle cx="12" cy="12" r="3" />
                                                            </svg>
                                                        </button>

                                                        {/* Edit Button */}
                                                        <button
                                                            type="button"
                                                            className="action-btn action-edit"
                                                            onClick={() => {
                                                                setEditingArticle(article);
                                                                setIsAddModalOpen(false);
                                                            }}
                                                            title="ערוך מאמר"
                                                        >
                                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                                            </svg>
                                                        </button>

                                                        {/* Delete Button */}
                                                        <button
                                                            type="button"
                                                            className="action-btn action-delete"
                                                            onClick={() => setDeletingArticle(article)}
                                                            title="מחק מאמר"
                                                        >
                                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                <polyline points="3 6 5 6 21 6" />
                                                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                                                <line x1="10" y1="11" x2="10" y2="17" />
                                                                <line x1="14" y1="11" x2="14" y2="17" />
                                                            </svg>
                                                        </button>

                                                        {/* Open Live Article */}
                                                        <Link
                                                            to={`/articles/${article.slug}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="action-btn action-open-link"
                                                            title="פתח מאמר באתר"
                                                        >
                                                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                                                <polyline points="15 3 21 3 21 9" />
                                                                <line x1="10" y1="14" x2="21" y2="3" />
                                                            </svg>
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Modals */}

            {/* 1. Article Full Details Viewer Modal */}
            <ArticleViewModal
                isOpen={viewingArticle !== null}
                article={viewingArticle}
                onClose={() => setViewingArticle(null)}
                onEdit={(article) => {
                    setViewingArticle(null);
                    setEditingArticle(article);
                }}
            />

            {/* 2. Article Form Modal (Add & Edit) */}
            <ArticleFormModal
                isOpen={isAddModalOpen || editingArticle !== null}
                mode={editingArticle ? "edit" : "add"}
                initialArticle={editingArticle}
                onClose={() => {
                    setIsAddModalOpen(false);
                    setEditingArticle(null);
                }}
                onSave={handleSaveArticle}
            />

            {/* 3. Delete Confirmation Modal (Specially styled danger modal) */}
            <DeleteConfirmModal
                isOpen={deletingArticle !== null}
                article={deletingArticle}
                isDeleting={isDeletingInProgress}
                onClose={() => setDeletingArticle(null)}
                onConfirm={handleConfirmDelete}
            />
        </div>
    );
}
