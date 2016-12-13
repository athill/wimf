var path = require('path');

module.exports = function(app) {
  app.get('/api/:resource', function (req, res) {
    // Using setTimeout to pretend there's some latency here
    setTimeout(function () {
      res.sendFile(path.join(__dirname, '../fixtures/json/' + req.params.resource + '.json'))
    }, 600);
  });
 };