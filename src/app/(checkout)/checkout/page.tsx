'use client'

import {FormProvider, type SubmitHandler, useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod';
import {useCart} from '@/shared/hooks';
import {
    CheckoutAddress,
    CheckoutCart,
    CheckoutPersonalData,
    CheckoutSidebar,
    Container,
    Title
} from '@/shared/components';
import {checkoutFormSchema, type CheckoutFormTypes} from '@/shared/components/shared/checkout/checkout-form-schema';
import {cn} from '@/shared/lib/utils';

export default function CheckoutPage() {
    const {totalAmount, updateItemQuantity, removeCartItem, items, loading} = useCart()

    const form = useForm<CheckoutFormTypes>({
        resolver: zodResolver(checkoutFormSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            address: '',
            comment: ''
        }
    })

    const onSubmit: SubmitHandler<CheckoutFormTypes> = (data) => {
        console.log(data)
    }

    const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
        const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1
        updateItemQuantity(id, newQuantity)
    }

    return <Container className={'mt-10'}>
        <Title text={'Оформление заказа'} className={'font-extrabold mb-8 text-[36px]'}/>
        <FormProvider{...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className={'flex gap-10'}>

                    {/*Блок с левой стороны*/}
                    <div className={'flex flex-col gap-10 flex-1 mb-20'}>
                        <CheckoutCart items={items}
                                      loading={loading}
                                      onClickCountButton={onClickCountButton}
                                      removeCartItem={removeCartItem}/>

                        <CheckoutPersonalData className={cn({'opacity-40 pointer-events-none': loading})}/>

                        <CheckoutAddress className={loading ? 'opacity-40 pointer-events-none' : ''}/>

                    </div>
                    {/*Блок с правой стороны*/}
                    <div className={'w-[450px]'}>
                        <CheckoutSidebar totalAmount={totalAmount} loading={loading}/>
                    </div>
                </div>
            </form>
        </FormProvider>
    </Container>
}