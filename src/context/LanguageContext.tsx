"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type Lang = "es" | "en";

interface LanguageContextType {
    lang: Lang;
    toggleLang: () => void;
    t: (key: string) => string;
}

const translations: Record<Lang, Record<string, string>> = {
    es: {
        // Navbar
        "nav.dashboard": "~/dashboard",
        "nav.stack": "~/tech-stack",
        "nav.projects": "~/proyectos",
        "nav.about": "~/sobre-mi",
        "nav.contact": "~/contacto",
        // Hero
        "hero.command": ">whoami",
        "hero.desc": "Construyo sistemas FinTech escalables — Python, FastAPI y algoritmos de trading en tiempo real. Basado en Barcelona, disponible para prácticas o parcial remoto.",
        "hero.btn.projects": "Ver Proyectos",
        "hero.btn.cv": "Descargar CV",
        // About
        "about.title": "~/sobre-mi",
        "about.p1": "Soy un desarrollador de software enfocado en construir herramientas fiables, escalables y optimizadas. Actualmente estoy cursando el CFGS de Desarrollo de Aplicaciones Web en el Centre d'Estudis Politècnics en Barcelona.",
        "about.p2": "Mi principal área de interés y especialización es la industria FinTech y los algoritmos de trading. Empleo tecnologías modernas como Python, FastAPI y SQL para diseñar",
    },
    en: {
        // Navbar
        "nav.dashboard": "~/dashboard",
        "nav.stack": "~/tech-stack",
        "nav.projects": "~/projects",
        "nav.about": "~/about",
        "nav.contact": "~/contact",
        // Hero
        "hero.command": ">whoami",
        "hero.desc": "I build scalable FinTech systems — Python, FastAPI and real-time trading algorithms. Based in Barcelona, open to internships or part-time remote roles.",
        "hero.btn.projects": "View Projects",
        "hero.btn.cv": "Download CV",
        // About
        "about.title": "~/about",
        "about.p1": "I am a software developer focused on building reliable, scalable, and optimized tools. I am currently pursuing a Higher Degree in Web Application Development (CFGS DAW) at Centre d'Estudis Politècnics in Barcelona.",
        "about.p2": "My main area of interest and specialization is the FinTech industry and trading algorithms. I use modern technologies like Python, FastAPI, and SQL to design",
    }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [lang, setLang] = useState<Lang>("es");

    const toggleLang = () => {
        setLang((prev) => (prev === "es" ? "en" : "es"));
    };

    const t = (key: string) => {
        return translations[lang][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ lang, toggleLang, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
