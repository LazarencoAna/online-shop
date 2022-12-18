import { useProductsQuery } from '../../api/use-store-api';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import './index.css';
import Home from './pages/Home';
import { useProductCategoriesQuery } from '../../api/use-store-api';

function getChildren(id: any, productCategories: any) {
    let children = productCategories.data?.filter(
        (cat: any) => cat.parentCategoryId === id
    );
    let kids = children;
    children?.forEach((element: any) => {
        let kid = getChildren(element.categoryId, productCategories) ?? [];
        kid.forEach((element2: any) => {
            kids?.push(element2);
        });
    });
    return kids;
}

export default function Sneakers() {
    const [items, setItems] = useState<any>([]);

    const [searchQuery, setSearchQuery] = useState('');
    const [searchCategory, setSearchCategory] = useState('');
    const [selectedSort, setSelectedSort] = useState('');
    const productCategories = useProductCategoriesQuery();

    const [totalPages, setTotalPages] = useState(0);

    const limit = 16; // количество карточек на странице
    const searchedCards = useMemo(() => {
        if (searchCategory != '') {
            let categories = getChildren(searchCategory, productCategories);

            let cat = productCategories?.data?.find(
                (i: any) => i.categoryId == searchCategory
            );
            categories.push(cat);
            return items.filter(
                (card: any) =>
                    card.name
                        ?.toLowerCase()
                        .includes(searchQuery.toLowerCase()) &&
                    categories?.some(
                        (cat: any) => cat.categoryId === card.categoryId
                    )
            );
        }
        return items.filter((card: any) =>
            card.name?.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery, searchCategory, items]);

    const sortItems = (sort: any) => {
        console.log(items);
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
        setItems([...(productsQuery.data ?? [])]);
    }, [productsQuery.data]);
    return (
        <Home
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            searchedCards={searchedCards}
            searchCategory={searchCategory}
            setSearchCategory={setSearchCategory}
            onAddToFavorites={() => {}}
            onOpenCart={() => {}}
            isLoading={productsQuery.isLoading}
            cardsCount={items.length}
            selectedSort={selectedSort}
            sortItems={sortItems}
        />
    );
}
