# homeSessionForm _class_

## Responsabilidad

Representar el _sessionForm_ del _home_. **Esta clase extiende [SessionForm](./SessionForm.md)**

## Constructor

```
homeSessionForm(element: HTMLElement)
```

## Interfaz

## Implementación

-   **submitSessionForm** _fn_: extrae del _form_ la información necesaria para emitir un [submitEvent](./display.md#eventos):

    -   `fields = Object.fromEntries(new FormData(form))`
    -   `type = String(Array.of(fields.gameTypeRadio.match(/(?<= )[a-zA-Z]+$/)).flat()[0])`
    -   `totalRounds = Number(Array.of(fields.gameTypeRadio.match(/^\d(?= )/)).flat()[0])`
    -   _submitEvent_.trigger({eventName:"submitEvent", senderId: _element_.id, fields: {gameTypeRadio: {id: "gameTypeRadio", type, totalRounds}}})

-   **nextScreenTriggerList** _array_: Lista de _HTMLElement_ que al hacer click en ellos activan la lógica para moverse a la siguiente pantalla

```
nextScreenTriggerList = Array.from(element.querySelectorAll(".unstyledRadio"))
```
