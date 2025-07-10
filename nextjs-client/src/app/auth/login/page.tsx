import React from 'react';
import {Metadata} from "next";
import {LoginForm} from "@/features/auth/components/LoginForm";

export const metadata: Metadata = {
    title: 'Создать аккаунт'
}

const LoginPage = () => {
    return (
        <div>
            <LoginForm />
        </div>
    );
};

export default LoginPage;