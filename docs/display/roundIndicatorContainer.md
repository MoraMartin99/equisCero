# roundIndicatorContainer _module_

## Responsabilidad

Representar un _roundIndicatorContainer_

## Constructor

```
roundIndicatorContainer(element: HTMLElement)
```

## Interfaz

-   **reset** _fn_: configura _element_ a sus valores iniciales:

    -   Invoca [elements.removeElementList](./elements.md#interfaz)(roundIndicatorList.map((item) => {item.getElement()}))
    -   `roundIndicatorList = []`

-   **init** (_totalRounds: number_) _fn_: Inicializa _element_:

    -   Invoca _reset_

    ```
    For(currentRound = 1; currentRound === totalRounds; currentRound++ ) {
        roundIndicator = new roundIndicator(elements.loadElement({templateId: "roundIndicator", parentElement: element, settings: {round: currentRound}}))
        roundIndicatorList.push(roundIndicator)
    }
    ```

-   **resetIndicatorsState** _fn_: resetea el _state_ de cada _item_ dentro de _roundIndicatorList_:

    -   `roundIndicatorList.forEach((item) => {item.reset()})`

-   **getElement** _fn_: retorna _element_

-   **setIndicatorState** (_round: number, stateId: string_) _async fn_: Aplica el _stateId_ al _roundIndicator_ asociado al _round_ y retorna una promesa:

    -   `roundIndicator = getRoundIndicatorObject(round)`
    -   Invoca `roundIndicator.reset?.()`
    -   retorna `Promise.resolve(roundIndicator.setState?.(stateId))`

-   **getNextRoundIndicator** _fn_: retorna el _roundIndicator_ que sucede directamente al _currentRoundIndicator_. Si _currentRoundIndicator_ no existe o es el ultimo item, entonces retorna `undefined`

    -   `currentRoundIndicatorIndex = roundIndicatorList.findLastIndex((item) => {item.getElement().matches(".player1Round, .player2Round, .drawRound, .currentRound")})`
    -   Si `currentRoundIndicatorIndex < 0` entonces retorna `undefined`
    -   Si `currentRoundIndicatorIndex >= 0` entonces retorna `Object(roundIndicatorList[currentRoundIndicatorIndex + 1]).getElement?.()`

## Implementación

-   **element** _HTMLElement_

-   **roundIndicatorList** _array_: Lista que contiene los [roundIndicator](./roundIndicator.md)

-   **getRoundIndicatorObject** (_round: number_) _fn_: retorna el _roundIndicator_ dentro de _roundIndicatorList_ que coincide con _round_ de la siguiente manera:

```
return Object(roundIndicatorList.find((item) => {
   data-round =  item.getElement().getAttribute("data-round")
   return data-round === String(round)
    }))
```
