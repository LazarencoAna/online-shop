import { auth } from "../firebase";
import APIClient from "./api";
import { ICartItem, ICategory, IDeliveryMethod, IOrder, IProduct, IUserAccount } from "./store-api";


export function fetchProductCategories(): Promise<ICategory[]> {
    return StoreApi.Instance.fetchCategories();
}

export function fetchProductDeliveryMethods(): Promise<IDeliveryMethod[]> {
    return StoreApi.Instance.fetchDeliveryMethods();
}

export function addProductAsync(product: IProduct): Promise<any> {
    return StoreApi.Instance.addProduct(product);
}

export function editProductAsync(product: IProduct): Promise<any> {
    return StoreApi.Instance.UpdateProduct(product);
}

export function fetchProductsAsync(): Promise<IProduct[]> {
    return StoreApi.Instance.fetchProducts();
}

export function deleteProductsAsync(productId: number): Promise<any> {
    return StoreApi.Instance.DeleteProduct(productId);
}

export function fetchProductAsync(productId: number): Promise<IProduct> {
    return StoreApi.Instance.fetchProduct(productId);
}

export function addToFavoriteAsync(productId: number): Promise<IProduct> {
    return StoreApi.Instance.AddToFavorite(productId);
}

export function removeFromFavoriteAsync(productId: number): Promise<IProduct> {
    return StoreApi.Instance.DeleteFromFavorite(productId);
}

export function deleteFromFavoriteAsync(productId: number): Promise<IProduct> {
    return StoreApi.Instance.DeleteFromFavorite(productId);
}

export function getFavoriteAsync(): Promise<number[]> {
    return StoreApi.Instance.GetFavorite();
}

export function fetchCartAsync(): Promise<ICartItem[]> {
    return StoreApi.Instance.GetCart();
}

export function addToCartAsync(cartItem: ICartItem): Promise<any> {
    return StoreApi.Instance.AddToCart(cartItem);
}

export function removeFromCartAsync(cartItem: ICartItem): Promise<any> {
    return StoreApi.Instance.RemoveFromCart(cartItem);
}

export function UpdateUserAccountAsync(userAccount: IUserAccount): Promise<string> {
    return StoreApi.Instance.UpdateUserAccount(userAccount);
}

export function MakeOrderAsync(order: IOrder): Promise<number> {
    return StoreApi.Instance.MakeOrder(order);
}

export function MakeOrderAnonymousAsync(order: IOrder): Promise<number> {
    return StoreApi.Instance.MakeOrderAnonymous(order);
}

export function fetchOrdersAsync(): Promise<IOrder[]> {
    return StoreApi.Instance.FetchOrder();
}

export function fetchAllUsersAsync(): Promise<IUserAccount[]> {
    return StoreApi.Instance.FetchAllUsers();
}

export function fetchAllOrdersAsync(): Promise<IOrder[]> {
    return StoreApi.Instance.FetchAllOrders();
}

export function fetchAllUserOrdersAsync(userId: string): Promise<IOrder[]> {
    return StoreApi.Instance.FetchAllForUsersOrders(userId);
}


class StoreApi extends APIClient {
    private static _instance: StoreApi;
    private constructor() {
        super("https://localhost:7278/api/");
    }
    public static get Instance() {
        // Do you need arguments? Make it a regular static method instead.
        return this._instance || (this._instance = new this());
    }

    async fetchCategories(): Promise<ICategory[]> {
        const categories = await this.doGET("categories", {});
        return categories as ICategory[];
    }

    async fetchDeliveryMethods(): Promise<IDeliveryMethod[]> {
        const deliveryMethods = await this.doGET("DeliveryType", {});
        return deliveryMethods as IDeliveryMethod[];
    }


    async fetchProducts(): Promise<IProduct[]> {
        const products = await this.doGET("products", {});
        return products as IProduct[];
    }

    async fetchProduct(productId: number): Promise<IProduct> {
        const product = await this.doGET(`products/${productId}`, {});
        return product as IProduct;
    }

    async addProduct(product: IProduct): Promise<any> {
        const response = await this.doPOST("products", product);
        return response;
    }

    async UpdateProduct(product: IProduct): Promise<any> {
        const response = await this.doPUT("products", product);
        return response;
    }

    async DeleteProduct(productId: number): Promise<any> {
        const response = await this.doDELETE(`products/${productId}`, {});
        return response;
    }

    async AddToFavorite(productId: number): Promise<any> {
        const token = await auth.currentUser?.getIdToken();
        const response = await this.doPOST(`products/favorite/${productId}`,{},{ headers: { Authorization: `Bearer ${token}` } });
        return response;
    }

    async DeleteFromFavorite(productId: number): Promise<any> {
        const token = await auth.currentUser?.getIdToken();

        const response = await this.doDELETE(`products/favorite/${productId}`, { headers: { Authorization: `Bearer ${token}` } });
        return response;
    }

    async GetFavorite(): Promise<any> {
        const token = await auth.currentUser?.getIdToken();

        const response = await this.doGET(`products/favorite`, { headers: { Authorization: `Bearer ${token}` } });
        return response;
    }

    async GetCart(): Promise<any> {
        const token = await auth.currentUser?.getIdToken();
        const response = await this.doGET(`Cart`, { headers: { Authorization: `Bearer ${token}` } });
        return response;
    }

    async AddToCart(cart: ICartItem): Promise<any> {
        const token = await auth.currentUser?.getIdToken();
        const response = await this.doPOST(`Cart`, cart, { headers: { Authorization: `Bearer ${token}` } });
        return response;
    }

    async RemoveFromCart(cart: ICartItem): Promise<any> {
        const token = await auth.currentUser?.getIdToken();
        const response = await this.doDELETE(`Cart/${cart.productId}/${cart.size}`, { headers: { Authorization: `Bearer ${token}` } });
        return response;
    }

    async UpdateUserAccount(userAccount: IUserAccount): Promise<string> {
        const token = await auth.currentUser?.getIdToken();
        const response = await this.doPOST(`User`, userAccount, { headers: { Authorization: `Bearer ${token}` } });
        return response;
    }

    async MakeOrder(order: IOrder): Promise<number> {
        const token = await auth.currentUser?.getIdToken();
        const response = await this.doPOST(`order`, order, { headers: { Authorization: `Bearer ${token}` } });
        return response;
    }

    async FetchOrder(): Promise<IOrder[]> {
        const token = await auth.currentUser?.getIdToken();
        if(!token) return [];
        const response = await this.doGET(`order`, { headers: { Authorization: `Bearer ${token}` } });
        return response;
    }

    async FetchAllOrders(): Promise<IOrder[]> {
        const token = await auth.currentUser?.getIdToken();
        if(!token) return [];
        const response = await this.doGET(`order/all`, { headers: { Authorization: `Bearer ${token}` } });
        return response;
    }

    async FetchAllForUsersOrders(userId: string): Promise<IOrder[]> {
        const token = await auth.currentUser?.getIdToken();
        if(!token) return [];
        const response = await this.doGET(`order/all/${userId}`, { headers: { Authorization: `Bearer ${token}` } });
        return response;
    }

    async FetchAllUsers(): Promise<IUserAccount[]> {
        const token = await auth.currentUser?.getIdToken();
        if(!token) return [];
        const response = await this.doGET(`user`, { headers: { Authorization: `Bearer ${token}` } });
        return response;
    }

    async MakeOrderAnonymous(order: IOrder): Promise<number> {
        const response = await this.doPOST(`order/anonymous`, order, { });
        return response;
    }
}