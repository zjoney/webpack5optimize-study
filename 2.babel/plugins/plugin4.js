const visitor = {
  FunctionDeclaration() {
    console.log('plugin4');
  }
};
module.exports = function (babel) {
  return {
    visitor,
  };
};