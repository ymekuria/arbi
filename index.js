const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');
const Gdax = require('gdax');
const gdaxConnection = require('./services/gdaxConnection');

require('./services/passport');

app.use(bodyParser.json());

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
