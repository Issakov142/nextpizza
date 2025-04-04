import React from 'react';
import qs from 'qs';
import {useRouter} from 'next/navigation';
import type {Filters} from '@/shared/hooks/use-filters';

export const useQueryFilters = (args: Filters) =>{
    const isMounted = React.useRef(false)
    const {selectedIngredients, pizzaTypes, prices, sizes} = args
    const router = useRouter()


    React.useEffect(() => {
        if (isMounted.current) {
            const ps = {...prices}
            const filters = {
                ...prices,
                // priceFrom: [prices.priceFrom || null],
                // priceTo: [prices.priceTo || null],
                pizzaTypes: Array.from(pizzaTypes),
                sizes: Array.from(sizes),
                ingredients: Array.from(selectedIngredients)

            }

            const queryString = qs.stringify(filters, {
                arrayFormat: 'comma',
            })
            router.push(`?${queryString}`, {scroll: false})
        }

        isMounted.current = true

    }, [prices, pizzaTypes, sizes, selectedIngredients])
}