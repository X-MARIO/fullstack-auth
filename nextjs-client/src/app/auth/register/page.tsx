import React from 'react';
import {Metadata} from "next";
import {RegisterFrom} from "@/features/auth/components/RegisterFrom";

export const metadata: Metadata = {
    title: 'Создать аккаунт'
}

const RegisterPage = () => {
    return (
        <div>
            <RegisterFrom />
        </div>
    );
};

export default RegisterPage;