import PDFUploadBox from "@/app/admin/components/PDFUploadBox";

export default async function UploadPage() {
    const companies = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/companies`);

    if (!companies.ok) {
        throw new Error("Could not find companies");
    }

    const json_ver_companies = await companies.json();

    const names_only_companies: string[] = json_ver_companies.map((item) => item.name).sort()

    return (
        <PDFUploadBox companies={names_only_companies} />
    )
}
