'use client'

import React from 'react';
import {Title} from '@/components/shared/title';
import {Input} from '@/components/ui';
import {RangeSlider} from '@/components/shared/range-slider';
import {CheckboxFiltersGroup} from '@/components/shared';
import {useFilterIngredients} from '@/hooks/useFilterIngredients';
import {useSet} from 'react-use';

interface Props {
    className?: string
}

interface PriceProps {
    priceFrom: number
    priceTo: number
}

export const Filters: React.FC<Props> = ({className}) => {
    const {ingredients, loading, onAddId, selectedIngredients} = useFilterIngredients()
    const [prices, setPrice] = React.useState<PriceProps>({priceFrom: 0, priceTo: 5000})
    const [sizes, {toggle: toggleSizes}] = useSet(new Set<string>([]));
    const [pizzaTypes, {toggle: togglePizzaTypes}] = useSet(new Set<string>([]));

    const items = ingredients.map((i)=>({text: i.name, value: String(i.id)}) )

    const updatePrice = (name: keyof PriceProps, value: number) => {
        setPrice({
            ...prices,
            [name]: value,
        })
    }

    React.useEffect(()=>{
        console.log({prices, sizes, pizzaTypes, ingredients, selectedIngredients})
    }, [prices, sizes, pizzaTypes, ingredients, selectedIngredients])

    return (
        <div className={className}>
            <Title text={'Фильтрация'} size={'sm'} className={'mb-5 font-bold'}/>

            {/*Верхние чекбоксы*/}
            <CheckboxFiltersGroup
                title={'Тип теста'}
                name={'pizzaTypes'}
                className={'mb-5'}
                selectedValues={pizzaTypes}
                onClickCheckbox={togglePizzaTypes}
                items={[
                    {text: 'Тонкое', value: '1'},
                    {text: 'Традиционное', value: '2'},
                ]}/>
            <CheckboxFiltersGroup
                title={'Размеры'}
                name={'sizes'}
                className={'mb-5'}
                selectedValues={sizes}
                onClickCheckbox={toggleSizes}
                items={[
                    {text: '20см', value: '20'},
                    {text: '30см', value: '30'},
                    {text: '40см', value: '40'}
                ]}/>

            {/*Фильтр цен*/}
            <div className={'mt-5 border-y border-y-neutral-100 py-6 pb-7'}>
                <p className={'font-bold mb-3'}>Цена от и до:</p>
                <div className={'flex gap-3 mb-5'}>
                    <Input type={'number'} placeholder={'0'} min={0} max={5000} value={prices.priceFrom.toString()} onChange={e => updatePrice('priceFrom', Number(e.currentTarget.value))}/>
                    <Input type={'number'} placeholder={'30000'} min={0} max={5000} value={prices.priceTo.toString()} onChange={e => updatePrice('priceTo', Number(e.currentTarget.value))}/>
                </div>
                <RangeSlider min={0} max={5000} step={10} value={[prices.priceFrom, prices.priceTo]} onValueChange={([from, to])=> setPrice({priceFrom: from, priceTo: to})}/>
            </div>
            {/*Фильтр ингредиентов*/}
            <CheckboxFiltersGroup
                title={'Ингредиенты'}
                name={'ingredients'}
                className={'mt-5'}
                limit={6}
                defaultItems={items.slice(0, 6)}
                loading={loading}
                onClickCheckbox={onAddId}
                selectedValues={selectedIngredients}
                items={items}/>
        </div>
    )
}