import { Dialog, DialogContent } from '@mui/material';
import React from 'react';
import ContentLoader from 'react-content-loader';
import {useSelector } from 'react-redux';
import { RootState } from '../../../store';
import useFavorite from '../hooks/useFavorites';
import CardPopupInfo from './CardPopupInfo';

const plusDefault = '/asset/sneakers/button-plus.svg';
const plusAdded = '/asset/sneakers/button-added.svg';
const heartLiked = '/asset/sneakers/heart-liked.svg';
const heartDefault = '/asset/sneakers/heart-default.svg';

function Card({ card, isLoading }: any) {
    const cartItems = useSelector((state: RootState) => state.cart.cartItems);
    const favorite = useFavorite();

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <li className="card">
            {isLoading ? (
                <ContentLoader
                    speed={1}
                    width={200}
                    height={300}
                    viewBox="0 0 210 300"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                >
                    <rect
                        x="0"
                        y="5"
                        rx="10"
                        ry="10"
                        width="146"
                        height="145"
                    />
                    <rect x="0" y="168" rx="3" ry="3" width="146" height="15" />
                    <rect x="0" y="187" rx="3" ry="3" width="90" height="15" />
                    <rect x="0" y="226" rx="8" ry="8" width="80" height="25" />
                    <rect
                        x="114"
                        y="220"
                        rx="8"
                        ry="8"
                        width="32"
                        height="32"
                    />
                </ContentLoader>
            ) : (
                <>
                    {
                        <button className="card-button card-button_type_favorite">
                            <img
                                onClick={() =>
                                    favorite.addToFavoriteHandler(
                                        card.productId
                                    )
                                }
                                className="card-button__image"
                                src={
                                    favorite.favoriteItems.some(
                                        (item) => item === card.productId
                                    )
                                        ? heartLiked
                                        : heartDefault
                                }
                                alt="Empty heart"
                            />
                        </button>
                    }
                    <img
                        // onClick={() =>{ openImagePopup(card)}}
                        className="card__image"
                        src={card?.imagesUrl[0]}
                        alt={card?.name}
                        onClick={() => handleClickOpen()}
                    />
                    <p className="card__title">{card?.name}</p>
                    <div className="card__buy">
                        <div className="card__price">
                            <p className="card__price-title">Price:</p>
                            <p className="card__price-value">
                                {card.price} RON.
                            </p>
                        </div>
                        <button className="card-button">
                            <img
                                onClick={() => handleClickOpen()}
                                className="card-button__image"
                                src={
                                    cartItems.some(
                                        (item) =>
                                            item.productId === card.productId
                                    )
                                        ? plusAdded
                                        : plusDefault
                                }
                                alt="plus"
                            />
                        </button>
                    </div>

                    <Dialog
                        fullWidth={true}
                        maxWidth={'md'}
                        open={open}
                        onClose={handleClose}
                    >
                        {/* <DialogTitle>{card.name}</DialogTitle> */}
                        <DialogContent>
                            <CardPopupInfo closePopup={handleClose} card={card} />
                        </DialogContent>
                    </Dialog>
                </>
            )}
        </li>
    );
}

export default Card;
