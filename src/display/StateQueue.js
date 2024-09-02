import { isIterable } from "../Utilities.js";

export default class StateQueue {
    #queue = Promise.resolve();

    add(stateList, maxTolerableTime) {
        if (isIterable(stateList) && typeof stateList !== "string") {
            const mapper = (item) => {
                const { state, element } = Object(item);
                return Promise.resolve(Object(state).apply?.(element, maxTolerableTime));
            };

            this.#queue = this.#queue.then(() => Promise.allSettled(Array.from(stateList).map(mapper)));
        }

        return this.getQueue();
    }

    getQueue() {
        return this.#queue;
    }
}
