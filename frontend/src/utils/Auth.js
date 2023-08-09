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

    signOut() {
        return this._fetch('/signout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    getUser() {
        return this._fetch('/users/me', {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    _fetch(relativePath, options = null) {
        const resultOptions = {
            credentials: authSettings.credentials,
            ...options
        };
        return fetch(this._getUrl(relativePath), resultOptions)
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