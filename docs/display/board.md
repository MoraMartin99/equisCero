# board _module_

## Responsabilidad

Representar el _board_

## Constructor

```
board(boardElement: HTMLElement)
```

## Interfaz

-   **init**: inicializa el board:

    -   `boardElement.addEventListener("click", selectCell)`

-   **enableCellSelection** _fn_: activa en el _board_ la capacidad de registrar y emitir un [interactionEvent](./display.md#eventos) de tipo `selectCell`:

    -   Invoca _playingState_.apply(boardElement, 0)

-   **disableCellSelection** _fn_: desactiva en el _board_ la capacidad de registrar y emitir un [interactionEvent](./display.md#eventos) de tipo `selectCell`:

    ```
    playingState.remove(boardElement)
    ```

-   **resetBgColor** _fn_: regresa el _background-color_ del _board_ a sus estado inicial:

    -   Invoca `elements.updateElement(boardElement, {classes: {removeList: [...drawResultState.getProperty("classList"), "player1", "player2"]}})`

-   **reset**: regresa el _board_ a su estado inicial:

    -   Invoca _disableCellSelection_
    -   Invoca _resetBgColor_
    -   Invoca para cada _cell_ dentro de _cellList_:
        -   Invoca `resetCellState(cell)`
        -   Invoca [elements.removeElementList](./elements.md#interfaz)(Array.from(cell.querySelector(".token")))

-   **setInvalidCell** (_cellId: string_) _fn_: configura una celda como invalida:

    -   `cell = cellList.find((item) => {item.id === cellId})`
    -   Invoca `resetCellState(cell)`
    -   Invoca `invalidMoveState.apply(cell, 0)`
    -   Invoca `vanishState.apply(cell).finally(() => {resetCellState(cell)})`

-   **dropToken** (_cellId: string, token: string, playerId: string_) _fn_: Inserta en _cell_ el _token_ correspondiente:

    -   `cell = getCell(cellId)`
    -   `tokenElement =  elements.appendElement(createTokenElement({token, playerId}), cell)`
    -   Invoca [stateQueue.add](./stateQueue.md#interfaz)([ {state: smoothPopOutState, target: tokenElement}])

-   **animateResult** (_winnerMove: object, winnerId: string, result: string_) _async fn_: anima el _board_ según el resultado proporcionado:

    -   `cellList.forEach((item) => {resetCellState(item)})`

    -   Si `result === "draw"` entonces:

        -   Invoca _resetBgColor_
        -   `stateQueue.add([ {state:drawResultState, target: boardElement} ])`

    -   Si `result === "win"` entonces:

        ```
        const cellState = winnerId === "player1"? player1CellState : player2CellState

        const sortedCellList = Object.values(winnerMove)
        .sort((a,b) => {a.id.localeCompare(b.id)})
        .map((item) => {boardElement.querySelector(`#${item.id}`)})

        sortedCellList.forEach((cell) => {stateQueue.add([ {state: cellState, target: cell} ])})
        ```

-   **getBoard** _fn_: regresa _boardElement_

## Implementación

-   **boardElement** _HTMLElement_: elemento del **dom** que representa el _board_

-   **cellList** _array_: `Array.from(boardElement.querySelectorAll(".cell"))`

-   **resetCellState** (_cell: HTMLElement_) _fn_: Elimina de _cell_ _invalidMoveState_, _vanishState_, _player1CellState_ y _player2CellState_

        ```
        [invalidMoveState, vanishState, player1CellState, player2CellState].forEach((state) => {state.remove(cell)})
        ```

-   **selectCell** (_e: event_): _click handler del board_. Obtiene el _.cell_ mas cercano utilizando _node.closest_, verifica si _board_ tiene la clase _playing_ y emite un [interactionEvent](./display.md) de `type = "selectCell"`

-   **playingState** _object_: estado que se aplica al _board_ cuando se desea registrar y emitir [interactionEvent](../display.md#eventos) de tipo `selectCell`:

    ```
    new State(["playing"])
    ```

-   **invalidMoveState** _object_: Estado aplicado a una celda cuando hay un movimiento invalido:

    ```
    new State(["invalidMove"])
    ```

-   **vanishState** _object_: Transición aplicada a una celda invalida para desvanecer el efecto de _invalidMove_:

    ```
    new TransitionState(["vanish"], ["opacity", "opacity", "transform"])
    ```

-   **smoothPopOutState** _object_: Transición que se aplica cuando se insertan los tokens:

    ```
    new TransitionState(["smoothPopOut"], ["opacity", "transform"])
    ```

-   **drawResultState** _object_: Transición que se aplica al _board_ cuando hay un empate:

    ```
    new TransitionState(["draw"], ["background-color"])
    ```

-   **player1CellState** _object_: Transición que se aplica a la _cell_ cuando forma parte de _winnerMove_ y _winnerId_ es _player1_

    ```
    new TransitionState(["player1"], ["background-color"])
    ```

-   **player2CellState** _object_: Transición que se aplica a la _cell_ cuando forma parte de _winnerMove_ y _winnerId_ es _player2_

    ```
    new TransitionState(["player2"], ["background-color"])
    ```

-   **createTokenElement** (_settings: {token: string, playerId: string}_) _fn_: Retorna el _tokenElement_ asociado a _token_, si no existe regresa `undefined`:

        ```
        baseClassList = ["token", playerId]

        baseAttributeList = [{name: "fill", value: "none"}, {name: "xmlns", value: "http://www.w3.org/2000/svg"}, {name: "style", value: "-webkit-print-color-adjust: exact"}]

        content1 = "<g style="fill: #000">
                                            <path
                                                d="m5385.676 471.119 16.499-16.499 4.714 4.714-16.499 16.499 16.499 16.499-4.714 4.714-16.499-16.499-16.5 16.499-4.714-4.714 16.5-16.499-16.5-16.499 4.714-4.714 16.5 16.499Z"
                                                class="fills"
                                            />
                                        </g>"

        content2 = "<g style="fill: #000">

    <path
                                                d="M5293.003 509.164c-18.409 0-33.333-14.924-33.333-33.333 0-18.41 14.924-33.334 33.333-33.334 18.41 0 33.334 14.924 33.334 33.334 0 18.409-14.924 33.333-33.334 33.333Zm0-6.667c14.728 0 26.667-11.939 26.667-26.666 0-14.728-11.939-26.667-26.667-26.667-14.727 0-26.666 11.939-26.666 26.667 0 14.727 11.939 26.666 26.666 26.666Z"
                                                class="fills"
                                            />
    </g>"

        tokenSettings: {x: {classList: [...baseClassList, "player1"], attributeList: [...baseAttributeList, {name: "viewBox", value: "5345.673 435.831 80 80"}], content: content1}, 0: {classList: [...baseClassList, "player2"], attributeList: [...baseAttributeList, {name: "viewBox", value: "5253.003 435.831 80 80"}], content: content2}}

        if(Boolean(tokenSettings[playerId])) return

        return elements.updateElement(document.createElement("svg"), {classes: {tokenSettings[playerId].classList}, attributes: {addList: tokenSettings[playerId].attributeList}, content: tokenSettings[playerId].content})
        ```
