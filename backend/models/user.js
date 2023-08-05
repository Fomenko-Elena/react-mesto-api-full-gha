const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const {
  DEFAULT_USER_NAME,
  DEFAULT_USER_ABOUT,
  DEFAULT_USER_AVATAR,
} = require('../utils/constants');
const { URL_REGEX } = require('../utils/utils');
const { UnauthorizedError } = require('../utils/errors');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: DEFAULT_USER_NAME,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: DEFAULT_USER_ABOUT,
  },
  avatar: {
    type: String,
    default: DEFAULT_USER_AVATAR,
    validate: {
      validator: (value) => URL_REGEX.test(value),
      message: 'Неправильный формат ссылки',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: 'Неправильный формат почты',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

function findUserByCredentials(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Неправильные почта или пароль');
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError('Неправильные почта или пароль');
          }

          return user;
        });
    });
}

userSchema.statics.findUserByCredentials = findUserByCredentials;

module.exports = mongoose.model('user', userSchema);
