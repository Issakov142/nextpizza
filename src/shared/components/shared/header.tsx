import React from 'react'
import {cn} from '@/shared/lib/utils';
import {Container} from '@/shared/components/shared/container';
import Image from 'next/image';
import {Button} from '@/shared/components/ui';
import {User} from 'lucide-react';
import Link from 'next/link';
import {SearchInput} from '@/shared/components/shared/search-input';
import {CartButton} from '@/shared/components/shared/cart-button';

interface Props {
    className?: string
}

export const Header: React.FC<Props> = ({className}) => {
    return (
        <header className={cn('border border-b', className)}>
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
                <div className={'mx-10 flex-1'}>
                    <SearchInput/>
                </div>
                {/*Right part*/}
                <div className={'flex items-center gap-3'}>
                    <Button variant={'outline'} className={'flex items-center gap-1'}>
                        <User size={16}/>
                        Войти
                    </Button>
                    <div>
                        <CartButton/>
                    </div>
                </div>

            </Container>
        </header>
    )
}