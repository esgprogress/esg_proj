import {Badge} from "@/components/ui/badge"
import {CompanyAvatar} from "@/components/CompanyAvatar";

export function CompanyHeader({
                                  name,
                                  industry,
                                  country,
                                  slug
                              }: {
    name: string
    industry: string
    country: string,
    slug: string
}) {
    return (
        <header className="flex items-center gap-4">
            <CompanyAvatar slug={slug} name={name} size={64} />

            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-semibold tracking-tight">
                    {name}
                </h1>

                <div className="flex gap-2 flex-wrap">
                    <Badge variant="secondary">{industry}</Badge>
                    <Badge variant="outline">{country}</Badge>
                </div>
            </div>
        </header>

    )
}
