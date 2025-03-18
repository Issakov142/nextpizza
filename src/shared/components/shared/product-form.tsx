'use client'

import React from 'react'
import {useCartStore} from '@/shared/store';
import toast from 'react-hot-toast';
import type {ProductWithRelations} from '../../../../@types/prisma';
import {ChoosePizzaForm} from '@/shared/components/shared/choose-pizza-form';
import {ChooseProductForm} from '@/shared/components/shared/choose-product-form';

interface Props {
    product: ProductWithRelations
    className?: string
    onSubmit?: VoidFunction
}

export const ProductForm: React.FC<Props> = ({className, product, onSubmit: _onSubmit}) => {
    const addCartItem = useCartStore(state => state.addCartItem)
    const loading = useCartStore(state => state.loading)

    const firstVariant = product.variants[0]
    const isPizzaForm = Boolean(firstVariant.pizzaType)

    const onSubmit = async (productItemId?: number, ingredients?: number[]) => {


        try {
            const itemId = productItemId ?? firstVariant.id

            await addCartItem({
                productVariantId: itemId,
                ingredients
            })
            toast.success(product.name + ' добавлена в корзину')

            _onSubmit?.()
        } catch (e) {
            toast.error('Не удалось добавить товар в корзину')
            console.error(e)
        }
    }


    if (isPizzaForm) {
        return <ChoosePizzaForm imageUrl={product.imageUrl}
                                name={product.name}
                                ingredients={product.ingredients}
                                items={product.variants}
                                loading={loading}
                                onSubmit={onSubmit}/>
    }
    return <ChooseProductForm imageUrl={product.imageUrl}
                              name={product.name}
                              onSubmit={onSubmit}
                              loading={loading}
                              price={firstVariant.price}/>
}