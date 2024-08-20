const createMessageElement = (type, settings) => {
    const element = document.createElement("p");
    const highlightString = (string) => `<span id="messageAccent">${string}</span>`;
    const id = "resultMessage";
    let innerHTML = "";

    if (type === "roundWin") {
        const { playerName, round } = Object(settings);
        innerHTML = `¡${highlightString(playerName)} gana round ${round}!`;
    } else if (type === "gameWin") {
        const { playerName } = Object(settings);
        innerHTML = `¡${highlightString(playerName)} es el ganador!`;
    } else if (type === "draw") {
        innerHTML = `¡Es un ${highlightString("empate")}!`;
    }

    element.id = id;
    element.innerHTML = innerHTML;
    return element;
};

export default createMessageElement;
