'use client'

import React, {useEffect} from 'react';
import {Title} from '@/components/shared/title';
import {cn} from '@/lib/utils';
import {ProductCard} from '@/components/shared/product-card';
import {useIntersection} from 'react-use';
import {useCategoryStore} from '@/store/category';

interface Props {
    title: string
    products: any[]
    className?: string
    listClassName?: string
    categoryId: number
}

export const ProductsGroupList: React.FC<Props> = ({className, categoryId, listClassName, products, title}) => {


    const setActiveCategoryId = useCategoryStore(state => state.setActiveId)

    const intersectionRef = React.useRef(null);
    const intersection = useIntersection(intersectionRef, {

        threshold: 0.4,
    });

    useEffect(() => {
        if (intersection?.isIntersecting){
            // console.log(title, categoryId)
            setActiveCategoryId(categoryId)
        }

    }, [intersection?.isIntersecting]);

    return <div className={className} id={title}  ref={intersectionRef}>
        <Title text={title} size={'lg'} className={'font-extrabold mb-5'}/>

        <div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
            {products.map((product) => {
                return (
                    <ProductCard key={product.id} id={product.id} name={product.name} price={product.variants[0].price} imageUrl={product.imageUrl}/>
                )
            })}
        </div>
    </div>
}