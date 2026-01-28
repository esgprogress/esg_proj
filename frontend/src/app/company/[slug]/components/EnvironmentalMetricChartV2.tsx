"use client"

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts"
import {Card, CardContent, CardHeader} from "@/components/ui/card"
import {AnimatePresence, motion} from "framer-motion"
import {ClaimedPoint, FuturePoint, Point} from "@/lib/types";
import {useMemo, useState} from "react";
import {Table, TableBody, TableCell, TableRow} from "@/components/ui/table";

export function EnvironmentalMetricChartV2({
                                               title,
                                               unit,
                                               data,
                                           }: {
    title: string
    unit: string
    data: {
        year: number,
        current: number
        future: FuturePoint[],
        claimed: ClaimedPoint[]
    }[]
}) {

    const years = useMemo(
        () =>
            Array.from(new Set(data.map(r => r.year))).sort((a, b) => b - a),
        [data]
    )

    const [selectedYear, setSelectedYear] = useState(years[0])

    const filteredRows = data.filter(r => r.year === selectedYear)[0]

    return (
        <motion.div
            initial={{opacity: 0, y: 16}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            transition={{duration: 0.35, ease: "easeOut"}}
        >
            <Card className="rounded-2xl">
                <CardHeader className="pb-2 space-y-1">
                    <h3 className="text-sm font-medium leading-tight">
                        {title}
                    </h3>
                    <p className="text-xs text-muted-foreground">{unit}</p>
                </CardHeader>

                <CardContent className="h-[220px]">
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

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedYear}
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                            transition={{duration: 0.2}}
                        >
                            <Table>
                                <TableBody>
                                    {filteredRows.claimed.map((claim) => (
                                        <TableRow key={`claim-${claim.reported_year}`}>
                                            <TableCell>
                                                <p className="text-sm">Claimed in {claim.reported_year}</p>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                {claim.value} {unit}
                                            </TableCell>
                                        </TableRow>
                                    ))}

                                    <TableRow key={`current-${filteredRows.year}`}>
                                        <TableCell>
                                            <p className="text-sm">Current value</p>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {filteredRows.current} {unit}
                                        </TableCell>
                                    </TableRow>

                                    {filteredRows.future.map((future) => (
                                        <TableRow key={`claim-${future.claimed_year}`}>
                                            <TableCell>
                                                <p className="text-sm">Goal for {future.claimed_year}</p>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                {future.value} {unit}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </motion.div>
                    </AnimatePresence>
                </CardContent>
            </Card>
        </motion.div>
    )
}
