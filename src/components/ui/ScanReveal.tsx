"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ScanRevealProps {
    children: ReactNode;
    className?: string;
}

export default function ScanReveal({ children, className = "" }: ScanRevealProps) {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className={`relative ${className}`}
        >
            <motion.div
                variants={{
                    hidden: { x: "-100%", opacity: 1 },
                    visible: { x: "100%", opacity: 0 },
                }}
                transition={{ duration: 0.4, ease: "linear" }}
                className="absolute top-0 left-0 w-full h-[2px] bg-[var(--color-accent)] z-50 pointer-events-none"
                style={{ boxShadow: "0 0 10px var(--color-accent)" }}
            />
            <motion.div
                variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
                {children}
            </motion.div>
        </motion.div>
    );
}
