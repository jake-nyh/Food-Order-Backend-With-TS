"use strict";
let person = "hla hla";
let age = 23;
let passed = true;
let arr1 = [1, 2, 3, 4, "a"];
arr1.push(4);
let arr2 = [1, 3, 4, 5];
arr2.push(4);
let team = {
    name: "mg mg",
    age: 12,
    passed: true
};
team.name = "nyh";
team = {
    name: "lee",
    age: 3,
    passed: false
};
let address;
address = "mingalardon";
let workers;
workers = ["mg mg", "aung aung"];
let workersAge;
workersAge = [16, 48, "mg mg"];
let motherName;
motherName = [1, "mgmg"];
let bird = {
    name: "i bird",
    property: "canfly",
    getAge(age) {
        return age;
    }
};
console.log(bird.getAge(13));
const add = (a, b, c) => {
    return a + b;
};
add(1, 3);
