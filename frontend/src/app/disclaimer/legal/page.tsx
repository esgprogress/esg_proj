import TopBar from "@/components/TopBar";

export default function DisclaimerPage() {
    return (
        <>
            <TopBar/>
        <main className="mx-auto max-w-3xl px-6 py-16">
            {/* Page title */}
            <header className="mb-12 space-y-3">
    <h1 className="text-3xl font-semibold tracking-tight">
        Disclaimer
        </h1>
        <p className="text-sm text-muted-foreground">
        Last updated: January 2026
    </p>
    </header>

    {/* Content */}
    <section className="space-y-12 text-sm leading-relaxed text-muted-foreground">

    <div className="space-y-3">
    <h2 className="text-base font-medium text-foreground">
        1. “As-Is” & Informational-Only Disclaimer
    </h2>
    <p>
    All content, data, visualizations, summaries, and outputs made
    available on this platform are provided “as is” and “as available”,
    strictly for general informational and educational purposes. The
    platform does not guarantee the accuracy, completeness, timeliness,
        reliability, or fitness of any information for any particular
    purpose.
    </p>
    <p>
    Users acknowledge that the platform is not a substitute for
        professional, legal, financial, regulatory, medical, or technical
    advice, and that any reliance on the information provided is entirely
    at their own risk.
    </p>
    </div>

    <div className="space-y-3">
    <h2 className="text-base font-medium text-foreground">
        2. No Warranties Disclaimer
    </h2>
    <p>
    To the maximum extent permitted by applicable law, the platform
    expressly disclaims all warranties, whether express, implied,
        statutory, or otherwise, including but not limited to implied
    warranties of accuracy, merchantability, fitness for a particular
    purpose, non-infringement, and availability.
    </p>
    <p>
    The platform does not warrant that the content will be error-free,
        uninterrupted, secure, or free from omissions, inaccuracies, or
    technical defects.
    </p>
    </div>

    <div className="space-y-3">
    <h2 className="text-base font-medium text-foreground">
        3. Third-Party, Open-Source & Public-Domain Data Disclaimer
    </h2>
    <p>
    The platform aggregates, indexes, processes, or summarizes
    information sourced from public domain repositories, open data
    sources, third-party publishers, APIs, filings, and user-contributed
    datasets over which the platform has no control.
    </p>
    <p>
    The platform does not independently verify, audit, or certify
    third-party or open-source data and disclaims responsibility for
        errors, omissions, outdated information, misclassification, or
    misinterpretation originating from such sources.
    </p>
    </div>

    <div className="space-y-3">
    <h2 className="text-base font-medium text-foreground">
        4. AI / LLM-Generated Content & Hallucination Disclaimer
    </h2>
    <p>
    Certain content, insights, summaries, classifications, or analyses
    on the platform may be generated or assisted by artificial
    intelligence and large language models (LLMs). AI-generated outputs
    may contain inaccuracies, omissions, biased interpretations, or
    hallucinated information that appears plausible but is factually
    incorrect.
    </p>
    <p>
    Users must independently verify critical information before making
    decisions. The platform disclaims any responsibility or liability
    arising from reliance on AI-generated or AI-assisted outputs.
    </p>
    </div>

    <div className="space-y-3">
    <h2 className="text-base font-medium text-foreground">
        5. No Endorsement or Representation Disclaimer
    </h2>
    <p>
    References to organizations, companies, brands, products,
        individuals, datasets, or regulatory filings do not constitute
    endorsement, affiliation, sponsorship, or approval unless explicitly
    stated.
    </p>
    <p>
    Inclusion or omission of any entity or dataset should not be
    interpreted as a judgment of credibility, compliance, performance,
        or intent.
    </p>
    </div>

    <div className="space-y-3">
    <h2 className="text-base font-medium text-foreground">
        6. Limitation of Liability
    </h2>
    <p>
    To the fullest extent permitted by law, the platform, its operators,
        contributors, partners, and licensors shall not be liable for any
        direct, indirect, incidental, consequential, special, punitive, or
    exemplary damages arising out of or related to the use of, or
    inability to use, the platform or its content.
    </p>
    <p>
    This includes, without limitation, damages resulting from data
    inaccuracies, AI hallucinations, reliance on summaries, loss of
    business, regulatory exposure, reputational harm, or decision-making
    based on platform outputs, even if advised of the possibility of
    such damages.
    </p>
    </div>

    <div className="space-y-3">
    <h2 className="text-base font-medium text-foreground">
        7. User Responsibility & Risk Acknowledgement
    </h2>
    <p>
    By using the platform, users acknowledge and agree that they assume
    full responsibility for verifying information, complying with
        applicable laws and regulations, and assessing suitability for
        their specific use cases.
    </p>
    <p>
    Use of the platform constitutes acceptance that information risk
    remains with the user, not the platform.
    </p>
    </div>

    </section>
    </main>
        </>
)
}
