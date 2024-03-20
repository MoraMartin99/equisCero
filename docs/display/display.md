# Display _class_

## Responsabilidad

Manejar la vista

## Interfaz

### Eventos

-   **navigationEvent**: activado cuando se navega entre pantallas

    ```
    data:{eventName:string, type: string, status: string, currentScreen:{screen:HTMLElement, state: object}, targetScreen:{screen:HTMLElement, state: object}}
    ```

    donde type puede ser:

    -   previous
    -   next
    -   goTo

    donde status puede ser:

    -   start
    -   end

-   **sessionEvent**: activado cuando se requiera actualizar información de la sesión del modelo

    ```
    data:{eventName:string, changeList:[{field: value}, ...] }
    ```

    donde field puede ser:

    -   **type**, donde su _value_ es _string_
    -   **totalRounds**, donde su _value_ es _string_
    -   **difficultyLevel**, donde su _value_ es _string_
    -   **player**, donde su _value_ es `{name: string, Id: string, role: string OR undefined}`

-   **interactionEvent**: activado cuando se interactúa con el board, los botones de play/pause o los overlayMenus

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

    -   **dropTokenEvent**: activado cuando se inserta un _token_ en el _board_. Instancia de [CustomEvent](../customEvent.md)

        ```
        data:{eventName:string, targetCell: {value: string, id: string}}
        ```

        -   _targetCell.value_ puede ser _undefined_ o `player.token`
        -   _targetCell.value_ es `cell.id` quien a su vez representa el _id_ de _HTMLElement_

-   **submitEvent**: activado cuando se requiera enviar información de una estructura tipo de formulario como los _sessionForms_. Instancia de [CustomEvent](../customEvent.md)

    ```
    data: {eventName:string, senderId: string, fields: {fieldId: {id: string, ...}, ...}}
    ```

### Métodos

-   **[actions.init](./actions.md#interfaz)** _fn_
-   **[actions.loadInitialSettings](./actions.md#interfaz)** _fn_
-   **[actions.updateSessionInput](./actions.md#interfaz)** _fn_
-   **[actions.responseEventHandler](./actions.md#interfaz)** _fn_
-   **[states.setMaxTolerableTime](./states.md#interfaz)** _fn_

## Implementación

-   **[elements](./elements.md)** _module_
-   **[states](./states.md)** _module_
-   **[carrousel](./carrousel.md)** _module_
-   **[actions](./actions.md)** _module_
