'use client'

import React from 'react';
import {cn} from '@/shared/lib/utils';
import {Dialog, DialogContent, DialogTitle} from '@/shared/components/ui/dialog';
import {useRouter} from 'next/navigation';
import type {ProductWithRelations} from '../../../../../@types/prisma';
import {ProductForm} from '@/shared/components/shared';

interface Props {
    product: ProductWithRelations
    className?: string
}

export const ChooseProductModal: React.FC<Props> = ({product, className}) => {
    const router = useRouter()


    return (
        <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
            <DialogTitle>Title for screen readers</DialogTitle>
            <DialogContent
                className={cn('p-0 w-[1060px] max-w-[1060px] min-h-[550px] bg-white overflow-hidden', className)}>
                <ProductForm product={product} onSubmit={()=>{router.back()}}/>
            </DialogContent>
        </Dialog>
    )
}