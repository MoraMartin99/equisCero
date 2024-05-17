# PauseMenu _class_

## Responsabilidad

Representar un _pauseMenu_. **Extiende [OverlayMenu](./OverlayMenu.md)**

## Constructor

```
PauseMenu(pauseMenuElement: HTMLElement, confirmationMenuElement: HTMLElement)
```

## Interfaz

-   **init** _fn_: inicializa _element_:

    -   Invoca `super.init`
    -   Invoca `confirmationMenu.init`

-   **hide** _fn_: agrega la clase _hide_ a _element_ y oculta _confirmationMenu_:

    -   Invoca `super.hide`
    -   Invoca _confirmationMenu_.hide

## Implementación

-   **element** _HTMLElement_: _pauseMenuElement_

-   **confirmationMenu** _object_: `new ConfirmationMenu(confirmationMenuElement, this)`

-   **optionButtonList** _array_: `Array.from(element.querySelectorAll(".pauseOptionButton"))`

-   **hideTriggerElementList** _array_: `[element.querySelector("#playButton")]`

-   **eventTriggerFn** _fn_: [interactionEvent](./display.md#eventos).trigger

-   **options** _object_:

    ```
    {restartRound: {tittle: "¿Reiniciar round?", type: "restartRound"},
    restartGame: {tittle: "¿Reiniciar juego?", , type: "restartGame"},
    goHome: {tittle: "¿Reiniciar juego?", , type: "goHome"}}
    ```

-   **clickHandler** (_e: event_): handler para los _click events_:

    -   Si `hideTriggerElementList.some((item) => {item.contains(e.target)}) === true` entonces invoca _hide_
    -   Si `optionButtonList.some((item) => {item.contains(e.target)}) === true` entonces:
        -   `value === e.target.closest(".pauseOptionButton").value`
        -   Si `Boolean(options[value]) === true` entonces:
            -   Invoca _confirmationMenu_.setMenu(_options_[value].tittle, eventTriggerFn, {eventName: "interactionEvent", type: _options_[value].type})
            -   Invoca _confirmationMenu_.show
