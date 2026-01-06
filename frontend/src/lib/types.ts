export interface Point {
    year: number
    value: number
    type: "current" | "future"
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

