const visitor = {
  FunctionDeclaration() {
    console.log('plugin5');
  }
};
module.exports = function (babel) {
  return {
    visitor,
  };
};