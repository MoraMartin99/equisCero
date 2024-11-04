export default class PlayersContainer {
    #playerCardContainerList;
    #slots;
    #highlightState;
    #unhighlightState;
    #stateQueue;
    #highlightQueue;

    constructor({ playerCardContainerList, highlightState, unhighlightState, stateQueue }) {
        this.#playerCardContainerList = Object(playerCardContainerList);
        this.#slots = { 1: this.#playerCardContainerList[0], 2: this.#playerCardContainerList[1] };
        this.#highlightState = Object(highlightState);
        this.#unhighlightState = Object(unhighlightState);
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
            const card = this.#getCardById(id);
            const stateIsActive = (element, state) => {
                return state.getProperty("classList").every((item) => element.classList.contains(item));
            };
            const mapper = (item) => {
                const element = Object(item).getElement?.();
                if (item === card) return { state: this.#highlightState, element };
                if (stateIsActive(element, this.#highlightState)) return { state: this.#unhighlightState, element };
            };
            const filter = (item) => item !== undefined;
            const list = this.#playerCardContainerList.map?.(mapper).filter?.(filter);
            this.restart();

            return this.#stateQueue.add?.(list);
        });

        return this.#highlightQueue;
    }

    restart() {
        const list = this.#playerCardContainerList.map((item) => item.getElement());
        const callback = (element) =>
            [this.#highlightState, this.#unhighlightState].forEach((item) => item.remove(element));
        list.forEach(callback);
    }

    reset() {
        this.#playerCardContainerList.forEach((item) => Object(item).reset?.());
        this.restart();
    }
}
