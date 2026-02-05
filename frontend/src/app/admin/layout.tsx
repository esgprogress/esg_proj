import type {Metadata} from "next";
import React from "react";

export const metadata: Metadata = {
    title: 'Admin - ESGProgress',
    description: 'ESGProgress Admin Page',
    icons: [
        {
            url: '/esgProgressLogo.svg',
            href: '/esgProgressLogo.svg'
        }
    ]
};

export default function AdminLayout({
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