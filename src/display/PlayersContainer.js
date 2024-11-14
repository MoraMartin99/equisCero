export default class PlayersContainer {
    #playerCardContainerList;
    #slots;
    #highlightState;
    #stateQueue;
    #highlightQueue;

    constructor({ playerCardContainerList, highlightState, stateQueue }) {
        this.#playerCardContainerList = Object(playerCardContainerList);
        this.#slots = { 1: this.#playerCardContainerList[0], 2: this.#playerCardContainerList[1] };
        this.#highlightState = Object(highlightState);
        this.#stateQueue = Object(stateQueue);
    }

    #getCardById(id) {
        return Object(this.#playerCardContainerList.find?.((item) => Object(item).getId?.() === id));
    }

    #getCardBySlot(slot) {
        return Object(this.#slots[slot]);
    }

    setCard(slot, { id, name, source }) {
        const card = this.#getCardBySlot(slot);
        card.set?.({ id, name, source });
    }

    highlightCard(id) {
        if (!this.#highlightQueue) this.#highlightQueue = Promise.resolve(this.#stateQueue.getQueue?.());
        this.#highlightQueue = this.#highlightQueue.then(() => {
            const element = this.#getCardById(id).getElement();
            this.restart();
            return this.#stateQueue.add?.([{ state: this.#highlightState, element }]);
        });

        return this.#highlightQueue;
    }

    restart() {
        const list = this.#playerCardContainerList.map((item) => item.getElement());
        list.forEach((item) => this.#highlightState.remove(item));
    }

    reset() {
        this.#playerCardContainerList.forEach((item) => Object(item).reset?.());
        this.restart();
    }
}
