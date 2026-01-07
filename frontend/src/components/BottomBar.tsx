import React from "react"
import {Button} from "@/components/ui/button";
import Link from "next/link";

export default function BottomBar() {
    return (
        <footer className="mt-16 border-t border-muted/40 pt-6">
            <div className="mx-auto max-w-5xl px-4 text-sm text-muted-foreground space-y-3">

                <p className="font-medium text-foreground">
                    Disclaimer
                </p>

                <p className="leading-relaxed">
                    The information presented on this platform is compiled from publicly available sources, including
                    corporate disclosures, sustainability reports, press releases, and third-party data providers. We do
                    not own, create, or independently verify the underlying data, nor do we claim any proprietary rights
                    over such information.
                </p>

                <p className="leading-relaxed">
                    This platform is intended solely for informational and educational purposes. It is designed to
                    support knowledge sharing and research and should not be construed as a statement of fact, judgment,
                    endorsement, or assessment of any company’s legal, financial, or ethical standing. No content on
                    this website is intended to defame, disparage, or harm the reputation of any individual, company, or
                    organization.
                </p>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-xs text-muted-foreground">
        <span>
            While we strive for accuracy and transparency, the data displayed is generated and structured using an evolving analytical model that is currently under development. As such, the information may be incomplete, subject to change, or not fully accurate, and should not be relied upon as definitive or authoritative.
    </span>

                    <span>

                    </span>
                    Users are encouraged to independently verify information directly with original sources. We welcome feedback, corrections, and suggestions, and invite stakeholders to contact us with comments or inputs to help improve the quality and reliability of the platform.
                    <span>
    Last updated: 7 January 2026
    </span>
                </div>
                <Link href='/disclaimer/legal' className="mt-3 flex">
                    <Button className="rounded-xl">
                        Full Disclaimer
                    </Button>
                </Link>
            </div>
        </footer>
    )
}
