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

-   **setInvalidCell** (_cell: HTMLElement_) _fn_: configura una celda como invalida:

    -   Invoca `resetCellState(cell)`
    -   Invoca `invalidMoveState.apply(cell, 0)`
    -   Invoca `vanishState.apply(cell).finally(() => {resetCellState(cell)})`

-   **dropToken** (_cell: HTMLElement, token: string_) _fn_: Inserta en _cell_ el _token_ correspondiente:

    -   **getTokenId** (_token: string_) _fn_: retorna _token1_ si `token === "x"`, _token2_ si `token === "0"` o `undefined` si no se cumple lo anterior
    -   Invoca _tokenElement_ = [elements.loadElement](./elements.md#interfaz)({getTokenId(token), cell})
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
        .sort((a,b) => {a.cellId.localeCompare(b.cellId)})
        .map((item) => {boardElement.querySelector(`#${item.cellId}`)})

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
