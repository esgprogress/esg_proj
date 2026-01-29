"use client"

import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table"
import {ScoreBadge} from "./ScoreBadge"
import {SocialGovernanceRow} from "@/lib/esg/normalizeSocialGovernance";

export function SGScoreTable({rows, tooltip_side}: { rows: SocialGovernanceRow[], tooltip_side: "left" | "right" }) {
    return (
        <Table>
            <TableBody>
                {rows.map((row) => (
                    <TableRow key={`${row.question}-${row.year}`}>
                        <TableCell>
                            <p className="text-sm">{row.question}</p>
                        </TableCell>
                        <TableCell className="text-right">
                            <ScoreBadge score={row.rating} tooltip_side={tooltip_side}/>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

