import {EnvironmentalSeries, EnvironmentQualitativeData} from "../types"

type RawPoint = {
    year: number
    value: number
}

export function normalizeEnvironmentalQuantitativeMetric(
    name: string,
    metric: any
): EnvironmentalSeries {

    const byYear = new Map<number, { current: number | null; future: number | null }>()

    // CURRENT
    if (Array.isArray(metric.current)) {
        metric.current.forEach((d: RawPoint) => {
            if (!d?.year || d.year === 0) return

            const entry = byYear.get(d.year) ?? { current: null, future: null }
            entry.current = d.value
            byYear.set(d.year, entry)
        })
    }

    // FUTURE
    if (Array.isArray(metric.future)) {
        metric.future.forEach((d: RawPoint) => {
            if (!d?.year || d.year === 0) return

            const entry = byYear.get(d.year) ?? { current: null, future: null }
            entry.future = d.value
            byYear.set(d.year, entry)
        })
    }

    const data = Array.from(byYear.entries())
        .map(([year, values]) => ({
            year,
            current: values.current,
            future: values.future,
        }))
        .sort((a, b) => a.year - b.year)

    return {
        name,
        unit: metric.unit,
        data,
    }
}



export function normalizeEnvironmentalQualitativeMetric(
    name: string,
    metric: any
): EnvironmentQualitativeData[] {
    const data: EnvironmentQualitativeData[] = []

    if (Array.isArray(metric.history)) {
        metric.history.forEach((d: any) => {
            if (!d?.year || d.year === 0) return
            data.push({
                year: d.year,
                comment: d.comment,
                criterion: name
            })
        })
    }

    return data
}