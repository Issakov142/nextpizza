'use client'

import React from 'react'
import {cn} from '@/shared/lib/utils';
import {Container} from '@/shared/components/shared/container';
import Image from 'next/image';
import Link from 'next/link';
import {SearchInput} from '@/shared/components/shared/search-input';
import {CartButton} from '@/shared/components/shared/cart-button';
import {useRouter, useSearchParams} from 'next/navigation';
import toast from 'react-hot-toast';
import {AuthModal, ProfileButton} from '@/shared/components';
import {signIn} from 'next-auth/react';


interface Props {
    hasSearch?: boolean
    hasCart?: boolean
    className?: string
}

export const Header: React.FC<Props> = ({className, hasCart = true, hasSearch = true}) => {
    const [openAuthModal, setOpenAuthModal] = React.useState(false)
    const searchParams = useSearchParams()
    const router = useRouter();


    React.useEffect(()=> {
        if (searchParams.has('paid')){
            toast.success('Заказ успешно оплачен! 🎉Информация о заказе отправлена на вашу почту')
        }

        if (searchParams.has('verified')){
            toast.success(' Почта успешно подтверждена', {duration: 5000})
        }
    }, [])


    return (
        <header className={cn('border-b', className)}>
            <Container className={'flex items-center justify-between py-8'}>
                {/*Left part*/}
                <Link href={'/'}>
                    <div className={'flex items-center gap-4'}>
                        <Image src={'/logo.png'} alt={'Logo'} width={35} height={35}/>

                        <div>
                            <h1 className={'text-2xl uppercase font-black'}>Next Pizza</h1>
                            <p className={'text-sm text-gray-400 leading-3'}>вкусно, очень-очень вкусно...</p>
                        </div>
                    </div>
                </Link>
                {/*Middle part == SEARCHER*/}
                {hasSearch && <div className={'mx-10 flex-1'}>
                    <SearchInput/>
                </div>}
                {/*Right part*/}
                <div className={'flex items-center gap-3'}>
                    
                    <AuthModal open={openAuthModal} onClose={()=>{setOpenAuthModal(false)}}/>
                    
                    <ProfileButton onClickSignIn={()=>setOpenAuthModal(true)}/>
                    <div>
                        {hasCart && <CartButton/>}
                    </div>
                </div>

            </Container>
        </header>
    )
}