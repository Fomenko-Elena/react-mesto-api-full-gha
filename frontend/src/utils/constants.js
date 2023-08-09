const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000';

export const apiSettings = {
    baseUrl: apiUrl,
    headers: {
        'Content-Type': 'application/json'
    },
    credentials: 'include',
}

export const authSettings = {
    baseUrl: apiUrl,
    credentials: 'include',
}

export const noUser = {
    _id: 0,
    email: '',
    name: '',
    about: '',
    avatar: ''
}
