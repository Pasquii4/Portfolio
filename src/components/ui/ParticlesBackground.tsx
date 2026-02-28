"use client";

import { useEffect, useState, useMemo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { type Container, type ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { useScroll, useTransform, motion } from "framer-motion";

export default function ParticlesBackground() {
    const [init, setInit] = useState(false);
    const { scrollY } = useScroll();
    const yParallax = useTransform(scrollY, [0, 2000], [0, 600]); // translateY(scrollY * 0.3)

    // Initialization
    useEffect(() => {
        initParticlesEngine(async (engine) => {
            // slim version includes the features we need
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const particlesLoaded = async (container?: Container): Promise<void> => {
        // optional callback for after load
    };

    const options: ISourceOptions = useMemo(
        () => ({
            fullScreen: {
                enable: false, // We control sizing via wrapper manually for the parallax effect
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
        <motion.div
            className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
            style={{ y: yParallax }}
        >
            <div className="absolute inset-0 w-full h-full pointer-events-auto">
                <Particles
                    id="tsparticles"
                    particlesLoaded={particlesLoaded}
                    options={options}
                    className="w-full h-full"
                />
            </div>
        </motion.div>
    );
}
