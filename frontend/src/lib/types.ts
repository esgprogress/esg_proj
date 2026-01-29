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

export interface EnvironmentalSeriesV2 {
    name: string
    unit: string
    data: {
        year: number,
        current: number
        future: FuturePoint[],
        claimed: ClaimedPoint[]
    }[]
}

export type EnvironmentQualitativeData = {
    criterion: string
    year: number
    comment: string
}


export type FuturePoint = {
    claimed_year: number
    value: number
}

export type ClaimedPoint = {
    reported_year: number
    value: number
}


export type RawPoint = {
    year: number
    value: number
}

export type Company = {
    name: string;
    slug: string;
    country: string;
    industry: string;
}