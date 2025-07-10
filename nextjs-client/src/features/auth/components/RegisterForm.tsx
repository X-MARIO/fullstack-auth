import {AuthWrapper} from "@/features/auth/components/AuthWrapper";

export const RegisterForm = () => {
    return (
        <AuthWrapper heading='Регистрация' description='Чтобы войти на сайт введите ваш email и пароль'
                     backButtonLabel='Уже есть аккаунт? Войти' backButtonHref='/auth/login' isShowSocial={true}>
            RegisterFrom
        </AuthWrapper>
    );
};