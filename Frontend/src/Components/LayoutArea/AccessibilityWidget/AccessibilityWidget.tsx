// @ts-nocheck
import { useEffect, useRef } from 'react';
import './AccessibilityWidget.css';
// @ts-ignore
import { Accessibility } from 'accessibility';

export function AccessibilityWidget() {
    const initialized = useRef(false);

    useEffect(() => {
        const initAccessibility = () => {
            if (initialized.current) return;

            new Accessibility({
                icon: {
                    position: {
                        bottom: { size: 24, units: 'px' },
                        right: { size: 24, units: 'px' },
                        type: 'fixed'
                    }
                },
                labels: {
                    menuTitle: 'תפריט נגישות',
                    closeTitle: 'סגור',
                    resetTitle: 'איפוס הגדרות',
                    increaseText: 'הגדל טקסט',
                    decreaseText: 'הקטן טקסט',
                    increaseTextSpacing: 'הגדל מרווח טקסט',
                    decreaseTextSpacing: 'הקטן מרווח טקסט',
                    invertColors: 'הפוך צבעים',
                    grayHues: 'גווני אפור',
                    underlineLinks: 'קו תחתון לקישורים',
                    bigCursor: 'סמן גדול',
                    readingGuide: 'מדריך קריאה',
                    textToSpeech: 'הקראת טקסט',
                    speechToText: 'הכתבה לטקסט'
                }
            });

            initialized.current = true;
        };

        if (document.readyState === 'complete') {
            initAccessibility();
        } else {
            window.addEventListener('load', initAccessibility);
            return () => window.removeEventListener('load', initAccessibility);
        }
    }, []);

    return null;
}
