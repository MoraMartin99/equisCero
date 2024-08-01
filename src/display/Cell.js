export default class Cell {
    #element;
    #stateList = [];
    #stateQueue;
    #invalidMoveState;
    #vanishState;
    #smoothPopOutState;

    constructor({ element, invalidMoveState, vanishState, smoothPopOutState, stateQueue }) {
        this.#element = Object(element);
        this.#invalidMoveState = Object(invalidMoveState);
        this.#vanishState = Object(vanishState);
        this.#smoothPopOutState = Object(smoothPopOutState);
        this.#stateQueue = Object(stateQueue);
    }

    getElement() {
        return this.#element;
    }

    resetState() {
        const stateList = [this.#invalidMoveState, this.#vanishState, this.#smoothPopOutState, ...this.#stateList];
        stateList.forEach((state) => state.remove?.(this.#element));
    }

    reset() {
        this.resetState();
        Array.from(this.#element.querySelectorAll?.("*")).forEach((child) => child.remove());
        this.#stateList = [];
    }

    setState(state, hasToWait) {
        state = Object(state);
        this.#stateList.push(state);
        if (hasToWait) return Promise.resolve(this.#stateQueue.add?.([{ state, element: this.#element }]));
        return Promise.resolve(state.apply?.(this.#element));
    }

    setInvalid() {
        const stateHasStarted = () => {
            const classList = [this.#invalidMoveState, this.#vanishState].map((item) => item.getProperty?.("classList")).flat();
            return Boolean(classList.every((item) => this.#element.classList?.contains?.(item)));
        };
        if (stateHasStarted()) return Promise.resolve();
        this.resetState();
        return Promise.resolve(this.#invalidMoveState.apply?.(this.#element))
            .then(() => this.#vanishState.apply?.(this.#element))
            .finally(() => this.resetState());
    }

    dropToken(tokenElement) {
        this.#element.appendChild?.(tokenElement);
        return Promise.resolve(this.#stateQueue.add?.([{ state: this.#smoothPopOutState, element: tokenElement }]));
    }
}
