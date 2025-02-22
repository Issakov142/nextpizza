'use client';

import React from 'react';
import {FilterCheckbox, type FilterCheckboxProps} from '@/components/shared/filter-checkbox';
import {Input} from '@/components/ui';


interface Props {
    title: string
    items: FilterCheckboxProps[]
    defaultItems: FilterCheckboxProps[]
    limit?: number
    searchInputPlaceholder?: string
    onChange?: (values: string[]) => void
    dafaultValue?: string[]
    className?: string
}

export const CheckboxFiltersGroup: React.FC<Props> = ({
                                                          title,
                                                          className,
                                                          dafaultValue,
                                                          defaultItems,
                                                          items,
                                                          limit = 5,
                                                          onChange,
                                                          searchInputPlaceholder = 'Поиск...'
                                                      }) => {
    const [showAll, setShowAll] = React.useState(true)
    const [searchValue, setSearchValue] = React.useState('')

    const itemsForRendering = showAll ? items.filter((item) => item.text.toLowerCase().includes(searchValue.toLowerCase())) : defaultItems.slice(0, limit)

    const onChangeSearchInput = (value: string) => {
        setSearchValue(value)
    }
    return (
        <div className={className}>
            <p className={'font-bold mb-3'}>{title}</p>
            {showAll && (
                <div className={'mb-5'}>
                    <Input onChange={e => onChangeSearchInput(e.currentTarget.value)}
                           placeholder={searchInputPlaceholder} className={'bg-gray-50 border-none'}/>
                </div>
            )}
            <div className={'flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar'}>
                {itemsForRendering.map((item, index) => {
                    return (
                        <FilterCheckbox
                            onCheckedChange={(lll) => console.log(lll)}
                            checked={false}
                            // key={String(item.value)}
                            key={index}
                            value={item.value}
                            text={item.text}
                            endAdornment={item.endAdornment}
                        />
                    )
                })
                }
            </div>
            {items.length > limit && (
                <div className={showAll ? 'border-t border-t-neutral-100 mt-4' : ''}>
                    <button onClick={() => setShowAll(!showAll)} className={'text-primary mt-3'}>
                        {showAll ? 'Скрыть' : '+ Показать все'}
                    </button>
                </div>
            )}
        </div>
    )
}