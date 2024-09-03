export default class RoundIndicator {
    #element;
    #round;
    #stateList = [];

    constructor(element, round) {
        this.#element = Object(element);
        this.#round = round;
    }

    getElement() {
        return this.#element;
    }

    getRound() {
        return this.#round;
    }

    setState(state) {
        state = Object(state);
        this.#resetStates();
        this.#stateList.push(state);
        return Promise.resolve(state.apply?.(this.#element));
    }

    reset() {
        this.#resetStates();
        this.#stateList = [];
    }

    #resetStates() {
        this.#stateList.forEach((item) => item.remove?.(this.#element));
    }
}
