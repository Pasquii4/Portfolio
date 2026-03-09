"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "es" | "en";

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

import { translations } from "@/data/translations";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>("es");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const savedLang = localStorage.getItem("app-lang") as Language;
        if (savedLang && (savedLang === "es" || savedLang === "en")) {
            setLanguage(savedLang);
        } else {
            const browserLang = navigator.language.split("-")[0];
            if (browserLang === "en") setLanguage("en");
        }
        setMounted(true);
    }, []);

    const handleSetLanguage = (lang: Language) => {
        setLanguage(lang);
        localStorage.setItem("app-lang", lang);
    };

    const t = (key: string): string => {
        const keys = key.split(".");
        let obj: any = translations[language];
        for (const k of keys) {
            if (obj && obj[k]) {
                obj = obj[k];
            } else {
                return key; // fallback to key itself if not found
            }
        }
        return obj as string;
    };

    // Always return the Provider so SSR/Prerendering doesn't fail context hooks
    return (
        <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
};
