class State {
  constructor(name, duration, next, prev) {
    this.name = name;
    this.duration = duration;
    this.next = next;
    this.prev = prev;
  }
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
  colorItem.classList.add("active");
  currentItem.classList.remove("active");
}
let red, yellow, yellowForward, green;
red = new State("red", 3);
yellow = new State("yellow", 1);
yellowForward = new State("yellow", 1);
green = new State("green", 3);

red.next = yellow;
red.prev = yellowForward;
yellow.next = green;
yellow.prev = red;
green.next = yellowForward;
green.prev = yellow;
yellowForward.next = red;
yellowForward.prev = green;

const controller = new Controller();
controller.trigger(red, toggleActive);
