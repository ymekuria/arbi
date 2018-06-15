const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Gdax = require('gdax');
const gdaxConnection = require('./sevices/gdaxConnection');

app.use(bodyParser.json());
require('./routes/routes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
