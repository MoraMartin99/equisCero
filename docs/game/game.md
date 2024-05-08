# Game _class_

## Responsabilidad

Manejar el juego

## Interfaz

### Eventos

-   **moveEvent**: activado cuando el jugador hace un movimiento. Es una instancia de [CustomEvent](../customEvent.md)

    ```
    data:{eventName:string, type: string, targetCell: {value: string, id: string}}
    ```

    -   _targetCell.value_ puede ser _undefined_ o `player.token`
    -   _targetCell.value_ es `cell.id` quien a su vez representa el _id_ de _HTMLElement_
    -   type puede ser _valid_ o _invalid_

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
    data:{eventName:string, currentRound: number, winnerMove: object, player1TotalWins: number, player2TotalWins: number, totalDraws: number, result: string, winnerId: string, players: object }
    ```

    -   los valores de _winnerMove_ y _result_ son explicados en [board.getStatus](./board.md#interfaz)

### Métodos

-   **reset** _fn_: [actions.reset](./actions.md#interfaz)
-   **updatePlayerAvatarUR** _fn_: [actions.updatePlayerAvatarURL](./actions.md#interfaz)
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
