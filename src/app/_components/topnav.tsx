import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { SimpleUploadButton } from "./simple-upload-button";
import Link from "next/link";

export function TopNav() {
    return (
        <nav className="flex w-full items-center justify-between p-4 text-xl font-semibold border-b">
            <Link href={'/'}>
                <div>Gallery</div>
            </Link>

            <div className="flex flex-row gap-4 items-center">
                <SignedOut>
                    <SignInButton />
                </SignedOut>
                <SignedIn>
                    <SimpleUploadButton />
                    <UserButton />
                </SignedIn>
            </div>
        </nav>
    );
}
