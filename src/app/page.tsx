import {Container, Filters, Title, TopBar} from '@/components/shared'
import {ProductCard} from '@/components/shared/product-card';
import {ProductsGroupList} from '@/components/shared/products-group-list';

export default function Home() {
    return (
        <>
            <Container className={'mt-10'}>
                <Title text={'Все пиццы'} size={'lg'} className={'font-extrabold'}/>
            </Container>
            <TopBar/>
            <Container className={'mt-10 pb-14'}>
                <div className={'flex gap-[60px]'}>
                    {/*Filtering*/}
                    <div className={'w-[250px]'}>
                        <Filters/>
                    </div>
                    {/*Product list*/}
                    <div className={'flex-1'}>
                        <div className={'flex flex-col gap-16'}>
                            <ProductsGroupList title={'Пиццы'} products={[{
                                id: 1,
                                name: "IloveYou-pizza",
                                price: 550,
                                items: [{price: 550}],
                                imageUrl: 'https://media.dodostatic.net/image/r:584x584/11eeca3858c79a01b7a644c5a5d81524.avif'
                            },
                                {
                                    id: 2,
                                    name: "IloveYou-pizza",
                                    price: 550,
                                    items: [{price: 550}],
                                    imageUrl: 'https://media.dodostatic.net/image/r:584x584/11eeca3858c79a01b7a644c5a5d81524.avif'
                                },
                                {
                                    id: 3,
                                    name: "ILoveYou-pizza",
                                    price: 550,
                                    items: [{price: 550}],
                                    imageUrl: 'https://media.dodostatic.net/image/r:584x584/11eeca3858c79a01b7a644c5a5d81524.avif'
                                },
                                {
                                    id: 4,
                                    name: "IloveYou-pizza",
                                    price: 550,
                                    items: [{price: 550}],
                                    imageUrl: 'https://media.dodostatic.net/image/r:584x584/11eeca3858c79a01b7a644c5a5d81524.avif'
                                },
                                {
                                    id: 5,
                                    name: "IloveYou-pizza",
                                    price: 550,
                                    items: [{price: 550}],
                                    imageUrl: 'https://media.dodostatic.net/image/r:584x584/11eeca3858c79a01b7a644c5a5d81524.avif'
                                },

                            ]} categoryId={1}/>
                            <ProductsGroupList title={'Комбо'} products={[{
                                id: 1,
                                name: "IloveYou-pizza",
                                price: 550,
                                items: [{price: 550}],
                                imageUrl: 'https://media.dodostatic.net/image/r:584x584/11eeca3858c79a01b7a644c5a5d81524.avif'
                            },
                                {
                                    id: 2,
                                    name: "IloveYou-pizza",
                                    price: 550,
                                    items: [{price: 550}],
                                    imageUrl: 'https://media.dodostatic.net/image/r:584x584/11eeca3858c79a01b7a644c5a5d81524.avif'
                                },
                                {
                                    id: 3,
                                    name: "ILoveYou-pizza",
                                    price: 550,
                                    items: [{price: 550}],
                                    imageUrl: 'https://media.dodostatic.net/image/r:584x584/11eeca3858c79a01b7a644c5a5d81524.avif'
                                },
                                {
                                    id: 4,
                                    name: "IloveYou-pizza",
                                    price: 550,
                                    items: [{price: 550}],
                                    imageUrl: 'https://media.dodostatic.net/image/r:584x584/11eeca3858c79a01b7a644c5a5d81524.avif'
                                },
                                {
                                    id: 5,
                                    name: "IloveYou-pizza",
                                    price: 550,
                                    items: [{price: 550}],
                                    imageUrl: 'https://media.dodostatic.net/image/r:584x584/11eeca3858c79a01b7a644c5a5d81524.avif'
                                },

                            ]} categoryId={2}/>
                        </div>
                    </div>
                </div>
            </Container>
        </>

    );
}
