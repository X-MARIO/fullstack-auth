import {GeistSans} from 'geist/font/sans'
import type {Metadata} from 'next'

import '@/shared/styles/globals.css'

export const metadata: Metadata = {
    title: {
        absolute: 'Курс по авторизации',
        template: '%s | Курс по авторизации'
    },
    description:
        'Это учебный проект, созданный для демонстрации полного цикла авторизации пользователей'
}

export default function RootLayout({
                                       children
                                   }: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang='en'>
        <body className={GeistSans.variable}>
        <div className='relative flex min-h-screen flex-col'>
            <div className='flex h-screen w-full items-center justify-center px-4'>
                {children}
            </div>
        </div>
        </body>
        </html>
    )
}
