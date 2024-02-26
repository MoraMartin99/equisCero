# Actions _module_

## Responsabilidad

Responsable de ejecutar las acciones en el modelo. Una **acción** es una función que:

-   depende de la funcionalidad de uno o varios módulos para cumplir un propósito especializado
-   es un manejador de eventos

## Interfaz

-   **reset** _fn_: Responsable de reiniciar los módulos de [game](./game.md) necesarios para iniciar una nueva partida. Invoca [players.reset()](./players.md#interfaz), [AI.disconnect](./AI.md#interfaz), [board.reset](./board.md#interfaz), [results.reset](./results.md#interfaz), [rounds.reset](./rounds.md#interfaz), [turns.reset](./turns.md#interfaz), [type.reset](./type.md#interfaz) y [difficulty.reset](./difficulty.md#interfaz).
-   **restart** _fn_: Responsable de reiniciar los módulos de [game](./game.md) necesarios para reiniciar una partida en curso. Invoca [rounds.resetCurrentRound](./rounds.md#interfaz), [results.reset](./results.md#interfaz) y luego llama _initRound_.
-   **initRound** _fn_: responsable de reiniciar el board con [board.reset](./board.md#interfaz), reiniciar los turnos con [turns.reset](./turns.md#interfaz) e invocar _nextPlayerEmitter_.
-   **nextRound** _fn_: Invoca `rounds.next()` y luego _initRound_
-   **tryToDropToken** (_cellId: string_) _fn_: Responsable de intentar colocar el _token_ del `currentPlayer = player.getPlayerById(turns.getCurrentPlayerId())` en la _cell_ indicada bajos las siguientes condiciones:

    -   si `board.isEmpty(cellId) === true` entonces invocar `board.setCell(cellId, currentPlayer.token)` y emitir [moveEvent](./game.md#eventos) de tipo _valid_
    -   si `board.isEmpty(cellId) === false` entonces emitir [moveEvent](./game.md#eventos) de tipo _invalid_

-   **nextPlayerEmitter** _fn_: Responsable de invocar [turns.nextTurn()](./turns.md#interfaz) y luego emitir [nextPlayerEvent](./game.md)
-   **roundEndEmitter** _fn_: Responsable de invocar [results.setRecord(currentRound, resultType, winnerId)](./results.md) y luego emitir [roundEndEvent](./game.md#eventos)
-   **gameEndEmitter** _fn_: Responsable de invocar [results.setRecord(currentRound, resultType, winnerId)](./results.md) y luego emitir [gameEndEvent](./game.md#eventos)
-   **moveEventHandler** _fn_: handler de [moveEvent](./game.md#eventos) para los siguientes casos:
    -   si `status.result = "noResult"` entonces se invoca _nextPlayerEmitter_
    -   si `status.result = "win" o "draw"` & [rounds.getCurrentRound()](./rounds.md#interfaz) < [rounds.getTotalRounds()](./rounds.md#interfaz) entonces se invoca _roundEndEmitter_
    -   si `status.result = "win" o "draw"` & [rounds.getCurrentRound()](./rounds.md#interfaz) === [rounds.getTotalRounds()](./rounds.md#interfaz) entonces se invoca _gameEndEmitter_
-   **navigationEventHandler** _fn_: handler de [navigationEvent](../display/display.md#eventos) para los siguientes casos:
    -   si `data.type === "next" & data.status === "end" & data.targetScreen.screen = #gameScreen` entonces:
        -   si `type.getType() ==== "PVSCPU"` entonces se inicializa [AI.init()]
        -   se invoca _initRound_
-   **interactionEventHandler** _fn_: handler de [interactionEvent](../display/display.md#eventos) para los siguientes casos:
    -   si `data.type === "dropToken"` entonces se invoca _tryToDropToken_
    -   si `data.type === "nextRound"` entonces se invoca _nextRound_
    -   si `data.type === "restartRound"` entonces se invoca _initRound_
    -   si `data.type === "restartGame"` entonces se invoca _restart_
    -   si `data.type === "goHome"` entonces se invoca _reset_
-   **sessionEventHandler** _fn_: handler de [sessionEvent](../display/display.md#eventos) para los siguientes casos:
    -   si `data.field === "type"` entonces se invoca [type.setType](./type.md#interfaz)
    -   si `data.field === "totalRounds"` entonces se invoca [rounds.getTotalRounds](./rounds.md#interfaz)
    -   si `data.field === "difficultyLevel"` entonces se invoca [difficulty.setLevel](./difficulty.md#interfaz)
    -   si `data.field === "player"` entonces se invoca [players.setPlayer](./players.md#interfaz)
-   **updatePlayerAvatarURL** _fn_: responsable de agregar las urls de los avatares a los jugadores. handler de [responseEvent](../avatarProvider.md#eventos)

## Implementación
