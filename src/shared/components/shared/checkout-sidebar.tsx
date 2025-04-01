import React from 'react';
import {CheckoutItemDetails} from '@/shared/components/shared/checkout-item-details';
import {ArrowRight, Package, Percent, Truck} from 'lucide-react';
import {Button, Skeleton} from '@/shared/components/ui';
import {WhiteBlock} from '@/shared/components/shared/white-block';
import {cn} from '@/shared/lib/utils';

const VAT = 15
const DELIVERY_PRICE = 300

interface Props {
    loading?: boolean
    totalAmount: number
    className?: string
}

export const CheckoutSidebar: React.FC<Props> = ({className, loading, totalAmount}) => {
    const vatPrice = (totalAmount * VAT) / 100
    const totalPrice = totalAmount + vatPrice + DELIVERY_PRICE
    return (
        <WhiteBlock className={cn('p-6 sticky top-4', className)}>
            <div className={'flex flex-col gap-1'}>
                <span className={'text-xl'}>Итого:</span>
                {loading ? <Skeleton className={'w-48 h-11'}/> :
                    <span className={'h-11 text-[34px] font-extrabold'}>{totalPrice} руб.</span>}
            </div>

            <CheckoutItemDetails title={
                <div className={'flex items-center'}>
                    <Package size={20} className={'mr-2 text-gray-400'}/>Стоимость товаров:
                </div>
            }
                                 value={loading ? <Skeleton className={'h-6 w-14 rounded-[6px]'}/> : `${totalAmount} руб.`}/>
            <CheckoutItemDetails title={
                <div className={'flex items-center'}>
                    <Percent size={20} className={'mr-2 text-gray-400'}/>Налоги:
                </div>}
                                 value={loading ? <Skeleton className={'h-6 w-14 rounded-[6px]'}/> : `${vatPrice} руб.`}/>
            <CheckoutItemDetails title={
                <div className={'flex items-center'}>
                    <Truck size={20} className={'mr-2 text-gray-400'}/>Доставка:
                </div>} value={loading ? <Skeleton className={'h-6 w-14 rounded-[6px]'}/> : `${DELIVERY_PRICE} руб.`}/>

            <Button loading={loading} type={'submit'} className={'w-full h-14 rounded-2xl mt-6 text-base font-bold'}>
                Перейти к оплате
                <ArrowRight className={'w-5 ml-2'}/>
            </Button>
        </WhiteBlock>
    );
};
