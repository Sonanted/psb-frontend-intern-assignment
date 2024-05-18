const buttons = document.querySelectorAll("button");
const screen = document.querySelector(".screen");
const error = document.getElementById("error");
const copy = document.getElementById("copy");

const symbols = [
  "+",
  "-",
  "*",
  "/",
  "=",
  "C",
  "c",
  "С",
  "с",
  "Backspace",
  "Enter",
];

const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

let buffer = "0";
let operator = null;
let value = 0.0;

for (let button of buttons) {
  button.addEventListener("click", eventClick);
}

document.addEventListener("keydown", eventKey);
screen.addEventListener("click", function () {
  navigator.clipboard.writeText(screen.value);
  error.classList.add("hidden");
  copy.classList.remove("hidden");
});

function eventKey(event) {
  event.preventDefault();
  if (symbols.includes(event.key)) {
    handleSymbol(event.key);
  } else if (numbers.includes(event.key)) {
    handleNumber(event.key);
  }
  screen.value = buffer;
}

function eventClick(event) {
  if (isNaN(this.textContent)) {
    handleSymbol(this.textContent);
  } else {
    handleNumber(this.textContent);
  }
  screen.value = buffer;
}

function handleSymbol(symbol) {
  error.classList.add("hidden");
  switch (symbol) {
    case "C":
    case "c":
    case "с":
    case "С":
      buffer = "0";
      value = 0;
      operator = null;
      break;

    case "←":
    case "Backspace":
      if (buffer.length == 1) {
        buffer = "0";
      } else if (buffer.length) {
        buffer = buffer.slice(0, -1);
      }
      break;

    case "+":
    case "-":
    case "×":
    case "÷":
    case "*":
    case "/":
      calculate();
      operator = symbol;
      break;

    case "=":
    case "Enter":
      calculate();
      if (value.toString().length > 12 && value > 1e11) {
        buffer = value.toExponential(5);
      } else if (value.toString().length > 12) {
        buffer = value.toFixed(2);
      } else {
        buffer = value;
      }
      operator = symbol;
      break;
  }
}

function handleNumber(number) {
  copy.classList.add("hidden");
  if (buffer == "0") {
    buffer = number;
  } else if (operator === "Enter" || operator === "=") {
    operator = null;
    buffer = number;
  } else {
    if (buffer.toString().length < 12) {
      buffer += number;
    } else {
      error.classList.remove("hidden");
    }
  }
}

function calculate() {
  if (operator == null) {
    value = parseInt(buffer);
  }
  switch (operator) {
    case "+":
      value += parseInt(buffer);
      break;
    case "-":
      value -= parseInt(buffer);
      break;
    case "×":
    case "*":
      value *= parseInt(buffer);
      break;
    case "÷":
    case "/":
      value /= parseInt(buffer);
      break;
  }
  buffer = "0";
}
