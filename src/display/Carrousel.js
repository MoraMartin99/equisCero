export default class Carrousel {
    #element;
    #screenList;
    #initialScreenId;
    #event;
    #eventData;
    #states;
    #slideLeftToCenterState;
    #slideCenterToRightState;
    #slideRightToCenterState;
    #slideCenterToLeftState;

    constructor({ element, screenList, initialScreenId, event, states, eventData }) {
        this.#element = Object(element);
        this.#screenList = Object(screenList);
        this.#initialScreenId = initialScreenId;
        this.#event = Object(event);
        this.#eventData = Object(eventData);
        this.#states = Object(states);
        this.#slideLeftToCenterState = Object(this.#states.slideLeftToCenterState);
        this.#slideCenterToRightState = Object(this.#states.slideCenterToRightState);
        this.#slideRightToCenterState = Object(this.#states.slideRightToCenterState);
        this.#slideCenterToLeftState = Object(this.#states.slideCenterToLeftState);
    }

    getElement() {
        return this.#element;
    }

    nextScreen = () => {
        const activeScreen = this.#getActiveScreen();
        const targetScreen = this.#getSiblingScreen(activeScreen, 1);
        return this.#slideScreens({
            type: "next",
            activeScreenSettings: { screen: activeScreen, state: this.#slideCenterToLeftState },
            targetScreenSettings: { screen: targetScreen, state: this.#slideRightToCenterState },
        });
    };

    previousScreen = () => {
        const activeScreen = this.#getActiveScreen();
        const targetScreen = this.#getSiblingScreen(activeScreen, -1);
        return this.#slideScreens({
            type: "previous",
            activeScreenSettings: { screen: activeScreen, state: this.#slideCenterToRightState },
            targetScreenSettings: { screen: targetScreen, state: this.#slideLeftToCenterState },
        });
    };

    goTo = (screenId) => {
        const activeScreen = this.#getActiveScreen();
        const targetScreen = this.#getScreen(screenId);
        return this.#slideScreens({
            type: "goTo",
            activeScreenSettings: { screen: activeScreen, state: this.#slideCenterToLeftState },
            targetScreenSettings: { screen: targetScreen, state: this.#slideRightToCenterState },
        });
    };

    disableScreen = (screenId) => {
        const targetScreen = this.#getScreen(screenId);
        targetScreen.disable?.();
    };

    enableScreen = (screenId) => {
        const targetScreen = this.#getScreen(screenId);
        targetScreen.enable?.();
    };

    reset = () => {
        const initialScreen = this.#getScreen(this.#initialScreenId);
        initialScreen.enable?.();
        Promise.resolve(this.goTo(this.#initialScreenId)).then(() => {
            this.#screenList.filter((item) => item !== initialScreen).forEach((item) => Object(item).reset?.());
        });
    };

    #getScreen(screenId) {
        return Object(this.#screenList.find?.((item) => Object(item).getElement?.().id === screenId));
    }

    #getActiveScreen() {
        return Object(this.#screenList.find?.((item) => Object(item).isActive?.()));
    }

    #getSiblingScreen(referenceScreen, indexOffset) {
        const screenList = this.#screenList.filter?.((item) => Object(item).isEnable?.());
        const referenceIndex = screenList.findIndex((item) => item === referenceScreen);
        const length = screenList.length;
        const targetIndex = (((referenceIndex + indexOffset) % length) + length) % length;
        return screenList[targetIndex];
    }

    #slideScreens({ activeScreenSettings, targetScreenSettings, type }) {
        const getEventScreenSettings = (screenSettings) => {
            const entries = Object.entries(screenSettings).map(([key, value]) => {
                if (key === "screen") return ["id", Object(value).getElement?.().id];
                return [key, value];
            });
            return Object.fromEntries(entries);
        };
        const slideScreen = ({ screen, state }) => {
            if (Object(state).apply) return Promise.resolve(Object(screen).setState?.(state));
            return Promise.reject({ screen, state });
        };
        const eventActiveScreenSettings = getEventScreenSettings(activeScreenSettings);
        const eventTargetScreenSettings = getEventScreenSettings(targetScreenSettings);

        this.#event.trigger?.({
            ...this.#eventData,
            type,
            status: "start",
            currentScreen: eventActiveScreenSettings,
            targetScreen: eventTargetScreenSettings,
        });

        const activeScreenPromise = slideScreen(activeScreenSettings).then(() => activeScreenSettings.screen.hide());
        const targetScreenPromise = slideScreen(targetScreenSettings).then(() => targetScreenSettings.screen.setAsActive());
        const slidePromise = Promise.all([activeScreenPromise, targetScreenPromise]);

        slidePromise
            .then(() => {
                this.#event.trigger?.({
                    ...this.#eventData,
                    type,
                    status: "end",
                    currentScreen: eventActiveScreenSettings,
                    targetScreen: eventTargetScreenSettings,
                });
            })
            .catch((reason) => console.error("no se pudo completar el desplazamiento: %o", reason));

        return slidePromise;
    }
}
