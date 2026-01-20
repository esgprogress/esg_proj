"use client"

import React from "react";
import TopBar from "@/components/TopBar";
import {Card, CardContent} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";
import BottomBar from "@/components/BottomBar";
import Image from "next/image";
import {motion} from "framer-motion";

import vaniMilindAgarwalPhoto from "../../assets/images/VaniMilindAgarwalPhoto.png";
import arjunSanghiPhoto from "../../assets/images/ArjunSanghiPhoto.jpg";
import {heroFadeUp} from "@/lib/utils";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-[#f3f6ef] text-black">
            <TopBar/>

            <section className="mx-auto max-w-6xl px-4 py-16 space-y-14">
                {/* Company Title */}
                <motion.h1 {...heroFadeUp(0)} className="text-5xl font-semibold tracking-tight">
                    About ESGProgress
                </motion.h1>

                {/* Header Line */}
                <motion.h2
                    {...heroFadeUp(0.06)}
                    className="text-2xl max-w-3xl leading-snug text-slate-600"
                >
                    An open ESG database for a more sustainable future
                </motion.h2>

                {/* Goal Paragraph */}
                <motion.p
                    {...heroFadeUp(0.12)}
                    className="max-w-3xl text-lg leading-relaxed text-slate-600"
                >
                    We believe that transparency and clarity are fundamental to advancing environmental, social, and
                    governance (ESG) understanding and accountability. We are an open-source ESG intelligence platform
                    that aggregates and normalises public data to provide verifiable, accessible insights into how major
                    global companies perform on ESG commitments and actions. We serve all those interested in ESG
                    progress by democratising information that is typically fragmented across disparate filings and
                    disclosures.
                </motion.p>

                {/* Separator */}
                <motion.div {...heroFadeUp(0.18)}>
                    <Separator className="bg-[#c6d1b3]"/>
                </motion.div>

                {/* Our Team */}
                <motion.h3
                    {...heroFadeUp(0.22)}
                    className="text-3xl font-bold"
                >
                    Our Team
                </motion.h3>

                {/* Team Section */}
                <div className="grid gap-10 md:grid-cols-3 items-start">
                    {/* Big Feature Member */}
                    <motion.div {...heroFadeUp(0.28)} className="md:col-span-2">
                        <Card className="rounded-3xl bg-[#eef2e6] border-[#c6d1b3] shadow-sm overflow-hidden">
                            <div className="relative h-80 w-full bg-black/5 overflow-hidden">
                                <Image
                                    src={vaniMilindAgarwalPhoto}
                                    alt="A photograph of the project's leader, Ms. Vani M. Agarwal"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                            <CardContent className="p-8 space-y-4">
                                <div className="text-2xl font-semibold">
                                    Vani Agarwal
                                </div>
                                <p className="text-slate-600 leading-relaxed">
                                    Vani Agarwal is a graduate of Shri Ram College of Commerce (SRCC),
                                    University of Delhi, where she studied Economics. She has worked
                                    across global financial services and early-stage climate ventures,
                                    including roles at Nomura and Mitti Labs, focusing on sustainability
                                    strategy and the commercialization of climate solutions. Driven by
                                    a long-standing commitment to climate action, Vani is passionate
                                    about enabling scalable, market-led pathways to net-zero for
                                    corporations.
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Secondary Member */}
                    <motion.div {...heroFadeUp(0.34)}>
                        <Card className="rounded-3xl bg-[#eef2e6] border-[#c6d1b3] shadow-sm overflow-hidden">
                            <div className="relative h-48 w-full bg-black/5 overflow-hidden">
                                <Image
                                    src={arjunSanghiPhoto}
                                    alt="A photograph of the project's main programmer, Arjun Sanghi"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                            <CardContent className="p-6 space-y-3">
                                <div className="text-xl font-semibold">
                                    Arjun Sanghi
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    Arjun Sanghi is a Bachelor of Computer Science student at
                                    Monash University in Australia.
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </section>

            <BottomBar/>
        </div>
    );
}
