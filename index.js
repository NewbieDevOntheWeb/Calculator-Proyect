//first time learning js 25/08/24


document.getElementById('icon').addEventListener('click',  function(){
    document.body.classList.toggle('light-mode')
} )

  
   function appendValue(value) {
    const display = document.getElementById("display").value;

    
    if (value === ".") {
      
      const lastNumber = display.split(/[+\-*/]/).pop();

     
      if (lastNumber.includes(".")) {
        return;
      }
    }


    document.getElementById("display").value += value;
  }


   function appendFunction(func) {
    const display = document.getElementById("display").value;


    if (func === 'sqrt') {
      const lastNumber = display.split(/[+\-*/()]/).pop();
      
      if (lastNumber && !isNaN(lastNumber)) {
        const sqrtValue = Math.sqrt(parseFloat(lastNumber));
        
        document.getElementById("display").value = display.replace(lastNumber, sqrtValue);
      } else {
        return; 
      }
    } else {
      
      document.getElementById("display").value += func;
    }
  }
      
      function clearDisplay() {
        document.getElementById("display").value = "";
      }

     
      function deleteLast() {
        const currentValue = document.getElementById("display").value;
        document.getElementById("display").value = currentValue.slice(0, -1);
      }

    
      function calculate() {
        const input = document.getElementById("display").value;
        if (input.trim() === "") {
          document.getElementById("display").value = "Error"; 
          return;
        }
        const result = evaluateExpression(input);
        document.getElementById("display").value = result !== null ? result : "Error";
      }

      
      function evaluateExpression(input) {
       
        if (input.match(/[^0-9+\-*/()^.sincolt]/) || input.match(/\(\)/)) {
          return null;
        }

        
        const tokens = input.match(/(\d+(\.\d+)?)|[+\-*/()^]|(sin|cos|tan|sqrt|log)/g);
        if (!tokens) return null;

        const numbers = [];
        const operators = [];

        let index = 0;

        while (index < tokens.length) {
          const token = tokens[index];

          if (!isNaN(token)) {
            
            numbers.push(parseFloat(token));
          } else if (["+", "-", "*", "/", "^"].includes(token)) {
            
            if (["+", "-", "*", "/", "^"].includes(tokens[index + 1])) {
              return null;
            }

            
            while (operators.length > 0 && precedence(operators[operators.length - 1]) >= precedence(token)) {
              const operator = operators.pop();
              const b = numbers.pop();
              const a = numbers.pop();
              numbers.push(operate(a, b, operator));
            }
            operators.push(token);
          } else if (token === "%") {
      

            const lastNumber = numbers.pop();
            if (lastNumber !== undefined) {
              numbers.push(lastNumber / 100); 
            }
          } else if (token === "(") {
            operators.push(token);
          } else if (token === ")") {
            while (operators.length > 0 && operators[operators.length - 1] !== "(") {
              const operator = operators.pop();
              const b = numbers.pop();
              const a = numbers.pop();
              numbers.push(operate(a, b, operator));
            }
            operators.pop(); 
          } else if (["sin", "cos", "tan", "sqrt", "log"].includes(token)) {
            if (numbers.length === 0) return null;
            const number = numbers.pop();
            numbers.push(applyFunction(token, number));
          }

          index++;
        }

    
        while (operators.length > 0) {
          const operator = operators.pop();
          const b = numbers.pop();
          const a = numbers.pop();
          numbers.push(operate(a, b, operator));
        }

        return numbers.length === 1 ? numbers[0] : null;
      }

  
      function precedence(operator) {
        if (operator === "+" || operator === "-") return 1;
        if (operator === "*" || operator === "/") return 2;
        if (operator === "^") return 3; 
        return 0;
      }

  
      function operate(a, b, operator) {
        switch (operator) {
          case '+': return a + b;
          case '-': return a - b;
          case '*': return a * b;
          case '/': return b !== 0 ? a / b : 'División por 0'; 
          case '^': return Math.pow(a, b); 
          default: return null;
        }
      }

      function applyFunction(func, number) {
        switch (func) {
          case 'sin': return Math.sin(toRadians(number));
          case 'cos': return Math.cos(toRadians(number));
          case 'tan': return Math.tan(toRadians(number));
          case 'sqrt': return Math.sqrt(number);
          case 'log': return Math.log10(number); 
          default: return null;
        }
      }

      //the end. 22/10/24