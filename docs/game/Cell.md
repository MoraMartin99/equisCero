# Cell _class_

## Responsabilidad

Representar una celda del tablero

## Constructor

```
Cell(column: string, row: number){
    this.#properties = {row, column, id: "${column}${row}" token: undefined}
}
```

## Interfaz

-   **getProperty** _(name: string) fn_: retorna `return structuredClone(this.#properties[name])`

-   **getAllProperties** _fn_: retorna `return structuredClone(this.#properties)`

-   **setToken** _(token: string) fn_: Configura _token_:

    ```
    this.#properties["token"] = token
    ```

-   **reset** _fn_: Configura _token_ a su valor inicial

## Implementación
