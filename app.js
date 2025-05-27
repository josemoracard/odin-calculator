  const display = document.getElementById('display');
  const buttons = document.querySelectorAll('.btn');

  let currentInput = '';
  let previousInput = '';
  let operator = null;

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const action = button.dataset.action;
      const value = button.textContent;

      if (!action) {
        // Es número o punto
        if (value === '.') {
        if (currentInput.includes('.')) return;
       currentInput = currentInput === '' ? '0.' : currentInput + '.';
      } else {
        currentInput += value;
      }
        display.textContent = currentInput;
      } else if (action === 'clear') {
        currentInput = '';
        previousInput = '';
        operator = null;
        display.textContent = '0';
      } else if (action === 'equals') {
        if (previousInput && currentInput && operator) {
          const result = calculate(previousInput, currentInput, operator);
          display.textContent = result;
          currentInput = result.toString();
          previousInput = '';
          operator = null;
        }
      } else {
        // Es operador
        if (currentInput === '') return;
        if (previousInput && currentInput && operator) {
          currentInput = calculate(previousInput, currentInput, operator).toString();
          display.textContent = currentInput;
        }
        operator = action;
        previousInput = currentInput;
        currentInput = '';
      }
    });
  });

  function calculate(a, b, operator) {
    const num1 = parseFloat(a);
    const num2 = parseFloat(b);
    switch (operator) {
      case 'add': return num1 + num2;
      case 'subtract': return num1 - num2;
      case 'multiply': return num1 * num2;
      case 'divide': return num2 !== 0 ? num1 / num2 : 'Error';
      default: return num2;
    }
  }
