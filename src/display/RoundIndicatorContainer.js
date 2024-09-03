export default class RoundIndicatorContainer {
    #roundIndicatorList = [];
    #element;

    constructor(element) {
        this.#element = Object(element);
    }

    addIndicator(roundIndicator) {
        roundIndicator = Object(roundIndicator);
        this.#element.appendChild?.(roundIndicator.getElement?.());
        this.#roundIndicatorList.push(roundIndicator);
    }

    reset() {
        this.#element.replaceChildren();
        this.#roundIndicatorList = [];
    }

    restart() {
        this.#roundIndicatorList.forEach((item) => Object(item).reset?.());
    }

    getElement() {
        return this.#element;
    }

    setIndicatorState(round, state) {
        const indicator = this.#getIndicator(round);
        return Promise.resolve(indicator.setState?.(state));
    }

    #getIndicator(round) {
        const callback = (item) => Object(item).getRound() === round;
        return Object(this.#roundIndicatorList.find(callback));
    }
}
