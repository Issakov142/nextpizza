import {axiosInstance} from '@/shared/services/instance';
import type {CartDTO, CreateCartItemValues} from '@/shared/services/dto/cart.dto';

export const getCart = async (): Promise<CartDTO> => {
    const {data} = await axiosInstance.get<CartDTO>('/cart')

    return data

}

export const updateItemQuantity = async (itemId: number, quantity: number): Promise<CartDTO> => {
    const {data} = await axiosInstance.patch<CartDTO>('/cart/' + itemId, {quantity})

    return data
}

export const removeCartItem = async (id: number): Promise<CartDTO> => {
    return (await axiosInstance.delete<CartDTO>('/cart/' + id)).data

}

export const addCartItem = async (values: CreateCartItemValues): Promise<CartDTO> => {
    return (await axiosInstance.post<CartDTO>('/cart', values)).data

}