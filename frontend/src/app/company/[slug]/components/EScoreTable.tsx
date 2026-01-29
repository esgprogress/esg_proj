"use client"

import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table"
import {EnvironmentQualitativeData} from "@/lib/types";

export function EScoreTable({rows}: { rows: EnvironmentQualitativeData[] }) {
    return (
        <Table>
            <TableBody>
                {rows.map((row) => (
                    <TableRow key={`${row.criterion}-${row.year}`}>
                        <TableCell>
                            <p className="text-sm">{row.criterion}</p>
                        </TableCell>
                        <TableCell className="text-right">
                            {row.comment}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}