# type _module_

## Responsabilidad

Manejar el _gameType_

## Interfaz

-   **setType** (_type: string_) _fn_: Configura el valor de _currentType_:

    ```
    if(isValidType(type)) currentType = type
    ```

-   **getType** _fn_: retorna _currentType_

-   **reset** _fn_: regresa a _currentType_ a sus valores iniciales

## Implementación

-   **currentType** _string_: variable que contiene el _type_ actual. Su valor inicial es `undefined`

-   **typeList** _array_: Lista que contiene todos los tipos de juego:

    ```
    ["PVSP", "PVSCPU"]
    ```

-   **isValidType** (_type: string_) _fn_: Retorna `true` si _type_ esta incluido dentro de _typeList_, de lo contrario retorna `false`
