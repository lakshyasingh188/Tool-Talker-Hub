let currentExpression = '';
const display = document.getElementById('display');

function calculate(value) {
    if (display.value === 'Error' || display.value === '0') {
        display.value = '';
        currentExpression = '';
    }

    if (value === 'Math.PI') {
        currentExpression += Math.PI.toFixed(4); // Use fixed precision for display
        display.value += 'π';
    } else if (value === 'Math.E') {
        currentExpression += Math.E.toFixed(4);
        display.value += 'e';
    } else if (value === '**') {
        currentExpression += value;
        display.value += '^';
    } else if (value.endsWith('(')) {
        // Handle scientific functions
        currentExpression += value;
        display.value += value.substring(0, value.length - 1) + '(';
    } else {
        currentExpression += value;
        display.value += value;
    }
}

function clearDisplay() {
    currentExpression = '';
    display.value = '0';
}

function backspace() {
    currentExpression = currentExpression.slice(0, -1);
    display.value = display.value.slice(0, -1);
    if (display.value === '') {
        display.value = '0';
    }
}

function evaluateExpression() {
    try {
        // Replace functions for standard JS evaluation
        let result = currentExpression.replace(/sqrt\(/g, 'Math.sqrt(');
        result = result.replace(/log\(/g, 'Math.log10('); // log to base 10
        result = result.replace(/sin\(/g, 'Math.sin(');
        result = result.replace(/cos\(/g, 'Math.cos(');
        result = result.replace(/tan\(/g, 'Math.tan(');

        // Evaluate the expression
        let finalResult = eval(result);
        
        if (isNaN(finalResult) || finalResult === Infinity) {
             throw new Error("Invalid expression");
        }

        display.value = finalResult;
        currentExpression = finalResult.toString();

    } catch (e) {
        display.value = 'Error';
        currentExpression = '';
    }
}
