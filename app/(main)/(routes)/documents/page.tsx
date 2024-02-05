'use client';

import { Button } from '@/components/ui/button';
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/clerk-react';
import { useMutation } from 'convex/react';
import { PlusCircle } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react'
import { toast } from 'sonner';

const DocumentsPage = () => {

    const router = useRouter();
    const {user} = useUser();
    const create = useMutation(api.documents.create);
    
    const onCreate = () => {
        const promise = create({ title: "Untitled" })
            .then((documentId) => {
                router.push(`/documents/${documentId}`)
            })


        toast.promise(promise, {
            loading: 'Creating a new note...',
            success: 'New note cteated',
            error: 'Failed to create a new note'
        })
    }
    
    return (
        <div className='h-full flex justify-center items-center flex-col space-y-4'>
            <Image
                src='/empty.png'
                height={300}
                width={300}
                alt='Empty'
                className='dark:hidden'
            />
            <Image
                src='/empty-dark.png'
                height={300}
                width={300}
                alt='Empty'
                className='dark:block hidden'
            />
            <h2>
                Welcome to {user?.firstName}&apos;s Brotion
            </h2>
            <Button onClick={onCreate}>
                <PlusCircle className='h-4 w-4 mr-2'/>
                Create a note
            </Button>
        </div>
    )
}

export default DocumentsPage