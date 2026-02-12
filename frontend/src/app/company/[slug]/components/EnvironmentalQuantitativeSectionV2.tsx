"use client"

import {useMemo, useState} from "react"
import {motion, AnimatePresence} from "framer-motion"
import {
    normalizeEnvironmentalQuantitativeMetricV2
} from "@/lib/esg/normalizeEnvironmental"
import AnimatedSingleSelectDropdown from "@/components/AnimatedSingleSelectDropdown"
import {EnvironmentalMetricChartV2} from "@/app/company/[slug]/components/EnvironmentalMetricChartV2";

export function EnvironmentalQuantitativeSectionV2({
                                                     environmental,
                                                 }: {
    environmental: {
        quantitative: any[]
        qualitative: any[]
    }
}) {
    if (!Array.isArray(environmental?.quantitative)) return null

    const normalized = useMemo(() => {
        return environmental.quantitative
            .map((metric) => {
                const series = normalizeEnvironmentalQuantitativeMetricV2(
                    metric.criterion,
                    metric
                )
                return series.data.length > 0 ? series : null
            })
            .filter(Boolean)
    }, [environmental.quantitative])

    if (normalized.length === 0) return null

    const [selected, setSelected] = useState(normalized[0].name)
    const current = normalized.find((x) => x.name === selected)!

    return (
        <section className="space-y-6">
            <header className="space-y-1">
                <h2 className="text-xl font-semibold">Environmental</h2>
                <p className="text-sm text-muted-foreground">
                    Quantitative performance, targets, and historical commitments
                </p>
            </header>

            <AnimatePresence mode="wait">
                <motion.div
                    key={current.name}
                    initial={{opacity: 0, y: 12}}
                    animate={{opacity: 1, y: 0}}
                    exit={{opacity: 0, y: -12}}
                    transition={{duration: 0.25}}
                >
                    <EnvironmentalMetricChartV2
                        title={current.name}
                        unit={current.unit}
                        data={current.data}
                    >
                    </EnvironmentalMetricChartV2>

                </motion.div>
            </AnimatePresence>

            {/* Selector*/}
            <div className="mt-6 flex justify-center">
                <div className="w-full max-w-xl flex justify-center">
                    <AnimatedSingleSelectDropdown
                        listOfValues={normalized.map((x) => x.name)}
                        value={selected}
                        onChange={setSelected}
                    />
                </div>
            </div>
        </section>
    )
}
