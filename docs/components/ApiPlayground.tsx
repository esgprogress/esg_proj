"use client";

import { useState } from "react";

type SchemaField = {
    type: string;
    description?: string;
};

type ResponseSchema = {
    title?: string;
    fields: Record<string, SchemaField>;
};

type ApiPlaygroundProps = {
    endpoint: string;
    method?: "GET" | "POST" | "PUT" | "DELETE";
    responseSchema?: ResponseSchema;
};

export default function ApiPlayground({
                                          endpoint,
                                          method = "GET",
                                          responseSchema,
                                      }: ApiPlaygroundProps) {
    const [params, setParams] = useState([{ key: "", value: "" }]);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<number | null>(null);
    const [response, setResponse] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    function updateParam(
        index: number,
        field: "key" | "value",
        value: string
    ) {
        const next = [...params];
        next[index][field] = value;
        setParams(next);
    }

    function addParam() {
        setParams([...params, { key: "", value: "" }]);
    }

    function buildQuery() {
        const query = new URLSearchParams();
        params.forEach(({ key, value }) => {
            if (key.trim()) query.append(key, value);
        });
        const qs = query.toString();
        return qs ? `${endpoint}?${qs}` : endpoint;
    }

    async function run() {
        setLoading(true);
        setStatus(null);
        setResponse(null);
        setError(null);

        try {
            const query = buildQuery();
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${query}`, { method });
            setStatus(res.status);

            const contentType = res.headers.get("content-type") || "";

            if (!contentType.includes("application/json")) {
                window.open(res.url);
                return;
            }

            const text = await res.text();
            try {
                setResponse(JSON.parse(text));
            } catch {
                setResponse(text);
            }
        } catch (e: any) {
            setError(e.message ?? "Request failed");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="mt-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="font-mono text-sm text-gray-700 dark:text-gray-300">
                    {method} {endpoint}
                </div>

                <button
                    onClick={run}
                    disabled={loading}
                    className="px-4 py-2 rounded-lg font-semibold text-sm
            bg-emerald-600 text-white hover:bg-emerald-700
            disabled:opacity-50 transition"
                >
                    {loading ? "Running…" : "Try it"}
                </button>
            </div>

            {/* Query Params */}
            <div>
                <h4 className="text-sm font-semibold mb-2">Query Parameters</h4>

                <div className="space-y-2">
                    {params.map((param, i) => (
                        <div key={i} className="flex gap-2">
                            <input
                                placeholder="key"
                                value={param.key}
                                onChange={(e) => updateParam(i, "key", e.target.value)}
                                className="w-1/3 rounded-md border px-2 py-1 text-sm
                  bg-white dark:bg-gray-950 dark:border-gray-700"
                            />
                            <input
                                placeholder="value"
                                value={param.value}
                                onChange={(e) => updateParam(i, "value", e.target.value)}
                                className="flex-1 rounded-md border px-2 py-1 text-sm
                  bg-white dark:bg-gray-950 dark:border-gray-700"
                            />
                        </div>
                    ))}
                </div>

                <button
                    onClick={addParam}
                    className="mt-2 text-xs text-emerald-600 hover:underline"
                >
                    + Add parameter
                </button>
            </div>

            {/* Schema */}
            {responseSchema && (
                <div>
                    <h4 className="text-sm font-semibold mb-2">
                        Response Schema
                    </h4>

                    <div className="overflow-hidden rounded-lg border dark:border-gray-800">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-100 dark:bg-gray-800">
                            <tr>
                                <th className="text-left px-3 py-2">Field</th>
                                <th className="text-left px-3 py-2">Type</th>
                                <th className="text-left px-3 py-2">Description</th>
                            </tr>
                            </thead>
                            <tbody>
                            {Object.entries(responseSchema.fields).map(
                                ([name, field]) => (
                                    <tr key={name} className="border-t dark:border-gray-800">
                                        <td className="px-3 py-2 font-mono">{name}</td>
                                        <td className="px-3 py-2 text-emerald-600">
                                            {field.type}
                                        </td>
                                        <td className="px-3 py-2 text-gray-600 dark:text-gray-400">
                                            {field.description ?? "—"}
                                        </td>
                                    </tr>
                                )
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Response */}
            {(status !== null || error) && (
                <div>
                    {status !== null && (
                        <div className="text-sm mb-2">
                            Status:{" "}
                            <span
                                className={
                                    status >= 200 && status < 300
                                        ? "text-emerald-600"
                                        : "text-red-500"
                                }
                            >
                {status}
              </span>
                        </div>
                    )}

                    {error && (
                        <div className="text-sm text-red-500">{error}</div>
                    )}

                    {response !== null && (
                        <pre className="mt-2 max-h-72 overflow-auto rounded-lg bg-black/90 p-4 text-xs text-green-200">
{JSON.stringify(response, null, 2)}
            </pre>
                    )}
                </div>
            )}
        </div>
    );
}
