module.exports = app => {
  app.get('/api', (req, res) => {
    res.send('HI WORLD');
  });
};
