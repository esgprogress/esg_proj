import type {Metadata} from "next";
import React from "react";

export const metadata: Metadata = {
    title: 'About Us - ESGProgress',
    description: 'ESGProgress About Us Page',
    icons: [
        {
            url: '/esgProgressLogo.svg',
            href: '/esgProgressLogo.svg'
        }
    ]
};

export default function LegalLayout({
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