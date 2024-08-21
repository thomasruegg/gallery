import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Image from "next/image";
import { getMyImages } from "../server/queries";
import Link from "next/link";

export const dynamic = "force-dynamic";

async function Images() {
  const images = await getMyImages();

  return <div className="flex flex-wrap justify-center gap-4">
    {images.map((image) => (
      <div key={image.id} className="w-48 h-48 flex flex-col">
        <Link href={`/img/${image.id}`}>
          <Image
            src={image.url}
            style={{ objectFit: "contain" }}
            alt={image.name}
            width={480}
            height={480}
          />
        </Link>
        <div className="">{image.name}</div>
      </div>
    ))}
  </div>;
}

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

