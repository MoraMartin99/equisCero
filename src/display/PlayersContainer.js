export default class PlayersContainer {
    #playerCardContainerList;
    #slots;
    #highlightState;

    constructor({ playerCardContainerList, highlightState }) {
        this.#playerCardContainerList = Object(playerCardContainerList);
        this.#slots = { 1: this.#playerCardContainerList[0], 2: this.#playerCardContainerList[1] };
        this.#highlightState = Object(highlightState);
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
        this.restart();
        const element = this.#getCardById(id).getElement();
        return this.#highlightState.apply(element);
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
