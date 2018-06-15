const Gdax = require('gdax');

module.exports = options => {
  return new Gdax.WebsocketClient(options);
};
