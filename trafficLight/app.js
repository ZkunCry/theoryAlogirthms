const redPeople = document.querySelector(".redPeople");
const greenPeople = document.querySelector(".greenPeople");
const stateColumns = document.querySelectorAll(".state-column");
let counter = 0;
class State {
  constructor(name, duration, next, prev) {
    this.name = name;
    this.duration = duration;
    this.next = next;
    this.prev = prev;
  }
}
function Timer() {
  let timerColumn = stateColumns[1];

  timerColumn.innerText = `Timer:${counter}`;
  ++counter;
}

class Controller {
  trigger(state, callback) {
    callback(state);
    setTimeout(() => {
      this.trigger(state.next, callback);
    }, state.duration * 1000);
  }
}
function toggleActive(stateElement) {
  const colorItem = document.querySelector(`.${stateElement.name}`);
  const currentItem = document.querySelector(`.${stateElement.prev.name}`);
  const prevPrevitem = document.querySelector(
    `.${stateElement.prev.prev.name}`
  );
  stateColumns[0].innerText = `State:${stateElement.state}`;
  if (stateElement.next.name === "yellowG") {
    colorItem.classList.add("active");
    currentItem.classList.remove("active");
    greenPeople.classList.add("active");
    redPeople.classList.remove("active");
  } else if (stateElement.next.name === "green") {
    colorItem.classList.add("active");
  } else if (stateElement.prev.name === "yellowG") {
    colorItem.classList.add("active");
    currentItem.classList.remove("active");
    prevPrevitem.classList.remove("active");
    redPeople.classList.add("active");
    greenPeople.classList.remove("active");
  } else {
    colorItem.classList.add("active");
    currentItem.classList.remove("active");
  }
}
let red, yellow, yellowForward, green;
red = new State("red", 12);
yellow = new State("yellowG", 2);
yellowForward = new State("yellow", 2);
green = new State("green", 10);

red.next = yellow;
red.prev = yellowForward;

yellow.next = green;
yellow.prev = red;
green.next = yellowForward;
green.prev = yellow;
yellowForward.next = red;
yellowForward.prev = green;
red.state = "Q1";
yellow.state = "Q2";
green.state = "Q3";
yellowForward.state = "Q4";
const controller = new Controller();

setInterval(() => {
  if (counter === 24) {
    setTimeout(() => {
      counter = 0;
      Timer();
    }, 1000);
  } else Timer();
}, 1000);

controller.trigger(red, toggleActive);
