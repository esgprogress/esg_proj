export async function fetchCompanies() {
    const fetchedCompanies = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/companies`);

    if (!fetchedCompanies.ok) {
        console.log("Error fetching companies");
        return [];
    }

    const json_fetched = await fetchedCompanies.json();

    const response_with_just_names = json_fetched.map((item) => {item.name});

    return response_with_just_names;
}