class Api {
  _baseUrl: string;
  _headers: any;
  constructor({ baseUrl, headers }: any) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkServerResponse(res: any) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Что-то пошло не так. Обратитесь к разработчику`);
  }

  getInitialItems(endpoint: any, limit: any, page: any) {
    if (limit) {
      return fetch(
        `${this._baseUrl}${endpoint}?page=${page}&limit=${limit}`
      ).then((res) => this._checkServerResponse(res));
    } else {
      return fetch(`${this._baseUrl}${endpoint}`).then((res) => {
        return this._checkServerResponse(res);
      });
    }
  }

  addItem(newItem: any, endpoint: any) {
    return fetch(`${this._baseUrl}${endpoint}`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        customId: newItem.customId,
        title: newItem.title,
        price: newItem.price,
        imgUrl: newItem.imgUrl,
        isOnFav: newItem.isOnFav,
        isOnCart: newItem.isOnCart,
      }),
    }).then((res) => this._checkServerResponse(res));
  }

  removeItem(itemId: any, endpoint: any) {
    return fetch(`${this._baseUrl}${endpoint}/${itemId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._checkServerResponse(res));
  }

  addOrder(order: any) {
    return fetch(`${this._baseUrl}orders`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ items: order }),
    }).then((res) => this._checkServerResponse(res));
  }
}

export const api = new Api({
  baseUrl: "https://61c25977de977000179b5481.mockapi.io/",
  headers: {
    "Content-Type": "application/json",
  },
});
