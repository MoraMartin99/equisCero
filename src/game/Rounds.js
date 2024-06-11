export default class Rounds {
    #totalRounds;
    #currentRound = 1;

    setTotalRounds(rounds) {
        if (Number.isInteger(rounds)) this.#totalRounds = rounds;
    }

    getTotalRounds() {
        return this.#totalRounds;
    }

    getCurrentRound() {
        return this.#currentRound;
    }

    next() {
        if (this.#currentRound < this.#totalRounds) this.#currentRound++;
    }

    resetCurrentRound() {
        this.#currentRound = 1;
    }

    reset() {
        this.#totalRounds = undefined;
        this.resetCurrentRound();
    }
}
