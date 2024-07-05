export default class Type {
    #currentType;

    setType(type) {
        this.#currentType = String(type);
    }

    getType() {
        return this.#currentType;
    }

    reset() {
        this.#currentType = undefined;
    }
}
