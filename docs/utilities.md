# Utilities _class_

## Responsabilidad

proveer utilidades varias

## Interfaz

-   **basicDeepCopy** (_data: anything_) _fn_: retorna una _deep copy_ con las siguientes consecuencias:

    -   los datos primitivos se copian sin efecto secundario
    -   los objetos literales se desestructuran a otros objetos literales
    -   los array-like (_sets, nodeList, ..._) se desestructuran a arrays
    -   todos lo datos no mencionados antes permanecen igual, se entregan los originales

-   **getRandomNumbersFromRange** (_min: number, max: number, quantity: number_) _fn_: regresa un _array_ que contiene la _quantity_ de números enteros aleatorios unicos en el rango de _min_ hasta _max_. _quantity_ por defecto es `1`

-   **getRandomItemByProbability** (_[{item: anything, probability: number}, ...]_) _fn_: regresa un _item_ seleccionado aleatoriamente y condicionado por su _probability_.

-   **isElement** (_element: HTMLElement_) _fn_: retorna un `boolean` que representa si _element_ es un _HTMLElement_:

## Implementación
