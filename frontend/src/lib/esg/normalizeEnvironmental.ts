import {
    EnvironmentalSeries,
    EnvironmentQualitativeData,
    EnvironmentalSeriesV2,
    RawPoint,
    FuturePoint,
    ClaimedPoint
} from "../types"


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

export function normalizeEnvironmentalQuantitativeMetricV2(
    name: string,
    metric: any
): EnvironmentalSeriesV2 {

    const byYear = new Map<
        number,
        {
            current: number | null
            future: FuturePoint[]
            claimed: ClaimedPoint[]
        }
    >()

    const getEntry = (year: number) => {
        const entry =
            byYear.get(year) ?? {
                current: null,
                future: [],
                claimed: [],
            }
        byYear.set(year, entry)
        return entry
    }

    // CURRENT (reported year)
    if (Array.isArray(metric.current)) {
        metric.current.forEach((d: RawPoint) => {
            if (!d?.year || d.year === 0) return
            getEntry(d.year).current = d.value
        })
    }

    // FUTURE (promises made this year about later years)
    if (Array.isArray(metric.future)) {
        metric.future.forEach((d: any) => {
            if (!d?.reported_year || !d?.year) return

            // future bucket (on reported year)
            getEntry(d.reported_year).future.push({
                claimed_year: d.year,
                value: d.value,
            })

            // claimed bucket (on claimed year)
            getEntry(d.year).claimed.push({
                reported_year: d.reported_year,
                value: d.value,
            })
        })
    }

    const data = Array.from(byYear.entries())
        .map(([year, values]) => ({
            year,
            current: values.current,
            future: values.future.sort(
                (a, b) => a.claimed_year - b.claimed_year
            ),
            claimed: values.claimed.sort(
                (a, b) => a.reported_year - b.reported_year
            ),
        }))
        .sort((a, b) => a.year - b.year)

    return {
        name,
        unit: metric.unit,
        data,
    }
}
