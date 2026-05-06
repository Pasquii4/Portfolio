"use client";

import { useEffect, useState, useMemo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { type Container, type ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

export default function ParticlesBackground() {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const particlesLoaded = async (container?: Container): Promise<void> => {};

    const options: ISourceOptions = useMemo(
        () => ({
            fullScreen: {
                enable: false,
                zIndex: 1
            },
            particles: {
                number: {
                    value: 60,
                    density: {
                        enable: true,
                    },
                },
                color: {
                    value: "var(--color-accent)",
                },
                shape: {
                    type: "circle",
                },
                opacity: {
                    value: 0.15,
                },
                size: {
                    value: { min: 1, max: 2 },
                },
                links: {
                    enable: true,
                    distance: 120,
                    color: "var(--color-accent)",
                    opacity: 0.05,
                    width: 1,
                },
                move: {
                    enable: true,
                    speed: 0.4,
                    direction: "none",
                    random: true,
                    straight: false,
                    outModes: {
                        default: "out",
                    },
                    bounce: false,
                },
            },
            interactivity: {
                events: {
                    onHover: {
                        enable: true,
                        mode: "repulse",
                    },
                },
                modes: {
                    repulse: {
                        distance: 80,
                        duration: 0.4,
                    },
                },
            },
            detectRetina: true,
        }),
        [],
    );

    if (!init) return null;

    return (
        /* Cubre todo el hero (padre con position:relative + overflow:hidden lo recorta) */
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0" aria-hidden="true">
            <div className="absolute inset-0 w-full h-full pointer-events-auto">
                <Particles
                    id="tsparticles"
                    particlesLoaded={particlesLoaded}
                    options={options}
                    className="w-full h-full"
                />
            </div>
            {/* Fade-out en el 25% inferior para transición suave hacia el negro */}
            <div
                className="absolute bottom-0 left-0 w-full pointer-events-none z-10"
                style={{ height: "25%", background: "linear-gradient(to bottom, transparent, var(--bg-primary))" }}
            />
        </div>
    );
}
