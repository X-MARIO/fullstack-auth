import React from 'react';
import {Metadata} from "next";
import {RegisterForm} from "@/features/auth/components/RegisterForm";

export const metadata: Metadata = {
    title: 'Создать аккаунт'
}

const RegisterPage = () => {
    return (
        <div>
            <RegisterForm />
        </div>
    );
};

export default RegisterPage;