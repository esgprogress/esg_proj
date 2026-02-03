"use client";

import {useState} from "react";
import {Button} from "@/components/ui/button";

export function ContributeForm() {
    const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus("sending");

        const formData = new FormData(e.currentTarget);

        const res = await fetch("/api/contact", {
            method: "POST",
            body: formData,
        });

        if (res.ok) {
            setStatus("success");
            e.currentTarget.reset();
        } else {
            setStatus("idle");
            alert("Something went wrong. Please try again.");
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="mt-10 grid gap-6 "
        >
            <div className="grid gap-2">
                <label className="text-sm font-semibold">Name</label>
                <input
                    name="name"
                    required
                    className="rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black bg-input"
                />
            </div>

            <div className="grid gap-2">
                <label className="text-sm font-semibold">Email</label>
                <input
                    name="email"
                    type="email"
                    required
                    className="rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black bg-input"
                />
            </div>

            <div className="grid gap-2">
                <label className="text-sm font-semibold">Query type</label>
                <select
                    name="type"
                    required
                    className="rounded-xl border px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-black bg-input"
                >
                    <option value="">Select one</option>
                    <option value="contribution">Contribution</option>
                    <option value="data-issue">Data issue</option>
                    <option value="research">Research collaboration</option>
                    <option value="general">General enquiry</option>
                    <option value="translation">Translation (Please mention the intended language of translation)</option>
                </select>
            </div>

            <div className="grid gap-2">
                <label className="text-sm font-semibold">Message</label>
                <textarea
                    name="message"
                    rows={6}
                    required
                    className="rounded-xl border px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-black bg-input"
                />
            </div>

            <Button
                type="submit"
                disabled={status !== "idle"}
                className={`mt-2 rounded-2xl px-6 py-5 text-sm font-semibold transition-all bg-white
          ${status === "success" ? "bg-green-600 hover:bg-green-600" : ""}
        `}
            >
                {status === "idle" && "Send message"}
                {status === "sending" && "Sending…"}
                {status === "success" && "✓ Message sent"}
            </Button>
        </form>
    );
}
