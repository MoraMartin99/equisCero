# roundIndicator _class_

## Responsabilidad

Representar un _roundIndicator_

## Constructor

```
roundIndicator(element: HTMLElement)
```

## Interfaz

-   **getElement** _fn_: retorna _element_

-   **reset** _fn_: regresa _element_ a sus estado inicial:

```
["player1Round", "player2Round", "drawRound", "currentRound"].forEach((item) => {
    states.removeState(item, element)
    })
```

-   **setState** (_stateId: string_) _async fn_: configura el _state_ de _element_. Retorna un promesa:

    -   Invoca _reset_
    -   retorna [states.setStateList](./states.md#interfaz)([{stateId, target: element}], false)

## Implementación

-   **element** _HTMLElement_
