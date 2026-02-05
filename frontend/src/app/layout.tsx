import type {ReactNode} from "react";
import "./globals.css"
import {GoogleAnalytics} from "@next/third-parties/google";
import type {Metadata} from "next";
import React from "react";

export default function RootLayout({children}: { children: ReactNode }) {
    return (
        <html lang="en">
        <body className="min-h-screen bg-background">
        {children}
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!}/>
        </body>
        </html>
    );
}

export const metadata: Metadata = {
    title: 'ESGProgress',
    description: 'ESGProgress Home Page',
    icons: [
        {
            url: '/esgProgressLogo.svg',
            href: '/esgProgressLogo.svg'
        }
    ]
};
