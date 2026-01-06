import {ArrowRight, GitFork, Globe2, Sparkles} from "lucide-react";
import React from "react";
import Link from "next/link";
import {Button} from "@/components/ui/button";

export default function TopBar() {
    return (
        <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
                <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-2xl border shadow-sm">
                        <Globe2 className="h-5 w-5" />
                    </div>
                    <div>
                        <div className="text-sm font-semibold leading-none">ESGProgress - An Open ESG Tracker</div>
                        <div className="text-xs text-muted-foreground">Open-source ESG intelligence from public data</div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Link href={'/dashboard'}>
                        <Button variant="ghost" className="rounded-xl"
                        >Explore dashboards</Button
                        >
                    </Link>
                    <Link href={process.env.NEXT_PUBLIC_GITHUB_REPOSITORY_URL}>
                        <Button variant="outline" className="rounded-xl"
                        >
                            <GitFork className="mr-2 h-4 w-4" /> GitHub
                        </Button>
                    </Link>
                </div>
            </div>
        </header>
    )
}