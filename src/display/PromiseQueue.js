export default class PromiseQueue {
    #queue = Promise.resolve();

    add(callback) {
        const fallback = () => undefined;
        callback = typeof callback === "function" ? callback : fallback;
        this.#queue = this.#queue.then(() => Promise.allSettled([callback()]).then((value) => value[0]));
        return this.getQueue();
    }

    getQueue() {
        return this.#queue;
    }
}
