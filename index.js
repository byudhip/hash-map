import { HashMap } from "./hash-map.js";

const test = HashMap(); // or HashMap() if using a factory

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

test.set("jacket", "red");
test.set("kite", "violet");
test.set("lion", "turquoise");

test.set("moon", "silver");

console.log(test.get("jacket"));
console.log(test.has("ice cream"));
console.log(test.remove("jacket"));
console.log(test.length());
console.log("keys: ", test.keys());
console.log("values: ", test.values());
console.log("entries: ", test.entries());
console.log(test.clear());
