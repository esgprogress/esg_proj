import React from "react";
import Link from "next/link";
import {Button} from "@/components/ui/button"
import Image from "next/image";
import esgProgressLogo from '../assets/images/esgProgressLogo.svg'

export default function TopBar() {
    return (
        <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
                <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl shadow-sm">
                        <Link href="/">
                            <Image src={esgProgressLogo} alt="ESGProgress Logo"/>
                        </Link>
                    </div>
                    <div>
                        <div className="text-sm font-semibold leading-none">ESGProgress</div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Link href={'/about-us'}>
                        <Button variant="ghost" className="rounded-xl">
                            About us
                        </Button>
                    </Link>
                    <Link href={'/our-methodology'}>
                        <Button variant="ghost" className="rounded-xl">
                            Our methodology
                        </Button>
                    </Link>
                    <Link href={'/dashboard'}>
                        <Button variant="ghost" className="rounded-xl"
                        >Explore dashboards</Button
                        >
                    </Link>
                    <Link href={'/contribute'}>
                        <Button variant="outline" className="rounded-xl">
                            Contribute to the mission
                        </Button>
                    </Link>
                </div>
            </div>
        </header>
    )
}