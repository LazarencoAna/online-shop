export interface ICategory {
    categoryId: number;
    name: string;
    parentCategoryId: number;
}

export interface IImageUrl {
    productImageId: number;
    productId: number;
    url: string;
}

export interface IStock {
    stockId: number;
    quantity: number;
    size: number;
    color: string;
}

export interface IDeliveryMethod {
    deliveryTypeId: number;
    deliveryName: string;
}

export interface ICartItem {
    productId: number;
    quantity: number;
    size: number;
}

export interface IProduct {
    productId: number;
    name: string;
    descriptions: string;
    metaKeywords: string;
    price: number;
    discountAmount: number;
    vatAmount: number;
    barcode: string;
    categoryId: number;
    isDeleted?: boolean;
    created?: string;
    updated?: string;
    imagesUrl?: string[];
    stocks?: IStock[];
    category?: ICategory;
    deliveryTypes?: IDeliveryMethod[];
}

export interface IUserAccount {
    userAccountId: string;
    displayName: string;
    email: string;
}
export interface IProductOrder {
    productId: number;
    size: number;
    quantity: number;
}

export interface IOrder {
    orderId: number;
    email: string;
    productOrders: IProductOrder[];
    created?: string;
    userAccountId?: string;
    address: string;
    delType: number;
}

