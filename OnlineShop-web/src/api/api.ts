import { isUndefined, cloneDeep } from 'lodash';

export type APIOptions = {
    headers?: {
        Authorization?: string;
    };
    method?: string;
    body?: string;
};
// firebase.auth().currentUser.getIdToken(/ forceRefresh / true)
// .then(function(idToken) {

// }).catch(function(error) {

// });
export default class APIClient {
    baseUrl: string;
    defaultHeaders = {
        Accept: 'text/plain',
        'Content-Type': 'application/json',
        'X-Requested-With': 'fetch',
    };

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    getUrl(path: string) {
        return this.baseUrl + path;
    }

    checkResponseStatus(response: any) {
        if (response.status >= 200 && response.status < 500) {
            return response;
        }
        const error = new Error(response.statusText);
        error.message = response;
        throw error;
    }
    parseResponse(response: any) {
        return response?.json().then(
            (data: any) =>
                new Promise((resolve, reject) => {
                    if (response.status >= 400) {
                        const newData = cloneDeep(data);
                        reject({
                            response: newData,
                            httpCode: response.status,
                            message: response.statusText,
                        });
                    } else {
                        resolve(data);
                    }
                })
        ).catch(() => {
            return {};
        });
    }

    async request(url: string, options: APIOptions): Promise<any> {
        if (isUndefined(options.headers!.Authorization)) {
            const accessToken = "";
            options.headers!.Authorization = `Bearer ${accessToken}`;
        }
        options.headers =   { ...this.defaultHeaders, ...(options.headers || {}) };
        return fetch(url, options).then(this.checkResponseStatus).then(this.parseResponse);
    }

    doGET(path: string, options: APIOptions) {
        var headers =  { ...this.defaultHeaders, ...(options.headers || {}) };

        return this.request(this.getUrl(path), {
            headers: headers,
            ...options,
        });
    }

    doPOST(
        path: string,
        data: any,
        options: APIOptions = {},
    ) {
        var headers =  { ...this.defaultHeaders, ...(options.headers || {}) };
        return this.request(this.getUrl(path), {
            headers: headers,
            method: 'POST',
            body: data ? JSON.stringify(data) : data,
            ...options,
        });
    }

    doPUT(
        path: string,
        data: any,
        options: APIOptions = {},
    ) {
        return this.request(this.getUrl(path), {
            headers: { ...this.defaultHeaders, ...(options.headers || {}) },
            method: 'PUT',
            body: data ? JSON.stringify(data) : data,
            ...options,
        });
    }

    doDELETE(path: string, options: APIOptions) {
        return this.request(this.getUrl(path), {
            headers: { ...this.defaultHeaders, ...(options.headers || {}) },
            method: 'DELETE',
            ...options,
        });
    }
}