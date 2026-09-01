import { useEffect } from "react";
import { ArticleModel } from "../../../Models/ArticleModel";

interface DeleteConfirmModalProps {
    isOpen: boolean;
    article: ArticleModel | null;
    isDeleting: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export function DeleteConfirmModal({
    isOpen,
    article,
    isDeleting,
    onClose,
    onConfirm
}: DeleteConfirmModalProps) {
    // Close on Escape key press
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape" && !isDeleting) {
                onClose();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, isDeleting, onClose]);

    if (!isOpen || !article) {
        return null;
    }

    return (
        <div className="modal-backdrop delete-modal-backdrop" onClick={!isDeleting ? onClose : undefined}>
            <div 
                className="delete-modal-card" 
                role="alertdialog" 
                aria-modal="true" 
                aria-labelledby="delete-dialog-title"
                aria-describedby="delete-dialog-desc"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Glowing ambient danger aura */}
                <div className="delete-modal-glow" aria-hidden="true" />

                {/* Warning icon badge */}
                <div className="delete-icon-wrapper" aria-hidden="true">
                    <div className="delete-icon-pulse" />
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                        <line x1="12" y1="9" x2="12" y2="13" />
                        <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                </div>

                {/* Modal Title & Warning Heading */}
                <h3 id="delete-dialog-title" className="delete-modal-title">
                    אישור מחיקת מאמר
                </h3>

                <p id="delete-dialog-desc" className="delete-modal-subtitle">
                    פעולה זו היא בלתי הפיכה. האם אתה בטוח שברצונך למחוק את המאמר מהמערכת?
                </p>

                {/* Target article details highlight box */}
                <div className="delete-article-preview">
                    <span className="delete-preview-badge">מאמר למחיקה</span>
                    <h4 className="delete-preview-title">{article.title}</h4>
                    <span className="delete-preview-slug">מזהה: {article.slug}</span>
                </div>

                <div className="delete-modal-warning-notice">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    <span>קובץ ה-JSON של המאמר יימחק לצמיתות והדף יוסר מהאתר.</span>
                </div>

                {/* Action buttons */}
                <div className="delete-modal-actions">
                    <button
                        type="button"
                        className="delete-cancel-btn"
                        onClick={onClose}
                        disabled={isDeleting}
                    >
                        ביטול
                    </button>

                    <button
                        type="button"
                        className="delete-confirm-btn"
                        onClick={onConfirm}
                        disabled={isDeleting}
                    >
                        {isDeleting ? (
                            <>
                                <span className="delete-btn-spinner" aria-hidden="true" />
                                <span>מוחק מאמר...</span>
                            </>
                        ) : (
                            <>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <polyline points="3 6 5 6 21 6" />
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                    <line x1="10" y1="11" x2="10" y2="17" />
                                    <line x1="14" y1="11" x2="14" y2="17" />
                                </svg>
                                <span>כן, מחק מאמר לצמיתות</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
