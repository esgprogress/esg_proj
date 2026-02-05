import React from "react";
import {Metadata, ResolvingMetadata} from "next";

type Props = {
    params: Promise<{ slug: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const slug = (await params).slug;

    // fetch company information
    const company = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/fetchCompany?company_slug=${slug}`).then((res) =>
        res.json()
    );

    return {
        title: `${company[0].name} - ESGProgress`,
        description: `ESGProgress coverage on ${company[0].name}`,
        icons: [
            {
                url: '/esgProgressLogo.svg',
                href: '/esgProgressLogo.svg'
            }
        ]
    }
}

export default function CompanyLayout({
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