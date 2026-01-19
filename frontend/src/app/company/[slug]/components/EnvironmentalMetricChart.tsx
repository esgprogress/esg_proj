"use client"

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { motion } from "framer-motion"
import {Point} from "@/lib/types";

export function EnvironmentalMetricChart({
                                             title,
                                             unit,
                                             data,
                                         }: {
    title: string
    unit: string
    data: Point[]
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, ease: "easeOut" }}
        >
            <Card className="rounded-2xl">
                <CardHeader className="pb-2 space-y-1">
                    <h3 className="text-sm font-medium leading-tight">
                        {title}
                    </h3>
                    <p className="text-xs text-muted-foreground">{unit}</p>
                </CardHeader>

                <CardContent className="h-[220px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <XAxis
                                dataKey="year"
                                tick={{ fontSize: 12 }}
                                stroke="#bbbbbb"
                            />
                            <YAxis
                                tick={{ fontSize: 12 }}
                                stroke="#bbbbbb"
                                width={40}
                            />

                            <Tooltip
                                contentStyle={{
                                    borderRadius: 12,
                                    fontSize: 12,
                                }}
                            />

                            {/* Actuals */}
                            <Line
                                type="monotone"
                                dataKey="current"
                                stroke="#111827"
                                strokeWidth={2.5}
                                dot={{ r: 3 }}
                            />

                            {/* Current target */}
                            <Line
                                type="monotone"
                                dataKey="future"
                                stroke="#2563eb"
                                strokeWidth={2}
                                strokeDasharray="6 4"
                                dot={{ r: 4 }}
                            />

                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </motion.div>
    )
}
