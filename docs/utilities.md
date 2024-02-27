# Utilities _class_

## Responsabilidad

proveer utilidades varias

## Interfaz

-   **basicDeepCopy** (_data: anything_) _fn_: retorna una _deep copy_ con las siguientes consecuencias:
    -   los datos primitivos se copian sin efecto secundario
    -   los objetos literales se desestructuran a otros objetos literales
    -   los array-like (_sets, nodeList, ..._) se desestructuran a arrays
    -   todos lo datos no mencionados antes permanecen igual, se entregan los originales
-   **executeIfMatch** (_caseList: [case: {list: array, callback: fn}...], value: anything, matchCallback(value, listItem): fn_): _value_ es comparado con cada _item_ de _case.list_ usando _matchCallback(value, case.list[n])_, si hay un match, se ejecuta _case.callback(value)_ y se detiene la iteración

## Implementación
