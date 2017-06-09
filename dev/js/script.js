// @ts-check
'use strict';

/**
 * Given an array arr, find element pairs whose sum equal the second argument arg
 * and return the sum of their indices.
 * @param {array} arr
 * @param {number} arg 
 * @return {number} 
 */
function pairwise (arr, arg) {
    let arrLen = arr.length; 
    let usedInd = [];
    return arr.reduce((acc, current, currentIndex, array) => {
        if (usedInd.indexOf(currentIndex) !== -1) {
            return acc;
        }
        let i = currentIndex+1;
        while (i<arrLen) {
            if (usedInd.indexOf(i) !== -1) {
                i++;
                continue;
            }
            if (array[i] + current === arg) {
                acc += i + currentIndex;
                usedInd.push(i);
                break; 
            } 
            i++;
        }
        return acc;
    }
    , 0);
}
pairwise([0, 0, 0, 0, 1, 1], 1);


//   should return 
 
//  [{name : "iss", orbitalPeriod: 5557},
//  {name: "hubble", orbitalPeriod: 5734},
//  {name: "moon", orbitalPeriod: 2377399}].

// var Person = (firstAndLast) => {
//     // Complete the method below and implement the others similarly
//     let arr = firstAndLast.split(' ');
    
//     // setters
//     this.setFirstName = (first) => arr[0] = first;
//     this.setLastName = (last) => arr[1] = last;
//     this.setFullName = (firstAndLast) => arr = firstAndLast.split(' ');
//     // getters
//     this.getFullName = () => arr.join(' ');
//     this.getFirstName = () => arr[0];
//     this.getLastName = () => arr[1];

// };

// var bob = new Person('Bob Ross');
// bob.getFullName();



// Java program to print all permutations of a
// given string.

/**
 * 
//  * @param {String} str 
 */
// function permAlone (str) {
//     let n = str.length;
//     permute(str, 0, n - 1);
    
//     function permute (str, l, r) {
//         // if (l === r && !(/(.)\1+/.test(str))) {
//         if (l === r) {
//         }        else {
//             for (let i = l; i <= r; i++) {
//                 str = swap(str, l, i);
//                 permute(str, l + 1, r);
//                 str = swap(str, l, i);
//             }
//         }
//     }


// /**
//  * permutation function
//  * @param {number} l starting index
//  * @param {number} r end index
//  */

// // /**
// //  * Swap Characters at position
// //  * @param a string value
// //  * @param i position 1
// //  * @param j position 2
// //  * @return swapped string
// //  */

// /**
//  * 
//  * @param {String} a 
//  * @param {number} i 
//  * @param {number} j 
//  */
// function swap (a, i, j) {
//     let temp;
//     let charArray = a.split('');
//     temp = charArray[i];
//     charArray[i] = charArray[j];
//     charArray[j] = temp;
//     return charArray.join('');
// }
// function updateInventory (curInv, newInv) {
//     // Compare and update the inventory stored in a 2D array against a second 2D array of a fresh delivery.


//     //  Update the current existing inventory item quantities (in arr1). for/while
//     let updatedInv = newInv.reduce( (acc, item, index) {
//         let hasProperty = false;
//         for (let i = 0, len = acc.length; i < len; i++) {
//             if (acc[i][1] === newInv[index][1]) {
//                 acc[i][0] += newInv[index][0];
//                 hasProperty = true;
//                 break;
//             }
//         }
//         if (!hasProperty) {
//             acc.push( [newInv[index][0], newInv[index][1]] );
//         }
//         return acc;
//     }, curInv);

//     //   If an item cannot be found, add the new item and quantity into the inventory array. 
// // if(arr1[i] === undefinded){ arr[i] = []}

// //   The returned inventory array should be in alphabetical order by item. - sort
//     updatedInv.sort( (a, b) => a[1].charCodeAt(0) - b[1].charCodeAt(0));

//     return updatedInv;
// }

// // Example inventory lists
// // var curInv = [
// //     [21, 'Bowling Ball'],
// //     [2, 'Dirty Sock'],
// //     [1, 'Hair Pin'],
// //     [5, 'Microphone']
// // ];

// // var newInv = [
// //     [2, 'Hair Pin'],
// //     [3, 'Half-Eaten Apple'],
// //     [67, 'Bowling Ball'],
// //     [7, 'Toothpaste']
// // ];

// if (Array.prototype.equals)
//     console.warn('Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there\'s a framework conflict or you\'ve got double inclusions in your code.');
// // attach the .equals method to Array's prototype to call it on any array
// Array.prototype.equals = function (array) {
//     // if the other array is a falsy value, return
//     if (!array)
//         return false;

//     // compare lengths - can save a lot of time 
//     if (this.length != array.length)
//         return false;

//     for (var i = 0, l=this.length; i < l; i++) {
//         // Check if we have nested arrays
//         if (this[i] instanceof Array && array[i] instanceof Array) {
//             // recurse into the nested arrays
//             if (!this[i].equals(array[i]))
//                 return false;       
//         }                   else if (this[i] != array[i]) { 
//             // Warning - two different object instances will never be equal: {x:20} != {x:20}
//             return false;   
//         }           
//     }       
//     return true;
// };
// // Hide method from for-in loops
// Object.defineProperty(Array.prototype, 'equals', {enumerable: false});

// // updateInventory(curInv, newInv);

// updateInventory([[21, 'Bowling Ball'], [2, 'Dirty Sock'], [1, 'Hair Pin'], [5, 'Microphone']], [[2, 'Hair Pin'], [3, 'Half-Eaten Apple'], [67, 'Bowling Ball'], [7, 'Toothpaste']]);

//  should return 
// [[88, "Bowling Ball"], 
// [2, "Dirty Sock"], 
// [3, "Hair Pin"],
//  [3, "Half-Eaten Apple"],
//   [5, "Microphone"], 
//   [7, "Toothpaste"]].
//  dodać arrow functions

// function checkCashRegister (price, cash, cid) {

//     // an array to map nominały to integers
//     /** @type {Array} */
//     const valueMoney = [0.01, 0.5, 0.1, 0.25, 1, 5, 10, 20, 100];

//     /**
//      * @param {Array} arr - an array 
//      * @return {boolean}  - if register is empty
//      */
//     function checkClosed (arr) {
//         return arr.every((value) => value[1] === 0);
//     }

//     // var isCIDClosed = (arr) => arr.every( (value) => (value[1] === 0));   
//     //         return arr.every(function (value) {
//     //             return value[1] === 0;   
//     //         });
//     // }
//     /** @type {number} */
//     let sumInRegister = cid.reduce( (acc, item) => acc += item[1], 0);

//     /** @type {number} należna reszta */
//     let debt = cash - price; //96.74

//     if (sumInRegister < debt) {
//         return 'Insufficient Funds';
//     }

//     // Liczymy od najwyżej wartości, tj. 100, 20, 
//     // zapisując kolejne nominały oraz ich wartości jako tablicę [nominał, wartość] w tablicy (akumulator)
//     /** @type {array} */
//     let returnChangeArr = cid.reduceRight( (acc, item, index) => {

//         // pomocniczy string w postaci nazwy nominału do iteracji
//         /** @type {string} */
//         let currentValueName = cid[index][0];

//         // suma reszty w danym nominale
//         /** @type {number} */
//         var currentValueSum = 0;

//         // dla każdego nominału sprawdzamy czy jego wielkość nie jest większa niż należna reszta
//         // oraz czy w kasie jest taki nominał 
//         // obniżamy dług o dany nominał, zmniejszamy liczbę nominałów w kasie oraz zwiększamy su
//         while (debt >= valueMoney[index] && cid[index][1] !== 0) {
//             // poniżej tej wartości operacje na float stają się nieprecyzyjne
//             // konieczne staje się ograniczenie wielkości liczb wiodących - tu wystarczy pierwsza
//             if (debt < 0.05) {
//                 debt = parseFloat(debt.toPrecision(1));
//                 cid[index][1] = parseFloat(cid[index][1].toPrecision(1));
//             }
//             debt -= valueMoney[index];
//             cid[index][1] -= valueMoney[index];
//             currentValueSum += valueMoney[index];
//         }
//         if (currentValueSum !== 0) {
//             acc.push([currentValueName, currentValueSum]);
//             return acc;
//         } else {
//             return acc;
//         }
//     }, []);


//     if (debt) {
//         return 'Insufficient Funds';
//     } else if (checkClosed(cid)) {
//         return 'Closed';
//     } else {
//         return returnChangeArr;
//     }
// }

// checkCashRegister(19.50, 20.00, [['PENNY', 0.50], ['NICKEL', 0], ['DIME', 0], ['QUARTER', 0], ['ONE', 0], ['FIVE', 0], ['TEN', 0], ['TWENTY', 0], ['ONE HUNDRED', 0]]);
// [["TWENTY", 60.00], ["TEN", 20.00], ["FIVE", 15.00], ["ONE", 1.00], ["QUARTER", 0.50], ["DIME", 0.20], ["PENNY", 0.04]].


   // obiekt kasy z polami poszczególnych nominałów i zsumowanej wartości nominałów 
// var cashRegister = cid.reduce(
//             function internalArrToObj (acc, item) {
//                 acc[item[0]] = item[1];  
//                 return acc;
//             }, {});

// var returnChange = {
//         'ONE HUNDRED' : 0,
//         'TWENTY' : 0,
//         'TEN': 0,
//         'FIVE': 0,
//         'ONE': 0,
//         'QUARTER': 0,
//         'DIME': 0,
//         'NICKEL':0,
//         'PENNY' : 0
//     };

    // cashRegister;
    // while (debt >= 100 && cashRegister['ONE HUNDRED'] !== 0) {
    //     debt =- 100;
    //     cashRegister['ONE HUNDRED'] -= 100;
    //     returnChange['ONE HUNDRED'] += 100;
    // }
    // while (debt >= 20 && cashRegister['TWENTY'] !== 0) {
    //     debt -= 20;
    //     cashRegister['TWENTY'] -= 20;
    //     returnChange['TWENTY'] += 20;
    // }
    // debt;
    // while (debt >= 10 && cashRegister['TEN'] !== 0) {
    //     debt -= 10;
    //     cashRegister['TEN'] -= 10;
    //     returnChange['TEN'] += 10;
    // }
    // while (debt >= 5 && cashRegister['FIVE'] !== 0) {
    //     debt -= 5;
    //     cashRegister['FIVE'] -= 5;
    //     returnChange['FIVE'] += 5;
    // }
    // while (debt >= 1 && cashRegister['ONE'] !== 0) {
    //     debt -= 1;
    //     cashRegister['ONE'] -= 1;
    //     returnChange['ONE'] += 1;
    // }
    // while (debt >= 0.25 && cashRegister['QUARTER'] !== 0) {
    //     debt -=  0.25;
    //     cashRegister['QUARTER'] -=  0.25;
    //     returnChange['QUARTER'] +=  0.25;
    // }
    // while (debt >= 0.1 && cashRegister['DIME'] !== 0) {
    //     debt -= 0.1;
    //     cashRegister['DIME'] -= 0.1;
    //     returnChange['DIME'] += 0.1;
    // }
    // while (debt >= 0.05 && cashRegister['NICKEL'] !== 0) {
    //     debt -= 0.05;
    //     cashRegister['NICKEL'] -= 0.05;
    //     returnChange['NICKEL'] += 0.05;
    // }
    // // change = change.toPrecision(1);
    // while (debt >= 0.01 && cashRegister['PENNY'] !== 0) {
    //     debt = parseFloat(debt.toPrecision(1));
    //     debt -= 0.01;
    //     cashRegister['PENNY'] -= 0.01;
    //     returnChange['PENNY'] += 0.01;
    // }

// mapowanie obiektu na tablicę 2 wymiarową np [ [właściwość1: wartość1], [właściwośc2: wartość2], ...]
    // var arr = Object.keys(returnChange)
    //                 .map(function (key) {
    //                     if (returnChange[key] != 0)
    //                         return [key, returnChange[key]]; 
    //                 })
    //                 .filter(function (value) {
    //                     if (value != undefined)
    //                         return true;
    //                 });

    // return arr;