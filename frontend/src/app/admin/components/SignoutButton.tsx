// app/admin/components/SignoutButton.tsx
import { redirect } from "next/navigation";

export default function SignoutButton() {
    async function signOut() {
        "use server";
        redirect("/auth/logout");
    }

    return (
        <form action={signOut}>
            <button
                type="submit"
                className="rounded-xl border px-4 py-2 text-sm text-muted-foreground hover:bg-muted transition"
            >
                Sign out
            </button>
        </form>
    );
}
