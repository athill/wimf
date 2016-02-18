var context = require.context('.', true, /.+\.spec\.jsx?$/);
console.log(context);
context.keys().forEach(context);
module.exports = context;