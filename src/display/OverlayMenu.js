export default class OverlayMenu {
    #element;
    #showClass;
    #event;
    #eventData;

    constructor({ element, showClass, event, eventData }) {
        this.#element = Object(element);
        this.#showClass = showClass;
        this.#event = Object(event);
        this.#eventData = Object(eventData);
    }

    getElement() {
        return this.#element;
    }

    show() {
        this.#element.classList?.add?.(this.#showClass);
        this.#event.trigger?.({ ...this.#eventData, type: "showMenu", menu: this.getElement() });
    }

    hide() {
        this.#element.classList?.remove?.(this.#showClass);
        this.#event.trigger?.({ ...this.#eventData, type: "hideMenu", menu: this.getElement() });
    }

    isVisible() {
        return Boolean(this.#element.classList?.contains?.(this.#showClass));
    }
}
