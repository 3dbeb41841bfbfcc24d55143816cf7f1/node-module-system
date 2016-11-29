<!--
This file is auto-generated from a 'template.md'
file using the 'md-process' script.
Therefore *DO NOT* edit this file directly!
Instead edit the template file and then run 'md-process'.
-->

# JavaScript Modules

![Assembling](images/assembling.jpg)

## Background

> __Modularity__: the degree to which a system's components may be separated and recombined.

Since JavaScript began as a Browser only language, it did not have good support for modularization (i.e. breaking up code into separate files and then linking them as needed). When loading your JavaScript from an HTML page, you can simply load all of your scripts via script tags. For example, if we have a web page where our code is in a file called `js/app.js` but we need to include `js/bootstrap.js` and the bootstrap library needs `js/jquery.js`, we would then need to include all 3 JavaScript files in our HTML page:

```HTML
  <script src="js/jquery.js" charset="utf-8"></script>
  <script src="js/bootstrap.js" charset="utf-8"></script>
  <script src="js/app.js" charset="utf-8"></script>
```

This is not easy to manage because:

* We have to remember that using `bootstrap.js` requires us to also include `jquery.js`.
* The order matters, we must include `jquery.js` before `bootstrap.js`.
* Putting the dependencies in our HTML is not ideal.

It would be better if one JavaScript file can include (link/import) the other JavaScript files it needs. Most languages support this kind of inclusion. By having the imports inside the JavaScript code (instead of inside the HTML) it is more clear what each JavaScript file requires (i.e. its dependencies).

### The Early Days

The lack of good modularization became very apparent once NodeJS came on the scene. The first solutions to this problem were

* CommonJS - heavily influenced the current NodeJS module system
* AMD (Asynchronous Module Definition) - a standard that was implemented by the `require.js` library.

---

## Modern JavaScript Module Systems

### Client Side

Client-side module systems still rely on a build step to package all of the JavaScript modules into a set of JavaScript files that the browser can load. Popular systems include:

* Grunt and Gulp - with plugins
* Browserify
* SystemJS - a _universal_ module system that supports _CommonJS_, _AMD_, and _ES2015_ modules.
* Webpack

> Note: `bower` and `npm` are often used to download and manage client-side dependencies.

### Server Side

* NodeJS - comes with its own module system
* ES2015 Modules - new and not supported directly by NodeJS but can be used via the _Babel_ transpiler.
* SystemJS - a _universal_ module system that supports _CommonJS_, _AMD_, and _ES2015_ modules.

> Note: `npm` is often used to download and manage server-side dependencies.

---

## The NodeJS Module System

Since NodeJS comes with its own module system and it works fairly well, we will be covering that one today.

To use a module system we simply need to learn how to _export_ and _import_ various JavaScript code. Any JavaScript type can be exported and imported (Strings, Numbers, Booleans, Arrays, Functions, Objects, Classes) but the most common use-case is to export and import a Function, an Object, or an (ES2015) Class.

### Exporting and Importing

Here is an example of exporting a function:

```javascript
// sum.js
function sum(a, b) {
  return a + b;
}

module.exports = sum;
```

In this code we define a JavaScript function and then assign it to the variable `module.exports`.
NodeJS will automatically make anything assigned to `module.exports` available for importing.

Here is how we would import our `sum` function:

```javascript
// main.js
let adder = require('./sum');

console.log('3 + 4 = ' + adder(3, 4));
```

Note that we can assign the result of the `require` expression to a variable with any name we choose. Here we have used the name `adder` to refer to the value we get back from `require` (the value that was assigned to `module.exports` in `sum.js`).

### What is module.exports?

`module.exports` is simply a variable that initially refers to an empty object. Thus you can either attach values to this object:

```javascript
// random1.js
module.exports.firstName = 'Joe';
module.exports.lastName = 'Hacker';
module.exports.fruit = ['apple', 'orange', 'banana'];
module.exports.feelingGood = true;
```

or you can reassign module.exports to anything you want it to be:

```javascript
// random2.js
module.exports = { name: 'I am an exported object' };
```

Here is how we could import both of those into a script:

```javascript
// main.js
let random1 = require('./random1');
let random2 = require('./random2');

console.log('random1:', random1);
console.log('random2:', random2);
```

Executing the above script produces:

```
random1: { firstName: 'Joe',
  lastName: 'Hacker',
  fruit: [ 'apple', 'orange', 'banana' ],
  feelingGood: true }
random2: { name: 'I am an exported object' }
```

Most commonly you will see `module.exports` assigned to one of the following:

* A function (could be a constructor function or any function)
* An object that has its own properties and methods
* An ES2015 Class

---

## Examples

### Example 1 - A Constructor Function

Here is an example of exporting and importing a Constructor Function

---

```javascript
// car.js
function Car(make, model, color) {
  this.make = make;
  this.model = model;
  this.color = color;
  this.speed = 0;
}
Car.prototype.toString = function() {
  return this.color + ' ' +
         this.make + ' ' +
         this.model + ' is traveling at ' +
         this.speed + ' mph';
};
Car.prototype.accelerate = function(amount) {
  this.speed += amount;
};
Car.prototype.decelerate = function(amount) {
  this.speed -= amount;
};

module.exports = Car;
```

---

```javascript
// main.js
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
```

---

### Example 2 - An ES2015 Class

Here is an example of exporting and importing an ES2015 Class

```javascript
// car.js
class Car {
  constructor(make, model, color) {
    this.make = make;
    this.model = model;
    this.color = color;
    this.speed = 0;
  }
  toString() {
    return this.color + ' ' +
           this.make + ' ' +
           this.model + ' is traveling at ' +
           this.speed + ' mph';
  }
  accelerate(amount) {
    this.speed += amount;
  }
  decelerate(amount) {
    this.speed -= amount;
  }
}

module.exports = Car;
```

```javascript
// main.js
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
```

---

## Summary

Modularization is important to well-organized, maintainable, and reusable code. Just as small blocks of code can be encapsulated into functions, objects, and classes, larger amounts of code can be encapsulated into modules for packaging, testing, and reuse.

---

## For Practice

Try writing a JavaScript Class and export it. Then write a script to import it and use it to create some instances of the class. The class could create Movie objects with the following attributes:

* a title ('Groundhog Day', 'Star Wars')
* the year released
* the genre ('comedy', 'sci-fi')
* a `toString` method that returns something like: "Star Wars - a sci-fi movie released in 1977"

---

## References

* [JavaScript Modules - A Beginner's Guide](https://medium.freecodecamp.com/javascript-modules-a-beginner-s-guide-783f7d7a5fcc#.ex89qyyvh)
* [JavaScript Module Systems Showdown](https://auth0.com/blog/javascript-module-systems-showdown/)

---

## TODO:

* discuss the various Module Patterns:
  - IIFEs
  - see [Boston Lesson](https://github.com/ga-wdi-boston/js-modules-study/blob/master/study.md)
  - see [Mastering the Module Pattern](https://toddmotto.com/mastering-the-module-pattern/)
