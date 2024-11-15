import { isIterable } from "../Utilities.js";

export default class SessionForm {
    #element;
    #event;
    #nextScreenCallback;
    #previousScreenCallback;
    #fieldsExtractorCallback;
    #previousScreenTriggerList;
    #nextScreenTriggerList;
    #playerNameInputList;
    #avatarManager;

    constructor(settings) {
        const {
            element,
            event,
            nextScreenCallback,
            previousScreenCallback,
            fieldsExtractorCallback,
            previousScreenTriggerList,
            nextScreenTriggerList,
            playerNameInputList,
            avatarManager,
        } = Object(settings);

        this.#element = Object(element);
        this.#event = Object(event);
        this.#nextScreenCallback = nextScreenCallback;
        this.#previousScreenCallback = previousScreenCallback;
        this.#fieldsExtractorCallback = fieldsExtractorCallback;
        this.#previousScreenTriggerList = isIterable(previousScreenTriggerList)
            ? Array.from(previousScreenTriggerList)
            : [];
        this.#nextScreenTriggerList = isIterable(nextScreenTriggerList) ? Array.from(nextScreenTriggerList) : [];
        this.#playerNameInputList = isIterable(playerNameInputList) ? Array.from(playerNameInputList) : [];
        this.#avatarManager = Object(avatarManager);

        this.#element.addEventListener?.("click", this.#clickHandler);
        this.#element.addEventListener?.("keydown", this.#keyDownHandler);
    }

    getElement() {
        return this.#element;
    }

    reset() {
        this.#element.reset?.();
        this.#playerNameInputList.forEach((item) => Object(item).restart?.());
        this.#avatarManager.reset?.();
    }

    setPlayerNamePattern(pattern) {
        this.#playerNameInputList.forEach((item) => Object(item).setPattern?.(pattern));
    }

    removePlayerNamePatter() {
        this.#playerNameInputList.forEach((item) => Object(item).reset?.());
    }

    setAvatarSources(src, resourceId) {
        this.#avatarManager.setSources?.(src, resourceId);
    }

    #keyDownHandler = (e) => {
        const key = e.key;
        const target = e.target;
        const isPlayerNameInput = this.#playerNameInputList.some((item) => {
            return Object(item).getElement?.().contains?.(target);
        });
        const nextTriggerElement = Object(this.#nextScreenTriggerList[0]);

        if (key === "Enter" && isPlayerNameInput) {
            e.preventDefault();
            nextTriggerElement.click?.();
            target.blur?.();
        }
    };

    #clickHandler = (e) => {
        const target = e.target;
        const containsTarget = (item) => Boolean(Object(item).contains?.(target));

        if (this.#previousScreenTriggerList.some(containsTarget)) {
            this.#previousScreenCallback();
        }

        if (this.#nextScreenTriggerList.some(containsTarget)) {
            if (this.#element.checkValidity?.()) {
                this.#event.trigger?.({
                    senderId: this.#element.id,
                    fields: Object(this.#fieldsExtractorCallback(this.#element)),
                });
                this.#nextScreenCallback();
            }
        }
    };
}
