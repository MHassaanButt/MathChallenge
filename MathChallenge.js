function evaluateMath(str) {
    var operators = "/*-+";
    for (var i = 0; i < 4; i++) {
        var op = operators.charAt(i);
        var pos = str.indexOf(op);
        if (pos > 0 && operators.indexOf(str.charAt(pos - 1)) == -1) {
            var left = evaluateMath(str.substr(0, pos));
            var right = evaluateMath(str.substr(pos + 1));
            switch (op) {
                case "/": return left / right;
                case "*": return left * right;
                case "-": return left - right;
                case "+": return left + right;
            }

        }
    }
    return Number(str);
}

function MathChallenge(str) {
    // code goes here  
    let inputString = str, leftPar, rightPar, parString, result, finalResult, tempLeftParVal, tempRightParVal;

    for (let i = 0; i < inputString.length; i++) {
        console.log(i)
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
            console.log(tempLeftParVal, tempRightParVal)
            if (tempLeftParVal !== '' && tempRightParVal !== '') {
                console.log('both')
                inputString = inputString.substring(0, leftPar - 1) + result + inputString.substring(rightPar + 2);
            }
            else if (tempLeftParVal !== '') {
                console.log('left')
                if (inputString[leftPar - 1] === undefined) {
                    inputString = result + inputString.substring(rightPar)
                } else {
                    inputString = inputString.substring(0, leftPar - 1) + result + inputString.substring(rightPar + 1);
                }
            }
            else if (tempRightParVal !== '') {
                console.log('right')
                if (inputString[rightPar + 1] === undefined) {
                    inputString = inputString.substring(0, leftPar) + result
                } else {
                    inputString = inputString.substring(0, leftPar) + result + inputString.substring(rightPar + 2);
                }
            }
            else {
                console.log('else')
                inputString = inputString.substring(0, leftPar) + result + inputString.substring(rightPar + 1);
            }
        }
    }
    console.log(inputString)
    finalResult = evaluateMath(inputString)
    return finalResult;

}

// keep this function call here 
console.log(MathChallenge(readline()));