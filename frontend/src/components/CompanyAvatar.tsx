"use client"

import {useState} from "react"
import {getInitials, stringToColor, stringToGradient} from "@/lib/utils";

type CompanyAvatarProps = {
    slug: string
    name: string
    size?: number
}

export function CompanyAvatar({slug, name, size = 64}: CompanyAvatarProps) {
    const [failed, setFailed] = useState(false)

    const src = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/companies/logo?company_slug=${slug}`
    const initials = getInitials(name)
    const bg = stringToColor(name)

    if (failed) {
        return (
            <div
                className="flex items-center justify-center rounded-full font-semibold text-white select-none"
                style={{
                    width: size,
                    height: size,
                    background: stringToGradient(name),
                    fontSize: size * 0.4
                }}
            >
                {initials}
            </div>
        )
    }

    return (
        <img
            src={src}
            alt={name}
            width={size}
            height={size}
            className="rounded-full object-cover"
            onError={() => setFailed(true)}
        />
    )
}
