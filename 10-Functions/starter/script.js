'use strict';

/////////////////////////
/*
const bookings = [];
const basePrice = 199;

const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = basePrice * numPassengers
) {
  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking('LH123');
createBooking('LH345', 2, 800);
createBooking('LH345', undefined, 300); // use undefined to skip parameter that we want to use the default
createBooking('LH345', 5);
*/

/////////////////////////
/*
const flight = 'LH234';
const gery = {
  name: 'Geryenko Hawsen',
  passport: 123123123,
};

const checkIn = function (flightNum, passenger) {
  flightNum = 'LH399';
  passenger.name = 'Mr. ' + passenger.name;

  if (passenger.passport === 123123123) {
    alert('Checked in');
  } else {
    alert('Wrong passport!');
  }
};

// checkIn(flight, gery);
console.log(flight);
console.log(gery);

const flightNum = flight;
const passenger = gery;

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 1000000);
};

newPassport(gery);
checkIn(flight, gery);

console.log(flight);
console.log(gery);
*/

////////////////////
/*
// Generic function
const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

// Generic function
const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

// Higher-order function
const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);

  console.log(`Transformed by: ${fn.name}`); // 'name' property of the function
};

transformer('JavaScript is the best!', upperFirstWord);
console.log('-------------------------');
transformer('JavaScript is the best!', oneWord);

// JavaScript callbacks!!
const high5 = function () {
  console.log('✋');
};
document.body.addEventListener('click', high5);
[1, 2, 3, 'Gery'].forEach(high5);
*/

/////////////////////////
/*
// function returning function
const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greeterHey = greet('Hey');
greeterHey('Jonas');
greeterHey('Gery');

greet('Hello')('Yamada'); // calling directly the returned function

// arrow function returning arrow function
const aisatsu =
  (greeting = 'Hi') =>
  name => {
    console.log(`${greeting} ${name}`);
  };

aisatsu()('Gery');
aisatsu('Bye')('Gery');
*/

///////////////////////////////////////

const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  // book: function () {},
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({
      flight: `${this.iataCode}${flightNum}`,
      name,
    });
  },
};

lufthansa.book(239, 'Geryenko Hawsen');
lufthansa.book(635, 'John Smith');
console.log('lufthansa --> ', lufthansa);

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = lufthansa.book;

// Does NOT work
// book(23, 'Sarah Williams');

// CALL METHOD
book.call(eurowings, 23, 'Sarah Williams');
console.log('eurowings --> ', eurowings);

book.call(lufthansa, 239, 'Mary Cooper');
console.log(lufthansa);

const swiss = {
  airline: 'Swiss Airlines',
  iataCode: 'LX',
  bookings: [],
};

book.call(swiss, 583, 'Mary Cooper');
console.log('swiss --> ', swiss);

// APPLY METHOD (Not used in modern JavaScript)
const flightData = [583, 'George Cooper'];
book.apply(swiss, flightData);
console.log('swiss #2 --> ', swiss);

// Better way of doing it
// Use spread operator!!
book.call(swiss, ...flightData);
console.log('swiss #3 --> ', swiss);

// BIND METHOD
const bookEW = book.bind(eurowings)
const bookLH = book.bind(lufthansa)
const bookLX = book.bind(swiss)

bookEW(23, 'Steven Williams')

const bookEW23 = book.bind(eurowings, 23)
bookEW23('Geryenko Hawsen')
bookEW23('Yukimura Sanada')

// With Event Listeners
lufthansa.planes = 300
lufthansa.buyPlane = function() {
  console.log(this);
  this.planes++
  console.log('planes → ', this.planes);
}

// [this] keyword will reference the element of event listener by default
// we need to manual attach the [this] keyword
document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane.bind(lufthansa))

// PARTIAL APPLICATION
const addTax = (rate, value) => value + value * rate
console.log('addTax → ', addTax(0.1, 200));

// when [this] keyword is not needed, use null (could be any other values)
const addVAT = addTax.bind(null, 0.23) // addVat = value => value + value * 0.23
console.log('addVAT → ', addVAT(200));
console.log('addVAT → ', addVAT(23));

const addTaxRate = function(rate) {
  return function(value) {
    return value + value * rate
  }
}
const addVAT2 = addTaxRate(0.23)
console.log('addVAT2 → ', addVAT2(200));
console.log('addVAT2 → ', addVAT2(23));
/*

///////////////////////////////////////
// Coding Challenge #1

/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favorite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what should the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/

const poll = {
  question: 'What is your favorite programming language?',
  option: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    const answer = prompt(`${[this.question, ...this.option].join('\n')}`)
    this.answers[answer]++
    console.log('answers → ', this.answers);
  },
};

document.querySelector('.poll').addEventListener('click', poll.registerNewAnswer.bind(poll))
