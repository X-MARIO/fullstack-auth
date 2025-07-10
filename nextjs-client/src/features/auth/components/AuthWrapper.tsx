import {PropsWithChildren} from "react";
import {Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/shared/components/ui";
import Link from "next/link";
import {AuthSocial} from "@/features/auth/components/AuthSocial";

interface AuthWrapperProps {
    readonly heading: string;
    readonly description?: string;
    readonly backButtonLabel?: string;
    readonly backButtonHref?: string;
    readonly isShowSocial?: boolean;
}

export const AuthWrapper = ({
                                                            children,
                                                            heading,
                                                            description,
                                                            backButtonLabel,
                                                            backButtonHref,
                                                            isShowSocial,
                                                        }: PropsWithChildren<AuthWrapperProps>) => {
    return <Card className='w-[400px]'>
        <CardHeader className='space-y-2'>
            <CardTitle>{heading}</CardTitle>
            {description && (
                <CardDescription>{description}</CardDescription>
            )}
        </CardHeader>
        <CardContent>
            {isShowSocial && <AuthSocial />}
            {children}
        </CardContent>
        <CardFooter>
            {backButtonLabel && backButtonHref && (
                <Button variant='link' className='w-full font-normal'>
                    <Link href={backButtonHref}>{backButtonLabel}</Link>
                </Button>
            )}
        </CardFooter>
    </Card>
}