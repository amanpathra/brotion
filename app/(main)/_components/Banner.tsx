"use client";

import { ConfirmModal } from "@/components/modals/ConfirmModal";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface BannerProps {
    documentId: Id<"documents">
}

export const Banner = ({
    documentId
}: BannerProps) => {

    const router = useRouter();
    const restore = useMutation(api.documents.restore);
    const remove = useMutation(api.documents.remove);

    const onRemove = () => {
        const promise = remove({ id: documentId })
            .then(() => {
                router.push('/documents')
            })

        toast.promise(promise, {
            loading: "Deleting note...",
            success: "Note deleted!",
            error: "Failed to delete note."
        })
    }

    const onRestore = () => {
        const promise = restore({ id: documentId });

        toast.promise(promise, {
            loading: "Restoring note...",
            success: "Note restored!",
            error: "Failed to restore note."
        })
    }

    return (
        <div
            className="w-full bg-rose-500 text-center text-sm p-2 text-white flex items-center gap-x-2 justify-center"
        >
            <p>
                This page is in the trash.
            </p>
            <Button
                size='sm'
                onClick={onRestore}
                variant='outline'
                className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto"
            >
                Restore page
            </Button>
            <ConfirmModal onConfirm={onRemove}>
                <Button
                    size='sm'
                    variant='outline'
                    className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto"
                >
                    Delete forever
                </Button>
            </ConfirmModal>

        </div>
    )
}