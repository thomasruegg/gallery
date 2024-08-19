import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { index } from "drizzle-orm/mysql-core";
import Link from "next/link";
import { mock } from "node:test";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";

export default async function HomePage() {

  return (
    <main className="">

      <SignedOut>
        <div className="w-full h-full text-2xl text-center">
          Please <SignInButton></SignInButton>
        </div>
      </SignedOut>
      <SignedIn>
        <Images />

      </SignedIn>

    </main>
  );
}
async function Images() {
  const images = await db.query.images.findMany({
    orderBy: (model, { desc }) => desc(model.id),
  });

  return <div className="flex flex-wrap gap-4">
    {images.map((image) => (
      <div key={image.id} className="w-48 flex flex-col">
        <img src={image.url} />
        <div className="">{image.name}</div>
      </div>
    ))}
  </div>;
}

