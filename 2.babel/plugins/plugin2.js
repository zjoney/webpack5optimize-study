const visitor = {
  FunctionDeclaration() {
    console.log('plugin2');
  }
};
module.exports = function (babel) {
  return {
    visitor,
  };
};