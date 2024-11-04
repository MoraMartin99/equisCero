export default class PlayerCardContainer {
    #element;
    #id;
    #avatarImage;
    #playerNameElement;
    #idAffectedElements;

    constructor({ element, avatarImage, playerNameElement }) {
        this.#element = Object(element);
        this.#avatarImage = Object(avatarImage);
        this.#playerNameElement = Object(playerNameElement);
        this.#idAffectedElements = [this.#element, this.#avatarImage.getElement()];
    }

    getElement() {
        return this.#element;
    }

    getId() {
        return this.#id;
    }

    set({ name, source, id }) {
        if (name) this.#playerNameElement.textContent = name;
        if (source) this.#avatarImage.setSource?.(source);
        if (id) {
            this.#resetId();
            this.#id = String(id);
            this.#idAffectedElements.forEach((item) => item.classList.add(this.#id));
        }
    }

    #resetId() {
        this.#idAffectedElements.forEach((item) => item.classList.remove(this.#id));
    }

    reset() {
        this.#playerNameElement.textContent = "";
        this.#avatarImage.reset?.();
        this.#resetId();
        this.#id = undefined;
    }
}
