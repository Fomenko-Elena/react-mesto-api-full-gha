import { apiSettings } from "./constants";

class Api {
    constructor(options) {
        this.options = options;
    }

    getUser() {
        return this._fetch('/users/me');
    }

    updateUser(userData) {
        return this._fetch('/users/me', {
            method: 'PATCH',
            body: JSON.stringify(userData)
        });
    }

    updateAvatar(avatarData) {
        return this._fetch('/users/me/avatar', {
            method: 'PATCH',
            body: JSON.stringify(avatarData)
        });
    }

    getInitialCards() {
        return this._fetch('/cards');
    }

    addCard(cardData) {
        return this._fetch('/cards', {
            method: 'POST',
            body: JSON.stringify(cardData)
        })
    }

    removeCard(cardId) {
        return this._fetch(`/cards/${cardId}`, { method: 'DELETE' });
    }

    likeCard(cardId, like) {
        if (like) return this._fetch(`/cards/${cardId}/likes`, { method: 'PUT' });
        return this._fetch(`/cards/${cardId}/likes`, { method: 'DELETE' });
    }

    _fetch(relativePath, options = null) {
        const resultOptions = Object.assign(
            {
                headers: this.options.headers,
                credentials: this.options.credentials,
            },
            options);

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

export const api = new Api(apiSettings)