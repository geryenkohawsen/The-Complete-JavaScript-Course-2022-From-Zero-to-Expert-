'use strict';

const Person = function (firstName, birthYear) {
  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  // NEVER DO THIS !!
  // Will create the same method to every new Person
  // calcAge = function () {
  //   console.log(2037 - this.birthYear);
  // };
};

const gery = new Person('Gery', 1999);
console.log(gery);

// 1. New {} is created
// 2. function is called, this = {}
// 3. {} linked to prototype
// 4. function automatically return {}

const matilda = new Person('Matilda', 2017);
const jack = new Person('Jack', 1997);
console.log(matilda, jack);

console.log('instanceof --> ', gery instanceof Person);

// Prototypes
console.log(Person.prototype);
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

gery.calcAge();
matilda.calcAge();

console.log('gery.__proto__ --> ', gery.__proto__);
console.log(
  'gery.__proto__ === Person.prototype --> ',
  gery.__proto__ === Person.prototype
);

console.log(
  'log(Person.prototype.isPrototypeOf(gery) --> ',
  Person.prototype.isPrototypeOf(gery)
);
console.log(
  'log(Person.prototype.isPrototypeOf(Person) --> ',
  Person.prototype.isPrototypeOf(Person)
);

// We can attach properties to the prototype also
Person.prototype.species = 'Homo sapiens';
console.log(gery.species, matilda.species);
console.log(
  'gery.hasOwnProperty(firstName) --> ',
  gery.hasOwnProperty('firstName')
);
console.log(
  'gery.hasOwnProperty(species) --> ',
  gery.hasOwnProperty('species')
);

console.log('gery.__proto__ --> ', gery.__proto__);
console.log('gery.__proto__.__proto__ --> ', gery.__proto__.__proto__); // Object.prototype is the top of the prototype chain
console.log(
  'gery.__proto__.__proto__.__proto__ --> ',
  gery.__proto__.__proto__.__proto__
);
console.dir(Person.prototype.constructor);

const arr = [1, 2, 3, 4, 1, 2, 3, 5]; // new Array === []
console.log('arr.__proto__ --> ', arr.__proto__);
console.log(arr.__proto__ === Array.prototype);
console.log('arr.__proto__.__proto__ --> ', arr.__proto__.__proto__);

Array.prototype.unique = function () {
  console.dir(this);
  return [...new Set(this)];
};

console.log(arr.unique());

const h1 = document.querySelector('h1');
console.dir(h1);
console.dir(x => x + 1);
