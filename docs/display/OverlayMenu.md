# OverlayMenu _class_

## Responsabilidad

Representar un _overlayMenu_, un menu flotante genérico

## Constructor

```
OverlayMenu(element: HTMLElement)
```

## Interfaz

-   **getElement** _fn_: Retorna _element_

-   **show** _fn_: remueve la clase _hide_ de _element_:

    -   Invoca `states.removeState("hide", element)`
    -   Invoca `event.trigger({eventName: "interactionEvent", type: "showMenu", menu: element})`

-   **hide** _fn_: agrega la clase _hide_ a _element_:

    -   Invoca `states.setStateList([{stateId: "hide", target: element}], false)`
    -   Invoca `event.trigger({eventName: "interactionEvent", type: "hideMenu", menu: element})`

-   **isVisible** _fn_: si _element_ es visible retorna `true`, de lo contrario `false`:

    ```
    states.isApplied(element, ["hide"])
    ```

-   **init** _fn_: inicializa _element_:

    ```
    element.addEventListener("click", clickHandler)
    ```

## Implementación

-   **element** _HTMLElement_

-   **event** _object_: es una referencia a [interactionEvent](./display.md#eventos)

-   **clickHandler** (_e: event_): handler para los _click events_
