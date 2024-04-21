# PlayerNameSessionForm _class_

## Responsabilidad

Representar los _sessionForm_ del _player1NameScreen y player2NameScreen_. **Esta clase extiende [SessionForm](./SessionForm.md)**

## Constructor

```
PlayerNameSessionForm(element: HTMLElement)
```

## Interfaz

-   **reset** _fn_: configura _element_ a sus valores iniciales:

    -   Invoca [form.reset](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/reset)
    -   Invoca [states.removeState](./states.md#interfaz)( (stateId: "activeTextInput", element: playerNameInput))

-   **init** (_pattern: string_) _fn_: Inicializa _element_:

    -   Invoca _element_.addEventListener("click", _clickHandler_)
    -   Invoca _playerNameInput_.addEventListener("focusout", _focusOutHandler_)
    -   Invoca [elements.updateElement](./elements.md#interfaz)(_playerNameInput_, {attributes: {addList: [{name: "pattern", value: pattern}...]}})

## Implementación

-   **nextScreenTriggerList** _array_: `[element.querySelector(".navigationButton.next")]`

-   **previousScreenTriggerList** _array_: `[element.querySelector(".navigationButton.previous")]`

-   **playerNameInput** _HTMLElement_: `element.querySelector(".playerNameInput")`

-   **focusOutHandler** (_e: event_) _fn_: handler para los _focusOut events_:

    -   [states.setStateList](./states.md#interfaz)(stateList: [{stateId: "activeTextInput", element: e.currentTarget}], hasToWait: false)

-   **submitSessionForm** _fn_: extrae del _form_ la información necesaria para emitir un _submitEvent_:

    -   `fields = Object.fromEntries(new FormData(form))`
    -   `{playerName: value} = fields`
    -   _submitEvent_.trigger({eventName:"submitEvent", senderId: _element_.id, fields: {playerName: {id: "playerName", value}}})
