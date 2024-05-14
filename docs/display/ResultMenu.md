# ResultMenu _class_

## Responsabilidad

Representar un _resultMenu_. **Extiende [OverlayMenu](./OverlayMenu.md)**

## Constructor

```
ResultMenu(element: HTMLElement)
```

## Interfaz

-   **setMenu** (_{eventName:string, currentRound: number, winnerId: string, result: string, players: object}_) _fn_: configura _element_:

    -   Invoca _reset_
    -   Invoca _setMenuClasses_.(eventName, winnerId, result)
    -   Invoca _loadAvatars_ (winnerId, result, players)
    -   Invoca _loadMessage_.({currentRound, winnerId, result, players})
    -   Invoca _loadButtons_.(eventName)

## Implementación

-   **winnerAvatarContainer** _HTMLelement_: `element.querySelector("#winnerAvatarContainer")`

-   **resultMessageContainer** _HTMLelement_: `element.querySelector("#resultMessageContainer")`

-   **resultButtonContainer** _HTMLelement_: `element.querySelector("> .resultButtonContainer")`

-   **resultButtonList** _array_: Lista que contiene todos los _resultButton_

-   **reset** _fn_: regresa _element_ a sus estado inicial:

    ```
    [player1ResultState, player2ResultState, drawResultState, gameResultState].forEach((state) => {state.remove(element)})

    [winnerAvatarContainer, resultMessageContainer, resultButtonContainer].forEach((item) => {
        elements.removeElementList(Array.from(item.querySelectorAll("> *")))
    })

    resultButtonList = []
    ```

-   **setMenuClasses** (_eventName: string, winnerId: string, result: string_) _fn_: configura las classes de _element_

    -   Si `winnerId === "player1"` entonces `player1ResultState.apply(element)`
    -   Si `winnerId === "player2"` entonces `player2ResultState.apply(element)`
    -   Si `result === "draw"` entonces `drawResultState.apply(element)`
    -   Si `eventName === "gameEndEvent"` entonces `gameResultState.apply(element)`

-   **createAvatarImgElement** (_src: string, classList: array_) _fn_: Retorna _avatarImage_:

    ```
    classList = [...Array.of(classList).flat(), "skeleton",  "winnerAvatar"]
    attributeList = [{name: "src", value: src}, {name: "alt", value: "avatar"}]
    return elements.updateElement(document.createElement("img"), { classes: {addList: classList}, attributes: {addList: attributeList} })
    ```

-   **createMaskContainerElement** (_settings: {leftImg: { src: string, classList: array }, rightImg: { src: string, classList: array }}_) _fn_: Retorna _maskContainerElement_:

    ```
    leftImg.classList = [...Array.of(classList).flat(), "left"]
    rightImg.classList = [...Array.of(classList).flat(), "right"]
    maskContainerElement = elements.updateElement(document.createElement("div"), {HTMLId: "maskContainer"})
    [leftImg, rightImg].forEach(({src, classList}) => {
        elements.appendElement(createAvatarImgElement(src, classList), maskContainerElement)
    })
    return maskContainerElement
    ```

-   **loadAvatars** (_winnerId: string, result: string, players: object_) _fn_: carga y configura _avatares_

    -   Si `result === "win"` entonces:

        -   `elements.appendElement(createAvatarImgElement(players[winnerId].avatarSource, winnerId), winnerAvatarContainer)`

    -   Si `result === "draw"` entonces:

        -   `settingArr = Object.values(players).map(({id, getAvatarURL}) => {return {src: getAvatarURL(), classList: [id]}})`
        -   `elements.appendElement(createMaskContainerElement({leftImg: settingArr[0], rightImg: settingArr[1]}), winnerAvatarContainer)`

-   **getAccentMessage** (_string: string_) _fn_: Retorna _string_ formateada para ser utilizada dentro del _innerHTML_ de _resultMessageElement_ como un _messageAccent_:

    ```
    return "<span id="messageAccent">${string}</span>"
    ```

-   **createResultMessageElement** (_content: string_) _fn_: Retorna _resultMessageElement_ genérico:

    ```
    HTMLId = "resultMessage"
    return elements.updateElement(document.createElement("p"), {HTMLId, content})
    ```

-   **createDrawResultMessageElement** _fn_: Retorna _resultMessageElement_ correspondiente a un empate:

    ```
    content = "¡Es un ${getAccentMessage("Empate")}!"
    createResultMessageElement(content)
    ```

-   **createWinResultMessageElement** (_playerName: string, round: number_) _fn_: Retorna _resultMessageElement_ correspondiente a una victoria:

    ```
    if(!Boolean(typeof playerName === "string")) return createResultMessageElement("")
    if(Number.isInteger(round)) return createResultMessageElement("¡${playerName} gana Round ${round}!")
    return createResultMessageElement("¡${playerName} es el ganador!")
    ```

-   **loadMessage** (_{currentRound: number, winnerId: string, result: string, players: object}_) _fn_: carga y configura _resultMessage_:

    -   Si `result === "win" & eventName === "roundEndEvent"` entonces `resultMessageElement = createWinResultMessageElement(players[winnerId].name, currentRound)`
    -   Si `result === "win" & eventName === "gameEndEvent"` entonces `resultMessageElement = createWinResultMessageElement(players[winnerId].name)`
    -   Si `result === "draw"` entonces `resultMessageElement = createDrawResultMessageElement()`
    -   `elements.appendElement(resultMessageElement, resultMessageContainer)`

-   **createResultButtonElement** _(classList: array, value: string, content: string) fn_: Retorna un _resultButton_ genérico:

    ```
    classList = [...Array.of(classList).flat(), "resultButton"]
    attributeList = [{name: "value", value}, {name: "type", value: "button"}]
    return elements.updateElement(document.createElement("button"), { classes: {addList: classList}, attributes: {addList: attributeList}, content })
    ```

-   **createNextRoundButtonElement** _fn_: Retorna _nextRoundButtonElement_:

    ```
    classList = ["nextRoundButton"]
    value = "nextRound"
    content = "<svg
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style="-webkit-print-color-adjust: exact"
                    viewBox="6803 654 30 30"
                    class="resultButtonIcon"
                >
                    <g style="fill: #000">
                        <path
                            d="m6819.464 669.001-6.187-6.187 1.768-1.768 7.955 7.955-7.955 7.955-1.768-1.768 6.187-6.187Z"
                            class="fills"
                        />
                    </g>
                </svg>"
    return createResultButtonElement(classList, value, content)
    ```

-   **createRestartGameButtonElement** _fn_: Retorna _restartGameButtonElement_:

    ```
    classList = ["restartGameButton"]
    value = "restartGame"
    content = "<svg
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style="-webkit-print-color-adjust: exact"
                    viewBox="7498.5 654 30 30"
                    class="resultButtonIcon"
                >
                    <g style="fill: #000">
                        <path
                            d="M7505.328 659.541a12.45 12.45 0 0 1 8.172-3.041c6.904 0 12.5 5.596 12.5 12.5 0 2.67-.837 5.145-2.264 7.176L7519.75 669h3.75c0-5.523-4.477-10-10-10a9.964 9.964 0 0 0-6.925 2.786l-1.247-2.245Zm16.344 18.918a12.452 12.452 0 0 1-8.172 3.041c-6.904 0-12.5-5.597-12.5-12.5 0-2.67.837-5.145 2.264-7.176l3.986 7.176h-3.75c0 5.523 4.477 10 10 10a9.967 9.967 0 0 0 6.925-2.785l1.247 2.244Z"
                            class="fills"
                        />
                    </g>
                </svg>"
    return createResultButtonElement(classList, value, content)
    ```

-   **createGoHomeButtonElement** _fn_: Retorna _goHomeButtonElement_:

    ```
    classList = ["goHomeButton"]
    value = "goHome"
    content = "<svg
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style="-webkit-print-color-adjust: exact"
                    viewBox="7583.5 654 30 30"
                    class="resultButtonIcon"
                >
                    <g style="fill: #000">
                        <path
                            d="M7608.5 679c0 .691-.56 1.25-1.25 1.25h-17.5a1.25 1.25 0 0 1-1.25-1.25v-11.25h-3.75l12.909-11.735a1.25 1.25 0 0 1 1.682 0l12.909 11.735h-3.75V679Zm-10-6.25a3.125 3.125 0 1 0 0-6.25 3.125 3.125 0 0 0 0 6.25Z"
                            class="fills"
                        />
                    </g>
                </svg>"
    return createResultButtonElement(classList, value, content)
    ```

-   **loadButtons** (_eventName: string_) _fn_:carga y configura los _resultButton_:

    -   Si `eventName === "roundEndEvent"` entonces `buttonList = [createNextRoundButtonElement()]`
    -   Si `eventName === "gameEndEvent"` entonces `buttonList = [createRestartGameButtonElement(), createGoHomeButtonElement()]`
    -   `buttonList.forEach((item) => {elements.appendElement(item, resultButtonContainer)})`

-   **eventTypeList** _array_: `["restartGame", "goHome", "nextRound"]`

-   **clickHandler** (_e: event_): handler para los _click events_:

    -   Si `resultButtonList.some((item) => {item.contains(e.target)}) === true` entonces:
        -   `value === e.target.closest(".resultButton").value`
        -   Si `eventTypeList.includes(value) === true` entonces:
            -   `event.trigger({eventName: "interactionEvent", type: value})`

-   **player1ResultState** _object_: estado aplicado al _element_ cuando _player1_ ganó el round o el juego

    ```
    new State(["player1"])
    ```

-   **player2ResultState** _object_: estado aplicado al _element_ cuando _player2_ ganó el round o el juego

    ```
    new State(["player2"])
    ```

-   **drawResultState**: estado aplicado al _element_ cuando es un empate

    ```
    new State(["draw"])
    ```

-   **gameResultState**: estado aplicado al _resultMenu_ cuando ocurre un [gameEndEvent](../../game/game.md#eventos)

    ```
    new State(["gameResult"])
    ```
