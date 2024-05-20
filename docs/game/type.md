# type _module_

## Responsabilidad

manejar el _gameType_

## Interfaz

-   **SetType** (_type: string_) _fn_: si _isValidType(type) = true_ entonces actualiza el nuevo valor de _type_
-   **getType** _fn_: retorna _type_
-   **reset** _fn_: regresa a _type_ a sus valores iniciales

## Implementación

-   **type** _let_: variable que contiene el _type_ actual. Su valor inicial es _undefined_

-   **typeList** _array_: Lista que contiene todos los tipos de juego:

    ```
    ["PVSP", "PVSCPU"]
    ```

-   **isValidType** (_type: string_) _fn_: Retorna `true` si _type_ esta incluido dentro de _typeList_, de lo contrario retorna `false`
