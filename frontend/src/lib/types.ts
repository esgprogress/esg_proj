export type SeriesPoint = {
    year: number;
    value: number;
};

export type EnvironmentalMetricValue = {
    current: {
        data: SeriesPoint[];
    };
    future: {
        data: SeriesPoint[][];
    };
    unit: string;
};

export type EnvironmentalMetrics = {
    [metricName: string]: EnvironmentalMetricValue;
};

export type StringSeriesPoint = {
    year: number;
    statement: string;
};

export type GovernmentSocialMetrics = {
    [criterion: string]: StringSeriesPoint[];
};

export type CompanyESG = {
    slug: string;
    name: string;
    industry: string;
    environmental: EnvironmentalMetrics;
    social: GovernmentSocialMetrics;
    governance: GovernmentSocialMetrics;
};
