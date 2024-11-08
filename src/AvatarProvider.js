import CustomizedEvent from "./CustomizedEvent.js";

export default class AvatarProvider {
    #responseEvent = new CustomizedEvent("responseEvent");
    #properties = {};

    constructor({ providerId, baseURL }) {
        this.#properties["providerId"] = String(providerId);
        this.#properties["baseURL"] = String(baseURL);
    }

    get responseEvent() {
        return this.#responseEvent;
    }

    getProperty(name) {
        return this.#properties[name];
    }

    getAvatar(resourceId, queryString, fallbackAvatarURL) {
        const url = `${this.getProperty("baseURL")}/${String(queryString)}`;
        const trigger = (responseType, url, id) => {
            this.responseEvent.trigger({
                responseType,
                resource: { url, id },
            });
        };
        const fetchPromise = fetch(url);
        fetchPromise.then((response) => {
            return new Promise((resolve, reject) => {
                if (!response.ok) return reject(response);
                trigger("successful", response.url, resourceId);
                resolve();
            }).catch((reason) => {
                trigger("fail", String(fallbackAvatarURL), resourceId);
                console.error("no se pudo obtener el recurso: %o", reason);
            });
        });
    }
}
