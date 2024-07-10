import { isFunction } from "./Utilities.js";

export default class CustomizedEvent {
    #subscribersList = [];

    #isFunction(callback) {
        return isFunction(callback);
    }

    trigger(data) {
        this.#subscribersList.forEach((callback) => callback(data));
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
