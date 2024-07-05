import Player from "./Player.js";

export default class Players {
    #namePattern;
    #playersGroup = new Map();
    #avatarSources = (() => {
        const sources = new Map();
        const getSource = (id) => sources.get(id);
        const getAllSources = () => Object.fromEntries(sources.entries());
        const setSource = (id, source) => sources.set(id, source);
        const clear = () => sources.clear();
        return { getSource, setSource, clear, getAllSources };
    })();

    constructor(namePattern) {
        this.#namePattern = namePattern;
    }

    #isValidName(name) {
        if (this.#namePattern === undefined) return false;
        const regex = new RegExp(this.#namePattern);
        return regex.test(name);
    }

    setPlayer({ id, name, role }) {
        if (!Boolean(typeof id === "string") || !Boolean(id) || !this.#isValidName(name)) return;
        const settings = { player1: { token: "x", order: 1 }, player2: { token: "0", order: 2 } };
        const player = new Player({
            id,
            name,
            role,
            avatarSources: this.#avatarSources,
            token: settings[id]?.token,
            order: settings[id]?.order,
        });
        this.#playersGroup.set(id, player);
    }

    reset() {
        [this.#playersGroup, this.#avatarSources].forEach((item) => item.clear());
    }

    getPlayerById(id) {
        return Object(this.#playersGroup.get(id)?.getAllProperties?.());
    }

    getAllPlayers() {
        return Object.fromEntries([...this.#playersGroup].map(([key]) => [key, this.getPlayerById(key)]));
    }

    #getPlayerByPropertyValue(name, value) {
        const id = [...this.#playersGroup.values()].find((item) => item.getProperty(name) === value)?.getProperty?.("id");
        return this.getPlayerById(id);
    }

    getPlayerByToken(token) {
        return this.#getPlayerByPropertyValue("token", token);
    }

    getPlayersIdList() {
        return Object.values(this.getAllPlayers())
            .sort((a, b) => a.order - b.order)
            .map((item) => item.id);
    }

    getCPUPlayer() {
        return this.#getPlayerByPropertyValue("role", "CPU");
    }

    getNamePattern() {
        return this.#namePattern;
    }

    setAvatarSource({ url, id }) {
        if (!Boolean(typeof id === "string") || !Boolean(id)) return;
        this.#avatarSources.setSource(id, url);
    }

    getAllAvatarSources() {
        return this.#avatarSources.getAllSources();
    }
}
