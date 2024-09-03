const createRoundIndicatorElement = (round) => {
    const element = document.createElement("div");
    const classList = ["roundIndicator"];
    const id = `round${round}Indicator`;
    const attrName = "data-round";

    element.id = id;
    classList.forEach((item) => element.classList.add(item));
    element.setAttribute(attrName, round);

    return element;
};

export default createRoundIndicatorElement;
