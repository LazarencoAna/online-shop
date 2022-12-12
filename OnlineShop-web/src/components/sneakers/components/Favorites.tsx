import React, { useEffect, useState } from 'react';
import Card from './Card';
import Header from './Header';
import Message from './Message';
import { getRandomNumber } from '../utils/pages';
import useFavorite from '../hooks/useFavorites';

function Favorites() {
    const [numberForEmoji, setNumberForEmoji] = useState(1);
    const favorite = useFavorite();


  
    

    useEffect(() => setNumberForEmoji(getRandomNumber(1, 10)), []);

    return (
        <div className="page__wrapper">
            <Header />
            <section className="store">
                <div className="store__header">
                    <h2 className="store__title">My favorites</h2>
                </div>
                <ul className="cards-grid">
                    {favorite.favoriteProducts.length ? (
                        favorite.favoriteProducts.map((card:any) => (
                            <Card
                                key={card.productId}
                                card={card}
                                isOnFavoritesPage={true}
                            />
                        ))
                    ) : (
                        <Message
                            img={`/images/emoji/emoji-${numberForEmoji}.png`}
                            title="No favorites :("
                            subtitle="Nothing added to favorite"
                            alt="Smile"
                        />
                    )}
                </ul>
            </section>
        </div>
    );
}

export default Favorites;
