# SessionForm _class_

## Responsabilidad

Representar un _sessionForm_ genérico

## Constructor

```
SessionForm(element: HTMLElement)
```

## Interfaz

-   **init** _fn_: Inicializa _element_:

```
element.addEventListener("click", clickHandler)
```

-   **getElement** _fn_: Retorna _element_

-   **reset** _fn_: configura _element_ a sus valores iniciales:

    -   Invoca [form.reset()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/reset)

## Implementación

-   **element** _HTMLElement_

-   **submitEvent** _[customEvent](../customEvent.md)_: [submitEvent](./display.md#eventos)

-   **submitSessionForm** _fn_: extrae del _form_ la información necesaria para emitir un _submitEvent_

-   **nextScreenTriggerList** _array_: Lista de _HTMLElement_ que al hacer click en ellos activan la lógica para moverse a la siguiente pantalla

```
nextScreenTriggerList = []
```

-   **previousScreenTriggerList** _array_: Lista de _HTMLElement_ que al hacer click en ellos activan la lógica para moverse a la anterior pantalla

```
previousScreenTriggerList = []
```

-   **clickHandler** (_e: event_) _fn_: handler para los _click events_:

    -   Si `nextScreenTriggerList.some((item) => {item.contains(e.target)}) === true` entonces:

        -   Si `element.checkValidity() === true` entonces:

            -   Invoca _submitSessionForm_

            -   Invoca [carrousel.nextScreen](./carrousel.md#interfaz)

    -   Si `previousScreenTriggerList.some((item) => {item.contains(e.target)}) === true` entonces invoca [carrousel.previousScreen](./carrousel.md#interfaz)
