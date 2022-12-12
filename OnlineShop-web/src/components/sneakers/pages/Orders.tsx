import { useOrdersQuery, useProductsQuery } from '../../../api/use-store-api';
import React, { useEffect, useState } from 'react';
import CardList from '../components/CardList';
import Header from '../components/Header';
import Message from '../components/Message';
import { createArrWithEmptyObjs, getRandomNumber } from '../utils/pages';

function Orders() {
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
                <div className="store__header">
                    <h2 className="store__title">My orders</h2>
                </div>
                {orderQuery.data?.length === 0 && !orderQuery.isLoading && (
                    <>
                        <Message
                            img={`/images/emoji/emoji-${numberForEmoji}.png`}
                            title="You don't have orders"
                            subtitle="Best time to do some"
                            alt="Simze"
                        />
                    </>
                )}
                {ordersWithProducts?.map((order:any) => (
                    <div className="order" key={order.orderId}>
                        <h3 className="order__title">
                            {!orderQuery.isLoading
                                ? `Order #${order.orderId}`
                                : `Loading...`}
                        </h3>
                        <CardList
                            cards={
                                orderQuery.isLoading
                                    ? arrayWithEmptyObjs
                                    : order.products
                            }
                            isLoading={orderQuery.isLoading}
                        />
                    </div>
                ))}
            </section>
        </div>
    );
}

export default Orders;
