setTimeout(function() {
  console.log('Goodbye.');
}, 5000);

setTimeout(function() {
  console.log('World!');
}, 2000);

setInterval(function() {
  console.log('Are we there yet?')
}, 1000);

console.log('Hello');

/*
   Question: when will NodeJS exit this program?
   Answer: Not until you kill the program.
   Explanation: NodeJS will not exit until:
     1. The main script has completed
     2. The async queue is empty
     3. There are no active event listeners
   The only exception to this rule is if the program receives a "kill" signal from the Operationg System.
*/
