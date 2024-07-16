import StateObserver from "./StateObserver.js";
import Elements from "./Elements.js";

const { isHTMLElement, updateElement } = Elements;

export default class AnimationObserver extends StateObserver {
    observe(element, properties, maxTolerableTime) {
        const { animationName } = Object(properties);
        const hasValidArguments = () => {
            if (!isHTMLElement(element)) return false;
            if (typeof animationName !== "string" || !animationName) return false;
            return true;
        };
        const event = "animationend";
        let handler;
        maxTolerableTime = !Number.isFinite(maxTolerableTime)
            ? super.minTime
            : maxTolerableTime > 0
            ? maxTolerableTime * 1000
            : super.minTime;
        const promise = new Promise((resolve, reject) => {
            if (!hasValidArguments()) return reject("invalid arguments");
            handler = (e) => {
                if (e.animationName === animationName) resolve({ element, properties });
            };
            updateElement(element, { events: { itemsToAdd: [{ event, handler }] } });
            setTimeout(() => reject("maxTolerableTime reached"), maxTolerableTime);
        });

        return promise.finally(() => updateElement(element, { events: { itemsToRemove: [{ event, handler }] } }));
    }
}
