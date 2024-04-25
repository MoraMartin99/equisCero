# states _module_

## Responsabilidad

Responsable de almacenar, aplicar y eliminar los estados como _class_, _transition_ y _animation_

## Interfaz

-   **setStateList** (_stateList: array, hasToWait: boolean_) _async fn_: si _hasToWait_ es _true_ (valor por default) entonces se invoca y retorna [stateQueue.add](./states/stateQueue.md#interfaz)(_stateList_) y si es _false_ se invoca y retorna [applyStateList](#implementación)(_stateList_).

    ```
    stateList = [stateChange:{stateId: string, target: HTMLElement}...]
    ```

-   **removeState** (_stateId: string, element: HTMLElement _) _fn_: responsable de eliminar de _element_ las clases que componen el _stateId_

-   **setMaxTolerableTime** (_seconds: number_) _fn_: responsable de establecer el _maxTolerableTime_

-   **isApplied** (_element: HTMLElement, stateIdList: [stateId: string, ...]_) _fn_: Retorna un `true` si _element_ tiene aplicada todas las _classList_ asociadas con todos los _stateId_ dentro de _stateIdList_, de lo contrario retorna `false`

## Implementación

-   [**library**](./states/library.md) _module_: responsable de almacenar los estados validos
-   **[stateQueue](./states/stateQueue.md)** _module_
-   **applyStateList** (_stateList: [stateChange: object, ...]_) _async fn_: Retorna una promesa que se resuelve cuando un arreglo de promesas creado con **applyState** están _settled_ utilizando _Promise.allSettled()_

    -   **applyState** (_stateChange:{stateId: string, target: HTMLElement}_) _fn_: retorna una promesa que se resuelve con _resolve({state: object, target: HTMLElement,isApplied = true})_ si se aplica el estado indicado y se rechaza si:

        -   _stateId_ o _target_ no son validos. se rechaza con _reject({state: object, target: HTMLElement, isApplied = false, reason : "invalid arguments"})_
        -   se supera _maxTolerableTime_. se rechaza con _reject({state: object, target: HTMLElement, isApplied = false, reason : "maxTolerableTime reached"})_

        Se le agregara un _promise.catch_ que se encargara de hacer un _console.error (con string substitution)_ para imprimir el error

        borrador:

        ```
        promise{
            if(stateId o target no son validos) reject()
            observeState({state, target, resolve, reject})
            elements.updateElement()
        }
        promise.catch((reason) => console.error("no se pudo aplicar el state: %o", reason))
        return promise
        ```

    -   **observeState** (_settings: {state:object, target: HTMLElement, externalResolve: fn, externalReject fn}_) _fn_: responsable de detectar si _target_ experimenta los cambios especificados por _state_ antes que se cumpla _maxTolerableTime_. Se declara una promesa que contiene los observadores:

        -   **mutationObserver** para _state.type = state_ que detectaría cuando se apliquen todas las clases de _state.classList_
        -   **transitionEndHandler** para _state.type = transition_ que eliminaría de una **copia** del array _state.propertyNameList_ la _propertyName_ detectada e invocaría _resolve_ cuando _state.propertyNameList.length_ = 0
        -   **animationEndHandler** para _state.type = animation_ que invocaría _resolve_ si _state.animationName = event.animationName_.

        La promesa se resuelve con _resolve({state: mutationObserver, transition: transitionEndHandler, animation: animationEndHandler})_ y se rechaza con el mismo objeto cuando un _setTimeout_ detecta que pasó el tiempo especificado por _maxTolerableTime_. Se encadena la promesa con un _Promise.then_ que ejecutaría _externalResolve_ y llamaría _removeObservers({state: mutationObserver, transition: transitionEndHandler, animation: animationEndHandler})_ y con un _Promise.catch_ que ejecutaría _externalReject_ y llamaría _removeObservers_.

        Borrador:

        ```
        observeState(settings:{state, target, externalResolve, externalReject})

        const removeObservers //elimina los observadores

        promise{

        const animationEndHandler
        const transitionEndHandler
        const mutationObserver

            if (state.type === "type"){
                mutObserver
                resolve({state: mutationObserver, transition: transitionEndHandler, animation: animationEndHandler})
            }

            ...

            setTimeout(reject({state: mutationObserver, transition: transitionEndHandler, animation: animationEndHandler}))
        }
        .then((value=>{
            removeObservers(value)
            externalResolve()
        }))
        .catch(reason=>{
            removeObservers(reason)
            externalReject()
        })

        ```

-   **maxTolerableTime** _string_: tiempo máximo en segundos que _applyState_ esperara antes de _reject_ la promesa. Default _10_
