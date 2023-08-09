module.exports.PASSWORD_SALT_LENGTH = 10;

module.exports.DEFAULT_USER_NAME = 'Жак-Ив Кусто';
module.exports.DEFAULT_USER_ABOUT = 'Исследователь';
module.exports.DEFAULT_USER_AVATAR = 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png';

const {
  NODE_ENV,
  JWT_SECRET,
  CORS_LIST,
  COOKIE_DOMAIN,
} = process.env;
const isProd = NODE_ENV === 'production';

module.exports.isProd = isProd;

module.exports.SECRET_KEY = isProd ? JWT_SECRET : 'dShHhXIAQkAt7Oe7vZb8lV7buPeIJz1W';
module.exports.JWT_OPTIONS = {
  expiresIn: '7d',
};
module.exports.COOKIE_NAME = 'token';
module.exports.COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: 'strict',
  path: '/',
  maxAge: 60 * 60 * 24 * 7,
  domain: COOKIE_DOMAIN || null,
};

module.exports.allowedCors = [
  'https://praktikum.tk',
  'http://praktikum.tk',
  'http://localhost:3001',
].concat(((CORS_LIST && JSON.parse(CORS_LIST)) || []));
