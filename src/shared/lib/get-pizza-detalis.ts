import {calcTotalPizzaPrice} from '@/shared/lib/calc-total-pizza-price';
import {mapPizzaType, type PizzaSize, type PizzaType} from '@/shared/constants/pizza';
import type {ProductWithRelations} from '../../../@types/prisma';

export const getPizzaDetalis = (
    items: ProductWithRelations['variants'],
    type: PizzaType,
    size: PizzaSize,
    ingredients: ProductWithRelations['ingredients'],
    selectedIngredients: Set<number>) => {

    const totalPrice = calcTotalPizzaPrice(items, type, size, ingredients, selectedIngredients)
    const textDetails = `${size} см, ${mapPizzaType[type]} тесто`

    return {totalPrice, textDetails}
}