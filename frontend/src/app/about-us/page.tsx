import React from "react";
import TopBar from "@/components/TopBar";
import {Card, CardContent} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";
import BottomBar from "@/components/BottomBar";
import Image from "next/image";
import vaniMilindAgarwalPhoto from '../../assets/images/VaniMilindAgarwalPhoto.png'
import arjunSanghiPhoto from '../../assets/images/ArjunSanghiPhoto.jpg'

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-[#ced8aa] text-black">
            <TopBar/>

            <section className="mx-auto max-w-6xl px-4 py-16 space-y-14">
                {/* Company Title */}
                <h1 className="text-5xl font-semibold tracking-tight">
                    About ESGProgress
                </h1>

                {/* Header Line */}
                <h2 className="text-2xl max-w-3xl leading-snug text-black/80">
                    An open ESG database for a more sustainable future
                </h2>

                {/* Goal Paragraph */}
                <p className="max-w-3xl text-lg leading-relaxed text-black/70">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat.
                </p>

                {/* Separator */}
                <Separator className="bg-black/20"/>

                {/* Our Team */}
                <h3 className="text-3xl font-bold">
                    Our Team
                </h3>

                {/* Team Section */}
                <div className="grid gap-10 md:grid-cols-3 items-start">
                    {/* Big Feature Member */}
                    <Card className="md:col-span-2 rounded-3xl shadow-lg overflow-hidden">
                        <div className="relative h-80 w-full bg-black/10 flex items-center justify-center overflow-hidden object-top">
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
                            <p className="text-black/70 leading-relaxed">
                                Vani Agarwal is a graduate of Shri Ram College of Commerce (SRCC), University of Delhi,
                                where she studied Economics. She has worked across global financial services and
                                early-stage climate ventures, including roles at Nomura and Mitti Labs, focusing on
                                sustainability strategy and the commercialization of climate solutions. Driven by a
                                long-standing commitment to climate action, Vani is passionate about enabling scalable,
                                market-led pathways to net-zero for corporations
                            </p>
                        </CardContent>
                    </Card>

                    {/* Secondary Member */}
                    <Card className="rounded-3xl shadow-lg overflow-hidden">
                        <div className="relative h-48 w-full bg-black/10 flex items-center justify-center overflow-hidden object-top">
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
                            <p className="text-sm text-black/70 leading-relaxed">
                                Arjun Sanghi is a Bachelor of Computer Science student at Monash University in Australia.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </section>

            <BottomBar/>
        </div>
    );
}
