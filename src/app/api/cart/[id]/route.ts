import {type NextRequest, NextResponse} from 'next/server';
import {prisma} from '../../../../../prisma/prisma-client';
import {updateCartTotalPrice} from '@/shared/lib/update-cart-total-price';

export async function PATCH(req: NextRequest, {params}: {params: {id: string}} ) {
    try {
        const {id} = params
        const data = (await req.json()) as { quantity: number}
        const token = req.cookies.get('cartToken')?.value

        if (!token) {
            return NextResponse.json({error: 'Cart token not found'})
        }

        const cartItem = await prisma.cartItem.findFirst({
            where: {
                id: Number(id)
            }
        })

        if (!cartItem) {
            return NextResponse.json({error: 'Cart item not found'})
        }

        await prisma.cartItem.update({
            where: {
                id: Number(id),
            },
            data: {
                quantity: data.quantity
            }
        })

        const updatedUserCart = await updateCartTotalPrice(token)

        return NextResponse.json(updatedUserCart)

    } catch (error) {
        console.log("[CART_PATCH] Server error", error)
        return NextResponse.json({message: "Can't refresh product cart"}, {status: 500})
    }
}

export async function DELETE(req: NextRequest, {params}: {params: {id: string}} ) {

    try {
        const id = Number(params.id)
        const token = req.cookies.get('cartToken')?.value

        if(!token){
            return NextResponse.json({error: 'Cart token not found'})
        }

        const cartItem = await prisma.cartItem.findFirst({
            where: {
                id: Number(id)
            }
        })

        if (!cartItem) {
            return NextResponse.json({error: 'Cart item not found'})
        }

        await prisma.cartItem.delete({
            where: {
                id: Number(id)
            }
        })

        const updatedUserCart = await updateCartTotalPrice(token)

        return NextResponse.json(updatedUserCart)
      } catch (error) {
        console.log("[CART_PATCH] Server error", error)
        return NextResponse.json({message: "Не удалось удалить корзину"}, {status: 500})
    }

}