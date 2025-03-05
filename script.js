let display = document.getElementById('display');
let expression = '';

const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const decimal = document.querySelector('.decimal');
const equal = document.querySelector('.equal');

// Number buttons
numbers.forEach(button => {
    button.addEventListener('click', () => {
        expression += button.innerText;
        updateDisplay();
    });
});

// Operator buttons
operators.forEach(button => {
    button.addEventListener('click', () => {
        expression += ' ' + button.innerText + ' ';
        updateDisplay();
    });
});

// Decimal button
decimal.addEventListener('click', () => {
    expression += '.';
    updateDisplay();
});

// Equals button
equal.addEventListener('click', () => {
    try {
        expression = calculateExpression(expression);
        updateDisplay();
    } catch (error) {
        display.value = 'Error';
        expression = '';
    }
});

// Clear button
document.getElementById('clear').addEventListener('click', () => {
    expression = '';
    updateDisplay();
});

// Percentage button
document.getElementById('percentage').addEventListener('click', () => {
    expression = handlePercentage(expression);
    updateDisplay();
});

// Exponentiation button (^)
document.getElementById('exponentiation').addEventListener('click', () => {
    expression += ' ^ ';
    updateDisplay();
});

// Factorial button (!)
document.getElementById('factorial').addEventListener('click', () => {
    expression = handleFactorial(expression);
    updateDisplay();
});

// Font size dropdown
document.getElementById('fontSize').addEventListener('change', (event) => {
    document.body.style.fontSize = event.target.value;
});

// Contrast toggle
document.getElementById('contrastToggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Update display
function updateDisplay() {
    display.value = expression;
}

// Calculate expression (supports ^ and %)
function calculateExpression(expr) {
    expr = expr.replaceAll('%', '/100').replaceAll('^', '**');
    return Function('return ' + expr)();
}

// Handle percentage (converts last number into a percentage)
function handlePercentage(expr) {
    let parts = expr.trim().split(' ');
    let last = parts.pop();

    if (!isNaN(last)) {
        last = (parseFloat(last) / 100).toString();
    }

    parts.push(last);
    return parts.join(' ');
}

// Handle factorial (applies to last number only)
function handleFactorial(expr) {
    let parts = expr.trim().split(' ');
    let last = parts.pop();

    if (!isNaN(last)) {
        let num = parseInt(last);
        let fact = 1;

        for (let i = 2; i <= num; i++) {
            fact *= i;
        }

        parts.push(fact.toString());
    } else {
        parts.push(last); // if user pressed ! without a valid number
    }

    return parts.join(' ');
}
