//Returns true if the coin function parameter is a valid coin value of either 1, 5, 10, 25, 50, or 100
//CAN be single-line, not a must but try
function validDenomination(coin) {
    return[1, 5, 10, 25, 50, 100].indexOf(coin) !== -1;
/* MUST: indexOf()
MUST: !==
*/
};
//console.log(validDenomination())

//Returns the calculated value of a single coin object from the obj function parameter
function valueFromCoinObject(obj) {
    const {denom = 0, count = 0,} = obj;
/* MUST use object deconstruction to create constant variables denom and count from the obj function parameter
using default object values of 0 for denom and count */
return validDenomination(denom) ? count * denom: 0;
};
//console.log to test
//console.log(valueFromCoinObject())

//Iterates through an array of coin objects and returns the final calculated value of all coin objects
function valueFromArray(arr) {
   /* if(Array.isArray(arr[0])) {
        arr = arr[0];
    };
    */
// MUST Array.reduce() method, and an arrow function with the Array.reduce() method
// MUST call valueFromCoinObject()
return arr.reduce((accumulator,currentObj) => accumulator + valueFromCoinObject(currentObj), 
0);
};

/* let result =0;
    for(let i=0; i< arr.length; i++) {
        result += valueFromCoinObject(arr[i])
    }
    return result;
};
*/

//This function is the only exported function from the code module
/* Calls and returns the result of valueFromArray() function,
 which will be the value of all coin objects with the coinage array function parameter 
 */
function coinCount(...coinage) {
    return valueFromArray(coinage);
//calling coinObjects
};
//exporting coinCount
module.exports = {
    coinCount
};

//coinCount({ d: 25, c: 2},{ d: 10, c: 5})
//coinCount(...coins);

/* for testing
let coins = [
    {denom: 10, count: 4},
    {demon: 5, count: 3}
]
*/

// FOR TESTING: console.log(valueFromArray(coins))

console.log("{}", coinCount({denom: 5, count: 3}));
console.log("{}s", coinCount({denom: 5, count: 3},{denom: 10, count: 2}));
const coins = [{denom: 25, count: 2},{denom: 1, count: 7}];
console.log("...[{}]", coinCount(...coins));