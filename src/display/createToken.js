const createToken = (playerId) => {
    const element = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const classList = ["token"];
    const attributeList = [
        { name: "fill", value: "none" },
        { name: "style", value: "-webkit-print-color-adjust: exact" },
    ];
    let content;

    if (playerId === "player1") {
        classList.push("player1");
        attributeList.push({ name: "viewBox", value: "5345.673 435.831 80 80" });
        content = `<g style="fill: #000">
                                        <path
                                            d="m5385.676 471.119 16.499-16.499 4.714 4.714-16.499 16.499 16.499 16.499-4.714 4.714-16.499-16.499-16.5 16.499-4.714-4.714 16.5-16.499-16.5-16.499 4.714-4.714 16.5 16.499Z"
                                            class="fills"
                                        />
                                    </g>`;
    } else if (playerId === "player2") {
        classList.push("player2");
        attributeList.push({ name: "viewBox", value: "5253.003 435.831 80 80" });
        content = `<g style="fill: #000">
                                        <path
                                            d="M5293.003 509.164c-18.409 0-33.333-14.924-33.333-33.333 0-18.41 14.924-33.334 33.333-33.334 18.41 0 33.334 14.924 33.334 33.334 0 18.409-14.924 33.333-33.334 33.333Zm0-6.667c14.728 0 26.667-11.939 26.667-26.666 0-14.728-11.939-26.667-26.667-26.667-14.727 0-26.666 11.939-26.666 26.667 0 14.727 11.939 26.666 26.666 26.666Z"
                                            class="fills"
                                        />
                                    </g>`;
    }

    classList.forEach((item) => element.classList.add(item));
    attributeList.forEach(({ name, value }) => element.setAttribute(name, value));
    element.innerHTML = content;
    return element;
};

export default createToken;
