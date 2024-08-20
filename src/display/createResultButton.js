const createResultButton = (type) => {
    const element = document.createElement("button");
    const classList = ["resultButton"];
    const attributeList = [{ name: "type", value: "button" }];
    let iconElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const iconAttributeList = [
        { name: "fill", value: "none" },
        { name: "style", value: "-webkit-print-color-adjust: exact" },
    ];
    const iconClassList = ["resultButtonIcon"];
    let iconInnerHTML = "";

    if (type === "nextRound") {
        classList.push("nextRoundButton");
        attributeList.push({ name: "value", value: "nextRound" });
        iconAttributeList.push({ name: "viewBox", value: "6803 654 30 30" });
        iconInnerHTML = `<g style="fill: #000">
                                                <path
                                                    d="m6819.464 669.001-6.187-6.187 1.768-1.768 7.955 7.955-7.955 7.955-1.768-1.768 6.187-6.187Z"
                                                    class="fills"
                                                />
                                            </g>`;
    } else if (type === "restartGame") {
        classList.push("restartGameButton");
        attributeList.push({ name: "value", value: "restartGame" });
        iconAttributeList.push({ name: "viewBox", value: "7498.5 654 30 30" });
        iconInnerHTML = `<g style="fill: #000">
                                                <path
                                                    d="M7505.328 659.541a12.45 12.45 0 0 1 8.172-3.041c6.904 0 12.5 5.596 12.5 12.5 0 2.67-.837 5.145-2.264 7.176L7519.75 669h3.75c0-5.523-4.477-10-10-10a9.964 9.964 0 0 0-6.925 2.786l-1.247-2.245Zm16.344 18.918a12.452 12.452 0 0 1-8.172 3.041c-6.904 0-12.5-5.597-12.5-12.5 0-2.67.837-5.145 2.264-7.176l3.986 7.176h-3.75c0 5.523 4.477 10 10 10a9.967 9.967 0 0 0 6.925-2.785l1.247 2.244Z"
                                                    class="fills"
                                                />
                                            </g>`;
    } else if (type === "goHome") {
        classList.push("goHomeButton");
        attributeList.push({ name: "value", value: "goHome" });
        iconAttributeList.push({ name: "viewBox", value: "7583.5 654 30 30" });
        iconInnerHTML = `<g style="fill: #000">
                                                <path
                                                    d="M7608.5 679c0 .691-.56 1.25-1.25 1.25h-17.5a1.25 1.25 0 0 1-1.25-1.25v-11.25h-3.75l12.909-11.735a1.25 1.25 0 0 1 1.682 0l12.909 11.735h-3.75V679Zm-10-6.25a3.125 3.125 0 1 0 0-6.25 3.125 3.125 0 0 0 0 6.25Z"
                                                    class="fills"
                                                />
                                            </g>`;
    }

    classList.forEach((item) => element.classList.add(item));
    attributeList.forEach(({ name, value }) => element.setAttribute(name, value));
    iconClassList.forEach((item) => iconElement.classList.add(item));
    iconAttributeList.forEach(({ name, value }) => iconElement.setAttribute(name, value));
    iconElement.innerHTML = iconInnerHTML;
    element.appendChild(iconElement);
    return element;
};

export default createResultButton;
