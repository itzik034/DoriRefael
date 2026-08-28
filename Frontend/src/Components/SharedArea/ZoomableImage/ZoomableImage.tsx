import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import './ZoomableImage.css';

interface ZoomableImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    alt: string;
}

export function ZoomableImage({ src, alt, className, style, ...props }: ZoomableImageProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [zoomLevel, setZoomLevel] = useState(1);

    const openImage = () => {
        setIsOpen(true);
        setZoomLevel(1);
    };

    const closeImage = () => {
        setIsOpen(false);
    };

    const handleZoomIn = (e: React.MouseEvent) => {
        e.stopPropagation();
        setZoomLevel(prev => Math.min(prev + 0.25, 3));
    };

    const handleZoomOut = (e: React.MouseEvent) => {
        e.stopPropagation();
        setZoomLevel(prev => Math.max(prev - 0.25, 0.5));
    };

    return (
        <>
            <img 
                src={src} 
                alt={alt} 
                className={`zoomable-image__trigger ${className || ''}`} 
                style={style}
                onClick={openImage} 
                {...props} 
            />
            {isOpen && createPortal(
                <div className="zoomable-image__modal-overlay" onClick={closeImage}>
                    <div className="zoomable-image__modal-content">
                        <button className="zoomable-image__modal-close" onClick={closeImage} title="סגור">×</button>
                        <div className="zoomable-image__modal-controls" onClick={e => e.stopPropagation()}>
                            <button onClick={handleZoomIn} title="הגדל">+</button>
                            <button onClick={handleZoomOut} title="הקטן">-</button>
                        </div>
                        <div className="zoomable-image__modal-img-container">
                            <img 
                                src={src} 
                                alt={alt ? `תקריב של ${alt}` : "תקריב"} 
                                style={{ transform: `scale(${zoomLevel})` }} 
                                className="zoomable-image__modal-img" 
                                onClick={e => e.stopPropagation()}
                            />
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
}
