# Game _class_

## Responsabilidad

Manejar el juego

## Interfaz

### Eventos

-   **moveEvent**: activado cuando el jugador hace un movimiento

```
data:{eventName:string, type: string, targetCell: {value, id}, status: {winnerMove: object, winnerToken: string, result: string}, currentPlayerId: string}

- type puede ser valid o invalid
```

```
    si type es invalid
   data:{eventName:string, type: string, targetCell: {value, id}}

   si type es valid
   data:{eventName:string, type: string, targetCell: {value, id}, status: {currentRound: string, totalRounds: string, winnerMove: object, winnerId: string, resultType: string, stage: string }, results:{roundN:{round: string, resultType: string, winnerId: string},total:{player1TotalWins: string, player2TotalWins: string, totalDraws: string, resultType:string, winnerId: string}}}

   Nota: status debería ser un reporte de board module

    donde type puede ser:
    - valid
    - invalid

   donde winnerId puede ser:
   - player1
   - player2
   - null

   donde resultType puede ser:
   - null
   - win
   - draw

   donde stage puede ser:
   - playing
   - roundEnd
   - gameEnd
```

-   **nextPlayerEvent**: activado cuando hay cambio de turno

```
data:{eventName:string, currentPlayerId: string, nextPlayerId: string}
```

-   **roundEndEvent**: activado cuando finaliza un round

```
data:{eventName:string, status: {currentRound: string, totalRounds: string, winnerMove: object, winnerId: string, resultType: string, stage: string }}
```

-   **gameEndEvent**: activado cuando finaliza el juego

### Métodos

-   **[actions.reset](./actions.md#interfaz)** _fn_
-   **[actions.updatePlayerAvatarURL](./actions.md#interfaz)** _fn_
-   **[players.getNamePattern](./players.md#interfaz)** _fn_
-   **[players.getNamePattern](./players.md#interfaz)** _fn_

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
