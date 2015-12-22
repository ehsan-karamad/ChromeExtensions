function testFunction() {
  console.log('Sees' + window.xTesting);
  console.log(testVariable);
}

var testVariable;
window.xTesting = true;
testVariable = 3.14;

testFunction();
