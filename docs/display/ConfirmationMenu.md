# ConfirmationMenu _class_

## Responsabilidad

Representar un _confirmationMenu_. **Extiende [OverlayMenu](./OverlayMenu.md)**

## Constructor

```
ConfirmationMenu(element: HTMLElement, parentMenu: instance of OverlayMenu )
```

## Interfaz

-   **setMenu** (_title: string, callback: fn, data: object_) _fn_: Configura _element_:

    -   `callback = callback`
    -   `data = data`
    -   `elements.updateElement(titleElement, {content: title})`

## Implementación

-   **parentMenu** _object_: Instancia de [OverlayMenu](./OverlayMenu.md)

-   **titleElement** _HTMLElement_: `element.querySelector(".menuTitle")`

-   **callback** _fn_

-   **data** _object_

-   **hideTriggerElementList** _array_: `[element.querySelector("#cancelButton")]`

-   **callbackTriggerElementList** _array_: `[element.querySelector("#acceptButton")]`

-   **clickHandler** (_e: event_): handler para los _click events_:

    -   Si `hideTriggerElementList.some((item) => {item.contains(e.target)}) === true` entonces invoca _hide_
    -   Si `callbackTriggerElementList.some((item) => {item.contains(e.target)}) === true` entonces:

        -   Invoca _hide_
        -   Invoca _parentMenu_.hide
        -   Invoca _callback(data)_
