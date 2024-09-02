export default class PlayerCardContainer {
    #element;
    #id;
    #avatarImage;
    #playerNameElement;

    constructor({ element, id, avatarImage, playerNameElement }) {
        this.#element = Object(element);
        this.#id = id;
        this.#avatarImage = Object(avatarImage);
        this.#playerNameElement = Object(playerNameElement);
    }

    getElement() {
        return this.#element;
    }

    getId() {
        return this.#id;
    }

    setCard({ name, source }) {
        if (name) this.#playerNameElement.textContent = name;
        if (source) this.#avatarImage.setSource?.(source);
    }

    reset() {
        this.#playerNameElement.textContent = "";
        this.#avatarImage.reset?.();
    }
}
