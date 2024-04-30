# AnimationState _class_

## Responsabilidad

Representar un estado que se desea aplicar a un _HTMLElement_ utilizando sus clases y que activa un _animationEvent_. **Extiende [State](./State.md)**

## Constructor

```
AnimationState(classList: [class1: string, ...], animationName: string){
    super(classList)
    this.properties = {...this.properties, type = "animation", animationName}
}
```

## Interfaz

## Implementación

-   **properties** _object_: Estructura que almacena las propiedades de _state_:

    -   **animationName** _string_: es la _animationName_ que reportará _animationEndEvent_

-   **hasValidProperties** (_properties: object_) _fn_: retorna `true` si las propiedades requeridas para el funcionamiento de _apply_ dentro de _properties_ están correctamente configuradas, de lo contrario retorna `false`:

    ```
    const isValidString = (string) => {
        if(Boolean(typeof string === "string")) return Boolean(string.length)
        return false
    }
    return super.hasValidProperties(properties) AND isValidString(getProperty(animationName))
    ```

-   **createStateObserver** (_target: HTMLElement_) _fn_: Retorna un _stateObserver_ que cuando se inicializa con _stateObserver.init(onSuccessCallback)_ invoca _onSuccessCallback_ al confirmar que se aplicaron los cambios en _target_ especificados por _state_:

    ```
    function handler (e){
        const onSuccessCallback = this.onSuccessCallback
        const animationName = e.animationName
        if(animationName === getProperty("animationName")) onSuccessCallback()
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
