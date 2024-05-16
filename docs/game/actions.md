# Actions _module_

## Responsabilidad

Responsable de ejecutar las acciones en el modelo. Una **acción** es una función que:

-   depende de la funcionalidad de uno o varios módulos para cumplir un propósito especializado
-   es un manejador de eventos

## Interfaz

-   **init** _fn_: responsable de inicializar el modelo:

    -   [moveEventHandler](./game.md#eventos).subscribe(_moveEventHandler_)
    -   [board.init](./board.md)

-   **navigationEventHandler** _fn_: handler de [navigationEvent](../display/display.md#eventos) para los siguientes casos:

    -   si `data.status === "end" & data.targetScreen.id = "gameScreen"` entonces:
        -   si `type.getType() ==== "PVSCPU"` entonces se inicializa [AI.init](./AI.md#interfaz)({player: [players.getCPUPlayer()](./players.md#interfaz), difficultyLevel: [difficulty.getLevel()](./difficulty.md#interfaz), cellGroupGetter: [board.getGroups](./board.md#interfaz), triggerEvent: [nextPlayerEvent](./game.md#eventos), dropToken: [tryToDropToken](./actions.md#implementación)})
        -   se invoca _initRound_

-   **interactionEventHandler** _fn_: handler de [interactionEvent](../display/display.md#eventos) para los siguientes casos:

    -   si `data.type === "selectCell"` entonces se invoca _tryToDropToken_
    -   si `data.type === "nextRound"` entonces se invoca _nextRound_
    -   si `data.type === "restartRound"` entonces se invoca _initRound_
    -   si `data.type === "restartGame"` entonces se invoca _restart_
    -   si `data.type === "goHome"` entonces se invoca _reset_

-   **sessionEventHandler** _fn_: handler de [sessionEvent](../controller.md#eventos) para los siguientes casos:

    -   si `data.changeList.field === "type"` entonces se invoca [type.setType](./type.md#interfaz)
    -   si `data.changeList.field === "totalRounds"` entonces se invoca [rounds.getTotalRounds](./rounds.md#interfaz)
    -   si `data.changeList.field === "difficultyLevel"` entonces se invoca [difficulty.setLevel](./difficulty.md#interfaz)
    -   si `data.changeList.field === "player"` entonces se invoca [players.setPlayer](./players.md#interfaz)

-   **responseEventHandler** (_data:{eventName:string, responseType: string, resource:{url: string, id: string}}_) _fn_: handler de [responseEvent](../avatarProvider.md#eventos):

    ```
    players.setAvatarSource(resource)
    ```

## Implementación

-   **reset** _fn_: Responsable de reiniciar los módulos de [game](./game.md) necesarios para iniciar una nueva partida. Invoca [players.reset()](./players.md#interfaz), [AI.disconnect](./AI.md#interfaz), [board.reset](./board.md#interfaz), [results.reset](./results.md#interfaz), [rounds.reset](./rounds.md#interfaz), [turns.reset](./turns.md#interfaz), [type.reset](./type.md#interfaz) y [difficulty.reset](./difficulty.md#interfaz).

-   **restart** _fn_: Responsable de reiniciar los módulos de [game](./game.md) necesarios para reiniciar una partida en curso. Invoca [rounds.resetCurrentRound](./rounds.md#interfaz), [results.reset](./results.md#interfaz) y luego llama _initRound_.

-   **nextPlayerEmitter** _fn_: Responsable de invocar [turns.nextTurn()](./turns.md#interfaz) y luego emitir [nextPlayerEvent](./game.md).trigger({currentPlayer: players.getPlaterById(turns.getCurrentPlayerId()), ...})

-   **roundEndEmitter** (_{winnerMove: object o undefined, winnerId: string, result: string}_) _fn_: Responsable de invocar [results.setRecord(rounds.getCurrentRound(), result, winnerId)](./results.md) y luego emitir [roundEndEvent](./game.md#eventos).trigger({currentRound: [rounds.getCurrentRound()](./rounds.md#interfaz), winnerMove, winnerId, result, players: [players.getAllPlayers()](./players.md#interfaz), ...})

-   **gameEndEmitter** (_{winnerMove: object o undefined, winnerId: string, result: string}_) _fn_: Responsable de invocar [results.setRecord(currentRound, result, winnerId)](./results.md), se obtiene `{player1TotalWins, player2TotalWins, totalDraws, result, winnerId} = results.getTotal()` y luego emitir [gameEndEvent](./game.md#eventos).trigger({currentRound: [rounds.getCurrentRound()](./rounds.md#interfaz), winnerMove, player1TotalWins, player2TotalWins, totalDraws, result, winnerId, players: [players.getAllPlayers()](./players.md#interfaz), ...})

-   **initRound** _fn_: responsable de reiniciar el board con [board.reset](./board.md#interfaz), reiniciar los turnos con [turns.reset](./turns.md#interfaz) e invocar _nextPlayerEmitter_.

-   **nextRound** _fn_: Invoca [rounds.next()](./rounds.md#interfaz) y luego _initRound_

-   **tryToDropToken** (_cellId: string_) _fn_: Responsable de intentar colocar el _token_ del `currentPlayer = player.getPlayerById(turns.getCurrentPlayerId())` en la _cell_ indicada bajos las siguientes condiciones:

    -   `data: {eventName: "moveEvent", player: players.getPlayerById(turns.getCurrentPlayerId())}`

    -   Si `board.isEmpty(cellId) === true` entonces:

        -   Invocar `board.setCell(cellId, currentPlayer.token)`
        -   `data.type = "valid"`

    -   Si `board.isEmpty(cellId) === false` entonces:

        -   `data.type = "invalid"`

    -   `data.targetCell = board.getCell(cellId)`

    -   Emitir [moveEvent](./game.md#eventos).trigger(data)

-   **moveEventHandler** (_data:{eventName:string, type: string, targetCell: object, player: object}_)_fn_: handler de [moveEvent](./game.md#eventos) para los siguientes casos:

    -   Si `type === "valid"` entonces:

        -   si [turns.getCurrentTurn()](./turns.md#interfaz) < 5 (_5 es la cantidad minima de turnos para que pueda haber un resultado_) entonces se invoca _nextPlayerEmitter_

        -   si [turns.getCurrentTurn()](./turns.md#interfaz) >= 5 (_5 es la cantidad minima de turnos para que pueda haber un resultado_) entonces se obtiene `{winnerMove, winnerId: players.getPlayerByToken(winnerToken), result} = board.getStatus()`:

            -   si `result === "noResult"` entonces se invoca _nextPlayerEmitter_

            -   si `result !== "noResult" & rounds.getCurrentRound() < rounds.getTotalRounds()` entonces se invoca _roundEndEmitter({winnerMove, winnerId, result})_

            -   si `result !== "noResult" & rounds.getCurrentRound() === rounds.getTotalRounds()` entonces se invoca _gameEndEmitter({winnerMove, winnerId, result})_
