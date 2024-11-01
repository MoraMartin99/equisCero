# Display _class_

## Responsabilidad

Manejar la vista

## Interfaz

### Eventos

-   **navigationEvent**: activado cuando se navega entre pantallas. Instancia de [CustomEvent](../customEvent.md)

    ```
    data:{eventName:string, type: string, status: string, currentScreen:{id: string, state: object}, targetScreen:{id: string, state: object}}
    ```

    donde type puede ser:

    -   previous
    -   next
    -   goTo

    donde status puede ser:

    -   start
    -   end

-   **interactionEvent**: activado cuando se interactúa con el board, los botones de play/pause o los overlayMenus. Instancia de [CustomEvent](../customEvent.md)

    ```
    para showMenu y hideMenu
    data:{eventName:string, type: string, menu: HTMLElement}
    ```

    ```
    para selectCell
    data:{eventName:string, type: string, cellId: string}
    ```

    ```
    para nextRound, restartRound, restartGame y goHome
    data:{eventName:string, type: string}
    ```

    donde type puede ser:

    -   showMenu
    -   hideMenu
    -   selectCell
    -   nextRound
    -   restartRound
    -   restartGame
    -   goHome

-   **submitEvent**: activado cuando se requiera enviar información de una estructura tipo de formulario como los _sessionForms_. Instancia de [CustomEvent](../customEvent.md)

    ```
    data: {eventName:string, senderId: string, fields: {fieldId: {id: string, ...}, ...}}
    ```

### Métodos

-   **setPlayerNamePattern** _(pattern: string)fn_: Configura la validación de los nombres de los jugadores en los formularios que corresponda

-   **reset** _fn_: Resetea la aplicación a sus estado inicial

-   **setAvatarSource** _fn_: Configura el atributo **src** para los avatares

-   **setGame** _({totalRounds: number, playersList: [{name: string, id: string, avatarSource: string}], ...}) fn_: Configura la pantalla inicial del juego

-   **restartRoundIndicatorContainer** _fn_: Reinicia **RoundIndicatorContainer**

-   **initRound** _(round: number) fn_: Limpia el **board**, resetea y anima el **roundIndicator** correspondiente y reinicia el **playersContainer**

-   **switchCurrentPlayer** _(id: string, cellSelectionIsEnable: true) fn_: Anima el cambio de turno de **playersContainer** y el **board**. Si `cellSelectionIsEnable === true` entonces activa la selección de celda en el **board**

-   **setInvalidCell** _(cellId: string) fn_: Configura una celda del **board** como invalida

-   **dropToken** _(cellId: string, playerId: string) fn_: Configura una celda del **board** para contener el **token** asociado con **playerId** y desactiva selección de celda en el **board**

-   **endRound** _( {currentRound: number, winnerMove: object, winnerId: string, result: string, players: object} ) fn_: Anima el **winnerMove** , anima el **current roundIndicator** según el resultado, configura y muestra el **resultMenu** al finalizar un round

-   **endGame** _( {currentRound: number, winnerMove: object, winnerId: string, result: string, players: object} ) fn_: Anima el **winnerMove** , anima el **current roundIndicator** según el resultado, configura y muestra el **resultMenu** al finalizar el juego

## Implementación

-   **nextRound** _fn_: Encargada de minimizar el ResultMenu y lanzar el interactionEvent correspondiente

-   **restartRound** _fn_: Encargada de lanzar el **interactionEvent** de tipo **restartRound**

-   **restartGame** _fn_: Encargada de lanzar el **interactionEvent** de tipo **restartGame**

-   **goHome** _fn_: Encargada de lanzar el **interactionEvent** de tipo **goHome**

-   **animateWinnerMove** _(move: object, playerId) fn_: Anima un **winnerMove**

-   **animateRoundIndicator** _(round: number, animationId: string) fn_: Anima un **roundIndicator**

-   **setResultMenu** _(type: "roundEnd" OR "gameEnd", settings: {round: number, winnerId: string, result: string, players: object} ) fn_: Configura el **resultMenu** para mostrar el resultado al finalizar un round o el juego

_Notas_

-   Añadir los eventListeners para lanzar los _pauseMenu_ al tocar el respectivo botón
