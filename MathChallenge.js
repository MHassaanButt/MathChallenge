function evaluateMath(x) {
  x = x.replace(/ /g, "") + ")";

  function primary() {
    if (x[0] == '(') {
      x = x.substr(1);
      return expression();
      console.log(x)
    }
    var n = /^[-+]?\d*\.?\d*/.exec(x)[0];
    x = x.substr(n.length);
    return +n;
  }

function expression() {
  var a = primary();
  for (; ;) {
    var operator = x[0];
    x = x.substr(1);

    if (operator == ')') {
      return a;
    }
    var b = primary();
    a = (operator == '+') ? a + b :
        (operator == '-') ? a - b :
        (operator == '*') ? a * b :
                            a / b;
  }
}
return expression();
}

function MathChallenge(str) {
  // code goes here  
  let inputString = str, leftPar, rightPar, parString, result, finalResult, tempLeftParVal, tempRightParVal;

  for (let i = 0; i < inputString.length; i++) {
    //  console.log(i)
    if (inputString[i] === '(') {
      tempLeftParVal = '';
      leftPar = i;
      if (inputString[leftPar - 1] !== undefined && inputString[leftPar - 1] !== ')' && inputString[leftPar - 1] !== '+' && inputString[leftPar - 1] !== '-' && inputString[leftPar - 1] !== '*' && inputString[leftPar - 1] !== '/') {
        tempLeftParVal = inputString[leftPar - 1];
        //console.log(result, i)
      }
    }
    if (inputString[i] === ')') {
      tempRightParVal = '';
      rightPar = i;
      parString = inputString.slice(leftPar + 1, rightPar);
      result = eval(parString);

      if (tempLeftParVal !== '') {
        result = result * tempLeftParVal
      }
      if (inputString[rightPar + 1] !== undefined && inputString[rightPar + 1] !== '(' && inputString[rightPar + 1] !== '+' && inputString[rightPar + 1] !== '-' && inputString[rightPar + 1] !== '*' && inputString[rightPar + 1] !== '/') {
        result = result * parseInt(inputString[rightPar + 1]);
        tempRightParVal = inputString[rightPar + 1];
      }
      //    console.log(tempLeftParVal, tempRightParVal)
      if (tempLeftParVal !== '' && tempRightParVal !== '') {
        //     console.log('both')
        inputString = inputString.substring(0, leftPar - 1) + result + inputString.substring(rightPar + 2);
        i = i - ((rightPar + 2) - (leftPar - 1));
      }
      else if (tempLeftParVal !== '') {
        //    console.log('left')

        inputString = inputString.substring(0, leftPar - 1) + result + inputString.substring(rightPar + 1);

        i = i - ((rightPar + 1) - (leftPar - 1));
      }
      else if (tempRightParVal !== '') {
        //    console.log('right')

        inputString = inputString.substring(0, leftPar) + result + inputString.substring(rightPar + 2);

        i = i - ((rightPar + 2) - leftPar);
      }
      else {
        //    console.log('else')
        inputString = inputString.substring(0, leftPar) + result + inputString.substring(rightPar + 1);
        i = i - ((rightPar + 1) - leftPar);
      }
    }
  }
  // console.log(inputString)
  finalResult = evaluateMath(inputString)
  return finalResult;

}

// keep this function call here 
console.log(MathChallenge(readline()));
//for checking different values we can input values instead of readline arguments
// Input: "6*(4/2)+3*1"
// Output: 15
// Input: "6/3-1"
// Output: 1