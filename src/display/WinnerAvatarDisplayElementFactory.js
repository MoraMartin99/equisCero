export default class WinnerAvatarDisplayElementFactory {
    #avatarImageElementFactory;

    constructor(avatarImageElementFactory) {
        this.#avatarImageElementFactory = avatarImageElementFactory;
    }

    create = (type, settings) => {
        let element;

        if (type === "image") {
            element = this.#avatarImageElementFactory.create?.(settings);
        } else if (type === "mask") {
            const maskClassList = ["maskContainer"];
            const { sources } = Object(settings);
            const { left, right } = Object(sources);
            element = document.createElement("div");
            const childrenList = [
                { classList: ["left", "player1"], source: left },
                { classList: ["right", "player2"], source: right },
            ].map((item) => this.#avatarImageElementFactory.create(item));

            maskClassList.forEach((item) => element.classList.add(item));
            childrenList.forEach((item) => element.appendChild(item));
        }

        return element;
    };
}
