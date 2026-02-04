"use client";

import React, {useEffect, useState} from "react";
import {UploadCloud} from "lucide-react";
import {Company} from "@/lib/types";
import AnimatedSingleSelectDropdown from "@/components/AnimatedSingleSelectDropdown";

type Props = {
    companies: Company[];
};

export default function CompanyLogoWidget({companies}: Props) {
    const [company, setCompany] = useState<Company>(companies[0]);
    const [logoUrl, setLogoUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleCompanyNameChange = (e: string) => {
        setCompany(companies.filter((item) => item.name === e)[0]);
    };

    // Fetch logo when company changes
    useEffect(() => {
        if (!company) {
            setLogoUrl(null);
            return;
        }

        let active = true;

        const fetchLogo = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/companies/logo?company_slug=${encodeURIComponent(company.slug)}`
                );

                if (!res.ok) throw new Error("No logo found");

                const blob = await res.blob();
                const objectUrl = URL.createObjectURL(blob);

                if (active) {
                    setLogoUrl(objectUrl);
                }
            } catch {
                setLogoUrl(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchLogo();

        return () => {
            active = false;
            if (logoUrl) URL.revokeObjectURL(logoUrl);
        };
    }, [company]);

    // Upload new logo
    const uploadLogo = async (file: File) => {
        if (!company) return;

        try {
            setIsLoading(true);
            setError(null);

            const json = await fetch("/api/auth");
            if (!json.ok) throw new Error(await json.text());

            const { accessToken } = await json.json();

            const formData = new FormData();
            formData.append("file", file);

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/companies/logo?company_slug=${encodeURIComponent(company.slug)}`,
                {
                    method: "POST",
                    body: formData,
                    headers: {
                        Authorization: `Bearer ${accessToken.token}`,
                    }
                }
            );

            if (!res.ok) throw new Error("Upload failed");

            const blob = await res.blob();
            const objectUrl = URL.createObjectURL(blob);
            setLogoUrl(objectUrl);
        } catch {
            setError("Failed to upload logo");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-background px-4">
            <div className="w-full max-w-md space-y-4 rounded-2xl border bg-card p-6 shadow-sm">
                <h2 className="text-lg font-semibold">Company Logo</h2>

                {/* Logo viewport */}
                <div
                    className="relative aspect-video w-full overflow-hidden rounded-xl border bg-muted flex items-center justify-center">
                    {!company ? (
                        <p className="text-sm text-muted-foreground">
                            Select company to view logo
                        </p>
                    ) : isLoading ? (
                        <div
                            className="h-6 w-6 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent"/>
                    ) : logoUrl ? (
                        <>
                            <img
                                src={logoUrl}
                                alt="Company logo"
                                className="h-full w-full object-contain p-4"
                            />

                            {/* Edit button */}
                            <label className="absolute right-2 top-2 z-10 flex items-center gap-1 rounded-lg bg-black/70 px-3 py-1.5 text-xs text-white cursor-pointer hover:bg-black">
                                <UploadCloud className="h-3 w-3" />
                                Edit
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) uploadLogo(file);
                                    }}
                                />
                            </label>

                        </>
                    ) : (
                        <>
                            <p className="text-sm text-muted-foreground">
                                No logo uploaded
                            </p>

                                <label
                                    className="absolute right-2 top-2 z-10 flex items-center gap-1 rounded-lg bg-black/70 px-3 py-1.5 text-xs text-white cursor-pointer hover:bg-black">
                                    <UploadCloud className="h-3 w-3"/>
                                    Upload
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) uploadLogo(file);
                                        }}
                                    />
                                </label>
                        </>
                    )}
                </div>

                <div className="mt-3 flex items-center justify-center">
                    <AnimatedSingleSelectDropdown listOfValues={companies.map((item) => item.name).sort()} value={company.name}
                                                  onChange={handleCompanyNameChange}/>
                </div>

                {error && (
                    <p className="text-sm text-red-600">{error}</p>
                )}
            </div>
        </main>
    );
}
