import { IDeliveryMethod, IProduct } from "../api/store-api";



export type ProductModel = {
    name?: string;
    categoryId?: number;
    descriptions?: string;
    metaKeywords?: string;
    price?: number;
    discountAmount?: number;
    discountPercent?: number;
    vatAmount?: number;
    barcode?: string;
    provider?: string;
    deliveryMethods?: IDeliveryMethod[];
    stock?: StockModel[];
    imagesUrl?: string[];
}

export type StockModel = {
    id: number;
    quantity: number;
    size: number;
    color: string;
}
export type ImageModel = {
    productImageId: number;
    url: string;
}

export enum DeliveryMethod { EasyBox, GLS }

export const productModelToIProduct = (product: ProductModel): IProduct => {
    const iProduct: IProduct = {
        productId: 0,
        name: product.name ?? '',
        descriptions: product.descriptions ?? '',
        metaKeywords: product.metaKeywords ?? '',
        price: product.price ?? 0,
        discountAmount: product.discountAmount ?? 0,
        vatAmount: product.vatAmount ?? 0,
        barcode: product.barcode ?? '',
        categoryId: product.categoryId ?? 0,
        deliveryTypes: product.deliveryMethods,
        //imagesUrl: ['Test1', 'test'],
        imagesUrl: product.imagesUrl ?? [],
        stocks:
            product.stock?.map((stock) => {
                var s: IStock = {
                    stockId: stock.id,
                    quantity: stock.quantity,
                    size: stock.size,
                    color: stock.color,
                };
                return s;
            }) ?? [],
    };
    return iProduct;
}

export const iProductToProductModel = (iProduct: IProduct): ProductModel => {
    const product: ProductModel = {
        productId: 0,
        name: iProduct.name ?? '',
        descriptions: iProduct.descriptions ?? '',
        metaKeywords: iProduct.metaKeywords ?? '',
        price: iProduct.price ?? 0,
        discountAmount: iProduct.discountAmount ?? 0,
        vatAmount: iProduct.vatAmount ?? 0,
        barcode: iProduct.barcode ?? '',
        categoryId: iProduct.categoryId ?? 0,
        deliveryMethods: iProduct.deliveryTypes,
        imagesUrl: iProduct.imagesUrl,
        stock:
            iProduct.stocks?.map((stock) => {
                var s: StockModel = {
                    id: stock.stockId,
                    quantity: stock.quantity,
                    size: stock.size,
                    color: stock.color,
                };
                return s;
            }) ?? [],
    };
    return product;
}