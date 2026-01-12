import { MetaRecord } from "nextra";

/*const API_PUBLIC_DOCS = {
    index: "Overview",
    fetch_companies: "Fetch companies",
    fetch_company_data: "Fetch company data",
    fetch_industries: "Fetch industries",
    fetch_companies_by_industry: "Fetch companies by industry",
    fetch_questions: "Fetch questions",
};

const API_PRIVATE_DOCS = {
    index: "Overview",
}

const API_DOCS = {
    index: "API Overview",
    public_api_endpoints: {
        title: "Public API",
        type: "page",
        items: API_PUBLIC_DOCS,
    },
    private_api_endpoints: {
        title: "Private API",
        type: "page",
        items: API_PRIVATE_DOCS
    }
};
*/

const meta = {
    index: {
        type: "page",
        theme: {
            layout: "full",
            toc: false,
            timestamp: false,
        },
    },

    api: {
        title: "API Reference",
        type: "page",
    },
};

export default meta;
