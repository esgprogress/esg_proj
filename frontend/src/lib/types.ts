export interface Point {
    year: number
    current: number | null
    future: number | null
}

export interface EnvironmentalSeries {
    name: string
    unit: string
    data: Point[]
}

export type EnvironmentQualitativeData = {
    criterion: string
    year: number
    comment: string
}

