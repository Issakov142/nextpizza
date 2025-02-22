import {Container, Filters, Title, TopBar} from '@/components/shared'
import {ProductCard} from '@/components/shared/product-card';

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
                            <ProductCard id={0}
                                         imageUrl={'https://media.dodostatic.net/image/r:584x584/11eeca3858c79a01b7a644c5a5d81524.avif'}
                                         name={'Chickenburger-pizza'}
                                         price={440}/>
                        </div>
                    </div>
                </div>
            </Container>
        </>

    );
}
