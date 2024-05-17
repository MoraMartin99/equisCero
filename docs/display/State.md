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

-   **apply** (_target: HTMLElement, maxTolerableTime: number_) _fn_: **Retorna una promesa** que representan la aplicación del _state_:

        ```
        const applyStatePromise =  new Promise((resolve, reject) => {

            if(!hasValidProperties(getAllProperties()) OR !utilities.isElement(target)) {
                reject({state: this, target, isApplied: false, reason: "invalid arguments"})
            }
            const observerPromise = observeElement(target, maxTolerableTime)
            elements.updateElement(target, {classes: {addList: getProperty("classList")}})
            observerPromise.then((value) => {
                resolve({state: this, target,isApplied = true})
            })
            observerPromise.catch((reason) => {
                reject({state: this, target, isApplied: false, reason})
            })
        })

        applyStatePromise.catch((reason) => {console.error("no se pudo aplicar el estado: %o", reason)})

        return applyStatePromise
        ```

-   **remove** (_target: HTMLElement_) _fn_: remueve de _target_ las clases dentro de _properties.classList_

    ```
    elements.updateElement(target, {classes: {removeList: [...getProperty("classList")]}})
    ```

-   **getProperty** (_name: string_) _fn_: Retorna la propiedad asociada a _name_:

    ```
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

-   **hasValidProperties** (_properties: object_) _fn_: retorna `true` si las propiedades requeridas para el funcionamiento de _apply_ dentro de _properties_ están correctamente configuradas, de lo contrario retorna `false`:

    ```
    return Array.isArray(properties.classList)
    ```

-   **observeElement** (_element: HTMLElement, maxTolerableTime: number = 10_) _fn_: **Retorna una promesa** que representan si _target_ experimentó los cambios especificados por _state_ antes que se cumpla _maxTolerableTime_ (_por defecto son 10s_):

    ```
    maxTolerableTime = Number.isNaN(Number(maxTolerableTime))? 10 : maxTolerableTime
    const observer = createObserver(target)

    const promise = new Promise((resolve, reject) => {
        observer.init(resolve)
        setTimeout(() => {
            reject("maxTolerableTime reached")
            }, maxTolerableTime * 1000)
    })

    promise.finally(() => {
        observer.disable()
    })

    return promise
    ```

    -   Se resuelve con _resolve()_
    -   Se rechaza con _reject("maxTolerableTime reached")_

-   **createStateObserver** (_target: HTMLElement_) _fn_: Retorna un _stateObserver_ que cuando se inicializa con _stateObserver.init(onSuccessCallback)_ invoca _onSuccessCallback_ al confirmar que se aplicaron los cambios en _target_ especificados por _state_:

    ```
    const classList = getProperty("classList");
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
