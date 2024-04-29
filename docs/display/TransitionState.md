# TransitionState _class_

## Responsabilidad

Representar un estado que se desea aplicar a un _HTMLElement_ utilizando sus clases y que activa un _transitionEvent_. **Extiende [State](./State.md)**

## Constructor

```
TransitionState(classList: [class1: string, ...], propertyNameList: [property1: string, ...]){
    super(classList)
    this.type = "transition"
    this.propertyNameList = propertyNameList
}
```

## Interfaz

## Implementación

-   **propertyNameList** _array_: lista que contiene todas las _propertyName_ que reportara _transitionEndEvent_ al aplicar _classList_

-   **createStateObserver** (_state: object, target: HTMLElement_) _fn_: Retorna un _stateObserver_ que cuando se inicializa con _stateObserver.init(onSuccessCallback)_ invoca _onSuccessCallback_ al confirmar que se aplicaron los cambios en _target_ especificados por _state_:

    ```
    let propertyNameListCopy = [...state.propertyNameList]
    function handler (e){
        const onSuccessCallback = this.onSuccessCallback
        const propertyName = e.propertyName
        propertyNameListCopy = propertyNameListCopy.filter((item) => {!Boolean(item === propertyName)})
        if(!propertyNameListCopy.length) onSuccessCallback()
    }
    let eventSettings =  {name: "transitionEnd", handler}
    const {name, handler} = eventSettings

    const init = (onSuccessCallback: function) => {
        eventSettings = {...eventSettings, onSuccessCallback}
        element.addEventListener(name, handler)
    }

    const disable = () => element.removeEventListener(name, handler)

    return {init, disable}
    ```
