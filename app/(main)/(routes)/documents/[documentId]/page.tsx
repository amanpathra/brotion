"use client";

import { Cover } from "@/components/cover";
import { Toolbar } from "@/components/toolbar";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import dynamic from "next/dynamic";
import { useMemo } from "react";

interface DocumentIdPageProps {
    params: {
        documentId: Id<"documents">;
    }
}

const DocumentIdPage = ({
    params
}: DocumentIdPageProps) => {

    const Editor = useMemo(() => dynamic(() => import("@/components/editor"), {ssr: false}), [])

    const update = useMutation((api.documents.update));

    const onChange = (content: string) => {
        update({
            id: params.documentId,
            content
        })
    }

    const document = useQuery(api.documents.getById, {
        id: params.documentId
    })

    // If the document is laoding
    if (document === undefined) {
        return (
            <div>
                <Cover.Skeleton />
                <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-4">
                    <div className="space-y-4 pl-8 pt-4">
                        <Skeleton className="h-14 w-[50%]"/>
                        <Skeleton className="h-4 w-[90%]"/>
                        <Skeleton className="h-4 w-[70%]"/>
                        <Skeleton className="h-4 w-[80%]"/>
                    </div>
                </div>
            </div>

        )
    }

    // If the document is not found
    if (document === null) {
        return (
            <p>Not found</p>
        )
    }

    return (
        <div className="pb-40">
            <Cover url={document.coverImage} />
            <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
                <Toolbar initialData={document} />
                <Editor
                    onChange={onChange}
                    initialContent={document.content}
                />
            </div>
        </div>
    )
}

export default DocumentIdPage