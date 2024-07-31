import StateObserver from "./StateObserver.js";

export default class AnimationEndObserver extends StateObserver {
    observe(element, properties, maxTolerableTime) {
        const { animationName } = Object(properties);
        const hasValidArguments = () => {
            if (typeof animationName !== "string" || !animationName) return false;
            if (!Boolean(element instanceof Element)) return false;
            return true;
        };
        const event = "animationend";
        let handler;
        maxTolerableTime = !Number.isFinite(maxTolerableTime)
            ? super.minTime
            : maxTolerableTime > 0
            ? maxTolerableTime * 1000
            : super.minTime;
        element = Object(element);
        const promise = new Promise((resolve, reject) => {
            if (!hasValidArguments()) return reject("invalid arguments");
            handler = (e) => {
                if (e.animationName === animationName) resolve({ element, properties });
            };
            element.addEventListener?.(event, handler);
            setTimeout(() => reject("maxTolerableTime reached"), maxTolerableTime);
        });

        return promise.finally(() => element.removeEventListener?.(event, handler));
    }
}
