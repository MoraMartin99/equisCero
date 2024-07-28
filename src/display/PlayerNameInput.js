export default class PlayerNameInput {
    #element;
    #validationClass;
    #event = "focusout";

    #handler = (e) => this.#element.classList?.add?.(this.#validationClass);

    constructor(element, validationClass) {
        this.#element = Object(element);
        this.#validationClass = validationClass;

        this.#element.addEventListener?.(this.#event, this.#handler);
    }

    getElement() {
        return this.#element;
    }

    setPattern(pattern) {
        this.#element.setAttribute?.("pattern", pattern);
    }

    restart() {
        this.#element.classList?.remove?.(this.#validationClass);
    }

    reset() {
        this.restart();
        this.#element.removeAttribute?.("pattern");
    }
}
