import { useEffect, useRef, useState } from "react";

export default function CompanySelect({
                                          companies,
                                          value,
                                          onChange,
                                      }: {
    companies: string[];
    value: string;
    onChange: (v: string) => void;
}) {
    const [open, setOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // close on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (
                !buttonRef.current?.contains(e.target as Node) &&
                !dropdownRef.current?.contains(e.target as Node)
            ) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <div className="relative inline-block w-fit">
            {/* Trigger */}
            <button
                ref={buttonRef}
                type="button"
                onClick={() => setOpen(!open)}
                className="min-w-[200px] px-4 py-2 rounded-lg border rounded-2xl bg-white
                   text-left shadow-sm flex items-center justify-between
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <span className="truncate">{value || "Select company"}</span>
                <span
                    className={`ml-2 transition-transform ${
                        open ? "rotate-180" : ""
                    }`}
                >
          ▾
        </span>
            </button>

            {/* Dropdown */}
            <div
                ref={dropdownRef}
                className={`absolute left-0 mt-2 w-full origin-top rounded-lg border
              border-gray-200 bg-white shadow-lg overflow-hidden
              transition-all duration-200 ease-out
              ${
                    open
                        ? "scale-y-100 opacity-100"
                        : "scale-y-95 opacity-0 pointer-events-none"
                }`}
            >
                <div className="max-h-40 overflow-y-auto">
                    {companies.map((item) => (
                        <button
                            key={item}
                            onClick={() => {
                                onChange(item);
                                setOpen(false);
                            }}
                            className="block w-full px-4 py-2 text-left
                   hover:bg-blue-50 transition-colors"
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
