const turingInput = document.querySelector(".machine-input");
const iterationButton = document.querySelector("#iteration");
const modeButton = document.querySelector("#mode");
const titleColumn = document.querySelector(".title__column");
const nextState = document.querySelector("#nextState");

let buffer = turingInput.value;

function changeStates(object) {
  titleColumn.children[0].innerText = `Current State: ${
    object.currentState ?? " "
  }`;
  titleColumn.children[1].innerText = `Current value: ${
    object.currentSymbol ?? " "
  }`;
  nextState.children[0].innerText = `Next State: ${object.nextstate ?? " "}`;
  nextState.children[1].innerText = `Next Value: ${object.newSymbol ?? " "}`;
}
class TuringMachine {
  constructor(
    states,
    inputAlphabet,
    tapeAlphabet,
    initialState,
    finalStates,
    transitions
  ) {
    this.states = states; // состояния
    this.inputAlphabet = inputAlphabet; // алфавит входных символов
    this.tapeAlphabet = tapeAlphabet; // алфавит символов на ленте
    this.initialState = initialState; // начальное состояние
    this.finalStates = finalStates; // конечные состояния
    this.transitions = transitions; // переходы

    this.tape = []; // лента
    this.headPosition = 0; // текущая позиция головки
    this.currentState = initialState; // текущее состояние
  }

  start(input) {
    // Записываем входные символы на ленту
    this.tape = input.split("");
    // Запускаем машину
    if (!this.finalStates.includes(this.currentState)) {
      const currentSymbol = this.tape[this.headPosition];
      const transition = this.transitions.find(
        (t) => t.state === this.currentState && t.symbol === currentSymbol
      );
      let changeStateObject = {
        currentState: this.currentState,
        currentSymbol: currentSymbol,
      };
      // Если переход найден, изменяем состояние, символ и позицию головки
      if (transition) {
        this.currentState = transition.newState;
        this.tape[this.headPosition] = transition.newSymbol;
        changeStateObject.nextstate = this.currentState;
        changeStateObject.newSymbol = transition.newSymbol;
        changeStates(changeStateObject);
        if (transition.move === "L") {
          this.headPosition--;
        } else if (transition.move === "R") {
          this.headPosition++;
        } else if (transition.move === "S") {
          this.tape = [...this.tape].filter(
            (value) => value !== "+" && value !== "="
          );
        }
      } else {
        // Если переход не найден, машина останавливается
        return this.tape.join("");
      }
    }
    // Возвращаем результат
    return this.tape.join("");
  }
}

// Создаем экземпляр машины Тьюринга
const states = ["q0", "q1", "q2", "q3"];
const inputAlphabet = ["1"];
const tapeAlphabet = ["1", "0"];
const initialState = "q0";
const finalStates = ["q3"];

const transitionsSum = [
  { state: "q0", symbol: "1", newState: "q1", newSymbol: "0", move: "R" },
  { state: "q0", symbol: "=", newState: "q3", newSymbol: "=", move: "R" },
  { state: "q0", symbol: "+", newState: "q0", newSymbol: "+", move: "R" },
  { state: "q0", symbol: "0", newState: "q0", newSymbol: "0", move: "R" },

  { state: "q1", symbol: "1", newState: "q1", newSymbol: "1", move: "R" },
  { state: "q1", symbol: "=", newState: "q1", newSymbol: "=", move: "R" },
  { state: "q1", symbol: "+", newState: "q1", newSymbol: "+", move: "R" },
  { state: "q1", symbol: "0", newState: "q2", newSymbol: "1", move: "L" },

  { state: "q2", symbol: "1", newState: "q2", newSymbol: "1", move: "L" },
  { state: "q2", symbol: "=", newState: "q2", newSymbol: "=", move: "L" },
  { state: "q2", symbol: "+", newState: "q2", newSymbol: "+", move: "L" },
  { state: "q2", symbol: "0", newState: "q0", newSymbol: "0", move: "R" },

  { state: "q3", symbol: "1", newState: "q3", newSymbol: "1", move: "S" },
  { state: "q3", symbol: "=", newState: "q3", newSymbol: "=", move: "S" },
  { state: "q3", symbol: "+", newState: "q3", newSymbol: "+", move: "S" },
  { state: "q3", symbol: "0", newState: "q3", newSymbol: "0", move: "S" },
];

const transitionsMulti = [
  { state: "q0", symbol: "0", newState: "q0", newSymbol: "0", move: "R" },
  { state: "q0", symbol: "=", newState: "q3", newSymbol: "=", move: "L" },
  { state: "q0", symbol: "*", newState: "q4", newSymbol: "*", move: "R" },
  { state: "q0", symbol: "1", newState: "q1", newSymbol: "0", move: "R" },

  { state: "q1", symbol: "0", newState: "q2", newSymbol: "1", move: "L" },
  { state: "q1", symbol: "=", newState: "q1", newSymbol: "=", move: "R" },
  { state: "q1", symbol: "*", newState: "q0", newSymbol: "*", move: "R" },
  { state: "q1", symbol: "1", newState: "q1", newSymbol: "1", move: "R" },

  { state: "q2", symbol: "1", newState: "q2", newSymbol: "1", move: "L" },
  { state: "q2", symbol: "=", newState: "q2", newSymbol: "=", move: "L" },
  { state: "q2", symbol: "0", newState: "q0", newSymbol: "0", move: "R" },

  { state: "q3", symbol: "0", newState: "q3", newSymbol: "1", move: "L" },
  { state: "q3", symbol: "*", newState: "q2", newSymbol: "*", move: "L" },

  { state: "q4", symbol: "1", newState: "q4", newSymbol: "0", move: "R" },
  { state: "q4", symbol: "0", newState: "q4", newSymbol: "0", move: "S" },
  { state: "q4", symbol: "=", newState: "q4", newSymbol: "=", move: "S" },
];

let tm = new TuringMachine(
  states,
  inputAlphabet,
  tapeAlphabet,
  initialState,
  finalStates,
  transitionsSum
);
const tempTm = structuredClone(tm);
tempTm.start = tm.start;
iterationButton.addEventListener("click", () => {
  turingInput.value = tm.start(turingInput.value);
});

modeButton.addEventListener("click", (event) => {
  changeStates({});
  tm.currentState = "q0";

  let { type } = event.target.dataset;
  if (type === "sum") {
    event.target.dataset.type = "mul";
    event.target.innerText = "Multiplication mode";
    Object.assign(tm, tempTm);
    tm.transitions = transitionsMulti;
    tm.states.push("q4");
  } else if (type === "mul") {
    event.target.dataset.type = "sum";
    event.target.innerText = "Summation mode";
    Object.assign(tm, tempTm);
    tm.transitions = transitionsSum;
    tm.states.pop();
  }
  turingInput.value =
    type === "sum" ? buffer.replace("+", "*") : buffer.replace("*", "+");
  tm.headPosition = turingInput.value.indexOf("1");
});

turingInput.addEventListener("keyup", (event) => {
  changeStates({});
  tm.currentState = "q0";
  const operation = modeButton.dataset.type === "sum" ? "+" : "*";
  const result = [...event.target.value]
    .filter(
      (value) =>
        value === "1" || value === "0" || value === operation || value === "="
    )
    .join("");
  result.includes("1") ? (tm.headPosition = result.indexOf("1")) : 0;
  event.target.value = result;
  buffer = event.target.value;
});
