import { useProductsQuery } from '../../api/use-store-api';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import './index.css';
import Home from './pages/Home';

export default function Sneakers() {
    const [items, setItems] = useState<any>([]);

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedSort, setSelectedSort] = useState('');




    const [totalPages, setTotalPages] = useState(0);




    const limit = 16; // количество карточек на странице
    const searchedCards = useMemo(() => {
        
        return items.filter((card: any) =>
            card.name?.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery, items]);
    const sortItems = (sort: any) => {
        setSelectedSort(sort);
        {
            sort === 'ascending' &&
                setItems([...items].sort((a, b) => a['price'] - b['price']));
        }
        {
            sort === 'descending' &&
                setItems([...items].sort((a, b) => b['price'] - a['price']));
        }
    };
    const productsQuery = useProductsQuery();

    useEffect(() => {
        setTotalPages(Math.ceil(100 / limit));
        setItems([ ...productsQuery.data ?? []]);
    }, [productsQuery.data]); 
    return (
        <Home
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            searchedCards={searchedCards}
            onAddToFavorites={() => {}}
            onOpenCart={() => {}}
            isLoading={productsQuery.isLoading}
            cardsCount={items.length}
            selectedSort={selectedSort}
            sortItems={sortItems}
        />
    );
}
