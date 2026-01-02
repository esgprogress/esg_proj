import React from "react"

export default function CompanyFooter() {
    return (
        <footer className="mt-16 border-t border-muted/40 pt-6">
        <div className="mx-auto max-w-5xl px-4 text-sm text-muted-foreground space-y-3">

        <p className="font-medium text-foreground">
            Disclaimer
            </p>

            <p className="leading-relaxed">
        The ESG information presented on this page has been compiled from publicly
    available sources and third-party disclosures. While reasonable
    efforts have been made to ensure accuracy, the data should not be
    considered exhaustive or definitive and is provided for informational
        purposes only. Some summarization has been done using Generative AI, hence we advise users
        to double-check facts before taking them at face value.
    </p>

    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-xs text-muted-foreground">
        <span>
            Any information displayed on this page must not be construed as legal, financial or personal advice.
            ESGProgress.org does not take responsibility for any loss, material or otherwise, that users may incur
            from the misconstruement of data showcased on this website, as professional advice.
            ESGProgress.org advises you seek a financial or legal professional for advice.
    </span>
    <span>
    Last updated: January 2026
    </span>
    </div>

    </div>
    </footer>
)
}
