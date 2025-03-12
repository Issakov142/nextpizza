import {pizzaSizes, type PizzaType} from '@/shared/constants/pizza';
import type {ProductWithRelations} from '../../../@types/prisma';
import type {Variant} from '@/shared/components/shared/group-variants';


export const getAvailablePizzaSizes = (items: ProductWithRelations['variants'], type: PizzaType): Variant[] => {
    const filteredPizzasByType = items.filter(item => item.pizzaType === type)
    return pizzaSizes.map(item => ({
        name: item.name,
        value: item.value,
        disabled: !filteredPizzasByType.some(pizza => pizza.size === +item.value)
    }))

}