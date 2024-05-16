# board _module_

## Responsabilidad

manejar las acciones y estado del tablero

## Interfaz

-   **init** _fn_: Inicializa el _cells_:

    ```
    for column of columnList{
        for row of rowList{
            cell = new Cell(column, row)
            cells[cell.getProperty("id")] = cell
        }
    }
    ```

-   **reset** _fn_: restablece _cells_ a su estado inicial:

    ```
    Object.values(cells).forEach((item) => {item.reset()})
    ```

-   **getCell** (_cellId: string_) _fn_: retorna la [cell.getAllProperties()](./Cell.md#interfaz) asociada a _cellId_, si no existe retorna `{}`:

    ```
    return Object(Object(cells[cellId]).getAllProperties?.())
    ```

-   **isEmpty** (_cellId: string_) _fn_: Retorna `true` si `Object(cells[cellId]).getProperty?.("token") === undefined`, de lo contrario retorna `false`

-   **setCell** (_cellId: string, token: string_) _fn_: Configura la propiedad _token_ de la _cell_ asociada con _cellId_ si esta vacía:

    ```
    if(isEmpty(cellId)) Object(cells[cellId]).setToken?.(token)
    ```

-   **getGroups** _fn_: retorna un objeto con todos los grupos de _cells_ necesarias para aplicar una jugada ganadora

    ```
    return group: {
    rows: getAllRows(),
    columns: getAllColumns(),
    diagonals: getAllDiagonals(),
    center: getCenter(),
    corners: getCorners(),
    edges: getEdges()
    }
    ```

-   **getStatus** _fn_: retorna un objeto con las siguientes _key - values_:

    ```
    winnerMove =  getWinnerMove()
    winnerToken = Object(Object.values(winnerMove)[0]).token
    result = winnerToken !== undefined ? "win" : isFull() ? "draw" : "noResult"
    return status: { winnerMove, winnerToken, result }
    ```

    -   _winnerToken_ contiene el _cell.token_ de _winnerMove_, si no hay ganador entonces contiene `undefined`

    -   _result_ puede ser _"win"_ si ``, _"draw"_ cuando es un empate y _"noResult"_ cuando no se cumple ninguno de los anteriores

## Implementación

-   **cells** _object_: estructura que contiene las _cells_

-   **columnList** _array_: `["A", "B", "C"]`

-   **rowList** _array_: `[1, 2, 3]`

-   **isFull** _fn_: retorna `true` si todas las _cell_ tienen _token_ asignados, de lo contrario retorna `false`:

    ```
    return Object.keys(cells).every((key) => {!isEmpty(key)})
    ```

-   **getAllRows** _fn_: retorna todas las filas

    ```
    rows: {row1: {cellId: getCell(cellId), ...}, ... row3}
    ```

-   **getAllColumns** _fn_: retorna todas las columnas

    ```
    columns: {columnA: {cellId: getCell(cellId), ...}, ... columnC}
    ```

-   **getAllDiagonals** _fn_: retorna todas las diagonales

    ```
    diagonals: {diagonal1: {"A1": getCell("A1"), "B2": ..., "C3": ...}, diagonal2: {"A3": ..., "B2": ..., "C1": ...}}
    ```

-   **getCenter** _fn_: retorna el centro

    ```
    return getCell("B2")
    ```

-   **getCorners** _fn_: retorna las esquinas

    ```
    return  {topLeft: getCell("A1"), ...,bottomLeft: getCell("A3")}
    ```

-   **getEdges** _fn_: retorna todas las _cells_ que rodean el centro pero que no son esquinas

    ```
    return  {top: getCell("B1"), ..., left: getCell("a2")}
    ```

-   **getWinnerMove** _fn_: regresa un objeto que agrupa las 3 _cells_ que conforman una linea horizontal, vertical o diagonal con un mismo _token_, si no existe retorna `{}`

    ```
    areEqual = (array) => {array.every((item) => {item === array[0]})}

    for groupGetter of [getAllRows, getAllColumns, getAllDiagonals]{
        for group of Object.values(groupGetter()){
            if(areEqual(Object.values(group).map(({token}) => {token}))){
                return group
            }
        }
    }
    return {}
    ```
