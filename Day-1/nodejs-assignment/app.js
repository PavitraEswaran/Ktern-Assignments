// Variable declaration

/*Variables are containers that store values.*/

let message = "First message"; // let variable
console.log(message);

const number = 10; // const variable


// Datatype

let var1 = 100;
let var2 = "Second message";
let var3 = true;
let var4 = { name: "Pavitra", department: "IT" };

console.log(`Type of ${var1} is ${typeof var1}`); // number
console.log(`Type of ${var2} is ${typeof var2}`); // string
console.log(`Type of ${var3} is ${typeof var3}`); // boolean
console.log(`Type is ${typeof var4}`); // object


// if-else

/**
 *  The if block will be executed when the condition is true,
 *  if the condition is false then else will be executed.
 **/

if (var1 < 200) {
  console.log(`The value ${var1} is lesser than 200`);
} else {
  console.log(`The value ${var1} is greater than 200`);
}


// Switch case

/**
 *  The switch expression is evaluated once.
 * The value of the expression is compared with the values of each case.
 * If there is a match the associated block of code is executed.
 * If there is no match the default code block is execute
 **/

let a = 10,
  b = 5;
let operator = "+";
switch (operator) {
  case "-": {
    console.log("Subtraction operation: ", a - b);
    break;
  }

  case "+": {
    console.log("Addition operation: ", a + b);
    break;
  }

  case "*": {
    console.log("Multiplication operation: ", a * b);
    break;
  }

  default:
    console.log("No operation performed");
}


// While loop

/* Loop executes as long as the condition is true */

let counter = 1;

while (counter <= 5) {
  console.log("Iteration: ", counter);
  counter++;
}


// For loop

/* Loops through a block of code a number of times */

for (let i = 2; i <= 5; i++) {
  console.log("The value of i is: ", i);
}


// Looping through dictionaries

// For In loop

/* This statement loops through the properties of an Object */
const person = { firstname: "Pavitra", lastname: "Eswaran" };

let personName = "";
for (let key in person) {
  personName += person[key];
}

console.log("The name of the person is ", personName);


// Function

/**
 * Function is a block of code designed to perform a particular task.
 * Same function can be called multiple times.
 **/

/**
 * Function to check if given number is a prime number
 * @param {number} number Number to check
 * @returns {boolean} boolean whether number is prime
 */
function prime(number) {
  if (number > 0) {
    for (let i = 2; i <= Math.sqrt(number) + 1; i++) {
      if (number % i == 0) {
        return false;
      }
    }
  } else {
    return false;
  }
  return true;
}

let numberToBeChecked = 7;
if (numberToBeChecked == 1) {
  console.log("The number is neither prime nor composite");
}
if (prime(numberToBeChecked)) {
  console.log(`The number ${numberToBeChecked} is prime`);
} else {
  console.log(`The number ${numberToBeChecked} is not a prime`);
}


// Async and Await functions

/**
 * Async ensures that the function returns a promise.
 * The await keyword can only be used inside an async function.
 * The await keyword makes the function pause the execution and
 * wait for a resolved promise before it continues
 **/
async function fetchData() {
  try {
    const response = await fetch("https://dummyjson.com/products/1");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

fetchData();
