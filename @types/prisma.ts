import {Ingredient, Product, ProductVariation} from '@prisma/client';

export type ProductWithRelations = Product & {variants: ProductVariation[]; ingredients: Ingredient[]}