const visitor = {
  FunctionDeclaration() {
    console.log('plugin1');
  }
};
module.exports = function (babel) {
  return {
    visitor,
  };
};