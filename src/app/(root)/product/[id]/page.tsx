import {prisma} from '../../../../../prisma/prisma-client';
import {notFound} from 'next/navigation';
import {Container, ProductForm} from '@/shared/components/shared';
import React from 'react';

export default async function ProductPage(props: { params: Promise<{ id: string }> }) {

    const { id } = await props.params;
    const product = await prisma.product.findFirst({
        where: {
            id: Number(id)
            },
        include: {
            ingredients: true,
            category: {
                include: {
                    products: {
                        include: {
                            variants: true
                        }
                    }
                }
            },
            variants: true,
        }})

    if (!product) {
        return notFound()
    }


    return (
        <Container className={'flex flex-col my-10'}>
            <ProductForm product={product}/>
        </Container>
    )
}