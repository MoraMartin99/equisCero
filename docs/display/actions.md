# Actions _module_

## Responsabilidad

Responsable de ejecutar las acciones en la vista. Una **acción** es una función que:

-   depende de la funcionalidad de uno o varios módulos para cumplir un propósito especializado
-   es un manejador de eventos

## Interfaz

-   **init** (_conditions: {pattern: string, maxTolerableTime: number}_)_fn_: responsable de inicializar la vista:

    -   Invoca [sessionFormManager.init](./sessionFormManager.md#interfaz)(pattern)
    -   Invoca [stateQueue.setMaxTolerableTime](./stateQueue.md#interfaz)(maxTolerableTime)
    -   Invoca [board.init](./board.md#interfaz)
    -   Invoca [pauseMenu.init](./display.md#implementación)
    -   Invoca [resultMenu.init](./display.md#implementación)
    -   Invoca [gameScreenPauseButton.init](./display.md#implementación)
    -   Invoca [headerPauseButton.init](./display.md#implementación)
    -   [interactionEvent](./display.md#eventos).subscribe(_interactionEventHandler_)
    -   [navigationEvent](./display.md#eventos).subscribe(_navigationEventHandler_)
    -   [submitEvent](./display.md#eventos).subscribe(_submitEventHandler_)

-   **responseEventHandler** (_data:{eventName:string, responseType: string, resource:{url: string, id: string}}_) _fn_: handler de [responseEvent](../avatarProvider.md#eventos) que carga el atributo _src_ de los _avatarImage_ en los _sessionForm_:

    ```
    sessionFormManager.setAvatarSources(url, id)
    ```

-   **moveEventHandler** (_data: object_) _fn_: handler de [moveEvent](../game/game.md#eventos) para los siguientes casos:

    -   si `data.type === "invalid"` entonces se invoca `board.setInvalidCell(document.querySelector(targetCell.id))`
    -   si `data.type === "valid"` entonces:
        -   Se invoca [board.disableCellSelection](./board.md#interfaz)
        -   Se invoca `board.dropToken(document.querySelector(targetCell.id), targetCell.value)`

-   **nextPlayerEventHandler** (_{eventName:string, currentPlayer: object}_) _fn_: responsable de animar el cambio de turno:

    -   **currentPlayerState** _object_: transición que se aplica en el cambio de turno al _playerCardContainer_

        ```
        new TransitionState(["currentPlayer"], ["background-color", "row-gap", "color", "font-size", "height", "width"])
        ```

    -   **boardState** _object_: transición que se aplica al _board_ para colorearlo según el color del _currentPlayer_:

        ```
        new TransitionState([currentPlayer.id], ["background-color"])
        ```

    -   Invoca [board.resetBgColor](./board.md#interfaz)
    -   Invoca [playersContainer.setNoCurrentPlayer](./playersContainer.md#interfaz)
    -   Invoca [stateQueue.add](./stateQueue.md#interfaz)([{state: currentPlayerState, target: [playersContainer.getCard(currentPlayer.id)](./playersContainer.md#interfaz)}, {state: boardState, target: [board.getBoard](./board.md#interfaz)} ])
    -   Si `currentPlayer.role !== "CPU"` entonces se encadenara la promesa anterior `promise.then(()=>{board.enableCellSelection()})`

-   **roundEndEventHandler** (_{eventName:string, currentRound: number, winnerMove: object, winnerId: string, result: string, players: object }_) _fn_: handler de [roundEndEvent](../game/game.md#eventos) encargado de:

    -   Invocar [board.animateResult](./board.md#interfaz)(winnerMove, winnerId, result)
    -   Si `result === "draw"` entonces`roundIndicatorState = "drawRoundState"`
    -   Si `result === "win"` entonces:
        -   Si `winnerId === "player1"` entonces `roundIndicatorState = "player1RoundState"`
        -   Si `winnerId === "player2"` entonces `roundIndicatorState = "player2RoundState"`
    -   ```
        roundIndicatorContainer.setIndicatorState(currentRound, roundIndicatorState).then(() => {
            resultMenu.setMenu({eventName, currentRound, winnerId, result, players})
            resultMenu.show
        })
        ```

-   **gameEndEventHandler** (_{eventName:string, currentRound: number, winnerMove: object, player1TotalWins: number, player2TotalWins: number, totalDraws: number, result: string, winnerId: string, players: object }_) _fn_: handler de [gameEndEvent](../game/game.md#eventos) encargado de:

    -   Invocar [board.animateResult](./board.md#interfaz)(winnerMove, winnerId, result)
    -   Si `result === "draw"` entonces`roundIndicatorState = "drawRound"`
    -   Si `result === "win"` entonces:
        -   Si `winnerId === "player1"` entonces `roundIndicatorState = "player1Round"`
        -   Si `winnerId === "player2"` entonces `roundIndicatorState = "player2Round"`
    -   ```
        roundIndicatorContainer.setIndicatorState(currentRound, roundIndicatorState).then(() => {
            resultMenu.setMenu({eventName, currentRound, winnerId, result, players})
            resultMenu.show
        })
        ```

-   **setGameScreen** (_{ player1: { playerId: "player1", name: string, src: string }, player2: { playerId: "player2", name: string, src: string }, totalRounds: Number }_) _fn_: Configura _playerCardContainer_ y _roundIndicatorContainer_:

    -   [playersContainer.setCards](./playersContainer.md#interfaz)([player1, player2])
    -   [roundIndicatorContainer.init](./roundIndicatorContainer.md#interfaz)(totalRounds)

## Implementación

-   **reset**: regresa la aplicación al estado inicial:

    -   Invoca [board.reset](./board.md#interfaz)
    -   Invoca [roundIndicatorContainer.reset](./roundIndicator.md#interfaz)
    -   Invoca [sessionFormManager.reset](./sessionFormManager.md#interfaz)
    -   Invoca [playersContainer.reset](./playersContainer.md#interfaz)
    -   Oculta los _menuContainer_ usando `[pauseMenu, resultMenu].forEach((item) => {item.hide})`

-   **interactionEventHandler** (_data: object_) _fn_: handler de [interactionEvent](./display.md#interfaz) encargado de:

    -   si `eventName === "nextRound"` entonces de invoca _nextRoundHandler_
    -   si `eventName === "restartRound"` entonces se invoca _restartRoundHandler_
    -   si `eventName === "restartGame"` entonces se invoca _restartGameHandler_
    -   si `eventName === "goHome"` entonces se invoca _reset_ y _carrousel.goTo("#homeScreen")_

-   **navigationEventHandler** _fn_: handler de [navigationEvent](./display.md#interfaz) encargado de: al llegar a gameScreen hay que colorear el roundIndicator actual

    -   Si `targetScreen.id === "gameScreen" && status === "end"` entonces invoca [roundIndicatorContainer.setIndicatorState](./roundIndicatorContainer.md#interfaz)(1, "currentRoundState")

-   **submitEventHandler** _fn_: handler de [submitEvent](./display.md#eventos) para los siguientes casos:

    -   Si `data.senderId === "homeMenu"` entonces se obtiene `{type} === data.fields.gameTypeRadio`:

        -   Invoca [carrousel.enableAllScreens](./carrousel.md#interfaz)
        -   Si `type === "PVSP"` entonces [carrousel.disableScreen](./carrousel.md#interfaz)("#difficultyScreen")
        -   Si `type === "PVSCPU"` entonces [carrousel.disableScreen](./carrousel.md#interfaz)("#player2NameScreen")

-   **nextRoundHandler** _fn_: responsable de preparar la vista para empezar el siguiente round:

    -   Invoca [playersContainer.reset](./playersContainer.md#interfaz)
    -   Invoca [board.reset](./board.md#interfaz)
    -   Invoca [resultMenu](./display.md#implementación).hide
    -   Invoca [roundIndicatorContainer.setIndicatorState](./roundIndicatorContainer.md#interfaz)([roundIndicatorContainer.getNextRoundIndicator](./roundIndicatorContainer.md#interfaz), "currentRoundState")

-   **restartRoundHandler** _fn_: responsable de preparar la vista para reiniciar el round:

    -   Invoca [playersContainer.reset](./playersContainer.md#interfaz)
    -   Invoca [board.reset](./board.md#interfaz)
    -   Invoca [pauseMenu](./display.md#implementación).hide

-   **restartGameHandler** _fn_: responsable de preparar la vista para reiniciar el juego:

    -   Invoca [roundIndicatorContainer.resetIndicatorsState](./roundIndicatorContainer.md#interfaz)
    -   Invoca [playersContainer.reset](./playersContainer.md#interfaz)
    -   Invoca [board.reset](./board.md#interfaz)
    -   Oculta los _menuContainer_ usando `[pauseMenu, resultMenu].forEach((item) => {item.hide})`
    -   Invoca [roundIndicatorContainer.setIndicatorState](./roundIndicatorContainer.md#interfaz)(1, "currentRoundState")
