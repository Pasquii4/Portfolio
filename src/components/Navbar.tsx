"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

const navItems = [
    { href: '#dashboard', label: '~/dashboard' },
    { href: '#stack', label: '~/tech-stack' },
    { href: '#projects', label: '~/proyectos' },
    { href: '#about', label: '~/sobre-mi' },
    { href: '#contact', label: '~/contacto' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('#dashboard');
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll('section[id]');
            let current = '';

            sections.forEach((section) => {
                const sectionTop = section.getBoundingClientRect().top;
                if (sectionTop <= window.innerHeight * 0.45) {
                    current = `#${section.id}`;
                }
            });

            if (current) {
                setActiveSection(current);
            }

            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
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
                    <ThemeToggle />
                    <button
                        className="md:hidden flex flex-col gap-[5px] p-2 bg-transparent border-none cursor-pointer"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Abrir menú"
                        aria-expanded={isOpen}
                    >
                        <span className={`w-[25px] h-[2px] bg-[var(--color-accent)] transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
                        <span className={`w-[25px] h-[2px] bg-[var(--color-accent)] transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
                        <span className={`w-[25px] h-[2px] bg-[var(--color-accent)] transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
                    </button>
                </div>

                <nav className={`md:flex gap-8 items-center ${isOpen ? 'flex flex-col absolute top-[70px] left-0 w-full bg-[var(--bg-primary)] p-4 border-b border-[rgba(var(--color-accent-rgb),0.1)]' : 'hidden'}`}>
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className={`font-mono text-[0.9rem] no-underline transition-colors duration-300 ${activeSection === item.href
                                ? 'text-[var(--color-accent)] border-b border-[var(--color-accent)] pb-[2px]'
                                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-accent)]'
                                }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Scroll Progress Bar at the bottom of the header */}
            <div
                className="absolute bottom-0 left-0 h-[2px] bg-[#00ff88] transition-all duration-100"
                style={{ width: `${scrollProgress}%` }}
            />
        </header>
    );
}
