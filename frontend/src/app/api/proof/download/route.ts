import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)

    const companySlug = searchParams.get("company_slug")
    const fileName = searchParams.get("file_name")
    const fileType = searchParams.get("file_type")

    if (!companySlug || !fileName || !fileType) {
        return NextResponse.json(
            { error: "Missing required parameters" },
            { status: 400 }
        )
    }

    // Optional: enforce allowed file types
    const allowedTypes = ["pdf"]
    if (!allowedTypes.includes(fileType.toLowerCase())) {
        return NextResponse.json(
            { error: "Invalid file type" },
            { status: 400 }
        )
    }

    // Construct upstream URL safely
    const upstreamUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/proof/downloadData?company_slug=${companySlug}&file_name=${fileName}&file_type=${fileType}`

    const upstreamRes = await fetch(upstreamUrl)

    if (!upstreamRes.ok || !upstreamRes.body) {
        return NextResponse.json(
            { error: "File not found" },
            { status: 404 }
        )
    }

    return new NextResponse(upstreamRes.body, {
        headers: {
            "Content-Type":
                upstreamRes.headers.get("content-type") ??
                "application/pdf",
            "Content-Disposition": `attachment; filename="${fileName}.${fileType}"`,
        },
    })
}
