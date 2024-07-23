import { isFunction } from "./Utilities.js";

export default class CustomizedEvent {
    #subscribersList = [];
    #name;

    constructor(name) {
        if (typeof name === "string" && name) this.#name = name;
    }

    #isFunction(callback) {
        return isFunction(callback);
    }

    trigger(data) {
        this.#subscribersList.forEach((callback) => callback({ name: this.#name, ...Object(data) }));
    }

    subscribe(callback, appendFirst) {
        if (!this.#isFunction(callback)) return;
        if (Boolean(appendFirst)) {
            this.#subscribersList.unshift(callback);
        } else {
            this.#subscribersList.push(callback);
        }
    }

    unsubscribe(callback) {
        this.#subscribersList = this.#subscribersList.filter((item) => {
            return item !== callback;
        });
    }
}
