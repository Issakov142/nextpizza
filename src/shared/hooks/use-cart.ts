import React from 'react';
import {useCartStore} from '@/shared/store';
import type {CreateCartItemValues} from '@/shared/services/dto/cart.dto';
import type {CartStateItem} from '@/shared/lib/get-cart-details';

type ReturnProps = {
    totalAmount: number;
    items: CartStateItem[];
    loading: boolean;
    updateItemQuantity: (id: number, quantity: number) => void;
    removeCartItem: (id: number) => void;
    addCartItem: (values: CreateCartItemValues) => void;
}

export const useCart = (): ReturnProps => {

    // const totalAmount = useCartStore(state => state.totalAmount);
    // const fetchCartItems = useCartStore(state => state.fetchCartItems);
    // const updateItemQuantity = useCartStore(state => state.updateItemQuantity);
    // const removeCartItem = useCartStore(state => state.removeCartItem);
    // const addCartItem = useCartStore(state => state.addCartItem);
    // const items = useCartStore(state => state.items);
    // const loading = useCartStore(state => state.loading);

    const cartState  = useCartStore(state => state)

    React.useEffect(() => {
        cartState.fetchCartItems()
    }, []);

    return cartState

}