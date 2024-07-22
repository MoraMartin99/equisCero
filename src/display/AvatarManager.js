export default class AvatarManager {
    #avatarImageList;

    constructor(AvatarImageList) {
        this.#avatarImageList = Array.of(AvatarImageList)
            .flat()
            .map((item) => Object(item));
    }

    setSources(src, resourceId) {
        this.#avatarImageList.forEach((item) => {
            if (item.getElement?.().classList?.contains?.(resourceId)) item.setSource?.(src);
        });
    }

    reset() {
        this.#avatarImageList.forEach((item) => item.reset?.());
    }
}
