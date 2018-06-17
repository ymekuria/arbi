const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Gdax = require('gdax');
const gdaxConnection = require('./sevices/gdaxConnection');

app.use(bodyParser.json());
require('./routes/routes')(app);

if (process.env.NODE_ENV === 'production') {
  // express will serve up production assets
  // like our main.js or main.css file
  app.use(express.static('client/build'));

  // express will serve up the index.hml
  // file if it doesn't understand the route ie react router
  // route
  const path = require('path');

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
