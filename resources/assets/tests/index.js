// var context = require.context('.', true, /.+\.spec\.jsx?$/);
// context.keys().forEach(context);
// module.exports = context;

var testContext = require.context('./', true, /.+\.spec\.js?$/);
testContext.keys().forEach(testContext);

// var srcContext = require.context('../src/', true, /.*\.js$/);
// srcContext.keys().forEach(srcContext);