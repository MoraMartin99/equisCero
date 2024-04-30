# PlayerCardContainer _class_

## Responsabilidad

Representar un _playerCardContainer_

## Constructor

```
PlayerCardContainer(element: HTMLElement)
```

## Interfaz

-   **getElement** _fn_: retorna _element_

-   **reset** _fn_: regresa _element_ a su estado inicial:

    -   invoca [elements.updateElement](./elements.md#interfaz)(element, {styles: {addList: [{propertyName: "transitionDuration", value: "0s"}]}})
    -   Invoca _setCard_({name: "", isCurrentPlayer: false})
    -   Invoca _avatarImage_.reset()
    -   invoca [elements.updateElement](./elements.md#interfaz)(element, {styles: {removeList: ["transitionDuration"]}})

-   **setCard** (_{name: string, src: string, isCurrentPlayer: boolean}_): configura _element_:

    -   [elements.updateElement](./elements.md)(playerName, {content: name})
    -   Si `isCurrentPlayer === true` entonces invoca `currentPlayerState.apply(element)`
    -   Si `isCurrentPlayer === false` entonces invoca `currentPlayerState.remove(element)`
    -   _avatarImage_.setSrc(src)

## Implementación

-   **element** _HTMLElement_

-   **avatarImage** _object_: _new [AvatarImage](./AvatarImage.md)(cardElement.querySelector(".avatarImage"))_

-   **playerName** _HTMLElement_: cardElement.querySelector(".playerName")

-   **currentPlayerState** _object_: transición que se aplica en el cambio de turno al _playerCardContainer_

        ```
        new TransitionState(["currentPlayer"], ["background-color", "row-gap", "color", "font-size", "height", "width"])
        ```
