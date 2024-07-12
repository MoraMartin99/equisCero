import { isIterable } from "../Utilities.js";

export default class Elements {
    static updateElement(element, changes) {
        if (!Elements.isHTMLElement(element)) return;
        const { HTMLId, events, classes, attributes, content, styles } = changes;

        if (events) Elements.#setEvents(element, events);
        if (typeof HTMLId === "string" && HTMLId) element.id = HTMLId;
        if (classes) Elements.#setClasses(element, classes);
        if (attributes) Elements.#setAttributes(element, attributes);
        if (typeof content === "string" && content) element.innerHTML = content;
        if (styles) Elements.#setStyles(element, styles);
    }
    static removeElementList(list) {
        list = isIterable(list) ? Array.from(list) : [];
        list.forEach((item) => {
            if (Elements.isHTMLElement(item)) item.remove();
        });
    }
    static appendElement(targetElement, parentElement, order) {
        if ([targetElement, parentElement].some((item) => !Elements.isHTMLElement(item))) return;
        order = Number.isInteger(order) ? order : -1;
        const referenceElement = parentElement.children.item(order);
        parentElement.insertBefore(targetElement, referenceElement);
    }

    static isHTMLElement(element) {
        return element instanceof Element;
    }

    static #isDescendantOf(targetElement, ancestorElement) {
        if ([targetElement, ancestorElement].some((item) => !Elements.isHTMLElement(item))) return false;
        return ancestorElement.contains(targetElement);
    }

    static #setEvents(element, settings) {
        const { itemsToAdd, itemsToRemove } = Object(settings);
        const eventSetter = (element, eventList, callback) => {
            eventList = isIterable(eventList) ? Array.from(eventList) : [];
            eventList.forEach((item) => {
                const { event, handler } = Object(item);
                callback(element, event, handler);
            });
        };
        eventSetter(element, itemsToAdd, (element, event, handler) => element.addEventListener(event, handler));
        eventSetter(element, itemsToRemove, (element, event, handler) => element.removeEventListener(event, handler));
    }

    static #setClasses(element, settings) {
        const { itemsToAdd, itemsToRemove } = Object(settings);
        const classSetter = (element, classList, callback) => {
            classList = isIterable(classList) ? Array.from(classList) : [];
            classList.forEach((currentClass) => callback(element, currentClass));
        };
        classSetter(element, itemsToAdd, (element, currentClass) => element.classList.add(currentClass));
        classSetter(element, itemsToRemove, (element, currentClass) => element.classList.remove(currentClass));
    }

    static #setAttributes(element, settings) {
        const { itemsToAdd, itemsToRemove } = Object(settings);
        const attributeSetter = (element, attributeList, callback) => {
            attributeList = isIterable(attributeList) ? Array.from(attributeList) : [];
            attributeList.forEach((item) => callback(element, Object(item)));
        };
        attributeSetter(element, itemsToAdd, (element, { name, value }) => {
            value = value === undefined ? "" : value;
            element.setAttribute(name, value);
        });
        attributeSetter(element, itemsToRemove, (element, item) => element.removeAttribute(String(item)));
    }

    static #setStyles(element, settings) {
        const { itemsToAdd, itemsToRemove } = Object(settings);
        const styleSetter = (element, styleList, callback) => {
            styleList = isIterable(styleList) ? Array.from(styleList) : [];
            styleList.forEach((item) => callback(element, Object(item)));
        };
        styleSetter(element, itemsToAdd, (element, { propertyName, value }) => element.style.setProperty(propertyName, value));
        styleSetter(element, itemsToRemove, (element, item) => element.style.removeProperty(String(item)));
    }
}
