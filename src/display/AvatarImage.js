import Elements from "./Elements.js";

const { updateElement } = Elements;

export default class AvatarImage {
    #element;

    constructor(element) {
        this.#element = element;
    }

    setSource(source) {
        if (typeof source !== "string") return;
        updateElement(this.#element, { attributes: { itemsToAdd: [{ name: "src", value: source }] } });
    }

    getElement() {
        return this.#element;
    }

    reset() {
        updateElement(this.#element, { attributes: { itemsToRemove: ["src"] } });
    }
}
