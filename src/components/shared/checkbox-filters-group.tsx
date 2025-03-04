'use client';

import React from 'react';
import {FilterCheckbox, type FilterCheckboxProps} from '@/components/shared/filter-checkbox';
import {Input, Skeleton} from '@/components/ui';


interface Props {
    title: string
    items: FilterCheckboxProps[]
    defaultItems?: FilterCheckboxProps[]
    limit?: number
    loading?: boolean
    searchInputPlaceholder?: string
    onClickCheckbox?: (id: string) => void
    dafaultValue?: string[]
    selectedValues?: Set<string>
    className?: string
    name?: string
}

export const CheckboxFiltersGroup: React.FC<Props> = ({
                                                          title,
                                                          className,
                                                          dafaultValue,
                                                          defaultItems,
                                                          items,
                                                          name,
                                                          selectedValues,
                                                          limit = 5,
                                                          onClickCheckbox,
                                                          loading,
                                                          searchInputPlaceholder = 'Поиск...'
                                                      }) => {
    const [showAll, setShowAll] = React.useState(false)
    const [searchValue, setSearchValue] = React.useState('')

    if (loading) {
        return <div className={className}>
            <p className={'font-bold mb-3'}>{title}</p>
            {
                ...Array(limit).fill(null).map((_, index) => <Skeleton key={index}
                                                                       className={'h-6 mb-4 rounded-[8px]'}/>)
            }
            <Skeleton className={'w-28 h-6 mb-4 rounded-[8px]'}/>
        </div>
    }

    const itemsForRendering = showAll ? items.filter((item) => item.text.toLowerCase().includes(searchValue.toLowerCase())) : (defaultItems || items).slice(0, limit)

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
                            onCheckedChange={() => {
                                onClickCheckbox?.(item.value)
                            }}
                            checked={selectedValues?.has(item.value)}
                            // key={String(item.value)}
                            key={index}
                            value={item.value}
                            text={item.text}
                            name={name}
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