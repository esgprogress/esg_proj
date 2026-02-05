import type {Metadata} from "next";
import React from "react";

export const metadata: Metadata = {
    title: 'Dashboard - ESGProgress',
    description: 'ESGProgress Company Dashboard',
    icons: [
        {
            url: '/esgProgressLogo.svg',
            href: '/esgProgressLogo.svg'
        }
    ]
};

export default function DashboardLayout({
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