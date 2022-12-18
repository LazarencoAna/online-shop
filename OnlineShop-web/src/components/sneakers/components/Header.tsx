import { useAuth } from '../../../common/auth.hook';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Cart from './Cart';
import { Dialog, DialogContent } from '@mui/material';
import LoginPopup from './LoginPopup';
import useCart from '../hooks/useCart';
function Header() {
    const auth = useAuth();
    const cart = useCart();
    const [isCartOpened, setIsCartOpened] = useState(false);
    const cartCloseHandler = () => {
        setIsCartOpened(false);
    };
    const onOpenCart = () => {
        setIsCartOpened(true);
    };
    const logout = () => {
        auth?.logout();
    };

    const [openLogin, setOpenLogin] = React.useState(false);

    const handleClickOpenLogin = () => {
        setOpenLogin(true);
    };

    const handleCloseLogin = () => {
        setOpenLogin(false);
    };

    useEffect(() => {
        if (auth?.user) handleCloseLogin();
    }, [auth?.user]);

    return (
        <header className="header">
            <Cart
                cartCloseHandler={cartCloseHandler}
                isCartOpened={isCartOpened}
            />
            <div className="header__content">
                <NavLink to="/sneakers">
                    <div className="header__logo">
                        <img
                            className="logo"
                            src="/asset/resource/logo.png"
                            alt="Sneakers"
                        />
                        <div className="header__logo-text">
                            <h1 className="header__title">Online Shop</h1>
                            <p className="header__subtitle">
                                Store with best shoes
                            </p>
                        </div>
                    </div>
                </NavLink>
                <ul className="header__account">
                    <li onClick={onOpenCart} className="header__cart">
                        <img
                            className="header__cart-image"
                            src="/asset/sneakers/cart.svg"
                            alt="Cart"
                        />
                        <span className="header__price">
                            {cart.amount} ron.
                        </span>
                    </li>
                    {auth?.user && (
                        <NavLink
                            to="/orders"
                            className={({ isActive }) => {
                                return isActive ? 'header__link_active' : '';
                            }}
                        >
                            <li>
                                <img
                                    className="header__icon"
                                    src="/asset/sneakers/profile.svg"
                                    alt="Profile"
                                />
                            </li>
                        </NavLink>
                    )}
                    <NavLink
                        to="/favorite"
                        className={({ isActive }) => {
                            return isActive ? 'header__link_active' : '';
                        }}
                    >
                        <li>
                            <img
                                className="header__icon"
                                src="/asset/sneakers/favorite.svg"
                                alt="Heart"
                            />
                        </li>
                    </NavLink>
                    <NavLink
                        to="/about"
                        className={({ isActive }) => {
                            return isActive ? 'header__link_active' : '';
                        }}
                    >
                        <li>
                            <img
                                className="header__icon"
                                src="/asset/sneakers/icons-about.png"
                                alt="Heart"
                            />
                        </li>
                    </NavLink>
                    <NavLink
                        to="/contact"
                        className={({ isActive }) => {
                            return isActive ? 'header__link_active' : '';
                        }}
                    >
                        <li>
                            <img
                                className="header__icon"
                                src="/asset/sneakers/icons-contact.png"
                                alt="Heart"
                            />
                        </li>
                    </NavLink>
                    <li>
                        <img
                            onClick={auth?.user ? logout : handleClickOpenLogin}
                            className="header__icon"
                            src="/asset/sneakers/exit.svg"
                            alt="Exit"
                        />
                    </li>
                </ul>
            </div>
            {auth?.user && <p className="header__email">{auth?.user?.email}</p>}
            <Dialog
                fullWidth={true}
                maxWidth={'xs'}
                open={openLogin}
                onClose={handleCloseLogin}
            >
                <DialogContent>
                    <LoginPopup />
                </DialogContent>
            </Dialog>
        </header>
    );
}

export default Header;
