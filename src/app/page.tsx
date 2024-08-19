import Link from "next/link";
import { mock } from "node:test";

const mockUrls = [
  "https://placehold.co/800?text=Thomas&font=roboto",
  "https://placehold.co/800?text=Liz&font=roboto",
  "https://placehold.co/800?text=Patrick&font=roboto",
  "https://placehold.co/800?text=Nico&font=roboto",
];

const mockImages = mockUrls.map((url, index) => ({
  id: index + 1, 
  url,
}));

export default function HomePage() {
  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {[...mockImages, ...mockImages, ...mockImages].map((image) => (
          <div key={image.id} className="w-48">
            <img src={image.url} />
          </div>
        ))}
      </div>

    </main>
  );
}
