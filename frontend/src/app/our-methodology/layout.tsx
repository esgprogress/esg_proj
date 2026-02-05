import type {Metadata} from "next";
import React from "react";

export const metadata: Metadata = {
    title: 'Our Methodology - ESGProgress',
    description: 'ESGProgress Methodology Page',
    icons: [
        {
            url: '/esgProgressLogo.svg',
            href: '/esgProgressLogo.svg'
        }
    ]
};

export default function OurMethodologyLayout({
                                        children,
                                    }: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#ced8aa]">
            {children}
        </div>
    );
};