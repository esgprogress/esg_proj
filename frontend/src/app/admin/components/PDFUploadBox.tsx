"use client"

import {FileText, LogIn, UploadCloud} from "lucide-react";
import {useUser} from "@auth0/nextjs-auth0/client";
import CompanySelectDropdown from "@/app/admin/components/CompanySelectDropdown";
import React, {useState} from "react";

export default function PDFUploadBox({companies}: {companies: string[]}) {
    const { user, isLoading } = useUser();
    const [ fileName, setFileName ] = useState<string>();

    const handleFileNameChange = (e: string) => {
        setFileName(e);
    }

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-sm text-muted-foreground">Loading…</p>
            </div>
        )
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-background px-4">
            <div className="w-full max-w-md rounded-2xl border bg-card p-8 shadow-sm">
                {/* Header */}
                <div className="mb-6 space-y-1 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Upload ESG Report
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        PDF documents only
                    </p>
                </div>

                {/* Auth state */}
                {!user ? (
                    <a
                        href="/auth/login"
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90"
                    >
                        <LogIn className="h-4 w-4" />
                        Sign in with Auth0
                    </a>
                ) : (
                    <>
                        {/* User info */}
                        <div className="mb-4 flex items-center gap-3 rounded-xl border p-3">
                            <img
                                src={user.picture ?? ""}
                                alt={user.name ?? "User"}
                                className="h-8 w-8 rounded-full"
                            />
                            <div className="text-sm">
                                <p className="font-medium">{user.name}</p>
                                <p className="text-muted-foreground">
                                    {user.email}
                                </p>
                            </div>
                        </div>

                        {/* Upload box */}
                        <label
                            htmlFor="pdf"
                            className="group flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed p-6 text-center transition hover:bg-muted"
                        >
                            <UploadCloud className="h-6 w-6 text-muted-foreground group-hover:text-foreground" />
                            <p className="text-sm font-medium">
                                Drag & drop your PDF
                            </p>
                            <p className="text-xs text-muted-foreground">
                                or click to browse
                            </p>

                            <input
                                id="pdf"
                                type="file"
                                accept="application/pdf"
                                className="hidden"
                                onChange={async (e) => {
                                    const json = await fetch('/api/auth')
                                    if (!json.ok) {
                                        const text = await json.text();
                                        throw new Error(text);
                                    }

                                    const {accessToken} = await json.json()

                                    const file = e.target.files?.[0]
                                    if (!file) return

                                    const formData = new FormData()
                                    formData.append("file", file)

                                    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/companies/addData?company_name=${fileName}`, {
                                        method: "POST",
                                        body: formData,
                                        headers: {
                                            Authorization: `Bearer ${accessToken.token}`,
                                        }
                                    })

                                    if (!res.ok) {
                                        console.error("Upload failed")
                                        return
                                    }

                                    const data = await res.json()
                                    console.log("Upload success:", data)
                                }}
                            />
                        </label>

                        {/* Helper */}
                        <p className="mt-3 flex items-center justify-center gap-1 text-xs text-muted-foreground">
                            <FileText className="h-3 w-3" />
                            Max size 100MB
                        </p>

                        <div className='items-center justify-center flex mt-3'>
                            <CompanySelectDropdown companies={companies} value={fileName} onChange={handleFileNameChange}/>
                        </div>

                        {/* Logout */}
                        <a
                            href="/auth/logout"
                            className="mt-6 block text-center text-xs text-muted-foreground hover:underline"
                        >
                            Sign out
                        </a>
                    </>
                )}
            </div>
        </main>
    )
}