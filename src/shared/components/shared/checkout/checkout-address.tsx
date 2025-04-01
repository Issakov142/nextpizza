import React from 'react';
import {ErrorText, FormTextarea, WhiteBlock} from '@/shared/components/shared';
import {AdressInput} from '@/shared/components/shared/address-input';
import {Controller, useFormContext} from 'react-hook-form';

interface Props {

    className?: string
}

export const CheckoutAddress: React.FC<Props> = ({className}) => {
    const {control} = useFormContext()

    return (
        <WhiteBlock title={'3. Адрес доставки'} className={className}>
            <div className={'flex flex-col gap-5'}>
                <Controller
                    control={control}
                    name={'address'}
                    render={({field, fieldState}) =>
                        <>
                        <AdressInput onChange={field.onChange}/>
                        {fieldState.error?.message && <ErrorText text={fieldState.error.message}/>}
                        </>
                        }
                        />

                        <FormTextarea name={'comment'} className={'text-base'} placeholder={'Комментарий к заказу'}
                                      rows={5}/>
                        </div>
                        </WhiteBlock>
                        );
                    };