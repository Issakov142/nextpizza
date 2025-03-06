import React from 'react';
import {cn} from '@/lib/utils';
import {PizzaImage} from '@/components/shared/pizza-image';
import {Title} from '@/components/shared/title';
import {Button} from '@/components/ui';


interface Props {
    imageUrl: string
    className?: string
    name: string
    ingredients: any[]
    items?: any[]
    onClickAdd?: VoidFunction
}

export const ChoosePizzaForm: React.FC<Props> = ({className, imageUrl, ingredients, items, name, onClickAdd}) => {
    const textDetails = '30 см, традиционное тесто 30'
    const totalPrice = 450
    const size = 20
    return (
        <div className={cn('flex flex-1', className)}>
            <PizzaImage imageUrl={imageUrl} size={size}/>
            <div className={'w-[490px] bg-[#f7f6f5] p-7'}>
                <Title text={name} size={'md'} className={'font-extrabold mb-1'}/>
                <p className={'text-gray-400'}>{textDetails}</p>
                <Button className={'h-[55px] px-10 text-base rounded-[18px] w-full mt-10'}>
                    Добавить в корзину за {totalPrice} P
                </Button>
            </div>
        </div>
    )
}