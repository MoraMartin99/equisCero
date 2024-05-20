# rounds _module_

## Responsabilidad

manejar los rounds:

-   configurar y obtener _totalRounds_
-   configurar y obtener _currentRound_

## Interfaz

-   **setTotalRounds** _(rounds: string) fn_: Configura _totalRounds_:

    ```
    if(isValidTotalRounds(rounds)) totalRounds = rounds
    ```

-   **getTotalRounds** _fn_: retorna _totalRounds_

-   **getCurrentRound** _fn_: retorna _currentRound_

-   **next** _fn_: Incrementa en 1 el valor de _currentRound_:

    ```
    currentRound++
    ```

-   **reset** _fn_: actualiza _totalRounds_ y _currentRound_ a sus valores iniciales

-   **resetCurrentRound** _fn_: actualiza _currentRound_ a sus valor inicial

## Implementación

-   **totalRounds** _number_: rounds totales de la partida. Valor inicial _undefined_

-   **currentRound** _number_: round actual. **Valor inicial 1**

-   **totalRoundList** _array_: Lista que contiene todos los _totalRounds_ válidos:

    ```
    ["1", "3", "5]
    ```

-   **isValidTotalRounds** (_totalRounds: string_) _fn_: Retorna `true` si _totalRounds_ esta incluido dentro de _totalRoundList_, de lo contrario retorna `false`
