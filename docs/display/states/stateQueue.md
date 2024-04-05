# stateQueue _module_

## Responsabilidad

responsable de aplicar los estados uno después del otro

## Interfaz

-   **add** (_stateList_) _async fn_: responsable de reasignar el valor de [queue](#implementación) a la promesa retornada por [applyStateList](../states.md#implementación)(_stateList_) encadenada con _Promise.then_ al valor original de [queue](#implementación):

    ```
    queue = queue.then(applyStateList(_stateList_))
    return queue
    ```

    -   retorna una promesa para poder encadenarse, este es el mecanismo para activar un [navigationEvent](../display.md#eventos) de tipo _end_
    -   este es el mecanismo responsable de encadenar los estados para que uno ocurra después del otro

## Implementación

-   **queue** _promise_: responsable de contener la promesa mas reciente retornada por [applyStateList](../states.md#implementación). Su valor inicial es _Promise.resolve()_
