export async function fetchCompanyESG(slug: string) {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/fetchCompany?company_slug=${slug}`,
            { cache: "no-store" } // important for dashboards
        )

        if (!res.ok) {
            console.error("API error:", res.status)
            return null
        }

        const data = (await res.json())[0]
        console.log(data)

        // Handle FastAPI validation errors explicitly
        if ("detail" in data) {
            console.error("Validation error:", data.detail)
            return null
        }

        return data
    } catch (error) {
        console.error("Fetch failed:", error)
        return null
    }
}
