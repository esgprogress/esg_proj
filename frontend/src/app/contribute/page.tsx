import BottomBar from "@/components/BottomBar";
import React from "react";
import {Card, CardContent} from "@/components/ui/card";
import TopBar from "@/components/TopBar";
import {ContributeForm} from "@/components/ContributeForm";


export default function ContributePage() {

    return (
        <div className="min-h-screen bg-[#ced8aa]">
            <TopBar/>

            <section className="mx-auto max-w-6xl px-4 py-14 text-gray-700">

                <div className="text-5xl text-black font-semibold mb-8">Contribute</div>

                <Card className="rounded-3xl shadow-sm">
                    <CardContent className="p-7 md:p-10">
                        <div className="grid items-center gap-6 md:grid-cols-2">
                            <div>
                                <div className="text-sm font-semibold text-black">Join the mission</div>
                                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-black">
                                    Make ESG information understandable, verifiable, and open.
                                </h3>
                                <p className="mt-2 text-muted-foreground text-gray-700">
                                    Whether you’re a developer, researcher, journalist, student, or simply curious —
                                    help us expand coverage,
                                    improve methods, and keep the data honest.
                                </p>
                            </div>
                            <div className="grid gap-3 md:grid-cols-2">
                                {[
                                    {title: "For everyone", desc: "Plain-language summaries and explainers"},
                                    {title: "For analysts", desc: "Open datasets, filters, exports"},
                                    {title: "For builders", desc: "APIs, schemas, reproducible pipelines"},
                                    {title: "For watchdogs", desc: "Evidence links, versioning, transparency"},
                                ].map((x) => (
                                    <div key={x.title} className="rounded-2xl border p-4 text-gray-700">
                                        <div className="text-sm font-semibold">{x.title}</div>
                                        <div className="mt-1 text-sm text-muted-foreground">{x.desc}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="text-xl font-semibold text-black mt-5">Contact Us</div>

                        <ContributeForm/>

                    </CardContent>
                </Card>

            </section>

            <BottomBar/>
        </div>
    )
}