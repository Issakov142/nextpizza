'use client'

import React from 'react';
import {Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger} from '@/shared/components/ui/sheet';
import Link from 'next/link';
import {Button} from '@/shared/components/ui';
import {ArrowRight} from 'lucide-react';
import {CartDrawerItem} from '@/shared/components/shared/cart-drawer-item';
import {getCartItemDetails} from '@/shared/lib';
import {useCartStore} from '@/shared/store/';
import type {PizzaSize, PizzaType} from '@/shared/constants/pizza';


interface Props {
    className?: string
}

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({ children}) => {
// const [totalAmount ,fetchCartItems, items]  = useCartStore(state => [state.totalAmount, state.fetchCartItems, state.items])

    const totalAmount = useCartStore(state => state.totalAmount);
    const fetchCartItems = useCartStore(state => state.fetchCartItems);
    const updateItemQuantity = useCartStore(state => state.updateItemQuantity);
    const removeCartItem = useCartStore(state => state.removeCartItem);
    const items = useCartStore(state => state.items);

    React.useEffect(()=>{
        fetchCartItems()
    }, [])

    const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
        const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1
        updateItemQuantity(id, newQuantity)
    }

    return (

        <Sheet>
            <SheetTrigger asChild>{children}</SheetTrigger>
            <SheetContent className={'flex flex-col justify-between pb-0 bg-[#F4F1EE]'}>
                <SheetHeader>

                    <SheetTitle>
                        В корзине <span className={'font-bold'}>{items.length} товара</span>
                    </SheetTitle>
                </SheetHeader>

                {/* Items */}

                <div className={'-mx-6 mt-5 overflow-auto flex-1'}>

                        {
                            items.map((item)=> (
                                <div key={item.id} className={'mb-2'}>
                                    <CartDrawerItem id={item.id}
                                                    imageUrl={item.imageUrl}
                                                    details={item.pizzaSize && item.pizzaType ? getCartItemDetails(
                                                        item.ingredients,
                                                        item.pizzaType as PizzaType,
                                                        item.pizzaSize as PizzaSize) : ''}
                                                    name={item.name}
                                                    price={item.price}
                                                    onClickCountButton={type => onClickCountButton(item.id, item.quantity, type)}
                                                    onClickRemove={() => {
                                                        removeCartItem(item.id)
                                                    }}
                                                    quantity={item.quantity}/>
                                </div>

                                    ))

                                    }
                            </div>

                            <SheetFooter className={'-mx-6 bg-white p-8'}>
                    <div className={'w-full'}>

                        <div className={'flex mb-4'}>
                            <span className={'flex flex-1 text-lg text-nautral-500'}>
                            Итого
                                <div
                                    className={'flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2'}/>
                            </span>
                            <span className={'font-bold text-lg'}>{totalAmount} ₽</span>
                        </div>

                        <Link href={'/cart'}>
                            <Button type={'submit'}
                                    className={'w-full h-12 text-base'}>
                                Оформить заказ
                                <ArrowRight className={'w-5 ml-2'}/>
                            </Button>

                        </Link>

                    </div>

                </SheetFooter>

            </SheetContent>
        </Sheet>

    );
};

