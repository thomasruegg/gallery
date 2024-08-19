import { index } from "drizzle-orm/mysql-core";
import Link from "next/link";
import { mock } from "node:test";
import { db } from "~/server/db";

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

export default async function HomePage() {

  const posts = await db.query.posts.findMany();

  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {posts.map((post) => (<div key={post.id}>{post.name}</div>))}
        {[...mockImages, ...mockImages, ...mockImages].map((image) => (
          <div key={image.id + "-" + index} className="w-48">
            <img src={image.url} />
          </div>
        ))}
      </div>

    </main>
  );
}
