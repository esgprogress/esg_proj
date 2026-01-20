import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import esgProgressLogo from "../assets/images/esgProgressLogo.svg";

export default function TopBar() {
    return (
        <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl shadow-sm">
                            <Image src={esgProgressLogo} alt="ESGProgress Logo" />
                        </div>
                        <div className="text-sm font-semibold leading-none">
                            ESGProgress
                        </div>
                    </Link>
                </div>

                {/* Desktop nav */}
                <div className="hidden md:flex items-center gap-2">
                    <Link href="/about-us">
                        <Button variant="ghost" className="rounded-xl">
                            About us
                        </Button>
                    </Link>
                    <Link href="/our-methodology">
                        <Button variant="ghost" className="rounded-xl">
                            Our methodology
                        </Button>
                    </Link>
                    <Link href="/dashboard">
                        <Button variant="ghost" className="rounded-xl">
                            Explore dashboards
                        </Button>
                    </Link>
                    <Link href="/contribute">
                        <Button variant="outline" className="rounded-xl">
                            Contribute to the mission
                        </Button>
                    </Link>
                </div>

                {/* Mobile dropdown */}
                <div className="md:hidden">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu className="h-5 w-5" />
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end" className="w-56 bg-[#f3f6ef] border shadow-lg rounded-xl">
                            <DropdownMenuItem asChild>
                                <Link href="/about-us">About us</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/our-methodology">
                                    Our methodology
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/dashboard">
                                    Explore dashboards
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/contribute">
                                    Contribute to the mission
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}
