export default class Cell {
    #element;
    #stateList = [];
    #invalidMoveState;
    #vanishState;
    #smoothPopOutState;

    constructor({ element, invalidMoveState, vanishState, smoothPopOutState }) {
        this.#element = Object(element);
        this.#invalidMoveState = Object(invalidMoveState);
        this.#vanishState = Object(vanishState);
        this.#smoothPopOutState = Object(smoothPopOutState);
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

    setState(state) {
        state = Object(state);
        this.#stateList.push(state);
        return Promise.resolve(state.apply?.(this.#element));
    }

    setInvalid() {
        const stateHasStarted = () => {
            const classList = [this.#invalidMoveState, this.#vanishState]
                .map((item) => item.getProperty?.("classList"))
                .flat();
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
        return this.#smoothPopOutState.apply?.(tokenElement);
    }
}
