# PauseButton _class_

## Responsabilidad

Representar un _pauseButton_

## Constructor

```
PauseButton(element: HTMLElement, pauseMenu: instancia de PauseMenu)
```

## Interfaz

-   **getElement** _fn_: Retorna _element_

-   **init** _fn_: inicializa _element_:

    ```
    element.addEventListener("click", clickHandler)
    ```

## Implementación

-   **element** _HTMLElement_

-   **pauseMenu** _instancia de [PauseMenu](./PauseMenu.md)_

-   **clickHandler** (_e: event_): handler para los _click events_:

    -   Invoca _pauseMenu.show_
