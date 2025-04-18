import {prisma} from '../../../prisma/prisma-client';
import {calcCartItemTotalPrice} from '@/shared/lib/calc-cart-item-total-price';

export const updateCartTotalPrice = async (token: string) => {

    const userCart = await prisma.cart.findFirst({
        where: {
            token,
        },
        include: {
            items: {
                orderBy: {
                    createdAt: 'desc'
                },
                include: {
                    productVariant: {
                        include: {
                            product: true
                        }
                    },
                    ingredients: true,
                }
            }
        }
    })

    if (!userCart) {
        return
    }

const totalAmount = userCart?.items.reduce((acc, item) => {
    return acc + calcCartItemTotalPrice(item)
}, 0)

    return prisma.cart.update({
        where: {
            id: userCart.id,
        },
        data: {
            totalAmount
        },
        include: {
            items: {
                orderBy: {
                    createdAt: 'desc'
                },
                include: {
                    productVariant: {
                        include: {
                            product: true
                        }
                    },
                    ingredients: true,
                }
            }
        }
    });

}