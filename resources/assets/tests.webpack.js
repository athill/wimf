// var context = require.context('.', true, /.+\.spec\.jsx?$/);
// context.keys().forEach(context);
// module.exports = context;

var testContext = require.context('.', true, /.+\.spec\.jsx?$/);
testContext.keys().forEach(testContext);

var srcContext = require.context('../', true, /index.js$/);
srcContext.keys().forEach(srcContext);