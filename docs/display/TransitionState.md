# TransitionState _class_

## Responsabilidad

Representar un estado que se desea aplicar a un _HTMLElement_ utilizando sus clases y que activa un _transitionEvent_. **Extiende [State](./State.md)**

## Constructor

```
TransitionState(classList: [class1: string, ...], propertyNameList: [property1: string, ...]){
    super(classList)
    this.properties = {...this.properties, type: "transition", propertyNameList}
}
```

## Interfaz

## Implementación

-   **properties** _object_: Estructura que almacena las propiedades de _state_:

    -   **propertyNameList** _array_: lista que contiene todas las _propertyName_ que reportara _transitionEndEvent_ al aplicar _classList_

-   **hasValidProperties** (_properties: object_) _fn_: retorna `true` si las propiedades requeridas para el funcionamiento de _apply_ dentro de _properties_ están correctamente configuradas, de lo contrario retorna `false`:

    ```
    const isValidArray = (array) => {
        if(Array.isArray(array)) return Boolean(array.length)
        return false
    }
    return super.hasValidProperties(properties) AND isValidArray(getProperty(propertyNameList))
    ```

-   **createStateObserver** (_target: HTMLElement_) _fn_: Retorna un _stateObserver_ que cuando se inicializa con _stateObserver.init(onSuccessCallback)_ invoca _onSuccessCallback_ al confirmar que se aplicaron los cambios en _target_ especificados por _state_:

    ```
    let propertyNameListCopy = getProperty(propertyNameList)
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
