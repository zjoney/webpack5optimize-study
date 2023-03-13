const visitor = {
  FunctionDeclaration() {
    console.log('plugin6');
  }
};
module.exports = function (babel) {
  return {
    visitor,
  };
};