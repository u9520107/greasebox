
function *gen() {
  var i = 0;
  while(true) {
    yield i++;
  }
}

export default gen;
