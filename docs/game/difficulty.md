# difficulty _module_

## Responsabilidad

Manejar el nivel de dificultad del juego

## Interfaz

-   **reset** _fn_: actualiza _currentLevel_ a su valor inicial

-   **setLevel** (_level: string_) _fn_: Configura el valor de _currentLevel_:

    ```
    if(isValid(level)) currentLevel = level
    ```

-   **getLevel** _fn_: retorna _currentLevel_

## Implementación

-   **currentLevel** _string_: almacena el nivel de dificultad actual, su valor inicial es `undefined`

-   **levelList** _array_: Lista que contiene los niveles de dificultad validos:

    ```
    ["normal", "hard"]
    ```

-   **isValid** (_level: string_) _fn_: retorna `true` si _level_ esta incluido dentro de _levelList_, de lo contrario retorna `false`
