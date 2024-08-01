export default class Board {
    #element;
    #cellList;
    #stateList = [];
    #event;
    #eventData;
    #stateQueue;
    #playingState;

    #clickHandler = (e) => {
        const target = e.target;
        const cellList = this.#cellList.map((item) => Object(item).getElement?.());
        const isPlayable = () => {
            return this.#playingState.getProperty?.("classList").every?.((item) => this.#element.classList?.contains?.(item));
        };
        const closestCell = cellList.find?.((item) => Object(item).contains?.(target));
        if (!isPlayable() || !closestCell) return;
        this.#event.trigger?.({ cellId: Object(closestCell).id, ...this.#eventData });
    };

    #getCell(cellId) {
        return Object(this.#cellList.find((item) => Object(Object(item).getElement?.()).id === cellId));
    }

    constructor({ element, cellList, playingState, event, eventData, stateQueue }) {
        this.#element = Object(element);
        this.#cellList = cellList;
        this.#playingState = Object(playingState);
        this.#event = Object(event);
        this.#eventData = Object(eventData);
        this.#stateQueue = Object(stateQueue);

        this.#element.addEventListener?.("click", this.#clickHandler);
    }

    reset() {
        this.disableCellSelection();
        this.resetState();
        this.#cellList.forEach((item) => Object(item).reset?.());
        this.#stateList = [];
    }

    resetState() {
        this.#stateList.forEach((state) => state.remove?.(this.#element));
    }

    getElement() {
        return this.#element;
    }

    enableCellSelection() {
        this.#playingState.apply?.(this.#element);
    }

    disableCellSelection() {
        this.#playingState.remove?.(this.#element);
    }

    setInvalidCell(cellId) {
        this.#getCell(cellId).setInvalid?.();
    }

    dropToken(cellId, tokenElement) {
        this.#getCell(cellId).dropToken?.(tokenElement);
    }

    setCellState(cellId, state, hasToWait) {
        return Promise.resolve(this.#getCell(cellId).setState?.(state, hasToWait));
    }

    setState(state, hasToWait) {
        this.resetState();
        state = Object(state);
        this.#stateList.push(state);
        if (hasToWait) return Promise.resolve(this.#stateQueue.add?.([{ state, element: this.#element }]));
        return Promise.resolve(state.apply?.(this.#element));
    }
}
