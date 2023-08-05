export const apiSettings = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-65',
    headers: {
        authorization: '9afef1e9-c180-4844-bf4b-4960d997f13a',
        'Content-Type': 'application/json'
    }
}

export const authSettings = {
    baseUrl: 'https://auth.nomoreparties.co'
}

export const noUser = {
    _id: 0,
    name: '',
    about: '',
    avatar: ''
}

export const noAuthUser = {
    _id: 0,
    email: ''
}

export const tokenName = 'token'