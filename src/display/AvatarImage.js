export default class AvatarImage {
    #element;
    #placeHolderSrc;

    constructor(element, placeHolderSrc) {
        this.#element = Object(element);
        this.#placeHolderSrc = placeHolderSrc;
    }

    setSource(source) {
        if (typeof source !== "string") return;
        this.#element.setAttribute?.("src", source);
    }

    getElement() {
        return this.#element;
    }

    reset() {
        if (this.#placeHolderSrc) return this.setSource(this.#placeHolderSrc);
        this.#element.removeAttribute?.("src");
    }
}
