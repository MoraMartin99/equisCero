export default class Difficulty {
    #currentLevel;

    setLevel(level) {
        this.#currentLevel = String(level);
    }

    getLevel() {
        return this.#currentLevel;
    }

    reset() {
        this.#currentLevel = undefined;
    }
}
