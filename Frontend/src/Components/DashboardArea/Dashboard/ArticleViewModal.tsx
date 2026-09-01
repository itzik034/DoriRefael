import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArticleModel } from "../../../Models/ArticleModel";
import { articlesService } from "../../../Services/ArticlesService";

interface ArticleViewModalProps {
    isOpen: boolean;
    article: ArticleModel | null;
    onClose: () => void;
    onEdit: (article: ArticleModel) => void;
}

export function ArticleViewModal({
    isOpen,
    article,
    onClose,
    onEdit
}: ArticleViewModalProps) {
    // Close on Escape key
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen || !article) {
        return null;
    }

    const formattedDate = article.publishedAt
        ? new Intl.DateTimeFormat("he-IL", {
              dateStyle: "long",
              timeStyle: "short"
          }).format(new Date(article.publishedAt))
        : "לא צוין תאריך";

    const parsedFaqs = articlesService.parseFaq(article.faq);

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div
                className="article-view-modal-card"
                role="dialog"
                aria-modal="true"
                aria-labelledby="view-modal-title"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Modal Header */}
                <div className="modal-header">
                    <div className="modal-header-meta">
                        <span className="modal-category-chip">סקירת מאמר מלאה</span>
                        <span className="modal-slug-chip">/{article.slug}</span>
                    </div>

                    <button
                        type="button"
                        className="modal-close-btn"
                        onClick={onClose}
                        aria-label="סגור חלון"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                {/* Modal Body */}
                <div className="modal-scroll-body">
                    {/* Article Title */}
                    <h2 id="view-modal-title" className="article-view-title">
                        {article.title}
                    </h2>

                    {/* Metadata summary bar */}
                    <div className="article-view-meta-bar">
                        <div className="meta-item">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                <line x1="16" y1="2" x2="16" y2="6" />
                                <line x1="8" y1="2" x2="8" y2="6" />
                                <line x1="3" y1="10" x2="21" y2="10" />
                            </svg>
                            <span>פורסם בתאריך: {formattedDate}</span>
                        </div>

                        <div className="meta-item">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                            </svg>
                            <span className="meta-slug-text">slug: {article.slug}</span>
                        </div>
                    </div>

                    {/* Featured Image preview if present */}
                    {article.image && (
                        <div className="article-view-image-container">
                            <img
                                src={article.image}
                                alt={article.title}
                                className="article-view-featured-image"
                                loading="lazy"
                                onError={(e) => {
                                    (e.currentTarget as HTMLImageElement).classList.add("image-error");
                                }}
                            />
                        </div>
                    )}

                    {/* Excerpt Card */}
                    {article.excerpt && (
                        <div className="article-view-excerpt-card">
                            <span className="excerpt-label">תקציר:</span>
                            <p className="excerpt-text">{article.excerpt}</p>
                        </div>
                    )}

                    {/* Meta description */}
                    {article.description && (
                        <div className="article-view-desc-card">
                            <span className="desc-label">תיאור SEO (Meta Description):</span>
                            <p className="desc-text">{article.description}</p>
                        </div>
                    )}

                    {/* Article HTML Content Section */}
                    <div className="article-view-content-section">
                        <div className="content-section-header">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                                <line x1="16" y1="13" x2="8" y2="13" />
                                <line x1="16" y1="17" x2="8" y2="17" />
                                <polyline points="10 9 9 9 8 9" />
                            </svg>
                            <h3>תוכן המאמר</h3>
                        </div>

                        <div
                            className="article-view-html-render"
                            dangerouslySetInnerHTML={{ __html: article.html }}
                        />
                    </div>

                    {/* FAQ Items Section if available */}
                    {parsedFaqs.length > 0 && (
                        <div className="article-view-faq-section">
                            <h4 className="faq-section-title">
                                שאלות נפוצות המוטמעות במאמר ({parsedFaqs.length})
                            </h4>
                            <div className="faq-cards-list">
                                {parsedFaqs.map((faq, index) => (
                                    <div key={index} className="faq-preview-card">
                                        <div className="faq-preview-question">
                                            <span className="faq-q-badge">ש:</span>
                                            <strong>{faq.question}</strong>
                                        </div>
                                        <div className="faq-preview-answer">
                                            <span className="faq-a-badge">ת:</span>
                                            <span>{faq.answer}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Modal Footer Actions */}
                <div className="modal-footer">
                    <div className="modal-footer-secondary">
                        <Link
                            to={`/articles/${article.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-external-link"
                        >
                            <span>פתח מאמר באתר הראשי</span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                <polyline points="15 3 21 3 21 9" />
                                <line x1="10" y1="14" x2="21" y2="3" />
                            </svg>
                        </Link>
                    </div>

                    <div className="modal-footer-primary">
                        <button
                            type="button"
                            className="btn-secondary"
                            onClick={onClose}
                        >
                            סגור
                        </button>

                        <button
                            type="button"
                            className="btn-primary"
                            onClick={() => {
                                onClose();
                                onEdit(article);
                            }}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                            </svg>
                            <span>עריכת מאמר</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
