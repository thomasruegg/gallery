"use client";

import { useRouter } from "next/navigation";
import { usePostHog } from "posthog-js/react";
import { toast } from "sonner";
import { useUploadThing } from "~/utils/uploadthing";

// inferred input off useUploadThing
type Input = Parameters<typeof useUploadThing>;

const useUploadThingInputPrompts = (...args: Input) => {
    const $ut = useUploadThing(...args);

    const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const selectedFiles = Array.from(e.target.files);
        const result = await $ut.startUpload(selectedFiles);

        console.log("uploaded files", result);
    }

    return {
        inputProps: {
            onChange,
            multiple: ($ut.permittedFileInfo?.config?.image?.maxFileCount ?? 1) > 1,
            accept: "image/*",
        },
        isUploading: $ut.isUploading,
    };
}
function UploadSVG() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
        </svg>
    );
}
function LoadingSpinnerSVG() {
    return (<svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg"><circle className="spinner_S1WN" cx="4" cy="12" r="3" /><circle className="spinner_S1WN spinner_Km9P" cx="12" cy="12" r="3" /><circle className="spinner_S1WN spinner_JApP" cx="20" cy="12" r="3" /></svg>);
}

export function SimpleUploadButton() {
    const router = useRouter();

    const posthog = usePostHog();

    const { inputProps } = useUploadThingInputPrompts("imageUploader", {
        onUploadBegin() {
            posthog.capture("upload_begin");
            toast(
                <div className="flex gap-2 items-center">
                    <LoadingSpinnerSVG /> <span className="font-bold">Uploading...</span>
                </div>,
                {
                    duration: 10000,
                    id: "upload-begin",
                }
            )
        },
        onUploadError(error) {
            posthog.capture("upload_error", { error });
            toast.dismiss("upload-begin");
            toast.error("Upload failed (rate limited)!");
        },
        onClientUploadComplete() {
            toast.dismiss("upload-begin");
            toast("Upload complete!");
            router.refresh();
        },
    });

    return (
        <div>
            <label htmlFor="upload-button" className="cursor-pointer">
                <UploadSVG />
            </label>
            <input id="upload-button" type="file" className="sr-only" {...inputProps} />
        </div>
    )
}