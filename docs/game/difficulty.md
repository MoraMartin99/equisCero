# difficulty _module_

## Responsabilidad

Manejar el nivel de dificultad del juego

## Interfaz

-   **reset** _fn_: actualiza _level_ a su valor inicial
-   **setLevel** (_level: string_) _fn_: si `isValid(level) === true` entonces actualiza el valor de _level_
-   **getLevel** _fn_: retorna _level_

## Implementación

-   **level** _string_: almacena el nivel de dificultad, su valor inicial es `undefined`
-   **[library](./difficulty/library.md)** _module_
-   **isValid** (_level: string_) _fn_: valida si _level_ esta incluido dentro de [library.getItem("validLevelList")](./difficulty/library.md)
