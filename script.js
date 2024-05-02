
// create Calculator class
class Calculator {

    constructor(preOperandElement, curOperandElement){
        // set preOperandElement and curOperandElement as class properties
        this.preOperandElement = preOperandElement;
        this.curOperandElement = curOperandElement;
        this.clear();
    }

    // set/reset default values of preOperand curOperand and operation
    clear() {
        this.curOperand = "";
        this.preOperand = "";
        this.operation = undefined;
    }

    delete() {
        // curOperand equals curOperand without the last character
        this.curOperand = this.curOperand.slice(0, -1);
    }

    // add a number when clicked
    appendNumber(number) {
        // to prevent multiple periods 
        if (number == "." && this.curOperand.includes(".")) return ;
        this.curOperand += number;
    }

    chooseOperation(operation) {
        // break if current and previous operand is empty
        if (this.curOperand === "" && this.preOperand === "") {
            return ;
        }
        // change operator if current operand is empty and previous operand isn't
        else if (this.curOperand === "" && this.preOperand !== ""){
            this.operation = operation;
            return ;
        }
        // if there is content is previous operand while clicking operation button
        else if (this.preOperand !== "" && this.curOperand !== "") {
            this.compute();
        }
        // send result to preOperand and empty curOperand
        this.preOperand = this.curOperand;
        this.curOperand = "";
        // update operation
        this.operation = operation;
    }

    // to do calculations
    compute() {
        let result ;
        // turn both values to floating point numbers
        const pre = parseFloat(this.preOperand);
        const cur = parseFloat(this.curOperand);
        // if either one is empty, break
        if (isNaN(pre) || isNaN(cur)) return ;
        // value of result is dependant on operation
        switch (this.operation) {
            case "+":
                result = pre + cur;
                break;
            case "-":
                result = pre - cur;
                break;
            case "*":
                result = pre * cur;
                break;
            case "/":
                result = pre / cur;
                break;
            default:
                return ;
                break;
        }
        // store result, empty preOperand and operation
        this.curOperand = result;
        this.preOperand = "";
        this.operation = undefined;
    }

    // getDisplayNumber(1234567890) => 1,234,567,890
    getDisplayNumber(number) {
        const stringNumber = number.toString().split(".");
        const integerDigits = parseFloat(stringNumber[0]);
        const floatDigits = stringNumber[1];
        let integerDisplay ;
        if (isNaN(integerDigits)) {
            integerDisplay = "";
        } else {
            integerDisplay = integerDigits.toLocaleString("en", {maximumFractionDigits : 0});
        }
        if (floatDigits != null) {
            return integerDisplay+"."+floatDigits;
        } else {
            return integerDisplay;
        }
    }

    // displays the current and previous operands in their respective elements
    updateDisplay() {
        this.curOperandElement.innerHTML = this.getDisplayNumber(this.curOperand);
        
        this.preOperandElement.innerHTML = 
            this.getDisplayNumber(this.preOperand) +
            (this.operation? " " + this.operation : "");
    }
}




// select all buttons 
const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const allClearButton = document.querySelector("[data-all-clear]");
const deleteButton = document.querySelector("[data-delete]");
const preOperandElement = document.querySelector(".pre-operand");
const curOperandElement = document.querySelector(".cur-operand");

// create Calculator object
const calculator = new Calculator(preOperandElement, curOperandElement);

// hook up the buttons with event listeners

numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.appendNumber(button.innerHTML);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.chooseOperation(button.innerHTML);
        calculator.updateDisplay();
    })
})

allClearButton.addEventListener("click", () => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener("click", () => {
    calculator.delete();
    calculator.updateDisplay();
})

equalsButton.addEventListener("click", button => {
    calculator.compute();
    calculator.updateDisplay();
})