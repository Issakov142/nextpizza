import React from 'react';

interface Props {
    orderId: number
    totalAmount: number
    paymentUrl: string
}

export const PayOrderTemplate: React.FC<Props> = ({orderId, totalAmount, paymentUrl}) => (
    <div>
        <h1>Заказ #{orderId}</h1>

        <p>Оплатите заказ на сумму <b>{totalAmount} p</b>. Перейдите по {' '} <a href={paymentUrl}> этой </a>ссылке для оплаты заказа.</p>
    </div>
);