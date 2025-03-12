import React from 'react';
import type {PizzaSize, PizzaType} from '@/shared/constants/pizza';
import type {Variant} from '@/shared/components/shared/group-variants';
import {useSet} from 'react-use';
import {getAvailablePizzaSizes} from '@/shared/lib';
import {ProductVariation} from '@prisma/client';

interface ReturnProps {
    size: PizzaSize
    type: PizzaType
    selectedIngredients: Set<number>
    availableSizes: Variant[]
    currentItemId?: number
    setSize: (size: PizzaSize) => void
    setType: (size: PizzaType) => void
    addIngredient: (id: number) => void
}

export const usePizzaOptions = (items: ProductVariation[]): ReturnProps => {

    const [size, setSize] = React.useState<PizzaSize>(20)
    const [type, setType] = React.useState<PizzaType>(1)
    const [selectedIngredients, {toggle: addIngredient}] = useSet(new Set<number>([]))

    const availableSizes = getAvailablePizzaSizes(items, type)

    const currentItemId = items.find(item => item.pizzaType === type && item.size === size)?.id

    React.useEffect(() => {
        const isSizeAvailable = availableSizes?.find(item => +item.value === size && !item.disabled)

        const availableSize = availableSizes?.find((item) => !item.disabled)

        if (!isSizeAvailable && availableSize) {
            setSize(+availableSize.value as PizzaSize)
        }


    }, [type])

    return {
        size,
        type,
        setSize,
        setType,
        addIngredient,
        selectedIngredients,
        availableSizes,
        currentItemId
    }
}