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

    -   Invoca [states.setStateList](./states.md#interfaz)([{stateId: "playing", target: boardElement}], false)

-   **disableCellSelection** _fn_: desactiva en el _board_ la capacidad de registrar y emitir un [interactionEvent](./display.md#eventos) de tipo `selectCell`:

    -   Invoca [states.removeState](./states.md#interfaz)("playing", boardElement)

-   **resetBgColor** _fn_: regresa el _background-color_ del _board_ a sus estado inicial:

    -   Invoca para cada _item_ de `["drawResult", "player1Turn", "player2Turn"]` [states.removeState](./states.md#interfaz)(item, boardElement)

-   **reset**: regresa el _board_ a su estado inicial:

    -   Invoca _disableCellSelection_
    -   Invoca _resetBgColor_
    -   Invoca para cada _cell_ de `[cell1, ...]`:
        -   Invoca [states.removeState](./states.md#interfaz)("invalidMove", cell)
        -   Invoca [elements.removeElementList](./elements.md#interfaz)(Array.from(cell.querySelector(".token")))

-   **setInvalidCell** (_cell: HTMLElement_) _fn_: configura una celda como invalida:

    -   elimina las clases residuales _"invalidMove", "vanish"_ usando [states.removeState(statId, cell)](./states.md#interfaz)
    -   invoca [states.setStateList](./states.md#interfaz)([{stateId: "invalidMove", target: cell}, {stateId: "vanish", target: cell}], false)
    -   le añade un `.finally` a la promesa anterior para eliminar las clases residuales _"invalidMove", "vanish"_

-   **dropToken** (_cell: HTMLElement, token: string_) _fn_: Inserta en _cell_ el _token_ correspondiente:

    -   **getTokenId** (_token: string_) _fn_: retorna _token1_ si `token === "x"`, _token2_ si `token === "0"` o `undefined` si no se cumple lo anterior
    -   Invoca _tokenElement_ = [elements.loadElement](./elements.md#interfaz)({getTokenId(token), cell})
    -   Invoca [states.setStateList](./states.md#interfaz)([{stateId: "smoothPopOut", target: tokenElement}])

-   **animateResult** (_winnerMove: object, winnerId: string, result: string_) _async fn_: anima el _board_ según el resultado proporcionado:

    -   Elimina las clases residuales _"invalidMove", "vanish"_ usando [states.removeState(statId, cell)](./states.md#interfaz) de todas las _.cell_
    -   Invoca _resetBgColor_
    -   Si `result === "draw"` entonces se invoca y retorna [states.setStateList](./states.md#interfaz)([{stateId: "drawResult", target: document.querySelector("#board")}])
    -   Si `result === "win"` entonces para cada _cell_ dentro de _winnerMove_ (ordenado en orden alfabético) se invocara [states.setStateList](./states.md#interfaz)([{stateId: "player1Cell" o "player2Cell", target: cell}]) y se retornara la ultima promesa asociada a _.cell_

-   **getBoard** _fn_: regresa _boardElement_

## Implementación

-   **boardElement** _HTMLElement_: elemento del **dom** que representa el _board_
-   **selectCell** (_e: event_): _click handler del board_. Obtiene el _.cell_ mas cercano utilizando _node.closest_, verifica si _board_ tiene la clase _playing_ y emite un [interactionEvent](./display.md) de `type = "selectCell"`
