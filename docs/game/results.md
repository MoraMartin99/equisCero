# results _module_

## Responsabilidad

Manejar los resultados de cada round

## Interfaz

-   **reset** _fn_: regresa _records_ a su valor inicial
-   **setRecord** (_round: number, result: string, winnerId: string o undefined_) _fn_: añade un nuevo registro a _records_
-   **getRecord** (_round: number_) _fn_: retorna _records[roundId]_
-   **getTotal** _fn_: retorna la estructura:

    ```
    total: {player1TotalWins: number, player2TotalWins: number, totalDraws: number, result: string, winnerId: string}
    ```

    -   _result_ puede contener _"win"_ o _"draw"_
    -   _winnerId_ puede contener `undefined` si `result === "draw"`, o `player.id`

## Implementación

-   **records** _object_: estructura que almacena los _records_

    ```
    records: {roundId: {roundId: string, result: string, winnerId: string}, ...}
    valor inicial {}
    ```

    -   _roundId_ puede contener valores del tipo _roundN_, por ejemplo _round1_, _round3_, etc
    -   _result_ puede contener _"win"_ o _"draw"_
    -   _winnerId_ puede contener `undefined` si `result === "draw"`, o `player.id`
