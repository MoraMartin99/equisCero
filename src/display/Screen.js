export default class Screen {
    #element;
    #disableClass;
    #activeClass;
    #stateList = [];

    constructor({ element, disableClass, activeClass }) {
        this.#element = Object(element);
        this.#disableClass = disableClass;
        this.#activeClass = activeClass;
    }

    getElement() {
        return this.#element;
    }

    enable() {
        this.#element.classList.remove?.(this.#disableClass);
    }

    disable() {
        this.#element.classList.add?.(this.#disableClass);
        this.hide();
    }

    setAsActive() {
        if (!this.isEnable()) return;
        this.#element.classList.add?.(this.#activeClass);
    }

    hide() {
        this.#element.classList.remove?.(this.#activeClass);
    }

    reset() {
        this.enable();
        this.hide();
        this.resetState();
        this.#stateList = [];
    }

    resetState() {
        this.#stateList.forEach((item) => item.remove?.(this.#element));
    }

    isActive() {
        return Boolean(this.#element.classList?.contains?.(this.#activeClass));
    }

    isEnable() {
        return !Boolean(this.#element.classList?.contains?.(this.#disableClass));
    }

    setState(state) {
        if (!this.isEnable()) return Promise.resolve();
        this.resetState();
        state = Object(state);
        this.#stateList.push(state);
        return Promise.resolve(state.apply?.(this.#element));
    }
}
