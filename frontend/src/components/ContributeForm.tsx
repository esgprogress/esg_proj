"use client"

import React, {useState} from "react"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export function ContributeForm() {
    const [status, setStatus] = useState<"idle" | "sending" | "success">("idle")

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
            className="mt-10 grid gap-6 w-full min-w-0"
        >
            <div className="grid gap-2">
                <label className="text-sm font-semibold">Name</label>
                <Input name="name" required/>
            </div>

            <div className="grid gap-2">
                <label className="text-sm font-semibold">Email</label>
                <Input name="email" type="email" required/>
            </div>

            <div className="grid gap-2">
                <label className="text-sm font-semibold">Query type</label>
                <Select name="type" required>
                    <SelectTrigger>
                        <SelectValue placeholder="Select one"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="contribution">Contribution</SelectItem>
                        <SelectItem value="data-issue">Data issue</SelectItem>
                        <SelectItem value="research">Research collaboration</SelectItem>
                        <SelectItem value="general">General enquiry</SelectItem>
                        <SelectItem value="translation">
                            Translation (Please mention the intended language)
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="grid gap-2">
                <label className="text-sm font-semibold">Message</label>
                <Textarea name="message" rows={6} required/>
            </div>

            <Button
                type="submit"
                disabled={status !== "idle"}
                className="mt-2 rounded-2xl px-6 py-5 text-sm font-semibold"
            >
                {status === "idle" && "Send message"}
                {status === "sending" && "Sending…"}
                {status === "success" && "Message sent"}
            </Button>
        </form>
    )
}
