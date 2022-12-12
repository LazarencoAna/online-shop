import React from 'react';
import Card from './Card';

function CardList({ cards, isLoading }: any) {
    return (
        <ul className="cards-grid">
            {cards.map((card: any, index: number) => (
                <Card
                    key={isLoading ? index : card.id}
                    card={card}
                    isLoading={isLoading}
                />
            ))}
        </ul>
    );
}

export default CardList;
