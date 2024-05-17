# RoundIndicator _class_

## Responsabilidad

Representar un _roundIndicator_

## Constructor

```
RoundIndicator(element: HTMLElement)
```

## Interfaz

-   **getElement** _fn_: retorna _element_

-   **reset** _fn_: regresa _element_ a sus estado inicial:

    ```
    [player1RoundState, player2RoundState, drawRoundState, currentRoundState].forEach((state) => {state.remove(element)})
    ```

-   **setState** (_stateId: string_) _async fn_: configura el _state_ de _element_. **Retorna un promesa**:

    -   Invoca _reset_

    ```
    states = {player1RoundState, player2RoundState, drawRoundState, currentRoundState}
    return Promise.resolve(Object(states[stateId]).apply?.(element))
    ```

## Implementación

-   **element** _HTMLElement_

-   **player1RoundState** _object_: Transición que se aplica a _element_ cuando _player1_ gano el round

    ```
    new TransitionState(["player1"], ["background-color"])
    ```

-   **player2RoundState** _object_: Transición que se aplica a _element_ cuando _player2_ gano el round

    ```
    new TransitionState(["player2"], ["background-color"])
    ```

-   **drawRoundState** _object_: Transición que se aplica a _element_ cuando hay un empate

    ```
    new TransitionState(["draw"], ["background-color"])
    ```

-   **currentRoundState** _object_: Transición que se aplica a _element_ cuando inicia un round

    ```
    new TransitionState(["current"], ["background-color"])
    ```
