import React from 'react';

interface Props {
    title: string
    products: any[]
    className?: string
    listClassName?: string
    categoryId: number
}

export const ProductsGroupList: React.FC<Props> = ({className}) => {
    return <div className={className}>

    </div>
}