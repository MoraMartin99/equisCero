export default class Difficulty {
    #currentLevel;
    #levelList = ["normal", "hard"];

    #isValid(level) {
        return this.#levelList.includes(level);
    }

    setLevel(level) {
        if (this.#isValid(level)) this.#currentLevel = level;
    }

    getLevel() {
        return this.#currentLevel;
    }

    reset() {
        this.#currentLevel = undefined;
    }
}
