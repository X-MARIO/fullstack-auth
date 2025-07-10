import {AuthWrapper} from "@/features/auth/components/AuthWrapper";

export const LoginForm = () => {
    return (
        <AuthWrapper heading='Авторизация' description='Чтобы войти на сайт введите ваш email и пароль'
                     backButtonLabel='Нет аккаунта? Зарегистрироваться' backButtonHref='/auth/register' isShowSocial={true}>
            LoginForm
        </AuthWrapper>
    );
};