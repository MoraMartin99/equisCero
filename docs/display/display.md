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

-   **init** _fn_: **[actions.init](./actions.md#interfaz)**
-   **responseEventHandler** _fn_: **[actions.responseEventHandler](./actions.md#interfaz)**
-   **setMaxTolerableTime** _fn_: **[states.setMaxTolerableTime](./states.md#interfaz)**
-   **moveEventHandler** _fn_: [actions.moveEventHandler](./actions.md#interfaz)
-   **nextPlayerEventHandler** _fn_: [actions.nextPlayerEventHandler](./actions.md#interfaz)
-   **roundEndEventHandler** _fn_: [actions.roundEndEventHandler](./actions.md#interfaz)
-   **gameEndEventHandler** _fn_: [actions.gameEndEventHandler](./actions.md#interfaz)
-   **setGameScreen** _fn_: [actions.setPlayerCards](./actions.md#interfaz)

## Implementación

-   **[elements](./elements.md)** _module_
-   **[states](./states.md)** _module_
-   **[carrousel](./carrousel.md)** _module_
-   **[actions](./actions.md)** _module_
-   **[board](./board.md)** _module_
-   **[avatarImage](./avatarImage.md)** _class_
