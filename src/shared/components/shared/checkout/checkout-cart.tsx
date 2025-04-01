import React from 'react';
import {CheckoutItem, CheckoutItemSkeleton, WhiteBlock} from '@/shared/components/shared';
import {getCartItemDetails} from '@/shared/lib';
import type {PizzaSize, PizzaType} from '@/shared/constants/pizza';
import type {CartStateItem} from '@/shared/lib/get-cart-details';

interface Props {
    items: CartStateItem[]
    onClickCountButton: (id: number, quantity: number, type: 'plus' | 'minus') => void
    removeCartItem: (id: number) => void
    className?: string
    loading?: boolean
}

export const CheckoutCart: React.FC<Props> = ({items, loading, onClickCountButton, removeCartItem, className}) => {
    return (
        <WhiteBlock title={'1.Корзина'} className={className}>
            <div className={'flex flex-col gap-5'}>
                {
                    loading && [...Array(4)].map((_, index) => <CheckoutItemSkeleton key={index}/>)
                }

                {
                    !loading && items.length > 0 && items.map((item) => (
                            <CheckoutItem key={item.id}
                                          id={item.id}
                                          imageUrl={item.imageUrl}
                                          details={getCartItemDetails(
                                              item.ingredients,
                                              item.pizzaType as PizzaType,
                                              item.pizzaSize as PizzaSize)}
                                          name={item.name}
                                          price={item.price}
                                          quantity={item.quantity}
                                          disabled={item.disabled}
                                          onClickCountButton={type => onClickCountButton(item.id, item.quantity, type)}
                                          onClickRemove={() => {
                                              removeCartItem(item.id)
                                          }}
                            />
                        )
                    )
                }
            </div>

        </WhiteBlock>
    );
};