"use client"

import TopBar from "@/components/TopBar";
import BottomBar from "@/components/BottomBar";
import { motion } from "framer-motion";
import {heroFadeUp} from "@/lib/utils";

export default function DisclaimerPage() {
    return (
        <div className="min-h-screen bg-[#f3f6ef] text-black">
            <TopBar />

            <main className="mx-auto max-w-4xl px-4 py-20">
                {/* Page header */}
                <header className="mb-14 space-y-4">
                    <motion.h1
                        {...heroFadeUp(0)}
                        className="text-4xl font-semibold tracking-tight"
                    >
                        Disclaimer
                    </motion.h1>

                    <motion.p
                        {...heroFadeUp(0.06)}
                        className="text-base text-slate-500"
                    >
                        Last updated: 1 January 2026
                    </motion.p>
                </header>

                {/* Content */}
                <section className="space-y-14 text-base leading-relaxed text-slate-600">
                    {[
                        {
                            title: "1. “As-Is” & Informational-Only Disclaimer",
                            body: [
                                `All content, data, visualizations, summaries, and outputs made
                                available on this platform are provided “as is” and “as available”,
                                strictly for general informational and educational purposes.`,
                                `Users acknowledge that the platform is not a substitute for
                                professional, legal, financial, regulatory, medical, or technical
                                advice, and that any reliance on the information provided is
                                entirely at their own risk.`,
                            ],
                        },
                        {
                            title: "2. No Warranties Disclaimer",
                            body: [
                                `To the maximum extent permitted by applicable law, the platform
                                expressly disclaims all warranties, whether express, implied,
                                statutory, or otherwise.`,
                                `The platform does not warrant that the content will be error-free,
                                uninterrupted, secure, or free from omissions or inaccuracies.`,
                            ],
                        },
                        {
                            title: "3. Third-Party, Open-Source & Public-Domain Data Disclaimer",
                            body: [
                                `The platform aggregates and summarizes information sourced from
                                public domain repositories, open data sources, third-party
                                publishers, APIs, filings, and user-contributed datasets.`,
                                `The platform disclaims responsibility for errors, omissions,
                                outdated information, or misinterpretation originating from such
                                sources.`,
                            ],
                        },
                        {
                            title: "4. AI / LLM-Generated Content & Hallucination Disclaimer",
                            body: [
                                `Certain content may be generated or assisted by artificial
                                intelligence and large language models (LLMs).`,
                                `AI-generated outputs may contain inaccuracies, omissions, or
                                hallucinated information. Users must independently verify critical
                                information.`,
                            ],
                        },
                        {
                            title: "5. No Endorsement or Representation Disclaimer",
                            body: [
                                `References to organizations, companies, brands, or datasets do not
                                constitute endorsement, affiliation, or approval unless explicitly
                                stated.`,
                                `Inclusion or omission should not be interpreted as a judgment of
                                credibility or performance.`,
                            ],
                        },
                        {
                            title: "6. Limitation of Liability",
                            body: [
                                `To the fullest extent permitted by law, the platform shall not be
                                liable for any direct, indirect, incidental, or consequential
                                damages.`,
                                `This includes damages resulting from data inaccuracies, AI
                                hallucinations, or reliance on platform outputs.`,
                            ],
                        },
                        {
                            title: "7. User Responsibility & Risk Acknowledgement",
                            body: [
                                `Users assume full responsibility for verifying information and
                                complying with applicable laws and regulations.`,
                                `Use of the platform constitutes acceptance that information risk
                                remains with the user.`,
                            ],
                        },
                    ].map((section, i) => (
                        <motion.div
                            key={section.title}
                            {...heroFadeUp(0.12 + i * 0.06)}
                            className="space-y-4"
                        >
                            <h2 className="text-lg font-medium tracking-tight text-black">
                                {section.title}
                            </h2>

                            <div className="space-y-3">
                                {section.body.map((p, idx) => (
                                    <p key={idx}>{p}</p>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </section>
            </main>

            <BottomBar />
        </div>
    );
}
