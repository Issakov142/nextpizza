import {useSearchParams} from 'next/navigation';
import {useSet} from 'react-use';
import React from 'react';

export interface PriceProps {
    priceFrom?: number
    priceTo?: number
}

interface QueryFilters extends PriceProps {
    pizzaTypes: string
    sizes: string
    ingredients: string
}

export interface Filters {
    sizes: Set<string>
    pizzaTypes: Set<string>
    selectedIngredients: Set<string>
    prices: PriceProps
}
interface ReturnProps extends Filters {
    setPrices: (arg: {priceFrom: number, priceTo: number}) => void
    updatePrice:(name: keyof PriceProps, value: number) => void
    setSizes: (value: string) => void
    setPizzaTypes: (value: string) => void
    setSelectedIngredients: (value: string) => void
}

export const useFilters = ():ReturnProps => {

    const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>


    /*Ingredients filter*/
    const [selectedIngredients, {toggle: toggleSelectedIngredients}] = useSet(new Set<string>(searchParams.get('ingredients')?.split(',')));

    /*Tiesto size filter*/
    const [sizes, {toggle: toggleSizes}] = useSet(new Set<string>(searchParams.get('sizes') ? searchParams.get('sizes')?.split(',') : []));

    /*Tiesto type filter*/
    const [pizzaTypes, {toggle: togglePizzaTypes}] = useSet(new Set<string>(searchParams.get('pizzaTypes') ? searchParams.get('pizzaTypes')?.split(',') : []));

    /*Prices filter*/
    const [prices, setPrices] = React.useState<PriceProps>({
        priceFrom: Number(searchParams.get('priceFrom') || undefined),
        priceTo: Number(searchParams.get('priceTo') || undefined)
    })

    const updatePrice = (name: keyof PriceProps, value: number) => {
        setPrices(prev => ({
            ...prev,
            [name]: value,
        }))
    }
    return {
        sizes,
        pizzaTypes,
        prices,
        selectedIngredients,
        setPrices,
        updatePrice,
        setPizzaTypes: togglePizzaTypes,
        setSizes: toggleSizes,
        setSelectedIngredients: toggleSelectedIngredients
    }
}