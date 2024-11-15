# Game _class_

## Responsabilidad

Manejar el juego

## Interfaz

### Eventos

-   **moveEvent**: activado cuando el jugador hace un movimiento. Es una instancia de [CustomEvent](../customEvent.md)

    ```
    data:{eventName:string, type: string, targetCell: object, player: object}
    ```

    -   _type_ puede ser `valid` o `invalid`
    -   _targetCell_ es un objeto que representa la celda donde se intento aplicar el movimiento
    -   _player_ es un objeto que representa al jugador que intento hacer el movimiento

-   **nextPlayerEvent**: activado cuando hay cambio de turno. Es una instancia de [CustomEvent](../customEvent.md)

    ```
    data:{eventName:string, currentPlayer: object}
    ```

-   **roundEndEvent**: activado cuando finaliza un round. Es una instancia de [CustomEvent](../customEvent.md)

    ```
    data:{eventName:string, currentRound: number, winnerMove: object, winnerId: string, result: string, players: object }
    ```

    -   los valores de _winnerMove_ y _result_ son explicados en [board.getStatus](./board.md#interfaz)

-   **gameEndEvent**: activado cuando finaliza el juego. Es una instancia de [CustomEvent](../customEvent.md)

    ```
    data:{ roundResult: { currentRound: number, winnerMove: object, winnerId: string, result: string, players: object }, gameResult: { totalWins: {playerN: number, ...}, totalDraws: number, result: string, winnerId: string, players: object } }
    ```
    -   los valores de _winnerMove_ y _result_ son explicados en [board.getStatus](./board.md#interfaz)

### Métodos

-   **reset** _fn_: [actions.reset](./actions.md#interfaz)
-   **responseEventHandler** _fn_: [actions.responseEventHandler](./actions.md#interfaz)
-   **getNamePattern** _fn_: [players.getNamePattern](./players.md#interfaz)
-   **init** _fn_: [actions.init](./actions.md#interfaz)
-   **navigationEventHandler** _fn_: [actions.navigationEventHandler](./actions.md#interfaz)
-   **interactionEventHandler** _fn_: [actions.interactionEventHandler](./actions.md#interfaz)
-   **sessionEventHandler** _fn_: [actions.sessionEventHandlerr](./actions.md#interfaz)
-   **getPlayerById** _fn_: [players.getPlayerById](./players.md#interfaz)
-   **getType** _fn_: [type.getType](./type.md#interfaz)
-   **getTotalRounds** _fn_ [rounds.getTotalRounds](./rounds.md#interfaz)

## Implementación

-   **[actions](./actions.md)** _module_
-   **[players](./players.md)** _module_
-   **[AI](./AI.md)** _module_
-   **[board](./board.md)** _module_
-   **[results](./results.md)** _module_
-   **[rounds](./rounds.md)** _module_
-   **[turns](./turns.md)** _module_
-   **[type](./type.md)** _module_
-   **[difficulty](./difficulty.md)** _module_
