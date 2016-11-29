var Car = require('./car');

console.log(Car);  // [Function: Car]

var tesla = new Car('Tesla', 'Model S', 'black');
console.log(tesla.toString());
tesla.accelerate(60);
console.log(tesla.toString());
tesla.decelerate(30);
console.log(tesla.toString());


var leaf = new Car('Nissan', 'Leaf', 'red');
console.log(leaf.toString());
leaf.accelerate(10);
console.log(leaf.toString());
