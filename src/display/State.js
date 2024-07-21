export default class State {
    #properties;
    #StateObserver;

    constructor(properties, StateObserver) {
        this.#properties = Object(properties);
        this.#StateObserver = Object(StateObserver);
    }

    apply(element, maxTolerableTime = 10) {
        const classList = Array.of(this.getProperty("classList")).flat();
        element = Object(element);
        const promise = new Promise((resolve, reject) => {
            const observerPromise = this.#StateObserver.observe(element, this.getAllProperties(), maxTolerableTime);
            classList.forEach((currentClass) => typeof currentClass === "string" && element.classList?.add?.(currentClass));
            observerPromise
                .then(() => resolve({ element, properties: this.getAllProperties() }))
                .catch((reason) => reject({ element, properties: this.getAllProperties(), reason }));
        });

        promise.catch((reason) => console.error("no se pudo aplicar el estado: %o", reason));

        return promise;
    }

    remove(element) {
        const classList = Array.of(this.getProperty("classList")).flat();
        element = Object(element);
        classList.forEach((currentClass) => typeof currentClass === "string" && element.classList?.remove?.(currentClass));
    }

    getProperty(name) {
        return this.#properties[name];
    }

    getAllProperties() {
        return { ...this.#properties };
    }
}
