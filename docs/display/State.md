# State _class_

## Responsabilidad

Representar un estado que se desea aplicar a un _HTMLElement_ utilizando sus clases y que es de aplicación inmediata, es decir, que no activa un _animationEvent_ ni un _transitionEvent_,

## Constructor

```
State(classList: [class1: string, ...]){
    this.properties = {type: "state", classList}
}
```

## Interfaz

-   **apply** (_element: HTMLElement_) _fn_: Aplica el _state_ a _element_:
-   **getProperty** (_name: string_) _fn_: Retorna la propiedad asociada a _name_:

    ```
    elements.updateElement(target, {classes: {addList: state.classList}})
    return structuredClone(properties[name])
    ```

-   **getAllProperties** _fn_: retorna _properties_

    ```
    return structuredClone(properties)
    ```

## Implementación

-   **properties** _object_: Estructura que almacena las propiedades de _state_:

    -   **type** _string_: Representa el tipo de estado que se desea aplicar

    -   **classList** _array_: Lista que contiene las clases necesarias para aplicar el estado

    ```

-   **observeElement** (_element: HTMLElement, maxTolerableTime: number = 10_) _fn_: **Retorna una promesa** que representan si _target_ experimentó los cambios especificados por _state_ antes que se cumpla _maxTolerableTime_ (_por defecto son 10s_):

    ```
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

    -   Se resuelve con _resolve()_
    -   Se rechaza con _reject("maxTolerableTime reached")_

-   **createStateObserver** (_state: object, target: HTMLElement_) _fn_: Retorna un _stateObserver_ que cuando se inicializa con _stateObserver.init(onSuccessCallback)_ invoca _onSuccessCallback_ al confirmar que se aplicaron los cambios en _target_ especificados por _state_:

    ```
    const { [...classList] } = state;
    let mutationObserver

    const init = (onSuccessCallback: function) => {
        const callback = ([{ target }], observer) => {
            const hasAllClasses = (target, classList) => {
                return classList.every((currentClass) => target.classList.contains(currentClass));
            };
            if (hasAllClasses(target, classList)) {
                onSuccessCallback()
            }
        };
        mutationObserver = new MutationObserver(callback);
        mutationObserver.observe(element, { attributeFilter: ["class"] });
    }

    const disable = () => {Object(mutationObserver).disconnect?.()}

    return {init, disable}
    ```
