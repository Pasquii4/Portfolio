"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
    const rad = angleDeg * (Math.PI / 180);
    return {
        x: cx + r * Math.cos(rad),
        y: cy + r * Math.sin(rad),
    };
}

function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number): string {
    const start = polarToCartesian(cx, cy, r, startAngle);
    const end = polarToCartesian(cx, cy, r, endAngle);
    const largeArc = endAngle - startAngle <= 180 ? "0" : "1";
    return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`;
}

const skills = [
    { name: "PYTHON", pct: 85, startAngle: -90, level: "Senior", since: 2021, projects: 4 },
    { name: "FASTAPI", pct: 72, startAngle: -30, level: "Advanced", since: 2022, projects: 3 },
    { name: "SQL/DB", pct: 80, startAngle: 30, level: "Advanced", since: 2022, projects: 4 },
    { name: "DOCKER", pct: 75, startAngle: 90, level: "Mid", since: 2023, projects: 3 },
    { name: "JS / TS", pct: 70, startAngle: 150, level: "Mid", since: 2022, projects: 2 },
    { name: "HTML/CSS", pct: 90, startAngle: 210, level: "Senior", since: 2020, projects: 5 },
];

export default function HolographicHUD() {
    const [time, setTime] = useState("");
    const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString("en-US", { hour12: false }));
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    const cx = 250;
    const cy = 250;

    return (
        <div className="relative w-full max-w-[520px] aspect-square mx-auto">
            <svg viewBox="0 0 500 500" className="w-full h-full text-xs">
                <defs>
                    <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                        <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(var(--color-accent-rgb), 0.06)" strokeWidth="1" />
                    </pattern>
                    <linearGradient id="scanGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="rgba(var(--color-accent-rgb), 0)" />
                        <stop offset="50%" stopColor="rgba(var(--color-accent-rgb), 0.3)" />
                        <stop offset="100%" stopColor="rgba(var(--color-accent-rgb), 0)" />
                    </linearGradient>
                    <linearGradient id="fillGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="rgba(var(--color-accent-rgb), 0.08)" />
                        <stop offset="100%" stopColor="rgba(var(--color-accent-rgb), 0)" />
                    </linearGradient>
                    <linearGradient id="arcGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="var(--color-accent)" />
                        <stop offset="100%" stopColor="rgba(var(--color-accent-rgb), 0.4)" />
                    </linearGradient>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>

                {/* LAYER 1: Background Grid */}
                <rect width="500" height="500" fill="url(#grid)" />

                {/* LAYER 2: Outer Rings */}
                <g stroke="var(--color-accent)" fill="none">
                    <motion.g
                        animate={{ rotate: 360 }}
                        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                        style={{ originX: "250px", originY: "250px" }}
                    >
                        <circle cx={cx} cy={cy} r="230" strokeWidth="0.5" strokeOpacity="0.15" />
                        {Array.from({ length: 8 }).map((_, i) => (
                            <line key={i} x1={cx} y1={20} x2={cx} y2={26} transform={`rotate(${i * 45} ${cx} ${cy})`} strokeWidth="1" strokeOpacity="0.3" />
                        ))}
                        <text x="250" y="27" fill="var(--color-accent)" fillOpacity="0.4" fontSize="8" fontFamily="monospace" textAnchor="middle" stroke="none">SYS</text>
                        <text x="473" y="253" fill="var(--color-accent)" fillOpacity="0.4" fontSize="8" fontFamily="monospace" textAnchor="middle" transform="rotate(90 473 253)" stroke="none">NET</text>
                        <text x="250" y="478" fill="var(--color-accent)" fillOpacity="0.4" fontSize="8" fontFamily="monospace" textAnchor="middle" transform="rotate(180 250 478)" stroke="none">MEM</text>
                        <text x="27" y="253" fill="var(--color-accent)" fillOpacity="0.4" fontSize="8" fontFamily="monospace" textAnchor="middle" transform="rotate(270 27 253)" stroke="none">CPU</text>
                    </motion.g>

                    <motion.g
                        animate={{ rotate: -360 }}
                        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                        style={{ originX: "250px", originY: "250px" }}
                    >
                        <circle cx={cx} cy={cy} r="215" strokeWidth="0.5" strokeOpacity="0.1" />
                        {Array.from({ length: 24 }).map((_, i) => (
                            <line key={i} x1={cx} y1={35} x2={cx} y2={39} transform={`rotate(${i * 15} ${cx} ${cy})`} strokeWidth="1" strokeOpacity="0.2" />
                        ))}
                    </motion.g>

                    <circle cx={cx} cy={cy} r="200" strokeWidth="1" strokeOpacity="0.2" />
                </g>

                {/* LAYER 3: Skill Arcs */}
                {skills.map((skill, i) => {
                    const trackArc = describeArc(cx, cy, 180, skill.startAngle, skill.startAngle + 50);
                    const arcLength = 2 * Math.PI * 180 * (50 / 360);
                    const drawLength = arcLength * (skill.pct / 100);
                    const midAngle = skill.startAngle + 25;
                    const labelPos = polarToCartesian(cx, cy, 155, midAngle);

                    return (
                        <g
                            key={skill.name}
                            onMouseEnter={() => setHoveredSkill(skill.name)}
                            onMouseLeave={() => setHoveredSkill(null)}
                            className="cursor-pointer"
                        >
                            <path
                                d={trackArc}
                                fill="none"
                                stroke="rgba(var(--color-accent-rgb), 0.1)"
                                strokeWidth={hoveredSkill === skill.name ? "16" : "12"}
                                strokeLinecap="round"
                                style={{ transition: "stroke-width 0.2s" }}
                            />
                            <motion.path
                                d={trackArc}
                                fill="none"
                                stroke="url(#arcGradient)"
                                strokeWidth={hoveredSkill === skill.name ? "16" : "12"}
                                strokeLinecap="round"
                                strokeDasharray={arcLength}
                                initial={{ strokeDashoffset: arcLength }}
                                whileInView={{ strokeDashoffset: arcLength - drawLength }}
                                transition={{ duration: 1.8, delay: i * 0.15, ease: "easeOut" }}
                                viewport={{ once: true }}
                                filter={hoveredSkill === skill.name ? "url(#glow)" : ""}
                                style={{ transition: "stroke-width 0.2s" }}
                            />
                            <text
                                x={labelPos.x}
                                y={labelPos.y - 2}
                                fill="var(--color-accent)"
                                fontSize="7"
                                fontFamily="monospace"
                                fontWeight="bold"
                                textAnchor="middle"
                                transform={`rotate(${midAngle > 90 && midAngle < 270 ? midAngle + 180 : midAngle} ${labelPos.x} ${labelPos.y})`}
                                pointerEvents="none"
                            >
                                {skill.name}
                            </text>
                            <text
                                x={labelPos.x}
                                y={labelPos.y + 6}
                                fill="#ffffff"
                                fillOpacity="0.8"
                                fontSize="9"
                                fontFamily="monospace"
                                textAnchor="middle"
                                transform={`rotate(${midAngle > 90 && midAngle < 270 ? midAngle + 180 : midAngle} ${labelPos.x} ${labelPos.y})`}
                                pointerEvents="none"
                            >
                                {skill.pct}%
                            </text>
                        </g>
                    );
                })}

                {/* LAYER 4: Inner circle & Scanner */}
                <circle cx={cx} cy={cy} r="120" fill="rgba(var(--color-accent-rgb), 0.03)" stroke="var(--color-accent)" strokeOpacity="0.25" strokeWidth="1" />
                <text x={cx} y={cy - 20} fill="var(--color-accent)" fontSize="10" fontFamily="monospace" letterSpacing="0.2em" textAnchor="middle">{">_ SYS.SCAN"}</text>
                <text x={cx} y={cy + 5} fill="#ffffff" fontSize="18" fontWeight="bold" fontFamily="monospace" textAnchor="middle">ACTIVE</text>
                <text x={cx} y={cy + 20} fill="var(--color-accent)" fillOpacity="0.5" fontSize="8" fontFamily="monospace" textAnchor="middle">v2.0.0</text>
                <text x={cx} y={cy + 35} fill="var(--color-accent)" fillOpacity="0.7" fontSize="8" fontFamily="monospace" textAnchor="middle">{time}</text>

                <motion.path
                    d={describeArc(cx, cy, 100, 0, 60)}
                    fill="none"
                    stroke="var(--color-accent)"
                    strokeOpacity="0.6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    style={{ originX: "250px", originY: "250px" }}
                />

                {/* LAYER 5: Scan Line */}
                <motion.g
                    animate={{ y: [0, 460, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                    <line x1="20" y1="20" x2="480" y2="20" stroke="var(--color-accent)" strokeOpacity="0.3" strokeWidth="1" />
                    <rect x="20" y="20" width="460" height="40" fill="url(#fillGradient)" />
                </motion.g>

                {/* LAYER 6: Floating Data Nodes */}
                {[
                    { x: 250, y: 42, text: "BOOT: OK", delay: 0 },
                    { x: 458, y: 250, text: "LAT: 0ms", delay: 0.5 },
                    { x: 250, y: 458, text: "PKT: ∞", delay: 1 },
                    { x: 42, y: 250, text: "NET: UP", delay: 1.5 }
                ].map((node, i) => (
                    <motion.g
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 1 }}
                    >
                        <motion.g
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 2, repeat: Infinity, delay: node.delay, ease: "easeInOut" }}
                        >
                            <rect x={node.x - 20} y={node.y - 10} width="40" height="20" rx="3" fill="var(--bg-surface)" stroke="var(--color-accent)" strokeOpacity="0.3" strokeWidth="1" />
                            <text x={node.x} y={node.y + 2.5} fill="var(--color-accent)" fontSize="7" fontFamily="monospace" textAnchor="middle">{node.text}</text>
                        </motion.g>
                    </motion.g>
                ))}

                {/* LAYER 7: Corner Brackets */}
                {[
                    "M 15 35 L 15 15 L 35 15",
                    "M 465 35 L 465 15 L 445 15",
                    "M 15 465 L 15 485 L 35 485",
                    "M 465 465 L 465 485 L 445 485"
                ].map((d, i) => (
                    <motion.path
                        key={i}
                        d={d}
                        fill="none"
                        stroke="var(--color-accent)"
                        strokeOpacity="0.4"
                        strokeWidth="1.5"
                        strokeLinecap="square"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        transition={{ duration: 0.8, delay: i * 0.2 }}
                        viewport={{ once: true }}
                    />
                ))}

            </svg>

            {/* LAYER 8: Tooltips */}
            <AnimatePresence>
                {hoveredSkill && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 bg-[var(--bg-surface)] border border-[rgba(var(--color-accent-rgb),0.4)] rounded-lg p-3 font-mono text-xs shadow-[0_0_20px_rgba(var(--color-accent-rgb),0.2)] z-50 pointer-events-none"
                    >
                        {(() => {
                            const s = skills.find(sk => sk.name === hoveredSkill);
                            if (!s) return null;
                            return (
                                <div className="flex flex-col gap-1">
                                    <div className="text-[var(--color-accent)] font-bold mb-1 border-b border-[rgba(var(--color-accent-rgb),0.2)] pb-1 flex gap-2">
                                        <span>{">"}</span>
                                        <span>{s.name}</span>
                                    </div>
                                    <div className="flex justify-between text-[var(--color-text)]">
                                        <span className="opacity-70">Level:</span>
                                        <span>{s.level}</span>
                                    </div>
                                    <div className="flex justify-between text-[var(--color-text)]">
                                        <span className="opacity-70">Since:</span>
                                        <span>{s.since}</span>
                                    </div>
                                    <div className="flex justify-between text-[var(--color-text)]">
                                        <span className="opacity-70">Projects:</span>
                                        <span>{s.projects}</span>
                                    </div>
                                    <div className="flex justify-between text-[var(--color-text)] mt-1">
                                        <span className="opacity-70">Status:</span>
                                        <span className="text-[var(--color-accent)]">[ACTIVE]</span>
                                    </div>
                                </div>
                            );
                        })()}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
