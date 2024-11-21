import Player from "./Player.js";

export default class Players {
    #playersGroup = new Map();
    #avatarSources = (() => {
        const sources = new Map();
        const getSource = (id) => sources.get(id);
        const getAllSources = () => Object.fromEntries(sources.entries());
        const setSource = (id, source) => sources.set(id, source);
        const clear = () => sources.clear();
        return { getSource, setSource, clear, getAllSources };
    })();

    setPlayer({ id, name, role, token, order, tokenId }) {
        if (!Boolean(typeof id === "string") || !Boolean(id)) return;
        const player = new Player({
            id,
            name,
            role,
            avatarSources: this.#avatarSources,
            token,
            tokenId,
            order,
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
        const id = [...this.#playersGroup.values()]
            .find((item) => item.getProperty(name) === value)
            ?.getProperty?.("id");
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

    setAvatarSource({ url, id }) {
        if (!Boolean(typeof id === "string") || !Boolean(id)) return;
        this.#avatarSources.setSource(id, url);
    }

    getAllAvatarSources() {
        return this.#avatarSources.getAllSources();
    }
}
