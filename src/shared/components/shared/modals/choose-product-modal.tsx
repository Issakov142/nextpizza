'use client'

import React from 'react';
import {cn} from '@/shared/lib/utils';
import {Dialog, DialogContent} from '@/shared/components/ui/dialog';
import {useRouter} from 'next/navigation';
import {ChooseProductForm} from '@/shared/components/shared/choose-product-form';
import type {ProductWithRelations} from '../../../../../@types/prisma';
import {ChoosePizzaForm} from '@/shared/components/shared';
import {useCartStore} from '@/shared/store';
import toast from 'react-hot-toast';

interface Props {
    product: ProductWithRelations
    className?: string
}

export const ChooseProductModal: React.FC<Props> = ({product, className}) => {
    const router = useRouter()
    const firstVariant = product.variants[0]
    const isPizzaForm = Boolean(firstVariant.pizzaType)

    const addCartItem = useCartStore(state => state.addCartItem)
    const loading = useCartStore(state => state.loading)


    // const onAddProduct = () => {
    //     addCartItem({
    //         productVariantId: firstVariant.id,
    //     })
    // }
    //
    // const onAddPizza = async (productItemId: number, ingredients: number[]) => {
    //     try {
    //         await addCartItem({
    //             productVariantId: productItemId,
    //             ingredients
    //         })
    //         toast.success('Пицца добавлена в корзину')
    //         router.back()
    //     } catch (e) {
    //         toast.error('Не удалось добавить пиццу в корзину')
    //         console.error(e)
    //     }
    // }

    const onSubmit = async (productItemId?: number, ingredients?: number[]) => {


        try {
            const itemId = productItemId ?? firstVariant.id

            await addCartItem({
                productVariantId: itemId,
                ingredients
            })
            toast.success(product.name + ' добавлена в корзину')
            router.back()
        } catch (e) {
            toast.error('Не удалось добавить товар в корзину')
            console.error(e)
        }
    }


    return (
        <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
            <DialogContent
                className={cn('p-0 w-[1060px] max-w-[1060px] min-h-[550px] bg-white overflow-hidden', className)}>
                {isPizzaForm ?
                    <ChoosePizzaForm imageUrl={product.imageUrl}
                                     name={product.name}
                                     ingredients={product.ingredients}
                                     items={product.variants}
                                     loading={loading}
                                     onSubmit={onSubmit}/> :
                    <ChooseProductForm imageUrl={product.imageUrl}
                                       name={product.name}
                                       onSubmit={onSubmit}
                                       loading={loading}
                                       price={firstVariant.price}/>
                }
            </DialogContent>
        </Dialog>
    )
}