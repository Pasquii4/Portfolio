import { useState, useEffect } from 'react';

export function useTypewriter(texts: string[]) {
    const [displayedTexts, setDisplayedTexts] = useState<string[]>(texts.map(() => ""));
    const [activeIndex, setActiveIndex] = useState(0);
    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        let isCancelled = false;

        const typeNext = (index: number, charIndex: number) => {
            if (isCancelled) return;

            if (index >= texts.length) {
                setIsFinished(true);
                return;
            }

            const currentString = texts[index];
            if (charIndex < currentString.length) {
                setDisplayedTexts(prev => {
                    const next = [...prev];
                    next[index] = currentString.substring(0, charIndex + 1);
                    return next;
                });

                const speed = index === 0 ? 80 : 50;
                timer = setTimeout(() => typeNext(index, charIndex + 1), speed);
            } else {
                if (index === 0) {
                    timer = setTimeout(() => {
                        setActiveIndex(index + 1);
                        typeNext(index + 1, 0);
                    }, 400);
                } else {
                    timer = setTimeout(() => {
                        setActiveIndex(index + 1);
                        typeNext(index + 1, 0);
                    }, 50);
                }
            }
        };

        typeNext(0, 0);

        return () => {
            isCancelled = true;
            clearTimeout(timer);
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return { displayedTexts, activeIndex, isFinished };
}
