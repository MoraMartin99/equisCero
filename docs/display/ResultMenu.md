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
    ["player1Result", "player2Result", "drawResult", "gameResult"].forEach((item) => {states.removeState (item, element)})

    [winnerAvatarContainer, resultMessageContainer, resultButtonContainer].forEach((item) => {
        elements.removeElementList(Array.from(item.querySelectorAll("> *")))
    })

    resultButtonList = []
    ```

-   **setMenuClasses** (_eventName: string, winnerId: string, result: string_) _fn_: configura las classes de _element_

    -   Si `winnerId === "player1"` entonces [states.setStateList](./states.md#interfaz)([{stateId: "player1Result", target: element}], false)
    -   Si `winnerId === "player2"` entonces [states.setStateList](./states.md#interfaz)([{stateId: "player2Result", target: element}], false)
    -   Si `result === "draw"` entonces [states.setStateList](./states.md#interfaz)([{stateId: "drawResult", target: element}], false)
    -   Si `eventName === "gameEndEvent"` entonces [states.setStateList](./states.md#interfaz)([{stateId: "gameResult", target: element}], false)

-   **loadAvatars** (_winnerId: string, result: string, players: object_) _fn_: carga y configura _avatares_

    -   Si `result === "win"` [elements.loadElement](./elements.md#interfaz)({templateId: "winnerAvatar", parentElement: winnerAvatarContainer, settings: {src: players[winnerId].getAvatarURL()}})
    -   Si `result === "draw"` [elements.loadElement](./elements.md#interfaz)({templateId: "maskContainer", parentElement: winnerAvatarContainer, settings: {src1: players.player1.getAvatarURL(), src2: players.player2.getAvatarURL()}})

-   **loadMessage** (_{currentRound: number, winnerId: string, result: string, players: object}_) _fn_: carga y configura _resultMessage_:

    -   Si `result === "win" & eventName === "roundEndEvent"` [elements.loadElement](./elements.md#interfaz)({templateId: "resultMessage1", parentElement: resultMessageContainer, settings: {name: players[winnerId].name, round: currentRound}})
    -   Si `result === "win" & eventName === "gameEndEvent"` [elements.loadElement](./elements.md#interfaz)({templateId: "resultMessage2", parentElement: resultMessageContainer, settings: {name: players[winnerId].name}})
    -   Si `result === "draw"` [elements.loadElement](./elements.md#interfaz)({templateId: "resultMessage3", parentElement: resultMessageContainer})

-   **loadButtons** (_eventName: string_) _fn_:carga y configura los _resultButton_:

    -   Si `eventName === "roundEndEvent"` entonces [elements.loadElement](./elements.md#interfaz)({templateId: "roundEndResultButton", parentElement: resultButtonContainer})
    -   Si `eventName === "gameEndEvent"` entonces [elements.loadElement](./elements.md#interfaz)({templateId: "gameEndResultButtons", parentElement: resultButtonContainer})
    -   `resultButtonList = Array.from(element.querySelectorAll(".resultButton"))`

-   **eventTypeList** _array_: `["restartGame", "goHome", "nextRound"]`

-   **clickHandler** (_e: event_): handler para los _click events_:

    -   Si `resultButtonList.some((item) => {item.contains(e.target)}) === true` entonces:
        -   `value === e.target.closest(".resultButton").value`
        -   Si `eventTypeList.includes(value) === true` entonces:
            -   `event.trigger({eventName: "interactionEvent", type: value})`
