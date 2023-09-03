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
    while (!this.finalStates.includes(this.currentState)) {
      const currentSymbol = this.tape[this.headPosition];
      const transition = this.transitions.find(
        (t) => t.state === this.currentState && t.symbol === currentSymbol
      );

      // Если переход найден, изменяем состояние, символ и позицию головки
      if (transition) {
        this.currentState = transition.newState;
        this.tape[this.headPosition] = transition.newSymbol;

        if (transition.move === "L") {
          this.headPosition--;
        } else if (transition.move === "R") {
          this.headPosition++;
        } else if ((transition.move = "S")) {
          break;
        }
      } else {
        // Если переход не найден, машина останавливается
        break;
      }
    }

    // Возвращаем результат
    return this.tape.join("");
  }
}

// Создаем экземпляр машины Тьюринга
const states = ["q0", "q1", "q2", "q3"];
const inputAlphabet = ["1"];
const tapeAlphabet = ["1", "x"];
const initialState = "q0";
const finalStates = ["q3"];
const transitions = [
  { state: "q0", symbol: "x", newState: "q0", newSymbol: "x", move: "R" },
  { state: "q0", symbol: "1", newState: "q1", newSymbol: "x", move: "R" },

  { state: "q1", symbol: "x", newState: "q2", newSymbol: "1", move: "L" },
  { state: "q1", symbol: "1", newState: "q1", newSymbol: "1", move: "R" },

  { state: "q2", symbol: "x", newState: "q0", newSymbol: "x", move: "L" },
  { state: "q2", symbol: "1", newState: "q2", newSymbol: "1", move: "R" },

  { state: "q3", symbol: "x", newState: "q3", newSymbol: "1", move: "S" },
  { state: "q3", symbol: "1", newState: "q3", newSymbol: "1", move: "S" },
];
const tm = new TuringMachine(
  states,
  inputAlphabet,
  tapeAlphabet,
  initialState,
  finalStates,
  transitions
);
console.log(tm.start("x1xxxxxxxx1xxxxx"));
