const gdaxConnection = require('../sevices/gdaxConnection');

test('can create a gdax websocket connection', done => {
  const socket = gdaxConnection(['ETH-USD']);
  socket.on('message', data => {
    expect(data.product_id === 'ETH-USD');
    socket.disconnect();
    done();
  });
});
