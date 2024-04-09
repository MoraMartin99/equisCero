# playerCard _class_

## Responsabilidad

Representar un _playerCard_

## Constructor

```
playerCard(cardElement: HTMLElement)
```

## Interfaz

-   **getElement** _fn_: retorna _cardElement_

-   **reset** _fn_: regresa _cardElement_ a su estado inicial:

    -   [elements.updateElement](./elements.md)(playerName, {content: ""})
    -   avatarImage.reset()

-   **setCard** (_{name: string, src: string, isCurrentPlayer: boolean}_): configura _cardElement_:

    -   [elements.updateElement](./elements.md)(playerName, {content: name})
    -   Si `isCurrentPlayer === true` entonces invoca [states.setStateList](./states.md#interfaz)([{stateId: "currentPlayer", target: cardElement}])
    -   Si `isCurrentPlayer === false` entonces invoca [states.removeState](./states.md#interfaz)("currentPlayer", cardElement)
    -   _avatarImage_.setSrc(src)

## Implementación

-   **cardElement** _HTMLElement_

-   **avatarImage** _object_: _new [avatarImage](./avatarImage.md)(cardElement.querySelector(".avatarImage"))_

-   **playerName** _HTMLElement_: cardElement.querySelector(".playerName")
