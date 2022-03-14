window.onload = function (){

const display = document.querySelector(".display");
let buffer = "0"
let runningTotal = 0
let previousOperator = null
let showRunningTotal = false

document.getElementById("show-runningtotal-button").onclick = function() {
    if (showRunningTotal === true) {
        showRunningTotal = false
    } else {
        showRunningTotal = true
    }
    refetchDisplay ()
}


function refetchDisplay() {
    if (showRunningTotal === true) {
        display.innerText = `${buffer} (${runningTotal})`;
    } else {
    display.innerText = buffer;
    }
}

function buttonClick(buttonValue) {
    if (isNaN(parseInt(buttonValue))) {
        handleSymbol(buttonValue);
      } else {
        handleNumber(buttonValue);
      }
      refetchDisplay();
}

function handleSymbol (buttonValue) {
    switch(buttonValue) {
        case "C":   //Clear
            buffer = "0";
            runningTotal = 0;
            break;
        case "←":   //Backspace
            if (buffer.length === 1 || typeof buffer === "number") {
                buffer = "0";
            }
            else {
                buffer = buffer.substring(0, buffer.length - 1)
            }
            break;
        case "=":   //Equals
            if (previousOperator === null) {
                console.log("need 2 numbers to math")
                return;
            }
            calculate ()
            buffer = runningTotal
            previousOperator = null;
            runningTotal = 0;
            

            break;
        case "+":
        case "−":
        case "×":
        case "÷":
            handleMath(buttonValue);
            break;
    }
}

function handleNumber (buttonValue) {
    if (typeof buffer === "number") {
        runningTotal = buffer;
        buffer = buttonValue;
        return;
    }
    if (buffer === "0") {
        buffer = buttonValue;
    }
    else {
        buffer += buttonValue;
    }
}

function calculate () {
    let intBuffer = parseInt(buffer)
    switch(previousOperator) {
        case "+":
            runningTotal += intBuffer
            break;
        case "−":
            runningTotal -= intBuffer
            break;
        case "×":
            runningTotal *= intBuffer
            break;
        case "÷":
            runningTotal /= intBuffer
            break;
    }
}
//What happens after pressing a math button
function handleMath (buttonValue) {
    if (buffer === "0") {
        return;
    }

    const intBuffer = parseInt(buffer);
    if (runningTotal === 0) {
        runningTotal = intBuffer;
        buffer = "0"
    }
    else {
        calculate ();
        buffer = runningTotal;
        runningTotal = 0;
        
    }
    previousOperator = buttonValue;
    
}

function init() {
    document.querySelector(".calculator-container").addEventListener("click", function(event){
        if (event.target.tagName === "BUTTON") {
            buttonClick(event.target.innerText)            
        }
    });
}
init();
}
