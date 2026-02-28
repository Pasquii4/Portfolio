"use client";

import ParticlesBackground from "./ui/ParticlesBackground";

export default function BackgroundVideo() {
    return (
        <div className="fixed top-0 left-0 w-[100vw] h-[100vh] -z-[2] overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] to-transparent z-[1]"></div>
            <ParticlesBackground />
            <video
                autoPlay
                loop
                muted
                playsInline
                className="object-cover w-full h-full opacity-30 grayscale-[50%]"
            >
                <source src="/ambient_chart.mp4" type="video/mp4" />
            </video>
        </div>
    );
}
