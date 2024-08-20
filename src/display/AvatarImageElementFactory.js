export default class AvatarImageElementFactory {
    #baseClassList = [];
    #baseAttributeList = [];

    constructor({ baseClassList, baseAttributeList }) {
        if (baseClassList) this.#baseClassList.push(...baseClassList);
        if (baseAttributeList) this.#baseAttributeList.push(...baseAttributeList);
    }

    create = (settings) => {
        const element = document.createElement("img");
        const { classList, source } = Object(settings);
        const baseClassList = [...this.#baseClassList];
        const baseAttributeList = [...this.#baseAttributeList];
        if (classList) baseClassList.push(...classList);
        if (source) baseAttributeList.push({ name: "src", value: source });
        baseClassList.forEach((item) => element.classList.add(item));
        baseAttributeList.forEach(({ name, value }) => element.setAttribute(name, value));
        return element;
    };
}
