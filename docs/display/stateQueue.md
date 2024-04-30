# stateQueue _module_

## Responsabilidad

Responsable de agendar la aplicación de los _[State](./State.md) (Y sus subclases)_.

## Constructor

```
stateQueue(maxTolerableTime: number)
```

## Interfaz

-   **add** (_stateList = [ stateChange:{state: instancia de [State](./State.md), target: HTMLElement}... ]_) _async fn_: **Retorna una promesa** que se resuelve cuando un arreglo de promesas que representan la aplicación de los _stateChange_ están _settled_ (_resueltas o rechazadas_) y la reasigna como el nuevo valor de _queue_:

    ```
    queue = queue.then((value)=>{
        Promise.allSettled(stateList.map(({state, target}) => {state.apply(target, maxTolerableTime)}))
    })
    return queue
    ```

-   **setMaxTolerableTime** (_maxTolerableTime: number_) _fn_: configura _maxTolerableTime_

## Implementación

-   **maxTolerableTime** _number_: tiempo máximo en segundos que _applyState_ esperara antes de _reject_ la promesa. Default _10_

-   **queue** _promise_: responsable de contener la promesa mas reciente retornada por _add_. Su valor inicial es _Promise.resolve()_
