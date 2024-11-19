export default class Board {
    #element;
    #cellList;
    #stateList = [];
    #event;
    #eventData;
    #playingClass;

    #clickHandler = (e) => {
        const target = e.target;
        const cellList = this.#cellList.map((item) => Object(item).getElement?.());
        const isPlayable = () => this.#element.classList?.contains?.(this.#playingClass);
        const closestCell = cellList.find?.((item) => Object(item).contains?.(target));
        if (!isPlayable() || !closestCell) return;
        this.#event.trigger?.({ cellId: Object(closestCell).id, ...this.#eventData });
    };

    #getCell(cellId) {
        return Object(this.#cellList.find((item) => Object(Object(item).getElement?.()).id === cellId));
    }

    constructor({ element, cellList, playingClass, event, eventData }) {
        this.#element = Object(element);
        this.#cellList = cellList;
        this.#playingClass = playingClass;
        this.#event = Object(event);
        this.#eventData = Object(eventData);

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
        this.#element.classList.add?.(this.#playingClass);
    }

    disableCellSelection() {
        this.#element.classList.remove?.(this.#playingClass);
    }

    setInvalidCell(cellId) {
        return this.#getCell(cellId).setInvalid?.();
    }

    dropToken(cellId, tokenElement) {
        return this.#getCell(cellId).dropToken?.(tokenElement);
    }

    setCellState(cellId, state) {
        return Promise.resolve(this.#getCell(cellId).setState?.(state));
    }

    setState(state) {
        this.resetState();
        state = Object(state);
        this.#stateList.push(state);
        return state.apply?.(this.#element);
    }
}
