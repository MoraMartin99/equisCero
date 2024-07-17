export default class StateObserver {
    #minTime;
    constructor(minTime) {
        const baseMinTime = 10 * 1000;
        this.#minTime = !Number.isFinite(minTime) ? baseMinTime : minTime > 0 ? minTime * 1000 : baseMinTime;
    }

    observe(element, properties, maxTolerableTime) {}

    get minTime() {
        return this.#minTime;
    }
}
