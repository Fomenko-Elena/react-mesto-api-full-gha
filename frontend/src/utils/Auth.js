import { authSettings } from "./constants";

class Auth {
    constructor(options) {
        this.options = options
    }

    signUp(authData) {
        return this._fetch('/signup', {
            method: 'POST',
            body: JSON.stringify(authData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    signIn(authData) {
        return this._fetch('/signin', {
            method: 'POST',
            body: JSON.stringify(authData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    getUser(token) {
        return this._fetch('/users/me', {
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
    }

    _fetch(relativePath, options = null) {
        return fetch(this._getUrl(relativePath), options)
            .then(result => {
                if (result.ok) return result.json();
                return Promise.reject(`Ошибка: ${result.status}`);
            });
    }

    _getUrl(relativePath) {
        return this.options.baseUrl + relativePath;
    }
}

export const auth = new Auth(authSettings)