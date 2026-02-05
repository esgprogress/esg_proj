import type {Metadata} from "next";
import React from "react";

export const metadata: Metadata = {
    title: 'Contribute to ESGProgress',
    description: 'ESGProgress Contribution Page',
    icons: [
        {
            url: '/esgProgressLogo.svg',
            href: '/esgProgressLogo.svg'
        }
    ]
};

export default function ContributionLayout({
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