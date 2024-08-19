import { index } from "drizzle-orm/mysql-core";
import Link from "next/link";
import { mock } from "node:test";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  
  const images = await db.query.images.findMany({
    orderBy: (model, {desc}) => desc(model.id),
  });

  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {[...images, ...images, ...images].map((image) => (
          <div key={image.id + "-" + index} className="w-48 flex flex-col">
            <img src={image.url} />
            <div className="">{image.name}</div>
          </div>
        ))}
      </div>

    </main>
  );
}
