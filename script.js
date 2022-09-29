let operand1 = '';
let operand2 = '';
let currentOp = null;
let shouldResetDisplay = false;

const numButtons = document.querySelectorAll('[data-type="number"]');
const opButtons = document.querySelectorAll('[data-type="operator"]');
const equalsButton = document.getElementById('equalsBtn');
const clearButton = document.getElementById('clear-btn');
const deleteButton = document.getElementById('delete-btn');
const decimalPtButton = document.getElementById('decimalPtBtn');
const lastOpDisplay = document.getElementById('lastOpDisplay');
const currOpDisplay = document.getElementById('currOpDisplay');


window.addEventListener('keydown', handleKeyboardInput);
equalsButton.addEventListener('click', evaluate);
clearButton.addEventListener('click', clear);
deleteButton.addEventListener('click', deleteNumber);
decimalPtButton.addEventListener('click', appendPoint);

numButtons.forEach((button) => 
  button.addEventListener('click', () => appendNumber(button.textContent))
)

opButtons.forEach((button) => 
  button.addEventListener('click', () => setOperation(button.textContent))
)

function appendNumber(number) {
    if (currOpDisplay.textContent === '0' || shouldResetDisplay)
      resetDisplay();
    currOpDisplay.textContent += number;
}

function resetDisplay() {
    currOpDisplay.textContent = '';
    shouldResetDisplay = false;
}

function clear() {
    currOpDisplay.textContent = '0';
    lastOpDisplay.textContent = '';
    operand1 = '';
    operand2 = '';
    currentOp = null;
}

function appendPoint() {
    if (shouldResetDisplay) resetDisplay();
    if (currOpDisplay.textContent === '') currOpDisplay.textContent = '0';
    if (!currOpDisplay.textContent.includes('.')) return currOpDisplay.textContent += '.';   
}

function deleteNumber() {
    currOpDisplay.textContent = currOpDisplay.textContent.toString().slice(0, -1);
}

function setOperation(operator) {
    if (currentOp !== null) evaluate();
    operand1 = currOpDisplay.textContent;
    currentOp = operator;
    lastOpDisplay.textContent = `${operand1} ${currentOp}`;
    shouldResetDisplay = true;
}

function evaluate() {
    if (currentOp === null || shouldResetDisplay) return
    if (currentOp === '÷' && currOpDisplay.textContent === '0') {
        alert('Not a number!');
        return
    }
    operand2 = currOpDisplay.textContent;
    currOpDisplay.textContent = roundResult( operate(currentOp, operand1, operand2) );

    lastOpDisplay.textContent = `${operand1} ${currentOp} ${operand2} =`;
    currentOp = null;
}

function roundResult(number) {
    return Math.round(number * 1000) / 1000;
}

function handleKeyboardInput(e) {
    if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
    if (e.key === '.') appendPoint();
    if (e.key === '=' || e.key === 'Enter') evaluate();
    if (e.key === 'Backspace') deleteNumber();
    if (e.key === 'Escape') clear();
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') setOperation(convertOperator(e.key));
}

function convertOperator(keyboardOperator) {
    if (keyboardOperator === '/') return '÷';
    if (keyboardOperator === '*') return '×';
    if (keyboardOperator === '-') return '-';
    if (keyboardOperator === '+') return '+';
}

function add(a, b) {
    return a + b;
}
function subtract(a, b) {
    return a - b;
}
function multiply(a, b) {
    return a * b;
}
function divide(a, b) {
    return a / b;
}

function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);
    switch(operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '×':
            return multiply(a, b);
        case '÷':
            if (b === 0) return null;
            else return divide(a, b);
        default: 
            return null;
    }
}

