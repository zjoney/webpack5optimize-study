const visitor = {
  FunctionDeclaration() {
    console.log('plugin3');
  }
};
module.exports = function (babel) {
  return {
    visitor,
  };
};