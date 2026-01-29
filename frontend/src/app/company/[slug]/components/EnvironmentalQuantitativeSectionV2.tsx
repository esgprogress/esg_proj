"use client"

import {
    normalizeEnvironmentalQuantitativeMetricV2
} from "@/lib/esg/normalizeEnvironmental"
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

    return (
        <section className="space-y-6">
            <header className="space-y-1">
                <h2 className="text-xl font-semibold">Environmental</h2>
                <p className="text-sm text-muted-foreground">
                    Quantitative performance, targets, and historical commitments
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {environmental.quantitative.map((metric) => {
                    const series = normalizeEnvironmentalQuantitativeMetricV2(
                        metric.criterion,
                        metric
                    )

                    if (series.data.length === 0) return null

                    return (
                        <EnvironmentalMetricChartV2
                            key={metric.criterion}
                            title={series.name}
                            unit={series.unit}
                            data={series.data}
                        />
                    )
                })}
            </div>

        </section>
    )
}
