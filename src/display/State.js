import Elements from "./Elements.js";

export default class State {
    #properties;
    #StateObserver;

    constructor(properties, StateObserver) {
        this.#properties = Object(properties);
        this.#StateObserver = Object(StateObserver);
    }

    apply(element, maxTolerableTime = 10) {
        const { classList } = Object(this.#properties);
        const promise = new Promise((resolve, reject) => {
            const observerPromise = this.#StateObserver.observe(element, this.getAllProperties(), maxTolerableTime);
            Elements.updateElement(element, { classes: { itemsToAdd: classList } });
            observerPromise
                .then(() => resolve({ element, properties: this.getAllProperties() }))
                .catch((reason) => reject({ element, properties: this.getAllProperties(), reason }));
        });

        promise.catch((reason) => console.error("no se pudo aplicar el estado: %o", reason));

        return promise;
    }

    remove(element) {
        const { classList } = Object(this.#properties);
        Elements.updateElement(element, { classes: { itemsToRemove: classList } });
    }

    getProperty(name) {
        return this.#properties[name];
    }

    getAllProperties() {
        return { ...this.#properties };
    }
}
