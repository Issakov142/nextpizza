import React from 'react';
import {cn} from '@/shared/lib/utils';
import {PizzaImage} from '@/shared/components/shared/pizza-image';
import {Title} from '@/shared/components/shared/title';
import {Button} from '@/shared/components/ui';
import {GroupVariants} from '@/shared/components/shared/group-variants';
import {type PizzaSize, type PizzaType, pizzaTypes} from '@/shared/constants/pizza';
import {type Ingredient, ProductVariation} from '@prisma/client';
import {IngredientItem} from '@/shared/components/shared/ingredient-item';
import {usePizzaOptions} from '@/shared/hooks/use-pizza-options';
import {getPizzaDetalis} from '@/shared/lib/get-pizza-detalis';


interface Props {
    imageUrl: string
    className?: string
    name: string
    loading?: boolean
    ingredients: Ingredient[]
    items: ProductVariation[]
    onSubmit: (itemId: number, ingredients: number[]) => void
}


/**
 * Форма выбора пиццы
 */
export const ChoosePizzaForm: React.FC<Props> = ({className, loading, imageUrl,ingredients, items, name, onSubmit}) => {


    const {type,size, setType, availableSizes: availablePizzaSizes,currentItemId, selectedIngredients, addIngredient, setSize} = usePizzaOptions(items)

    const {textDetails, totalPrice } = getPizzaDetalis(items, type, size, ingredients, selectedIngredients)


    const handleClickAdd = () => {
        if (currentItemId) {
            onSubmit(currentItemId, Array.from(selectedIngredients))
        }

    }
    return (
        <div className={cn('flex flex-1', className)}>
            <PizzaImage imageUrl={imageUrl} size={size}/>
            <div className={'w-[490px] bg-[#f7f6f5] p-7'}>
                <Title text={name} size={'md'} className={'font-extrabold mb-1'}/>
                <p className={'text-gray-400'}>{textDetails}</p>

                <div className={'flex flex-col gap-4 mt-5'}>
                    <GroupVariants items={availablePizzaSizes} selectedValue={String(size)}
                                   onClick={value => setSize(Number(value) as PizzaSize)}/>
                    <GroupVariants items={pizzaTypes} selectedValue={String(type)}
                                   onClick={value => setType(Number(value) as PizzaType)}/>
                </div>

                <div className={'bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5'}>
                    <div className={'grid grid-cols-3 gap-3'}>
                        {ingredients.map((ingredient) => {
                            return (
                                <IngredientItem key={ingredient.id}
                                                imageUrl={ingredient.imageUrl}
                                                name={ingredient.name}
                                                price={ingredient.price}
                                                active={selectedIngredients.has(ingredient.id)}
                                                onClick={()=> addIngredient(ingredient.id)}>
                                </IngredientItem>
                            )
                        })}
                    </div>
                </div>


                <Button loading={loading} className={'h-[55px] px-10 text-base rounded-[18px] w-full mt-10'} onClick={handleClickAdd}>
                    Добавить в корзину за {totalPrice} ₽
                </Button>
            </div>
        </div>
    )
}