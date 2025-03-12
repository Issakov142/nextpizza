'use client'

import React from 'react';
import {Title} from '@/shared/components/shared/title';
import {Input} from '@/shared/components/ui';
import {RangeSlider} from '@/shared/components/shared/range-slider';
import {CheckboxFiltersGroup} from '@/shared/components/shared/index';
import {useIngredients} from '@/shared/hooks/use-ingredients';
import {useFilters, useQueryFilters} from '../../hooks';

interface Props {
    className?: string
}


export const Filters: React.FC<Props> = ({className}) => {

    const {ingredients, loading} = useIngredients()
    const {
        updatePrice,
        selectedIngredients,
        prices,
        pizzaTypes,
        setSelectedIngredients,
        setPizzaTypes,
        setSizes,
        sizes
    } = useFilters()

    useQueryFilters({sizes, pizzaTypes, prices, selectedIngredients})

    const items = ingredients.map((i) => ({text: i.name, value: String(i.id)}))

    const setPrices = (prices: number[]) => {
        console.log(prices, 999);
        updatePrice('priceFrom', prices[0]);
        updatePrice('priceTo', prices[1]);
    };

    return (
        <div className={className}>
            <Title text={'Фильтрация'} size={'sm'} className={'mb-5 font-bold'}/>

            {/*Верхние чекбоксы*/}
            <CheckboxFiltersGroup
                title={'Тип теста'}
                name={'pizzaTypes'}
                className={'mb-5'}
                selectedValues={pizzaTypes}
                onClickCheckbox={setPizzaTypes}
                items={[
                    {text: 'Тонкое', value: '1'},
                    {text: 'Традиционное', value: '2'},
                ]}/>
            <CheckboxFiltersGroup
                title={'Размеры'}
                name={'sizes'}
                className={'mb-5'}
                selectedValues={sizes}
                onClickCheckbox={setSizes}
                items={[
                    {text: '20см', value: '20'},
                    {text: '30см', value: '30'},
                    {text: '40см', value: '40'}
                ]}/>

            {/*Фильтр цен*/}
            <div className={'mt-5 border-y border-y-neutral-100 py-6 pb-7'}>
                <p className={'font-bold mb-3'}>Цена от и до:</p>
                <div className={'flex gap-3 mb-5'}>
                    <Input type={'number'} placeholder={'0'} min={0} max={5000} value={String(prices.priceFrom)}
                           onChange={e => updatePrice('priceFrom', Number(e.currentTarget.value))}/>
                    <Input type={'number'} placeholder={'5000'} min={0} max={5000} value={String(prices.priceTo)}
                           onChange={e => updatePrice('priceTo', Number(e.currentTarget.value))}/>
                </div>
                <RangeSlider min={0} max={5000} step={10} value={[prices.priceFrom || 0, prices.priceTo || 5000]}
                             onValueChange={setPrices}/>
            </div>
            {/*Фильтр ингредиентов*/}
            <CheckboxFiltersGroup
                title={'Ингредиенты'}
                name={'ingredients'}
                className={'mt-5'}
                limit={6}
                defaultItems={items.slice(0, 6)}
                loading={loading}
                onClickCheckbox={setSelectedIngredients}
                selectedValues={selectedIngredients}
                items={items}/>
        </div>
    )
}