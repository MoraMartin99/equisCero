export default class ConfirmationMenu {
    #overlayMenu;
    #callback;
    #cancelElement;
    #confirmationElement;
    #titleElement;

    constructor({ overlayMenu, cancelElement, confirmationElement, titleElement }) {
        this.#overlayMenu = Object(overlayMenu);
        this.#cancelElement = Object(cancelElement);
        this.#confirmationElement = Object(confirmationElement);
        this.#titleElement = Object(titleElement);

        this.getElement().addEventListener("click", this.#clickHandler);
    }

    getElement() {
        return this.#overlayMenu.getElement?.();
    }

    show() {
        this.#overlayMenu.show?.();
    }

    set(title, callback) {
        if (this.#titleElement.textContent !== title) this.#titleElement.textContent = title;
        this.#callback = callback;
    }

    hide = () => {
        this.#overlayMenu.hide?.();
    };

    isVisible() {
        return this.#overlayMenu.isVisible?.();
    }

    #clickHandler = (e) => {
        const target = e.target;

        if (this.#cancelElement.contains?.(target)) this.hide();
        if (this.#confirmationElement.contains?.(target)) this.#callback();
    };
}
