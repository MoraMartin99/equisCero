# rounds _module_

## Responsabilidad

manejar los rounds:

-   configurar y obtener _totalRounds_
-   configurar y obtener _currentRound_

## Interfaz

-   **setTotalRounds** (_totalRounds: string_) _fn_: comprueba si _isValidTotalRounds(totalRounds) = true_ y actualiza el valor de _totalRounds_
-   **getTotalRounds** _fn_: retorna _totalRounds_
-   **getCurrentRound** _fn_: retorna _currentRound_
-   **next** _fn_: se actualiza el valor de _currentRound_ a `currentRound++`
-   **reset** _fn_: actualiza _totalRounds_ y _currentRound_ a sus valores iniciales
-   **resetCurrentRound** _fn_: actualiza _currentRound_ a sus valor inicial

## Implementación

-   **totalRounds** _string_: rounds totales de la partida. Valor inicial _undefined_
-   **currentRound** _string_: round actual. Valor inicial 1

-   **totalRoundList** _array_: Lista que contiene todos los _totalRounds_ válidos:

    ```
    ["1", "3", "5]
    ```

-   **isValidTotalRounds** (_totalRounds: string_) _fn_: Retorna `true` si _totalRounds_ esta incluido dentro de _totalRoundList_, de lo contrario retorna `false`
