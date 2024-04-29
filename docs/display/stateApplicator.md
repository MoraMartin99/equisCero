# stateApplicator _module_

## Responsabilidad

Responsable de aplicar los _[State](./State.md) (Y sus subclases)_ inmediatamente o agendar su aplicación.

## Constructor

```
stateApplicator(maxTolerableTime: number)
```

## Interfaz

-   **setStateList** (_stateList = [ stateChange:{state: instancia de [State](./State.md), target: HTMLElement}... ], hasToWait: boolean_) _fn_: Responsable de aplicar _stateList_. **Siempre retorna una promesa**:

    -   Si _hasToWait_ es `true` (valor por default) entonces:

        -   Invoca y retorna [stateQueue.add](./states/stateQueue.md#interfaz)(_stateList_)

    -   Si _hasToWait_ es `false` entonces:

        -   Invoca y retorna [applyStateList](#implementación)(_stateList_)

## Implementación

-   **maxTolerableTime** _number_: tiempo máximo en segundos que _applyState_ esperara antes de _reject_ la promesa. Default _10_

-   **[stateQueue](./states/stateQueue.md)** _module_

-   **applyStateList** (_stateList = [ stateChange:{state: instancia de [State](./State.md), target: HTMLElement}... ]_) _async fn_: **Retorna una promesa** que se resuelve cuando un arreglo de promesas que representan la aplicación de los _stateChange_ están _settled_ (_resueltas o rechazadas_):

    -   **observeState** (_state:object, target: HTMLElement_) _fn_: **Retorna una promesa** que representan si _target_ experimentó los cambios especificados por _state_ antes que se cumpla _maxTolerableTime_.

        ```
        const createObserver = (state:object, target: HTMLElement, ) => {

            let propertyNameListCopy = Array.of(state.propertyNameList).flat()

            function transitionHandler (e) {
                const onSuccessCallback = this.onSuccessCallback
                const propertyName = e.propertyName
                propertyNameListCopy = propertyNameListCopy.filter((item) => {!Boolean(item === propertyName)})
                if(propertyNameListCopy.length) onSuccessCallback()
            }
            function animationHandler (e) {
                const onSuccessCallback = this.onSuccessCallback
                const animationName = e.animationName
                if(animationName === state.animationName) onSuccessCallback()
            }
            const observers = {
            transition: {eventName: "transitionEnd", handler: transitionHandler},
            animation: {eventName: "animationEnd", handler: animationHandler}
        }
            const init = (onSuccessCallback: function) => {
                const currentObserver = {...Object(observers[state.type], onSuccessCallback)}
                if(Boolean(currentObserver.eventName) AND Boolean(currentObserver.handler)){
                    target.addEventListener(currentObserver.eventName, currentObserver.handler)
                }else{
                    currentObserver.onSuccessCallback()
                }

            }
            const disable = () => {
                const currentObserver = {...Object(observers[state.type])}
                if(Boolean(currentObserver.eventName) AND Boolean(currentObserver.handler)){
                    target.removeEventListener(currentObserver.eventName, currentObserver.handler)
                }
            }

            return {init, disable}
        }

        const observer = createObserver(state, target)

        const promise = new Promise((resolve, reject) => {
            observer.init(resolve)
            setTimeout(() => {
                reject("maxTolerableTime reached")
                }, maxTolerableTime)
        })

        promise.finally(() => {
            observer.disable()
        })

        return promise
        ```

    -   **applyState** (_stateChange:{state: instancia de [State](./State.md), target: HTMLElement}_) _fn_: **Retorna una promesa** que representan la aplicación de _stateChange_:

        ```
        new Promise((resolve, reject) => {

            if(!Boolean(Object(state) instanceof State) OR !utilities.isElement(target)) {
                reject({state, target, isApplied: false, reason: "invalid arguments"})
            }

            observeState(state, target)
            elements.updateElement(target, {classes: {addList: state.classList}})
            observeState.then((value) => {
                resolve({state: object, target: HTMLElement,isApplied = true})
            })
            observeState.catch((reason) => {
                reject({state, target, isApplied: false, reason: "invalid arguments"}) REVISAR REASON
            })

        })
        ```
