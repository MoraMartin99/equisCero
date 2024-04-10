# Actions _module_

## Responsabilidad

Responsable de ejecutar las acciones en la vista. Una **acción** es una función que:

-   depende de la funcionalidad de uno o varios módulos para cumplir un propósito especializado
-   es un manejador de eventos

## Interfaz

-   **init** (_conditions: object_)_fn_: responsable de inicializar la vista:

    -   **loadInitialSettings** (_conditions: {pattern: string, maxTolerableTime: number}_) _fn_: responsable de cargar la configuración inicial:

        -   Invoca _SetPlayerNameInputListPattern(pattern)_
        -   Invoca _setMaxTolerableTime_ [states.setMaxTolerableTime](./states.md#interfaz)(maxTolerableTime)

    -   Invoca [board.init](./board.md#interfaz)

    -   **bodyClickHandler** (_e: object_) _fn_: handler para manejar los _click events_ en _body_. Define una serie de _arrays_ de elementos y su correspondiente handler, cuando se detecta que _e.target_ esta incluido dentro de la lista se invoca al handler usando [utilities.executeIfMatch](../utilities.md#interfaz):

        -   **list**

        1.  **previousScreenTriggersList** _array_: contiene todos los elementos que pretenden activar un [navigationEvent](./display.md#eventos) con `data.type === "previous"` como por ejemplo los _.navigationButton.previous_
        2.  **nextScreenTriggersList** _array_: contiene todos los elementos que pretenden activar un [navigationEvent](./display.md#eventos) con `data.type === "next"` como por ejemplo los _.gameTypeLabel, .navigationButton.next_
        3.  **pauseMenuVisibilityButtonList** _array_: contiene todo los elementos _.pauseButton_ y _.playButton_
        4.  **pauseOptionLabelList** _array_: contiene todo los elementos _.pauseOptionLabel_
        5.  **confirmationButtonList** _array_: contiene todo los elementos _.confirmationButton_
        6.  **resultButtonList** _array_: contiene todo los elementos _.resultButton_

        -   **callback**

        1. [carrousel.previousScreen](./carrousel.md#interfaz)
        2. **nextScreenHandler** (_target: HTMLElement_) _fn_: Intenta obtener el _form_ mas cercano utilizando [node.closest](https://developer.mozilla.org/en-US/docs/Web/API/Element/closest), si _form_ existe se verifica si [form.checkValidity()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement/checkValidity) es `true`, se invoca _submitSessionForm_ y se invoca [carrousel.nextScreen](./carrousel.md#interfaz). Si _form_ no existe se invoca [carrousel.nextScreen](./carrousel.md#interfaz)
        3. **pauseMenuVisibilityHandler** (_target: HTMLElement_) _fn_: obtiene el _.pauseButton_ o _.playButton_ mas cercano emite un [interactionEvent](./display.md) de `type = "showMenu" o "hideMenu, menu = #pauseMenuContainer"` según corresponda
        4. **showConfirmationMenu** _fn_: emite un [interactionEvent](./display.md) de `type = "showMenu", menu = #confirmationMenuContainer`
        5. **confirmationButtonHandler** (_target: HTMLElement_) _fn_: obtiene el _confirmationButton_ mas cercano, si es _cancelButton_ oculta _.confirmationMenuContainer_ emitiendo [interactionEvent](./display.md) de `type = "hideMenu", menu = #confirmationMenuContainer`, si es _acceptButton_ verifica si _pauseMenuContainer_ esta visible, extrae cual de los _pauseOptionLabel_ esta seleccionado y emite su respectivo [interactionEvent](display.md#eventos) y oculta _.confirmationMenuContainer_ emitiendo [interactionEvent](./display.md) de `type = "hideMenu", menu = #confirmationMenuContainer`
        6. **emitInteractionEventFromButton** (_target: HTMLElement_) _fn_: obtiene el _.resultButton_ mas cercano y emite su respectivo [interactionEvent](display.md#eventos)

        -   **matchCallback**: `matchCallback = (value, listItem) => listItem.contains(value.target)`

    -   **bodyFocusOutHandler** (_e: object_) _fn_: handler para manejar los _focus out events_ en _body_. Define una serie de _arrays_ de elementos y su correspondiente handler, cuando se detecta que _e.target_ esta incluido dentro de la lista se invoca al handler usando [utilities.executeIfMatch](../utilities.md#interfaz):

        -   **list**

        1. **playerNameInputList** _array_: contiene todos los elementos _.playerNameInput_

        -   **callback**

        1. **activateInputValidationVisibility** (_target: HTMLElement_) _fn_: obtiene el _input[type=text]_ mas cercano y le agrega la clase _activeTextInput_ usando [elements.updateElement](./elements.md#interfaz)

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

-   **roundEndEventHandler** (_data: object_) _fn_: handler de [roundEndEvent](../game/game.md#eventos) encargado de:

    -   Invocar [board.animateResult](./board.md#interfaz)(winnerMove, winnerId, result)
    -   Invocar _animateRoundIndicator(currentRound, "player1Round" o "player2Round" o "drawRound")_
    -   Invocar _animateRoundIndicator.then(showMenu(#resultMenu, {...}, setResultMenu))_

-   **gameEndEventHandler** (_data: object_) _fn_: handler de [gameEndEvent](../game/game.md#eventos) encargado de:

    -   Invocar [board.animateResult](./board.md#interfaz)(winnerMove, winnerId, result)
    -   Invocar _animateRoundIndicator(currentRound, "player1Round" o "player2Round" o "drawRound")_
    -   Invocar _animateRoundIndicator.then(showMenu(#resultMenu, {...}, setResultMenu))_

-   **setGameScreen** (_{ player1: { playerId: "player1", name: string, src: string }, player2: { playerId: "player2", name: string, src: string }, totalRounds: Number }_) _fn_: Configura _playerCardContainer_ y _roundIndicatorContainer_:

    -   [playersContainer.setCards](./playersContainer.md#interfaz)([player1, player2])

    ```
    For(i = 1; i === totalRounds; i++ ) elements.loadElement({templateId: "roundIndicator", parentElement: #roundIndicatorContainer, settings: {round: i}})
    ```

## Implementación

-   **reset**: regresa la aplicación al estado inicial:

    -   Invoca [board.reset](./board.md#interfaz)
    -   Invoca _resetRoundIndicator_
    -   Invoca _resetFormList([sessionForm1, ....])_
    -   Invoca [playersContainer.reset](./playersContainer.md#interfaz)
    -   Oculta todos los _menuContainer_ usando _hideElementList_
    -   Elimina los _src_ de todas las _img_ que contengan avatares usando _updateImgListSrc_

-   **resetFormList** (_[form1: HTMLElement, ...]_): resetear un _array_ de formularios usando [form.reset()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/reset) y elimina la clase _activeTextInput_ de cualquier _input[type=text]_ que este en el formulario usando [elements.updateElement](./elements.md#interfaz)

-   **resetRoundIndicator** _fn_: regresa _roundIndicatorContainer_ a su estado inicial, es decir sin _children_

-   **resetResultMenu** (_resultMenu: HTMLElement_) _fn_: regresa _resultMenu_ a sus estado inicial. Elimina las clases _player1_, _player2_, _draw_ y _gameResult_ de _#resultMenu_, y elimina los descendientes de _#winnerAvatarContainer_, _#resultMessageContainer_ y _.resultButtonContainer_

-   **interactionEventHandler** (_data: object_) _fn_: handler de [interactionEvent](./display.md#interfaz) encargado de:

    -   si `eventName === "showMenu"` entonces se invoca _showMenu(menu)_
    -   si `eventName === "hideMenu"` entonces se invoca _hideElementList([menu])_
    -   si `eventName === "nextRound"` entonces de invoca _nextRoundHandler_
    -   si `eventName === "restartRound"` entonces se invoca _restartRoundHandler_
    -   si `eventName === "restartGame"` entonces se invoca _restartGameHandler_
    -   si `eventName === "goHome"` entonces se invoca _reset_ y _carrousel.goTo(#homeScreen)_

-   **navigationEventHandler** _fn_: handler de [navigationEvent](./display.md#interfaz) encargado de: al llegar a gameScreen hay que colorear el roundIndicator actual

    -   Si `targetScreen.id === "gameScreen" && status === "end"` entonces invoca _animateRoundIndicator(1, "currentRound", false)_

-   **submitEventHandler** _fn_: handler de [submitEvent](./display.md#eventos) para los siguientes casos:

    -   Si `data.senderId === "homeMenu"` entonces se obtiene `{type} === data.fields.gameTypeRadio`:

        -   Se remueve la clase _disable_ de todas las _screen_ usando [elements.updateElement](./elements.md#interfaz)
        -   Si `type === "PVSP"` entonces se agrega la clase _disable_ a _difficultyScreen_ usando [elements.updateElement](./elements.md#interfaz)
        -   Si `type === "PVSCPU"` entonces se agrega la clase _disable_ a _player2NameScreen_ usando [elements.updateElement](./elements.md#interfaz)

-   **submitSessionForm** (_form: HTMLElement_) _fn_: extrae del _form_ la información necesaria para emitir un [submitEvent](./display.md#eventos):

    -   `fields === Object.fromEntries(new formData(form))`

    -   Si `form === #homeMenu` entonces:

        -   `type === String(fields.gameTypeRadio.match(some regex)[0])`
        -   `totalRounds === Number(fields.gameTypeRadio.match(some regex)[0])`
        -   [submitEvent](./display.md#eventos).trigger({eventName:"submitEvent", senderId: form.id, fields: {gameTypeRadio: {id: "gameTypeRadio", type, totalRounds}}})

    -   Si `form === .playerNameMenu` (_respecto a la clase para poder abarcar ambos menus_) entonces:

        -   `{playerName: value} === fields`
        -   [submitEvent](./display.md#eventos).trigger({eventName:"submitEvent", senderId: form.id, fields: {playerName: {id: "playerName", value}}})

    -   Si `form === #difficultyMenu` entonces:

        -   `{difficultyRadio: value} === fields`
        -   [submitEvent](./display.md#eventos).trigger({eventName:"submitEvent", senderId: form.id, fields: {difficultyRadio: {id: "difficultyRadio", value}}})

-   **updateImgListSrc** (_changeList: [{img: HTMLElement, src: string}, ...]_) _fn_: responsable de actualizar el _src_ de una lista de _img_ usando [elements.updateElement](./elements.md#interfaz)

-   **showElementList** (_[element: HTMLElement, ...]_) _fn_: remueve la clase _hide_ de _element_ usando [elements.updateElement](./elements.md#interfaz)(element, {classes: {removeList: ["hide"]}})

-   **hideElementList** (_[element: HTMLElement, ...]_) _fn_: agrega la clase _hide_ de _element_ usando [elements.updateElement](./elements.md#interfaz)(element, {classes: {addList: ["hide"]}})

-   **animateRoundIndicator** (_round: number, stateId: string, hasToWait: boolean_) _fn_: anima el _roundIndicator_ según el _stateId_ y retorna una promesa usando [states.setStateList](./states.md#interfaz).

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

-   **showMenu** (_menu:HTMLElement, settings: object, setter: fn_) _fn_: configura y muestra un menu:

    -   Si `isObject(settings) === true && isFunction(setter)` entonces _setter(settings)_. _setter_ es el encargado de configurar _menu_ antes de mostrarlo en pantalla
    -   Invoca _showElementList([menu])_

-   **nextRoundHandler** _fn_: responsable de preparar la vista para empezar el siguiente round:

    -   Invoca [playersContainer.reset](./playersContainer.md#interfaz)
    -   Invoca [board.reset](./board.md#interfaz)
    -   Invoca _hideElementList([...listaMenuContainerVisibles])_
    -   Invoca _animateRoundIndicator(nextRound, "currentRound", false)_

-   **restartRoundHandler** _fn_: responsable de preparar la vista para reiniciar el round:

    -   Invoca [playersContainer.reset](./playersContainer.md#interfaz)
    -   Invoca [board.reset](./board.md#interfaz)
    -   Invoca _hideElementList([#confirmationMenuContainer, #pauseMenuContainer])_

-   **restartGameHandler** _fn_: responsable de preparar la vista para reiniciar el juego:

    -   Para cada _round1Indicator_ se invoca [elements.updateElement](./elements.md#interfaz)(element, {classes: {removeList: ["player1", "player2", "draw", "current"]}})
    -   Invoca [playersContainer.reset](./playersContainer.md#interfaz)
    -   Invoca [board.reset](./board.md#interfaz)
    -   Invoca _hideElementList([#resultMenu, #confirmationMenuContainer, #pauseMenuContainer])_
    -   Invoca _animateRoundIndicator(1, "currentRound", false)_

-   **SetPlayerNameInputListPattern** (_pattern: string_) _fn_: para cada _playerNameInput_ dentro de un _array_ invoca [elements.updateElement](./elements.md#interfaz)(input, {attributes: {addList: [{name: "pattern", value: pattern}...]}})
