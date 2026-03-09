export default function Footer() {
    return (
        <footer className="border-t border-[var(--color-border)] py-8 mt-16 relative z-[1]">
            <div className="w-[90%] max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center font-mono text-[0.85rem] text-[var(--color-text-secondary)] gap-4">
                <p>
                    &copy; {new Date().getFullYear()} Pau Pascual ·{" "}
                    <a href="https://github.com/Pasquii4/personal" target="_blank" rel="noopener noreferrer" className="text-inherit underline opacity-60 hover:opacity-100 hover:text-[var(--color-accent)] transition-all">
                        Código fuente
                    </a>
                </p>
                <div className="flex gap-6">
                    <a href="#dashboard" className="text-[var(--color-text-secondary)] no-underline transition-colors hover:text-[var(--color-accent)]">Volver arriba</a>
                    <a href="/CV_PauPascual_2026.pdf" download="CV_PauPascual_2026.pdf" className="text-[var(--color-text-secondary)] no-underline transition-colors hover:text-[var(--color-accent)]">CV</a>
                </div>
            </div>
        </footer>
    );
}
