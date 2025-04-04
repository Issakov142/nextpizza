import {Nunito} from 'next/font/google';
import './globals.css';
import {Providers} from '@/shared/components/shared/providers';


const nunito = Nunito({
    subsets: ['cyrillic'],
    variable: '--font-nunito',
    weight: ['400', '500', '600', '700', '800', '900'], // Define the CSS variable
});


export default function GeneralLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <head>
            <link data-rh={'true'} rel="icon" href="/logo.png"/>
        </head>
        <body
            className={`${nunito.variable} antialiased`}
        >
        <Providers>
            {children}
        </Providers>

        </body>
        </html>
    );
}
