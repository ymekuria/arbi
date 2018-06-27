const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieSession = require('cookie-session');
const mongoose = require('mongoose');
const Gdax = require('gdax');
const keys = require('./config/keys');
const gdaxConnection = require('./services/gdaxConnection');

const app = express();

app.use(
  cookieSession({
    maxAge: 5 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

require('./models/User');
require('./services/passport');
mongoose.connect(keys.mongoURI);
app.use(bodyParser.json());

mongoose.conect;

require('./routes/authRoutes')(app);
require('./routes/routes')(app);

if (['production', 'ci'].includes(process.env.NODE_ENV)) {
  // serves up production assets
  // main.js or main.css file
  app.use(express.static('client/build'));

  // serve ups the index.hml
  // file if it doesn't understand the route ie react router

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve('client', 'build', 'index.html'));
  });
}
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
