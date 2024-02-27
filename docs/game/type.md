# type _module_

## Responsabilidad

manejar el _gameType_

## Interfaz

-   **SetType** (_type: string_) _fn_: si _isValidType(type) = true_ entonces actualiza el nuevo valor de _type_
-   **getType** _fn_: retorna _type_
-   **reset** _fn_: regresa a _type_ a sus valores iniciales

## Implementación

-   **type** _let_: variable que contiene el _type_ actual. Su valor inicial es _undefined_
-   [library](./type/library.md)
-   **isValidType** (_type: string_) _fn_: comprueba que _type_ esta incluido en _library.getItem("validTypeList")_. Retorna _boolean_
