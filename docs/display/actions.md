# Actions _module_

## Responsabilidad

Responsable de ejecutar las acciones en la vista. Una **acción** es una función que:

-   depende de la funcionalidad de uno o varios módulos para cumplir un propósito especializado
-   es un manejador de eventos

## Interfaz

-   **init** (_conditions: {pattern: string, maxTolerableTime: number}_)_fn_: responsable de inicializar la vista:

    -   Invoca [sessionFormManager.init](./sessionFormManager.md#interfaz)(pattern)
    -   Invoca _setMaxTolerableTime_ [states.setMaxTolerableTime](./states.md#interfaz)(maxTolerableTime)
    -   Invoca [board.init](./board.md#interfaz)
    -   Invoca [pauseMenu.init](./display.md#implementación)

    -   **bodyClickHandler** (_e: object_) _fn_: handler para manejar los _click events_ en _body_. Define una serie de _arrays_ de elementos y su correspondiente handler, cuando se detecta que _e.target_ esta incluido dentro de la lista se invoca al handler usando [utilities.executeIfMatch](../utilities.md#interfaz):

        -   **list**

        3.  **pauseMenuVisibilityButtonList** _array_: contiene todo los elementos _.pauseButton_ y _.playButton_
        6.  **resultButtonList** _array_: contiene todo los elementos _.resultButton_

        -   **callback**

        3. **pauseMenuVisibilityHandler** (_target: HTMLElement_) _fn_: obtiene el _.pauseButton_ o _.playButton_ mas cercano emite un [interactionEvent](./display.md) de `type = "showMenu" o "hideMenu, menu = #pauseMenuContainer"` según corresponda
        6. **emitInteractionEventFromButton** (_target: HTMLElement_) _fn_: obtiene el _.resultButton_ mas cercano y emite su respectivo [interactionEvent](display.md#eventos)

        -   **matchCallback**: `matchCallback = (value, listItem) => listItem.contains(value.target)`

    -   [interactionEvent](./display.md#eventos).subscribe(_interactionEventHandler_)
    -   [navigationEvent](./display.md#eventos).subscribe(_navigationEventHandler_)
    -   [submitEvent](./display.md#eventos).subscribe(_submitEventHandler_)

-   **responseEventHandler** (_data: object_) _fn_: handler de [responseEvent](../avatarProvider.md#eventos) que carga el atributo _src_ de los _avatarImage_ en el _homeScreen_ usando _updateImgListSrc_ según corresponda

-   **moveEventHandler** (_data: object_) _fn_: handler de [moveEvent](../game/game.md#eventos) para los siguientes casos:

    -   si `data.type === "invalid"` entonces se invoca `board.setInvalidCell(document.querySelector(targetCell.id))`
    -   si `data.type === "valid"` entonces:
        -   Se invoca [board.disableCellSelection](./board.md#interfaz)
        -   Se invoca `board.dropToken(document.querySelector(targetCell.id), targetCell.value)`

-   **nextPlayerEventHandler** (_{eventName:string, currentPlayer: object}_) _fn_: responsable de animar el cambio de turno:

    -   Invoca [board.resetBgColor](./board.md#interfaz)
    -   Invoca [playersContainer.setNoCurrentPlayer](./playersContainer.md#interfaz)
    -   Si `currentPlayer.id === "player1"` entonces `boardStateId = "player1Turn"`
    -   Si `currentPlayer.id === "player2"` entonces `boardStateId = "player2Turn"`
    -   Invoca [states.setStateList](./states.md#interfaz)([{stateId: "currentPlayer", target: [playersContainer.getCard(currentPlayer.id)](./playersContainer.md#interfaz)}, {stateId: boardStateId, target: [board.getBoard](./board.md#interfaz)}])
    -   Si `currentPlayer.role !== "CPU"` entonces se encadenara la promesa anterior `promise.then(()=>{board.enableCellSelection()})`

-   **roundEndEventHandler** (_{eventName:string, currentRound: number, winnerMove: object, winnerId: string, result: string, players: object }_) _fn_: handler de [roundEndEvent](../game/game.md#eventos) encargado de:

    -   Invocar [board.animateResult](./board.md#interfaz)(winnerMove, winnerId, result)
    -   Si `result === "draw"` entonces`roundIndicatorState = "drawRound"`
    -   Si `result === "win"` entonces:
        -   Si `winnerId === "player1"` entonces `roundIndicatorState = "player1Round"`
        -   Si `winnerId === "player2"` entonces `roundIndicatorState = "player2Round"`
    -   Invoca [roundIndicatorContainer.setIndicatorState](./roundIndicatorContainer.md#interfaz)(currentRound, roundIndicatorState).then(showMenu(#resultMenu, {...}, setResultMenu))

-   **gameEndEventHandler** (_{eventName:string, currentRound: number, winnerMove: object, player1TotalWins: number, player2TotalWins: number, totalDraws: number, result: string, winnerId: string, players: object }_) _fn_: handler de [gameEndEvent](../game/game.md#eventos) encargado de:

    -   Invocar [board.animateResult](./board.md#interfaz)(winnerMove, winnerId, result)
    -   Si `result === "draw"` entonces`roundIndicatorState = "drawRound"`
    -   Si `result === "win"` entonces:
        -   Si `winnerId === "player1"` entonces `roundIndicatorState = "player1Round"`
        -   Si `winnerId === "player2"` entonces `roundIndicatorState = "player2Round"`
    -   Invoca [roundIndicatorContainer.setIndicatorState](./roundIndicatorContainer.md#interfaz)(currentRound, roundIndicatorState).then(showMenu(#resultMenu, {...}, setResultMenu))

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
    -   Elimina los _src_ de todas las _img_ que contengan avatares usando _updateImgListSrc_

-   **resetResultMenu** (_resultMenu: HTMLElement_) _fn_: regresa _resultMenu_ a sus estado inicial. Elimina las clases _player1_, _player2_, _draw_ y _gameResult_ de _#resultMenu_, y elimina los descendientes de _#winnerAvatarContainer_, _#resultMessageContainer_ y _.resultButtonContainer_

-   **interactionEventHandler** (_data: object_) _fn_: handler de [interactionEvent](./display.md#interfaz) encargado de:

    -   si `eventName === "nextRound"` entonces de invoca _nextRoundHandler_
    -   si `eventName === "restartRound"` entonces se invoca _restartRoundHandler_
    -   si `eventName === "restartGame"` entonces se invoca _restartGameHandler_
    -   si `eventName === "goHome"` entonces se invoca _reset_ y _carrousel.goTo("#homeScreen")_

-   **navigationEventHandler** _fn_: handler de [navigationEvent](./display.md#interfaz) encargado de: al llegar a gameScreen hay que colorear el roundIndicator actual

    -   Si `targetScreen.id === "gameScreen" && status === "end"` entonces invoca [roundIndicatorContainer.setIndicatorState](./roundIndicatorContainer.md#interfaz)(1, "currentRound")

-   **submitEventHandler** _fn_: handler de [submitEvent](./display.md#eventos) para los siguientes casos:

    -   Si `data.senderId === "homeMenu"` entonces se obtiene `{type} === data.fields.gameTypeRadio`:

        -   Invoca [carrousel.enableAllScreens](./carrousel.md#interfaz)
        -   Si `type === "PVSP"` entonces [carrousel.disableScreen](./carrousel.md#interfaz)("#difficultyScreen")
        -   Si `type === "PVSCPU"` entonces [carrousel.disableScreen](./carrousel.md#interfaz)("#player2NameScreen")

-   **updateImgListSrc** (_changeList: [{img: HTMLElement, src: string}, ...]_) _fn_: responsable de actualizar el _src_ de una lista de _img_ usando [elements.updateElement](./elements.md#interfaz)

-   **hideElementList** (_[element: HTMLElement, ...]_) _fn_: agrega la clase _hide_ de _element_ usando [elements.updateElement](./elements.md#interfaz)(element, {classes: {addList: ["hide"]}})

-   **setResultMenu** (_{resultMenu: HTMLElement, eventName:string, currentRound: number, winnerId: string, result: string, players: object }_) _fn_: responsable de configurar _resultMenu_:

    -   Invoca _resetResultMenu(resultMenu)_

    -   **setMenuClasses** (_eventName: string, winnerId: string, result: string_) _fn_:

        -   Si `winnerId === "player1"` entonces [elements.updateElement](./elements.md#interfaz)(resultMenu, {classes: {addList: [player1]}})
        -   Si `winnerId === "player2"` entonces [elements.updateElement](./elements.md#interfaz)(resultMenu, {classes: {addList: [player2]}})
        -   Si `result === "draw"` entonces [elements.updateElement](./elements.md#interfaz)(resultMenu, {classes: {addList: [draw]}})
        -   Si `eventName === "gameEndEvent"` entonces [elements.updateElement](./elements.md#interfaz)(resultMenu, {classes: {addList: [gameResult]}})

    -   **loadAvatars** (_winnerId: string, result: string, players: object_) _fn_:

        -   Si `result === "win"` [elements.loadElement](./elements.md#interfaz)({templateId: "winnerAvatar", parentElement: #winnerAvatarContainer, settings: {src: players[winnerId].getAvatarURL()}})
        -   Si `result === "draw"` [elements.loadElement](./elements.md#interfaz)({templateId: "maskContainer", parentElement: #winnerAvatarContainer, settings: {src1: players.player1.getAvatarURL(), src2: players.player2.getAvatarURL()}})

    -   **loadMessage** (_{currentRound: number, winnerId: string, result: string, players: object}_) _fn_:

        -   Si `result === "win" & eventName === "roundEndEvent"` [elements.loadElement](./elements.md#interfaz)({templateId: "resultMessage1", parentElement: #resultMessageContainer, settings: {name: players[winnerId].name, round: currentRound}})
        -   Si `result === "win" & eventName === "gameEndEvent"` [elements.loadElement](./elements.md#interfaz)({templateId: "resultMessage2", parentElement: #resultMessageContainer, settings: {name: players[winnerId].name}})
        -   Si `result === "draw"` [elements.loadElement](./elements.md#interfaz)({templateId: "resultMessage3", parentElement: #resultMessageContainer})

    -   **loadButtons** (_eventName: string_) _fn_:

        -   Si `eventName === "roundEndEvent"` entonces [elements.loadElement](./elements.md#interfaz)({templateId: "roundEndResultButton", parentElement: #resultButtonContainer})
        -   Si `eventName === "gameEndEvent"` entonces [elements.loadElement](./elements.md#interfaz)({templateId: "gameEndResultButtons", parentElement: #resultButtonContainer})

-   **nextRoundHandler** _fn_: responsable de preparar la vista para empezar el siguiente round:

    -   Invoca [playersContainer.reset](./playersContainer.md#interfaz)
    -   Invoca [board.reset](./board.md#interfaz)
    -   Invoca _hideElementList([...listaMenuContainerVisibles])_
    -   Invoca [roundIndicatorContainer.setIndicatorState](./roundIndicatorContainer.md#interfaz)([roundIndicatorContainer.getNextRoundIndicator](./roundIndicatorContainer.md#interfaz), "currentRound")

-   **restartRoundHandler** _fn_: responsable de preparar la vista para reiniciar el round:

    -   Invoca [playersContainer.reset](./playersContainer.md#interfaz)
    -   Invoca [board.reset](./board.md#interfaz)
    -   Invoca [pauseMenu](./display.md#implementación).hide

-   **restartGameHandler** _fn_: responsable de preparar la vista para reiniciar el juego:

    -   Invoca [roundIndicatorContainer.resetIndicatorsState](./roundIndicatorContainer.md#interfaz)
    -   Invoca [playersContainer.reset](./playersContainer.md#interfaz)
    -   Invoca [board.reset](./board.md#interfaz)
    -   Oculta los _menuContainer_ usando `[pauseMenu, resultMenu].forEach((item) => {item.hide})`
    -   Invoca [roundIndicatorContainer.setIndicatorState](./roundIndicatorContainer.md#interfaz)(1, "currentRound")
