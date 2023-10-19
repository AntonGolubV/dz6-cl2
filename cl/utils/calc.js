/* let op;
let result;
let a = Number(parsedUrl.query.param1);
let b = Number(parsedUrl.query.param2); */
function calcRes(a, b, op) {
    let result;
    switch (op) {
        case "+":
            result = a + b;
            break;
        case "-":
            result = a - b;
            break;
        case "*":
            result = a * b;
            break;
        case "/":
            result = a / b;
            break;
    }
    return result;
}

const operations = {
    0: "+",
    1: "-",
    2: "*",
    3: "/",
};
function whatOp(op) {
    return operations[op];
}

module.exports = {
    calcRes,
    whatOp,
};
