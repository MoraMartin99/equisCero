import StateObserver from "./StateObserver.js";
import { isIterable } from "../Utilities.js";

export default class ClassObserver extends StateObserver {
    observe(element, properties, maxTolerableTime) {
        const { classList } = Object(properties);
        const hasValidArguments = () => {
            if (!Boolean(element instanceof Element)) return false;
            if (!isIterable(classList) || typeof classList === "string") return false;
            return true;
        };
        let mutationObserver;
        maxTolerableTime = !Number.isFinite(maxTolerableTime)
            ? super.minTime
            : maxTolerableTime > 0
            ? maxTolerableTime * 1000
            : super.minTime;
        element = Object(element);

        const promise = new Promise((resolve, reject) => {
            if (!hasValidArguments()) return reject("invalid arguments");
            const callback = ([{ target }]) => {
                const hasAllClasses = (target, classList) => {
                    return Array.from(classList).every((currentClass) => target.classList.contains(currentClass));
                };
                if (hasAllClasses(target, classList)) resolve({ element, properties });
            };
            mutationObserver = new MutationObserver(callback);
            mutationObserver.observe(element, { attributeFilter: ["class"] });
            setTimeout(() => reject("maxTolerableTime reached"), maxTolerableTime);
        });

        return promise.finally(() => Object(mutationObserver).disconnect?.());
    }
}
