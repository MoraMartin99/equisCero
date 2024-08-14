export default class PauseMenu {
    #overlayMenu;
    #hideTriggerElementList;
    #confirmationMenu;
    #options;

    constructor({ overlayMenu, confirmationMenu, options, hideTriggerElementList }) {
        this.#overlayMenu = Object(overlayMenu);
        this.#hideTriggerElementList = hideTriggerElementList;
        this.#confirmationMenu = Object(confirmationMenu);
        this.#options = Object(options);

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
        if (this.#confirmationMenu.isVisible()) this.#confirmationMenu.hide?.();
    };

    isVisible() {
        return this.#overlayMenu.isVisible?.();
    }

    #clickHandler = (e) => {
        const target = e.target;
        const initConfirmationMenu = (title, callback) => {
            const extendedCallback = () => {
                callback();
                this.hide();
            };
            this.#confirmationMenu.set?.(title, extendedCallback);
            this.#confirmationMenu.show?.();
        };

        if (this.#hideTriggerElementList.some?.((item) => Object(item).contains?.(target))) this.hide();

        Object.values(this.#options).forEach(({ element, callback, title }) => {
            if (Object(element).contains?.(target)) initConfirmationMenu(title, callback);
        });
    };
}
