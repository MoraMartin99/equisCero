export default class ResultMenu {
    #overlayMenu;
    #optionsContainerElement;
    #avatarDisplayContainerElement;
    #messageContainerElement;
    #optionList;
    #currentClassList = [];

    constructor({ overlayMenu, optionsContainerElement, avatarDisplayContainerElement, messageContainerElement }) {
        this.#overlayMenu = Object(overlayMenu);
        this.#optionsContainerElement = Object(optionsContainerElement);
        this.#avatarDisplayContainerElement = Object(avatarDisplayContainerElement);
        this.#messageContainerElement = Object(messageContainerElement);

        this.getElement().addEventListener?.("click", this.#clickHandler);
    }

    getElement() {
        return this.#overlayMenu.getElement?.();
    }

    show() {
        this.#overlayMenu.show?.();
    }

    hide = () => {
        this.#overlayMenu.hide?.();
    };

    isVisible() {
        return this.#overlayMenu.isVisible?.();
    }

    set({ optionList, avatarDisplayElement, messageElement, classList }) {
        if (optionList) {
            this.#optionList = Object(optionList);
            this.#optionsContainerElement.replaceChildren?.(...optionList.map(({ element }) => element));
        }

        if (avatarDisplayElement) this.#avatarDisplayContainerElement.replaceChildren?.(avatarDisplayElement);
        if (messageElement) this.#messageContainerElement.replaceChildren?.(messageElement);
        if (classList) {
            this.#currentClassList.forEach((item) => this.getElement().classList?.remove?.(item));
            classList.forEach((item) => this.getElement().classList?.add?.(item));
            this.#currentClassList = classList;
        }
    }

    #clickHandler = (e) => {
        const target = e.target;
        for (const { element, callback } of this.#optionList) {
            if (Object(element).contains?.(target)) {
                this.hide();
                callback();
                break;
            }
        }
    };
}
