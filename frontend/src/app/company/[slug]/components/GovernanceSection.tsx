"use client"

import { SGScoreTable } from "./SGScoreTable"
import { normalizeSGScores } from "@/lib/esg/normalizeSocialGovernance"
import {useMemo, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";

export function GovernanceSection({ governance }: { governance: any[] }) {
    const rows = normalizeSGScores(governance)

    if (!rows.length) return null

    // Unique years (sorted newest → oldest)
    const years = useMemo(
        () =>
            Array.from(new Set(rows.map((r) => r.year))).sort((a, b) => b - a),
        [rows]
    )

    const [selectedYear, setSelectedYear] = useState(years[0])

    const rowsForYear = useMemo(
        () => rows.filter((r) => r.year === selectedYear),
        [rows, selectedYear]
    )

    return (
        <section className="space-y-6">
            <h2 className="text-xl font-semibold">Governance</h2>

            {/* Year selector */}
            <div className="flex flex-wrap gap-2">
                {years.map((year) => (
                    <button
                        key={year}
                        onClick={() => setSelectedYear(year)}
                        className={`rounded-lg px-4 py-1.5 text-sm transition
              ${
                            selectedYear === year
                                ? "bg-foreground text-background"
                                : "bg-muted text-muted-foreground hover:bg-muted/70"
                        }`}
                    >
                        {year}
                    </button>
                ))}
            </div>

            {/* Animated table */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={selectedYear}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                >
                    <SGScoreTable rows={rowsForYear} tooltip_side={"right"}/>
                </motion.div>
            </AnimatePresence>
        </section>
    )
}
