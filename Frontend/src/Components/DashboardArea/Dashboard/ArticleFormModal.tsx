import { FormEvent, useEffect, useState, useRef, DragEvent } from "react";
import { ArticleModel } from "../../../Models/ArticleModel";
import { appConfig } from "../../../Utils/AppConfig";
import { articlesService } from "../../../Services/ArticlesService";

interface ArticleFormModalProps {
    isOpen: boolean;
    mode: "add" | "edit";
    initialArticle?: ArticleModel | null;
    onClose: () => void;
    onSave: (articleData: ArticleModel) => Promise<void>;
}

export function ArticleFormModal({
    isOpen,
    mode,
    initialArticle,
    onClose,
    onSave
}: ArticleFormModalProps) {
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [description, setDescription] = useState("");
    const [excerpt, setExcerpt] = useState("");
    const [image, setImage] = useState("");
    const [publishedAt, setPublishedAt] = useState("");
    const [html, setHtml] = useState("");
    const [faqs, setFaqs] = useState<Array<{ question: string; answer: string }>>([]);

    const [activeHtmlTab, setActiveHtmlTab] = useState<"edit" | "preview">("edit");
    const [isSaving, setIsSaving] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // Image upload states
    const [isUploadingImage, setIsUploadingImage] = useState(false);
    const [uploadError, setUploadError] = useState("");
    const [isDraggingOver, setIsDraggingOver] = useState(false);
    const [imageInputMode, setImageInputMode] = useState<"upload" | "url">("upload");
    const [copiedPath, setCopiedPath] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Populate form data whenever initialArticle or mode changes
    useEffect(() => {
        if (!isOpen) return;

        setErrorMessage("");
        setUploadError("");
        setIsUploadingImage(false);
        setIsDraggingOver(false);
        setCopiedPath(false);

        if (mode === "edit" && initialArticle) {
            setTitle(initialArticle.title || "");
            setSlug(initialArticle.slug || "");
            setDescription(initialArticle.description || "");
            setExcerpt(initialArticle.excerpt || "");
            setImage(initialArticle.image || "");
            setImageInputMode(initialArticle.image?.startsWith("http") ? "url" : "upload");
            setPublishedAt(
                initialArticle.publishedAt
                    ? new Date(initialArticle.publishedAt).toISOString().substring(0, 16)
                    : new Date().toISOString().substring(0, 16)
            );
            setHtml(initialArticle.html || "");
            setFaqs(articlesService.parseFaq(initialArticle.faq));
        } else {
            // New Article defaults
            setTitle("");
            setSlug("");
            setDescription("");
            setExcerpt("");
            setImage("");
            setImageInputMode("upload");
            setPublishedAt(new Date().toISOString().substring(0, 16));
            setHtml("<p>כתוב את תוכן המאמר כאן...</p>");
            setFaqs([]);
        }
    }, [isOpen, mode, initialArticle]);

    // Close on Escape key press
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape" && !isSaving) {
                onClose();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, isSaving, onClose]);

    if (!isOpen) {
        return null;
    }

    // Handle image file upload to backend
    const handleFileUpload = async (file: File) => {
        setUploadError("");

        // Validate file type
        if (!file.type.startsWith("image/")) {
            setUploadError("נא לבחור קובץ תמונה תקין בלבד (JPG, PNG, WebP, GIF, SVG, AVIF).");
            return;
        }

        // Validate size (maximum 10MB)
        if (file.size > 10 * 1024 * 1024) {
            setUploadError("גודל התמונה עולה על 10MB. נא לבחור תמונה קטנה יותר.");
            return;
        }

        try {
            setIsUploadingImage(true);
            const targetSlug = slug.trim() || undefined;
            const result = await articlesService.uploadImage(file, targetSlug);
            setImage(result.url);
        } catch (err: any) {
            setUploadError(err?.message || "אירעה שגיאה בעת העלאת התמונה לשרת.");
        } finally {
            setIsUploadingImage(false);
        }
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleFileUpload(file);
        }
        if (e.target) {
            e.target.value = "";
        }
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDraggingOver(false);
        if (isSaving || isUploadingImage) return;

        const file = e.dataTransfer.files?.[0];
        if (file) {
            handleFileUpload(file);
        }
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (!isDraggingOver) {
            setIsDraggingOver(true);
        }
    };

    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDraggingOver(false);
    };

    // Resolves complete absolute URL with domain / server prefix
    const getFullImageUrl = (imagePath: string): string => {
        if (!imagePath) return "";
        if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
            return imagePath;
        }
        const origin = typeof window !== "undefined" ? window.location.origin : "";
        const base = import.meta.env.DEV
            ? (appConfig.baseUrl || origin)
            : "https://dorirefael.co.il";
        const cleanPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
        return `${base}${cleanPath}`;
    };

    // Encodes URI for safe image rendering in preview
    const getPreviewImageUrl = (imagePath: string): string => {
        if (!imagePath) return "";
        return encodeURI(getFullImageUrl(imagePath));
    };

    const handleCopyPath = () => {
        if (!image) return;
        const fullUrl = getFullImageUrl(image);
        navigator.clipboard.writeText(fullUrl);
        setCopiedPath(true);
        setTimeout(() => setCopiedPath(false), 2000);
    };

    // Auto-generate slug from title in 'add' mode
    const handleTitleChange = (newTitle: string) => {
        setTitle(newTitle);
        if (mode === "add") {
            const generated = newTitle
                .trim()
                .toLowerCase()
                .replace(/[^\w\u0590-\u05FF\s-]/g, "")
                .replace(/\s+/g, "-")
                .replace(/-+/g, "-");
            setSlug(generated);
        }
    };

    const handleAddFaq = () => {
        setFaqs([...faqs, { question: "", answer: "" }]);
    };

    const handleFaqChange = (index: number, field: "question" | "answer", value: string) => {
        const updated = [...faqs];
        updated[index][field] = value;
        setFaqs(updated);
    };

    const handleRemoveFaq = (index: number) => {
        setFaqs(faqs.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage("");

        const cleanTitle = title.trim();
        const cleanSlug = slug.trim();
        const cleanHtml = html.trim();

        if (!cleanTitle) {
            setErrorMessage("נא להזין כותרת למאמר.");
            return;
        }

        if (!cleanSlug) {
            setErrorMessage("נא להזין מזהה קישור (Slug).");
            return;
        }

        if (!cleanHtml) {
            setErrorMessage("נא להזין תוכן למאמר.");
            return;
        }

        // Format FAQ items if any are valid
        const validFaqs = faqs.filter(f => f.question.trim() && f.answer.trim());

        const articleData: ArticleModel = {
            title: cleanTitle,
            slug: cleanSlug,
            description: description.trim() || undefined,
            excerpt: excerpt.trim() || undefined,
            image: image.trim() || undefined,
            publishedAt: publishedAt ? new Date(publishedAt).toISOString() : new Date().toISOString(),
            html: cleanHtml,
            faq: validFaqs.length > 0 ? JSON.stringify(validFaqs) : undefined,
            schema: initialArticle?.schema
        };

        try {
            setIsSaving(true);
            await onSave(articleData);
            onClose();
        } catch (err: any) {
            setErrorMessage(err?.message || "אירעה שגיאה בעת שמירת המאמר.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="modal-backdrop" onClick={!isSaving ? onClose : undefined}>
            <div
                className="article-form-modal-card"
                role="dialog"
                aria-modal="true"
                aria-labelledby="form-modal-title"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="modal-header">
                    <div className="modal-header-meta">
                        <span className="modal-category-chip">
                            {mode === "add" ? "יצירת מאמר חדש" : "עריכת מאמר קיים"}
                        </span>
                    </div>

                    <button
                        type="button"
                        className="modal-close-btn"
                        onClick={onClose}
                        disabled={isSaving}
                        aria-label="סגור חלון"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                {/* Form */}
                <form className="article-modal-form" onSubmit={handleSubmit} noValidate>
                    {/* Error Notice */}
                    {errorMessage && (
                        <div className="form-alert-error" role="alert">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="12" y1="8" x2="12" y2="12" />
                                <line x1="12" y1="16" x2="12.01" y2="16" />
                            </svg>
                            <span>{errorMessage}</span>
                        </div>
                    )}

                    <div className="modal-scroll-body form-body-grid">
                        {/* Title Field */}
                        <div className="form-group form-group-full">
                            <label className="form-label" htmlFor="article-title">
                                כותרת המאמר <span className="required-star">*</span>
                            </label>
                            <input
                                id="article-title"
                                type="text"
                                className="form-input"
                                placeholder="לדוגמה: יתרונות הפדיקור הרפואי לסוכרתיים"
                                value={title}
                                onChange={(e) => handleTitleChange(e.target.value)}
                                disabled={isSaving}
                                required
                            />
                        </div>

                        {/* Slug Field */}
                        <div className="form-group">
                            <label className="form-label" htmlFor="article-slug">
                                מזהה קישור (Slug) <span className="required-star">*</span>
                            </label>
                            <div className="input-with-prefix input-with-prefix-ltr">
                                <span className="input-prefix">/articles/</span>
                                <input
                                    id="article-slug"
                                    type="text"
                                    className="form-input input-slug"
                                    placeholder="slug-name"
                                    value={slug}
                                    onChange={(e) => setSlug(e.target.value)}
                                    disabled={isSaving}
                                    required
                                />
                            </div>
                            <span className="field-hint">משמש לכתובת ה-URL של המאמר.</span>
                        </div>

                        {/* Publication Date */}
                        <div className="form-group">
                            <label className="form-label" htmlFor="article-date">
                                תאריך פרסום
                            </label>
                            <input
                                id="article-date"
                                type="datetime-local"
                                className="form-input"
                                value={publishedAt}
                                onChange={(e) => setPublishedAt(e.target.value)}
                                disabled={isSaving}
                            />
                        </div>

                        {/* Featured Image */}
                        <div className="form-group form-group-full">
                            <div className="image-field-header">
                                <label className="form-label" htmlFor="article-image">
                                    תמונה ראשית למאמר
                                </label>
                                <div className="image-mode-toggle" role="tablist">
                                    <button
                                        type="button"
                                        className={`image-mode-btn ${imageInputMode === "upload" ? "image-mode-active" : ""}`}
                                        onClick={() => setImageInputMode("upload")}
                                        disabled={isSaving || isUploadingImage}
                                    >
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                            <polyline points="17 8 12 3 7 8" />
                                            <line x1="12" y1="3" x2="12" y2="15" />
                                        </svg>
                                        <span>העלאת קובץ מהמחשב</span>
                                    </button>
                                    <button
                                        type="button"
                                        className={`image-mode-btn ${imageInputMode === "url" ? "image-mode-active" : ""}`}
                                        onClick={() => setImageInputMode("url")}
                                        disabled={isSaving || isUploadingImage}
                                    >
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                                            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                                        </svg>
                                        <span>קישור אינטרנט (URL)</span>
                                    </button>
                                </div>
                            </div>

                            {imageInputMode === "upload" ? (
                                <div className="image-upload-section">
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        id="article-image-file-input"
                                        className="hidden-file-input"
                                        accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml,image/avif"
                                        onChange={handleFileInputChange}
                                        disabled={isSaving || isUploadingImage}
                                    />

                                    <div
                                        className={`image-dropzone ${isDraggingOver ? "image-dropzone-active" : ""} ${isUploadingImage ? "image-dropzone-loading" : ""}`}
                                        onDragOver={handleDragOver}
                                        onDragLeave={handleDragLeave}
                                        onDrop={handleDrop}
                                        onClick={() => !isUploadingImage && fileInputRef.current?.click()}
                                        role="button"
                                        tabIndex={0}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter" || e.key === " ") {
                                                e.preventDefault();
                                                fileInputRef.current?.click();
                                            }
                                        }}
                                    >
                                        {isUploadingImage ? (
                                            <div className="upload-loading-state">
                                                <span className="upload-spinner" />
                                                <span className="upload-loading-text">מעלה ושומר את התמונה בתיקייה...</span>
                                            </div>
                                        ) : (
                                            <div className="upload-idle-state">
                                                <div className="upload-icon-wrapper">
                                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                                        <circle cx="8.5" cy="8.5" r="1.5" />
                                                        <polyline points="21 15 16 10 5 21" />
                                                    </svg>
                                                </div>
                                                <div className="upload-text-content">
                                                    <span className="upload-primary-text">
                                                        <strong>לחץ לבחירת תמונה</strong> או גרור את הקובץ לכאן
                                                    </span>
                                                    <span className="upload-secondary-text">
                                                        הקובץ יישמר אוטומטית בתיקיית התמונות (JPG, PNG, WebP עד 10MB)
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="image-url-section">
                                    <input
                                        id="article-image"
                                        type="text"
                                        className="form-input input-ltr"
                                        placeholder="https://... או /src/Content/Images/..."
                                        value={image}
                                        onChange={(e) => setImage(e.target.value)}
                                        disabled={isSaving || isUploadingImage}
                                    />
                                    <span className="field-hint">
                                        ניתן להזין כתובת אינטרנט ישירה לתמונה או נתיב מקומי.
                                    </span>
                                </div>
                            )}

                            {uploadError && (
                                <div className="image-upload-error">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10" />
                                        <line x1="12" y1="8" x2="12" y2="12" />
                                        <line x1="12" y1="16" x2="12.01" y2="16" />
                                    </svg>
                                    <span>{uploadError}</span>
                                </div>
                            )}

                            {/* Image Preview & Details */}
                            {image && (
                                <div className="form-image-preview-wrapper">
                                    <div className="preview-image-container">
                                        <img
                                            src={getPreviewImageUrl(image)}
                                            alt="תצוגה מקדימה"
                                            className="form-image-preview"
                                            onError={(e) => {
                                                (e.currentTarget as HTMLImageElement).classList.add("image-error");
                                            }}
                                            onLoad={(e) => {
                                                (e.currentTarget as HTMLImageElement).classList.remove("image-error");
                                            }}
                                        />
                                    </div>
                                    <div className="preview-meta-info">
                                        <div className="preview-path-row">
                                            <span className="preview-path-badge">קישור מלא:</span>
                                            <code className="preview-path-text" title={getFullImageUrl(image)}>{getFullImageUrl(image)}</code>
                                        </div>
                                        <div className="preview-actions-row">
                                            <button
                                                type="button"
                                                className="preview-btn preview-btn-copy"
                                                onClick={handleCopyPath}
                                                title="העתק קישור מלא (URL)"
                                            >
                                                {copiedPath ? (
                                                    <>
                                                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                            <polyline points="20 6 9 17 4 12" />
                                                        </svg>
                                                        <span>הועתק!</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                                                        </svg>
                                                        <span>העתק קישור</span>
                                                    </>
                                                )}
                                            </button>
                                            <button
                                                type="button"
                                                className="preview-btn preview-btn-replace"
                                                onClick={() => {
                                                    if (imageInputMode === "upload") {
                                                        fileInputRef.current?.click();
                                                    } else {
                                                        setImage("");
                                                    }
                                                }}
                                                disabled={isSaving || isUploadingImage}
                                            >
                                                החלף תמונה
                                            </button>
                                            <button
                                                type="button"
                                                className="preview-btn preview-btn-remove"
                                                onClick={() => setImage("")}
                                                disabled={isSaving || isUploadingImage}
                                            >
                                                הסר תמונה
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Excerpt */}
                        <div className="form-group form-group-full">
                            <label className="form-label" htmlFor="article-excerpt">
                                תקציר המאמר (Excerpt)
                            </label>
                            <textarea
                                id="article-excerpt"
                                className="form-textarea form-textarea-sm"
                                placeholder="תקציר קצר שיופיע בכרטיס המאמר בדף הראשי..."
                                rows={2}
                                value={excerpt}
                                onChange={(e) => setExcerpt(e.target.value)}
                                disabled={isSaving}
                            />
                        </div>

                        {/* Meta Description */}
                        <div className="form-group form-group-full">
                            <div className="label-with-counter">
                                <label className="form-label" htmlFor="article-desc">
                                    תיאור Meta Description (לתוצאות חיפוש בגוגל)
                                </label>
                                <span className="char-counter">{description.length} תווים</span>
                            </div>
                            <textarea
                                id="article-desc"
                                className="form-textarea form-textarea-sm"
                                placeholder="תיאור מקיף המופיע בתוצאות מנועי החיפוש (מומלץ בין 120 ל-160 תווים)..."
                                rows={2}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                disabled={isSaving}
                            />
                        </div>

                        {/* HTML Content with Editor & Live Preview Tabs */}
                        <div className="form-group form-group-full">
                            <div className="html-editor-header">
                                <label className="form-label">
                                    תוכן המאמר (HTML) <span className="required-star">*</span>
                                </label>
                                <div className="html-tabs-switch" role="tablist">
                                    <button
                                        type="button"
                                        role="tab"
                                        aria-selected={activeHtmlTab === "edit"}
                                        className={`html-tab-btn ${activeHtmlTab === "edit" ? "html-tab-active" : ""}`}
                                        onClick={() => setActiveHtmlTab("edit")}
                                    >
                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="16 18 22 12 16 6" />
                                            <polyline points="8 6 2 12 8 18" />
                                        </svg>
                                        <span>עריכת קוד HTML</span>
                                    </button>
                                    <button
                                        type="button"
                                        role="tab"
                                        aria-selected={activeHtmlTab === "preview"}
                                        className={`html-tab-btn ${activeHtmlTab === "preview" ? "html-tab-active" : ""}`}
                                        onClick={() => setActiveHtmlTab("preview")}
                                    >
                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                            <circle cx="12" cy="12" r="3" />
                                        </svg>
                                        <span>תצוגה מקדימה</span>
                                    </button>
                                </div>
                            </div>

                            {activeHtmlTab === "edit" ? (
                                <textarea
                                    id="article-html"
                                    className="form-textarea form-textarea-code"
                                    placeholder="<p>הזן כאן קוד HTML כולל כותרות H2, פסקאות, תמונות ורשימות...</p>"
                                    rows={12}
                                    value={html}
                                    onChange={(e) => setHtml(e.target.value)}
                                    disabled={isSaving}
                                    required
                                />
                            ) : (
                                <div
                                    className="html-preview-rendered"
                                    dangerouslySetInnerHTML={{ __html: html || "<p class='empty-preview-text'>אין תוכן להצגה עדיין...</p>" }}
                                />
                            )}
                        </div>

                        {/* FAQ Items Section */}
                        <div className="form-group form-group-full faq-editor-container">
                            <div className="faq-editor-header">
                                <div>
                                    <label className="form-label">שאלות ותשובות נפוצות (FAQ Schema)</label>
                                    <span className="field-hint">מוסיף שאלות ותשובות מעוצבות ומשפר את הנראות בגוגל.</span>
                                </div>
                                <button
                                    type="button"
                                    className="faq-add-item-btn"
                                    onClick={handleAddFaq}
                                    disabled={isSaving}
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="12" y1="5" x2="12" y2="19" />
                                        <line x1="5" y1="12" x2="19" y2="12" />
                                    </svg>
                                    <span>הוסף שאלה</span>
                                </button>
                            </div>

                            {faqs.length > 0 && (
                                <div className="faq-inputs-list">
                                    {faqs.map((faq, index) => (
                                        <div key={index} className="faq-input-row">
                                            <div className="faq-input-fields">
                                                <input
                                                    type="text"
                                                    className="form-input"
                                                    placeholder="שאלה (לדוגמה: מתי יש לפנות לטיפול?)"
                                                    value={faq.question}
                                                    onChange={(e) => handleFaqChange(index, "question", e.target.value)}
                                                    disabled={isSaving}
                                                />
                                                <textarea
                                                    className="form-textarea form-textarea-sm"
                                                    placeholder="תשובה מפורטת לשאלה..."
                                                    rows={2}
                                                    value={faq.answer}
                                                    onChange={(e) => handleFaqChange(index, "answer", e.target.value)}
                                                    disabled={isSaving}
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                className="faq-remove-btn"
                                                onClick={() => handleRemoveFaq(index)}
                                                disabled={isSaving}
                                                aria-label="הסר שאלה"
                                            >
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="3 6 5 6 21 6" />
                                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                                </svg>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn-secondary"
                            onClick={onClose}
                            disabled={isSaving}
                        >
                            ביטול
                        </button>

                        <button
                            type="submit"
                            className="btn-primary"
                            disabled={isSaving}
                        >
                            {isSaving ? (
                                <>
                                    <span className="btn-spinner" aria-hidden="true" />
                                    <span>שומר נתונים...</span>
                                </>
                            ) : (
                                <>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                                        <polyline points="17 21 17 13 7 13 7 21" />
                                        <polyline points="7 3 7 8 15 8" />
                                    </svg>
                                    <span>{mode === "add" ? "שמור ופרסם מאמר" : "שמור שינויים"}</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
