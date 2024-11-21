export default class Player {
    #properties;
    #avatarSources;

    constructor({ id, name, role, avatarSources, token, order, tokenId }) {
        this.#avatarSources = avatarSources;
        const getSource = (sourceId) => Object(this.#avatarSources).getSource?.(sourceId);

        this.#properties = {
            id,
            name,
            role,
            token,
            order,
            tokenId,
            get avatarSource() {
                if (role === "CPU") return getSource("CPU");
                if (role === "user") return getSource("player1");
                return getSource(id);
            },
        };
    }

    getProperty(name) {
        return this.#properties[name];
    }

    getAllProperties() {
        return { ...this.#properties };
    }
}
