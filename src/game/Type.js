export default class Type {
    #currentType;
    #typeList = ["PVSP", "PVSCPU"];

    #isValidType(type) {
        return this.#typeList.includes(type);
    }

    setType(type) {
        type = String(type).toUpperCase();
        if (this.#isValidType(type)) this.#currentType = type;
    }

    getType() {
        return this.#currentType;
    }

    reset() {
        this.#currentType = undefined;
    }
}
