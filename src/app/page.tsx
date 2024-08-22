import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Image from "next/image";
import { getMyImages } from "../server/queries";
import Link from "next/link";

export const dynamic = "force-dynamic";

async function Images() {
  const images = await getMyImages();

  return (
    <div className="flex flex-wrap gap-4 p-4">
      {images.map((image) => (
        <div key={image.id} className="flex flex-col items-center">
          <Link
            href={`/img/${image.id}`}
            className="w-40 flex flex-col items-center"
          >
            <div className="w-full h-40 flex items-center justify-center overflow-hidden">
              <Image
                src={image.url}
                alt={image.name}
                width={192}
                height={192}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="text-center mt-2">{image.name}</div>
          </Link>
        </div>
      ))}
    </div>
  );
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

