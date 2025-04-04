import {Container, Filters, Title, TopBar, Stories} from '@/shared/components/shared'
import {ProductsGroupList} from '@/shared/components/shared/products-group-list';
import {prisma} from '../../../prisma/prisma-client';
import {Suspense} from 'react';
import {findPizzas, type GetSearchParams} from '@/shared/lib/find-pizzas';

export default async function Home({searchParams}: {searchParams: GetSearchParams}) {
    const categories = await findPizzas(searchParams)




    return (
        <>
            <Container className={'mt-10'}>
                <Title text={'Все пиццы'} size={'lg'} className={'font-extrabold'}/>
            </Container>
            <TopBar categories={categories.filter((category) => category.products.length > 0)}/>

            <Stories/>

            <Container className={'mt-10 pb-14'}>
                <div className={'flex gap-[60px]'}>
                    {/*Filtering*/}
                    <div className={'w-[250px]'}>
                        <Suspense>
                            <Filters/>
                        </Suspense>
                    </div>
                    {/*Product list*/}
                    <div className={'flex-1'}>
                        <div className={'flex flex-col gap-16'}>
                            {categories.map((category) => (
                                    category.products.length > 0 && (
                                        <ProductsGroupList key={category.id}
                                                           title={category.name}
                                                           products={category.products}
                                                           categoryId={category.id}
                                        />
                                    )
                                )
                            )}

                        </div>
                    </div>
                </div>
            </Container>
        </>

    );
}
