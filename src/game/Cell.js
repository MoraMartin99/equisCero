export default class Cell {
    #properties;

    constructor(column, row) {
        row = Number.isInteger(Number(row)) ? Number(row) : undefined;
        column = String(column).toUpperCase();
        this.#properties = { row, column, id: `${column}${row}`, token: undefined };
    }

    getProperty(name) {
        return this.#properties[name];
    }

    getAllProperties() {
        return { ...this.#properties };
    }

    setToken(token) {
        this.#properties["token"] = String(token);
    }

    reset() {
        this.#properties["token"] = undefined;
    }
}
