module.exports.crachTest = () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
};
