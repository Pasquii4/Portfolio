import { Terminal } from "lucide-react";

export default function Loading() {
    return (
        <div className="fixed inset-0 z-[9999] bg-[var(--bg-primary)] flex flex-col items-center justify-center font-mono text-[var(--color-accent)]">
            <div className="flex flex-col items-center gap-6 animate-pulse">
                <Terminal className="w-12 h-12" />
                <div className="text-center">
                    <h2 className="text-xl mb-2 font-bold tracking-wider">SYSTEM INITIALIZING</h2>
                    <p className="text-sm opacity-60">Establishing secure connection...</p>
                </div>
                
                <div className="w-48 h-1 bg-[var(--bg-surface)] mt-4 overflow-hidden rounded">
                    <div className="w-full h-full bg-[var(--color-accent)] origin-left animate-[scale-x_1s_ease-out_infinite]" />
                </div>
            </div>
        </div>
    );
}
