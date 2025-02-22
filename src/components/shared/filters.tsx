import React from 'react';
import {Title} from '@/components/shared/title';
import {FilterCheckbox} from '@/components/shared';
import {Input} from '@/components/ui';
import {RangeSlider} from '@/components/shared/range-slider';
import {CheckboxFiltersGroup} from '@/components/shared';

interface Props {
    className?: string
}

export const Filters: React.FC<Props> = ({className}) => {
    return (
        <div className={className}>
            <Title text={'Фильтрация'} size={'sm'} className={'mb-5 font-bold'}/>

            {/*Верхние чекбоксы*/}
            <div className={'flex flex-col gap-4'}>
                <FilterCheckbox text={'Можно собирать'} value={'1'}/>
                <FilterCheckbox text={'Новинки'} value={'2'}/>
            </div>

            {/*Фильтр цен*/}
            <div className={'mt-5 border-y border-y-neutral-100 py-6 pb-7'}>
                <p className={'font-bold mb-3'}>Цена от и до:</p>
                <div className={'flex gap-3 mb-5'}>
                    <Input type={'number'} placeholder={'0'} min={0} max={3000} defaultValue={0}/>
                    <Input type={'number'} placeholder={'30000'} min={0} max={3000}/>
                </div>
                <RangeSlider min={0} max={5000} step={10} value={[0, 5000]}/>
            </div>
            {/*Фильтр ингредиентов*/}
            <CheckboxFiltersGroup
                title={'Ингредиенты'}
                className={'mt-5'}
                limit={6}
                defaultItems={[
                    {text: 'Сырный соус', value: '1'},
                    {text: 'Томаты', value: '2'},
                    {text: 'Солёные огурчики', value: '3'},
                    {text: 'Красный лук', value: '4'},
                    {text: 'Моццарелла', value: '5'},
                    {text: 'Чеснок', value: '6'},
                ]}
                items={[
                    {text: 'Сырный соус', value: '1'},
                    {text: 'Томаты', value: '2'},
                    {text: 'Солёные огурчики', value: '3'},
                    {text: 'Красный лук', value: '4'},
                    {text: 'Моццарелла', value: '5'},
                    {text: 'Чеснок', value: '6'}, {text: 'Сырный соус', value: '1'},
                    {text: 'Томаты', value: '2'},
                    {text: 'Солёные огурчики', value: '3'},
                    {text: 'Красный лук', value: '4'},
                    {text: 'Моццарелла', value: '5'},
                    {text: 'Чеснок', value: '6'}, {text: 'Сырный соус', value: '1'},
                    {text: 'Томаты', value: '2'},
                    {text: 'Солёные огурчики', value: '3'},
                    {text: 'Красный лук', value: '4'},
                    {text: 'Моццарелла', value: '5'},
                    {text: 'Чеснок', value: '6'},
                ]}/>
        </div>
    )
}