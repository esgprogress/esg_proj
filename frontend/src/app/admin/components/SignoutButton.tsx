
import {Button} from "@/components/ui/button";
import Link from "next/link";

export default function SignoutButton() {

    return (
        <Link href={'/auth/logout'}>
            <Button className="rounded-xl border px-4 py-2 text-sm text-muted-foreground hover:bg-muted transition">
                Sign out
            </Button>
        </Link>
    );
}
