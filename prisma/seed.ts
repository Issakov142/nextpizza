import {prisma} from './prisma-client';
import {hashSync} from 'bcrypt'
import {categories, ingredients, products} from './constants';
import {Prisma} from '@prisma/client';

const randomDecimalNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10
}

const generateProductVariation = ({productId, pizzaType, size,}: {
    productId: number;
    pizzaType?: 1 | 2;
    size?: 20 | 30 | 40;
}) => {
    return {
        productId,
        price: randomDecimalNumber(190, 600),
        pizzaType,
        size,
    } as Prisma.ProductVariationUncheckedCreateInput;
};

async function up() {


    await prisma.user.createMany({
        data: [
            {
                fullName: 'User',
                email: 'user@test.ru',
                password: hashSync('111111', 10),
                verified: new Date(),
                role: 'USER',
            },
            {
                fullName: 'Admin',
                email: 'admin@test.ru',
                password: hashSync('111111', 10),
                verified: new Date(),
                role: 'ADMIN'
            }
        ]
    })

    await prisma.category.createMany({
        data: categories,
    })

    await prisma.ingredient.createMany({
        data: ingredients
    })
    await prisma.product.createMany({
        data: products,
    })

    const pizza1 = await prisma.product.create({
        data: {
            name: 'Пепперони фреш',
            imageUrl:
                'https://media.dodostatic.net/image/r:233x233/11EE7D61304FAF5A98A6958F2BB2D260.webp',
            categoryId: 1,
            ingredients: {
                connect: ingredients.slice(0, 5),
            },
        },
    });

    const pizza2 = await prisma.product.create({
        data: {
            name: 'Сырная',
            imageUrl:
                'https://media.dodostatic.net/image/r:233x233/11EE7D610CF7E265B7C72BE5AE757CA7.webp',
            categoryId: 1,
            ingredients: {
                connect: ingredients.slice(5, 10),
            },
        },
    });

    const pizza3 = await prisma.product.create({
        data: {
            name: 'Чоризо фреш',
            imageUrl:
                'https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp',
            categoryId: 1,
            ingredients: {
                connect: ingredients.slice(10, 40),
            },
        },
    });

    await prisma.productVariation.createMany({
        data: [
            // Пицца "Пепперони фреш"
            generateProductVariation({productId: pizza1.id, pizzaType: 1, size: 20}),
            generateProductVariation({productId: pizza1.id, pizzaType: 2, size: 30}),
            generateProductVariation({productId: pizza1.id, pizzaType: 2, size: 40}),

            // Пицца "Сырная"
            generateProductVariation({productId: pizza2.id, pizzaType: 1, size: 20}),
            generateProductVariation({productId: pizza2.id, pizzaType: 1, size: 30}),
            generateProductVariation({productId: pizza2.id, pizzaType: 1, size: 40}),
            generateProductVariation({productId: pizza2.id, pizzaType: 2, size: 20}),
            generateProductVariation({productId: pizza2.id, pizzaType: 2, size: 30}),
            generateProductVariation({productId: pizza2.id, pizzaType: 2, size: 40}),

            // Пицца "Чоризо фреш"
            generateProductVariation({productId: pizza3.id, pizzaType: 1, size: 20}),
            generateProductVariation({productId: pizza3.id, pizzaType: 2, size: 30}),
            generateProductVariation({productId: pizza3.id, pizzaType: 2, size: 40}),

            // Остальные продукты
            generateProductVariation({productId: 1}),
            generateProductVariation({productId: 2}),
            generateProductVariation({productId: 3}),
            generateProductVariation({productId: 4}),
            generateProductVariation({productId: 5}),
            generateProductVariation({productId: 6}),
            generateProductVariation({productId: 7}),
            generateProductVariation({productId: 8}),
            generateProductVariation({productId: 9}),
            generateProductVariation({productId: 10}),
            generateProductVariation({productId: 11}),
            generateProductVariation({productId: 12}),
            generateProductVariation({productId: 13}),
            generateProductVariation({productId: 14}),
            generateProductVariation({productId: 15}),
            generateProductVariation({productId: 16}),
            generateProductVariation({productId: 17}),
        ]
    })

    await prisma.cart.createMany({
        data: [
            {
                userId: 1,
                totalAmount: 0,
                token: '134'
            },
            {
                userId: 2,
                totalAmount: 0,
                token: '453'
            }
        ]
    })

    await prisma.cartItem.create({
        data: {
                productVariantId: 1,
                cartId: 1,
                quantity: 2,
                ingredients: {
                    connect: [{id: 1}, {id: 2}, {id: 3}, {id: 4}]
                }
            }
    })

}

async function down() {
    await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`
    await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`
    await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`
    await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`
    await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`
    await prisma.$executeRaw`TRUNCATE TABLE "ProductVariation" RESTART IDENTITY CASCADE`
    await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`
}

async function main() {
    try {
        await down()
        await up()
    } catch (e) {
        console.error(e)
    }
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })