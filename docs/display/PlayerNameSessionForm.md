# PlayerNameSessionForm _class_

## Responsabilidad

Representar los _sessionForm_ del _player1NameScreen y player2NameScreen_. **Esta clase extiende [AvatarSessionForm](./AvatarSessionForm.md)**

## Constructor

```
PlayerNameSessionForm(element: HTMLElement)
```

## Interfaz

-   **reset** _fn_: configura _element_ a sus valores iniciales:

    -   Invoca _super_.reset
    -   Invoca `activeTextInputState.remove(playerNameInput)`

-   **init** (_pattern: string_) _fn_: Inicializa _element_:

    -   Invoca _super_.init
    -   Invoca _playerNameInput_.addEventListener("focusout", _focusOutHandler_)
    -   Invoca [elements.updateElement](./elements.md#interfaz)(_playerNameInput_, {attributes: {addList: [{name: "pattern", value: pattern}...]}})

## Implementación

-   **nextScreenTriggerList** _array_: `[element.querySelector(".navigationButton.next")]`

-   **previousScreenTriggerList** _array_: `[element.querySelector(".navigationButton.previous")]`

-   **playerNameInput** _HTMLElement_: `element.querySelector(".playerNameInput")`

-   **focusOutHandler** (_e: event_) _fn_: handler para los _focusOut events_:

    ```
    activeTextInputState.apply(e.currentTarget)
    ```

-   **submitSessionForm** _fn_: extrae del _form_ la información necesaria para emitir un _submitEvent_:

    -   `fields = Object.fromEntries(new FormData(form))`
    -   `{playerName: value} = fields`
    -   _submitEvent_.trigger({eventName:"submitEvent", senderId: _element_.id, fields: {playerName: {id: "playerName", value}}})

-   **activeTextInputState** _object_: Estado aplicado a _playerNameInput_ cuando ocurre un _focusout event_ y que refleja que ha sido utilizado por el usuario

    ```
    State(["activeTextInput"])
    ```
