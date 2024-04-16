# difficultySessionForm _class_

## Responsabilidad

Representar el _difficultySessionForm_ de _difficultyScreen_. **Esta clase extiende [sessionForm](./sessionForm.md)**

## Constructor

```
difficultySessionForm(element: HTMLElement)
```

## Interfaz

## Implementación

-   **nextScreenTriggerList** _array_: `[element.querySelector(".navigationButton.next")]`

-   **previousScreenTriggerList** _array_: `[element.querySelector(".navigationButton.previous")]`

-   **submitSessionForm** _fn_: extrae del _form_ la información necesaria para emitir un _submitEvent_:

    -   `fields = Object.fromEntries(new FormData(form))`
    -   `{difficultyRadio: value} = fields`
    -   _submitEvent_.trigger({eventName:"submitEvent", senderId: _element_.id, fields: {difficultyRadio: {id: "difficultyRadio", value}}})
