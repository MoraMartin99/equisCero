# playerCardContainer _class_

## Responsabilidad

Representar un _playerCardContainer_

## Constructor

```
playerCardContainer(element: HTMLElement)
```

## Interfaz

-   **getElement** _fn_: retorna _element_

-   **reset** _fn_: regresa _element_ a su estado inicial:

    -   [elements.updateElement](./elements.md)(playerName, {content: ""})
    -   avatarImage.reset()

-   **setCard** (_{name: string, src: string, isCurrentPlayer: boolean}_): configura _element_:

    -   [elements.updateElement](./elements.md)(playerName, {content: name})
    -   Si `isCurrentPlayer === true` entonces invoca [states.setStateList](./states.md#interfaz)([{stateId: "currentPlayer", target: _element_}])
    -   Si `isCurrentPlayer === false` entonces invoca [states.removeState](./states.md#interfaz)("currentPlayer", _element_)
    -   _avatarImage_.setSrc(src)

## Implementación

-   **element** _HTMLElement_

-   **avatarImage** _object_: _new [avatarImage](./avatarImage.md)(cardElement.querySelector(".avatarImage"))_

-   **playerName** _HTMLElement_: cardElement.querySelector(".playerName")
