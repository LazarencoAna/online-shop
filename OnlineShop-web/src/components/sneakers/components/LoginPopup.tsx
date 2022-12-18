import React, { useState } from 'react';
import InputWithError from '../components/UI/InputWithError';
const logo = 'asset/sneakers/logo.png';
import { Link } from 'react-router-dom';
import useFormAndValidation from '../hooks/useFormAndValidation';
import {
    useAuth,
    useCustomSignInWithEmailAndPassword,
} from '../../../common/auth.hook';
import { Button } from '@mui/material';
import { Google as GoogleIcon } from '../../../asset/inline/icons/google';

function LoginPopup() {
    const auth = useAuth();

    const { handleChange, values, errors, isFormValid, resetForm } =
        useFormAndValidation();

    const [signInWithEmailAndPassword, user, loading, error] =
        useCustomSignInWithEmailAndPassword();

    const [isLoginState, setisLoginState] = useState(true);

    const login = (event: any) => {
        event.preventDefault();
        if (!values['password'] || !values['email']) {
            return;
        }
        // onSubmit(values["password"], values["email"], resetForm);

        signInWithEmailAndPassword(values['email'], values['password']);
    };

    const register = (event:any) => {
        event.preventDefault();

        if (!values['password'] || !values['email']) {
            return;
        }
        auth?.signupLocal(values['email'], values['email'], values['password']);
    };


    const renderLogin = () => (
        <div className="login">
            <form onSubmit={login} className="login__form" noValidate>
                <img
                    className="logo logo_type_login"
                    src={logo}
                    alt="Sneakers"
                />
                <h1 className="login__title">Login</h1>
                <InputWithError
                    value={values['email'] || ''}
                    onChange={handleChange}
                    type="email"
                    placeholder="Email"
                    name="email"
                    isInvalid={errors['email'] ? true : false}
                    errorText={errors['email']}
                    required
                />
                <InputWithError
                    value={values['password'] || ''}
                    onChange={handleChange}
                    type="password"
                    placeholder="Password"
                    name="password"
                    minLength="8"
                    maxLength="40"
                    isInvalid={errors['password'] ? true : false}
                    errorText={errors['password']}
                    required
                />
                <button
                    className={`button button_type_login ${
                        isFormValid ? '' : 'button_type_disabled'
                    }`}
                    disabled={!isFormValid}
                >
                    {loading ? 'Loading...' : 'Login'}
                </button>
                <Button
                    fullWidth
                    color="error"
                    className="button_type_login"
                    startIcon={<GoogleIcon />}
                    onClick={() => auth?.loginWithGoogle()}
                    size="large"
                    variant="contained"
                >
                    Login with Google
                </Button>
                <p className="login__text">
                    No account?
                    <a
                        className="login__link"
                        onClick={() => setisLoginState(false)}
                    >
                        Register
                    </a>
                </p>
            </form>
        </div>
    );

    const renderRegister = () => (
        <div className="login">
            <form  className="login__form" noValidate>
                <img
                    className="logo logo_type_login"
                    src={logo}
                    alt="Sneakers"
                />
                <h1 className="login__title">Register</h1>
                <InputWithError
                    value={values['email'] || ''}
                    onChange={handleChange}
                    type="email"
                    placeholder="Email"
                    name="email"
                    isInvalid={errors['email'] ? true : false}
                    errorText={errors['email']}
                    required
                />
                <InputWithError
                    value={values['password'] || ''}
                    onChange={handleChange}
                    type="password"
                    placeholder="Password"
                    name="password"
                    minLength="8"
                    maxLength="40"
                    isInvalid={errors['password'] ? true : false}
                    errorText={errors['password']}
                    required
                />
                <InputWithError
                    value={values['confirmPass'] || ''}
                    onChange={handleChange}
                    type="password"
                    placeholder="Password confirmation"
                    name="confirmPass"
                    minLength="8"
                    maxLength="40"
                    isInvalid={errors['confirmPass'] ? true : false}
                    errorText={errors['confirmPass']}
                    required
                />
                <button
                    className={`button button_type_login ${
                        isFormValid ? '' : 'button_type_disabled'
                    }`}
                    disabled={!isFormValid}
                    onClick={register}
                >
                    {loading ? 'Loading...' : 'Create account'}
                </button>
                <Button
                    fullWidth
                    color="error"
                    className="button_type_login"
                    startIcon={<GoogleIcon />}
                    onClick={() => auth?.loginWithGoogle()}
                    size="large"
                    variant="contained"
                >
                    Register with Google
                </Button>
                <p className="login__text">
                    Already have account
                    <a
                        className="login__link"
                        onClick={() => setisLoginState(true)}
                    >
                        Login
                    </a>
                </p>
            </form>
        </div>
    );

    return isLoginState ? renderLogin() : renderRegister();
}

export default LoginPopup;
