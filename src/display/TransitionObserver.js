import StateObserver from "./StateObserver.js";
import Elements from "./Elements.js";
import { isIterable } from "../Utilities.js";

const { isHTMLElement, updateElement } = Elements;

export default class TransitionObserver extends StateObserver {
    observe(element, properties, maxTolerableTime) {
        const { propertyNameList } = Object(properties);
        const hasValidArguments = () => {
            if (!isHTMLElement(element)) return false;
            if (!isIterable(propertyNameList) || typeof propertyNameList === "string") return false;
            return true;
        };
        const event = "transitionend";
        let handler;
        maxTolerableTime = !Number.isFinite(maxTolerableTime)
            ? super.minTime
            : maxTolerableTime > 0
            ? maxTolerableTime * 1000
            : super.minTime;
        const promise = new Promise((resolve, reject) => {
            if (!hasValidArguments()) return reject("invalid arguments");
            let propertyNameListCopy = [...Array.from(propertyNameList)];
            handler = (e) => {
                const propertyName = e.propertyName;
                propertyNameListCopy = propertyNameListCopy.filter((item) => item !== propertyName);
                if (!propertyNameListCopy.length) resolve({ element, properties });
            };
            updateElement(element, { events: { itemsToAdd: [{ event, handler }] } });
            setTimeout(() => reject("maxTolerableTime reached"), maxTolerableTime);
        });

        return promise.finally(() => updateElement(element, { events: { itemsToRemove: [{ event, handler }] } }));
    }
}
