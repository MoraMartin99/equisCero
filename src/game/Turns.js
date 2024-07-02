export default class Turns {
    #playersIdList;
    #queue = [];

    setPlayersIdList(playersIdList) {
        this.#playersIdList = Boolean(playersIdList?.[Symbol.iterator]) ? Array.from(playersIdList) : [];
    }

    getCurrentPlayerId() {
        return this.#queue[this.#queue.length - 1];
    }

    nextTurn() {
        if (!this.#playersIdList.length) return;
        if (this.#queue[this.#queue.length - 1] === this.#playersIdList[0]) {
            this.#queue.push(this.#playersIdList[1]);
        } else {
            this.#queue.push(this.#playersIdList[0]);
        }
    }

    getCurrentTurn() {
        return this.#queue.length;
    }

    resetQueue() {
        this.#queue = [];
    }

    reset() {
        this.resetQueue();
        this.#playersIdList = undefined;
    }
}
