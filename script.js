const preOperand = document.querySelector(".pre-operand");
const curOperand = document.querySelector(".cur-operand");
const buttons = [...document.querySelectorAll("button")];
const numbers = buttons.filter(btn => !isNaN(btn.innerHTML)? 1:0);
const operations = buttons.filter(btn => ("+-*/".includes(btn.innerHTML))? 1:0);
const period = buttons.find(btn => btn.innerHTML === ".");
const AC = buttons.find(btn => btn.innerHTML === "AC");
const DEL = buttons.find(btn => btn.innerHTML === "DEL");
const equals = buttons.find(btn => btn.innerHTML === "=");

function addNum() {
    if (curOperand.innerHTML == "") curOperand.innerHTML = "";
    curOperand.innerHTML += this.innerHTML;
}

function addPeriod() {
    if (curOperand.innerHTML.includes(".")) return ;
    curOperand.innerHTML += this.innerHTML;
}

function addOperation() {
    if (isNaN(curOperand.innerHTML)) return ; 
    if (!preOperand.innerHTML) {
        preOperand.innerHTML = curOperand.innerHTML + " " + this.innerHTML;
        curOperand.innerHTML = "";
    } else {
        if (curOperand) {
            preOperand.innerHTML = operate() + " " + this.innerHTML;
            curOperand.innerHTML = '';
        } else {
            preOperand.innerHTML = preOperand.innerHTML.slice(0,-1) + this.innerHTML;
        }
    }
}

function allClear() {
    if (curOperand.innerHTML) {
        curOperand.innerHTML = "";
    } else {
        preOperand.innerHTML = "";
    }
}

function del() {
    if (curOperand.innerHTML) {
        curOperand.innerHTML = curOperand.innerHTML.slice(0,-1);
    } else {
        allClear();
    }
}

function operate() {

    const operator = preOperand.innerHTML.slice(-1);
    const num1 = Number(preOperand.innerHTML.slice(0,-1));
    const num2 = Number(curOperand.innerHTML);
    switch (operator) {
        case "+":
            return num1 + num2;
            break;
        case "-":
            return num1 - num2;
            break;
        case "*":
            return num1 * num2;
            break;
        case "/":
            if (num2 == 0) {
                alert("division by 0 is a no-no");
            } else return num1 / num2;
            break;
                            
        default:
            alert("there is a problem, idk");
            break;
    }
}

function showEquals() {
    const result = operate();
    if (!result) return ;
    curOperand.innerHTML = result;

    preOperand.innerHTML = "";
}

numbers.forEach(num => {
    num.addEventListener("click", addNum);
})

period.addEventListener("click", addPeriod);

operations.forEach(operation => {
    operation.addEventListener("click", addOperation);
})

DEL.addEventListener("click", del);

AC.addEventListener("click", allClear);

equals.addEventListener("click", showEquals);