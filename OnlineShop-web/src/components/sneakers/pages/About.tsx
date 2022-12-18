import { useOrdersQuery, useProductsQuery } from '../../../api/use-store-api';
import React, { useEffect, useState } from 'react';
import CardList from '../components/CardList';
import Header from '../components/Header';
import Message from '../components/Message';
import { createArrWithEmptyObjs, getRandomNumber } from '../utils/pages';
import { Typography } from '@mui/material';

function About() {
    const [numberForEmoji, setNumberForEmoji] = useState(1);
    const orderQuery = useOrdersQuery();
    const productQuery = useProductsQuery();
    const [ordersWithProducts, setOrdersWithProducts] = useState<any>([]);

    useEffect(() => {
        setNumberForEmoji(getRandomNumber(1, 10));
    }, []);

    useEffect(() => {
        if (orderQuery.data && productQuery.data) {
            let ordWithProd = orderQuery.data.map((o) => {
                return {
                    ...o,
                    products: o.productOrders.map((po) => {
                        return productQuery.data.find(
                            (p) => p.productId === po.productId
                        );
                    }),
                };
            });
            setOrdersWithProducts(ordWithProd);
        }
    }, [orderQuery.data, productQuery.data]);

    const arrayWithEmptyObjs = createArrWithEmptyObjs(4); // создаем массив из пустых объектов для загрузки

    return (
        <div className="page__wrapper">
            <Header />
            <section className="store">
                <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    color="textPrimary"
                    gutterBottom
                >
                    About Us
                </Typography>
                <Typography
                    variant="h6"
                    align="center"
                    color="textSecondary"
                    paragraph
                >
                    <br></br>
                    Echipa ONLINE SHOP este formată din oameni plini de pasiune
                    și angajament. Ne bazăm pe profesionalism și ne concentrăm
                    pe domeniul în care suntem cei mai buni – vânzarea de
                    încălțăminte. Suntem pe piață de peste 20 de ani, oferind
                    produse atent selecționate, ale celor mai bune branduri
                    internaționale.<br></br> Asortimentul nostru este constant
                    îmbogățit cu cele mai exclusiviste mărci. Dar pentru noi cel
                    mai important și valoros aspect este reprezentat de opiniile
                    pozitive și calificativele mari din rețea. <br></br>{' '}
                    <br></br> Actual suntem unul dintre cele mai mari magazine
                    online din Romania care se specializează în vânzarea de
                    încălțăminte și accesorii.
                </Typography>
            </section>
        </div>
    );
}

export default About;
