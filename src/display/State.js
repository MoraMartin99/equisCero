export default class State {
    #properties;
    #stateObserver;

    constructor(properties, stateObserver) {
        this.#properties = Object(properties);
        this.setObserver(stateObserver);
    }

    apply(element, maxTolerableTime = 10) {
        const classList = Array.of(this.getProperty("classList")).flat();
        element = Object(element);
        const promise = new Promise((resolve, reject) => {
            const observerPromise = this.#stateObserver.observe
                ? Promise.resolve(this.#stateObserver.observe(element, this.getAllProperties(), maxTolerableTime))
                : Promise.reject("invalid observer");
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

    setObserver(stateObserver) {
        this.#stateObserver = Object(stateObserver);
    }
}
