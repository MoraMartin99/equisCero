export default class AvatarImage {
    #element;

    constructor(element) {
        this.#element = Object(element);
    }

    setSource(source) {
        if (typeof source !== "string") return;
        this.#element.setAttribute?.("src", source);
    }

    getElement() {
        return this.#element;
    }

    reset() {
        this.#element.removeAttribute?.("src");
    }
}
