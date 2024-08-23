import "server-only";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";
import { images } from "./db/schema";
import { redirect } from "next/navigation";
import { and, eq } from "drizzle-orm";
import analyticsServerClient from "./analytics";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export const deleteUTFiles = async (files: string[]) => {
    try {
      await utapi.deleteFiles(files);
    } catch (error) {
      console.error("UploadThingAPI: Error deleting files", error);
    }
  };

export async function getMyImages() {
    const user = auth();

    if (!user.userId) {
        throw new Error("Unauthorized");
    }

    const images = await db.query.images.findMany({
        where: (model, { eq }) => eq(model.userId, user.userId),
        orderBy: (model, { desc }) => desc(model.id),
    });
    return images;
}

export async function getImage(id: number) {
    const user = auth();
    if (!user.userId) throw new Error("Unauthorized");

    const image = await db.query.images.findFirst({
        where: (model, { eq }) => eq(model.id, id),
    });
    if (!image) throw new Error("Image not found");

    if (image.userId !== user.userId) throw new Error("Unauthorized");

    return image;
}

export async function deleteImage(id: number) {
    const user = auth();
    if (!user.userId) throw new Error("Unauthorized");

    const image = await getImage(id);
    if (!image) throw new Error("Image was not found using getImage(id)");

    await deleteUTFiles([`${extractFileIdFromUrl(image.url)}`]);
    
    await db
        .delete(images)
        .where(
            and(
                eq(images.id, id), // get the right image
                eq(images.userId, user.userId) // only delete if the current user owns it
            )
        );
        
    analyticsServerClient.capture({
        distinctId: user.userId,
        event: "delete image",
        properties: {
            imageId: id,
        },
    })

    redirect('/');
}

function extractFileIdFromUrl(url: string) {
    const urlObj = new URL(url);
    const pathSegments = urlObj.pathname.split('/');

    return pathSegments[pathSegments.length - 1];
}