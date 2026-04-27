"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import { useTranslation } from '@/hooks/useTranslation';

const navItems = [
    { href: '#dashboard', labelKey: 'nav.dashboard' },
    { href: '#stack', labelKey: 'nav.stack' },
    { href: '#projects', labelKey: 'nav.projects' },
    { href: '#about', labelKey: 'nav.about' },
    { href: '#contact', labelKey: 'nav.contact' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('#dashboard');
    const [scrollProgress, setScrollProgress] = useState(0);
    const { locale, setLocale, t } = useTranslation();

    useEffect(() => {
        // Scroll Progress
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        
        // Active Section Tracking via Intersection Observer
        const observerOptions = {
            root: null,
            rootMargin: '-40% 0px -60% 0px', // Triggers when section is roughly in the middle of viewport
            threshold: 0
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(`#${entry.target.id}`);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        const sections = document.querySelectorAll('section[id]');
        sections.forEach(section => observer.observe(section));

        return () => {
            window.removeEventListener('scroll', handleScroll);
            sections.forEach(section => observer.unobserve(section));
            observer.disconnect();
        };
    }, []);

    return (
        <header className="fixed top-0 w-full bg-[var(--bg-primary)]/85 backdrop-blur-[10px] z-[1000] border-b border-[rgba(var(--color-accent-rgb),0.1)] transition-colors duration-500 relative">
            <div className="w-[90%] max-w-[1200px] mx-auto flex justify-between items-center h-[70px]">
                <div className="flex items-center gap-4">
                    <Link href="#dashboard" className="font-mono text-xl font-bold text-[var(--color-text)] flex items-center gap-2 no-underline">
                        Pau<span className="text-[var(--color-accent)]">_Pascual</span>
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setLocale(locale === 'es' ? 'en' : 'es')}
                        className="h-10 px-4 flex items-center justify-center font-mono text-sm font-bold"
                        style={{
                            color: 'var(--color-text-muted)',
                            background: 'transparent',
                            border: 'none',
                            transition: 'color 180ms cubic-bezier(0.16, 1, 0.3, 1)',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text)')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-muted)')}
                        aria-label={locale === 'es' ? 'Switch to English' : 'Cambiar a Español'}
                        title={locale === 'es' ? 'Switch to English' : 'Cambiar a Español'}
                    >
                        {locale === 'es' ? 'EN' : 'ES'}
                    </button>
                    <ThemeToggle />
                    <button
                        className="md:hidden flex flex-col gap-[5px] p-2 bg-transparent border-none cursor-pointer"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
                        title={isOpen ? "Cerrar menú" : "Abrir menú"}
                        aria-expanded={isOpen}
                    >
                        <span className={`w-[25px] h-[2px] bg-[var(--color-accent)] transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
                        <span className={`w-[25px] h-[2px] bg-[var(--color-accent)] transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
                        <span className={`w-[25px] h-[2px] bg-[var(--color-accent)] transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
                    </button>
                </div>

                <nav className={`md:flex gap-8 items-center ${isOpen ? 'flex flex-col absolute top-[70px] left-0 w-full h-[calc(100vh-70px)] bg-[var(--bg-primary)]/95 backdrop-blur-xl p-8 border-t border-[rgba(var(--color-accent-rgb),0.1)] gap-8 justify-start pt-12' : 'hidden'}`}>
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className={`font-mono transition-all duration-300 no-underline text-lg md:text-[0.9rem] w-full md:w-auto text-center md:text-left py-2 md:py-0 ${activeSection === item.href
                                ? 'text-[var(--color-accent)] border-b-2 md:border-b border-[var(--color-accent)] pb-[2px]'
                                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] hover:translate-x-2 md:hover:translate-x-0'
                                }`}
                        >
                            {t(item.labelKey)}
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Scroll Progress Bar at the bottom of the header */}
            <div
                className="absolute bottom-0 left-0 h-[2px] bg-[var(--color-accent)] transition-all duration-100"
                style={{ width: `${scrollProgress}%` }}
            />
        </header>
    );
}
