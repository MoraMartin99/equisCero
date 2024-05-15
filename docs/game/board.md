# board _module_

## Responsabilidad

manejar las acciones y estado del tablero

## Interfaz

-   **setCell** (_cellId: string, token: string_) _fn_: valida que el _cellId_ este vació con _isEmpty_ y coloca el _token_
-   **getCell** (_cellId: string_) _fn_: retorna la _cell_ asociada a _cellId_, si no existe retorna un objeto vacío
-   **reset** _fn_: restablece _cells_ a su estado inicial
-   **isEmpty** (_cellId: string_) _fn_: valida que _cells[cellId].token_ sea _undefined_
-   **getStatus** _fn_: retorna un objeto con las siguientes _key-values_

    ```
    status: {winnerMove: object, winnerToken: string, result: string}
    ```

    -   _winnerMove_ es un objeto que contiene las 3 _cells_ de una jugada ganadora en caso que exista, de lo contrario es un objeto vacío
    -   _winnerToken_ contiene el _cell.token_ de _winnerMove_, si no hay ganador entonces contiene _undefined_
    -   _result_ puede ser _"win"_ cuando hay un ganador, _"draw"_ cuando es un empate y _"noResult"_ cuando no se cumple ninguno de los anteriores

-   **getGroups** _fn_: retorna un objeto con todos los grupos de _cells_ necesarias para aplicar una jugada ganadora

    ```
    group: { rows: object, columns: object, diagonals: object, center: object, corners: object, edges: object }
    ```

## Implementación

-   **cells** _object_: estructura que contiene las _cells_

    ```
    valor inicial
    cells: {cellId: {cellId: string, row: string, column: string, token: undefined}, ...}

    - token cambia a string cuando recibe un token valido
    ```

-   **getAllRows** _fn_: retorna todas las filas

    ```
    rows: {row1: {cellId, ...}, ... row3}
    ```

-   **getAllColumns** _fn_: retorna todas las columnas

    ```
    columns: {columnA: {cellId, ...}, ... columnC}
    ```

-   **getAllDiagonals** _fn_: retorna todas las diagonales

    ```
    diagonals: {diagonal1: {"a1": {}, "b2": {}, "c3": {}}, diagonal2: {"a3": {}, "b2": {}, "c1": {}}}
    ```

-   **getCenter** _fn_: retorna el centro

    ```
    center: {...cells["b2"]}
    ```

-   **getCorners** _fn_: retorna las esquinas

    ```
    corners: {topLeft: {...cells["a1"]},...,bottomLeft: {...cells["a3"]}}
    ```

-   **getEdges** _fn_: retorna todas las _cells_ que rodean el centro pero que no son esquinas

    ```
    edges: {top: {...cells["b1"]}, ..., left: {...cells["a2"]}}
    ```
