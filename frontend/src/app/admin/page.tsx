import PDFUploadBox from "@/app/admin/components/PDFUploadBox";
import CompanyLogoWidget from "@/app/admin/components/CompanyLogoViewerUpdate";
import SignoutButton from "@/app/admin/components/SignoutButton";

export default async function UploadPage() {
    const companies = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/companies`
    );

    if (!companies.ok) {
        throw new Error("Could not find companies");
    }

    const json_ver_companies = await companies.json();
    const names_only_companies: string[] =
        json_ver_companies.map((item) => item.name).sort();

    return (
        <main className="min-h-screen bg-background p-8">
            <div className="mx-auto max-w-6xl">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    <PDFUploadBox companies={names_only_companies}/>
                    <CompanyLogoWidget companies={json_ver_companies.sort()}/>
                </div>

                <div className="mt-6 flex justify-center">
                    <SignoutButton/>
                </div>

            </div>
        </main>
    );


}
