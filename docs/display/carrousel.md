# Carrousel _module_

## Responsabilidad

Responsable de la navegación entre screens

## Interfaz

-   **nextScreen** _fn_: responsable de desplazar al usuario a la siguiente screen usando [slideScreen](#implementación). Activa los [navigationEvent](./display.md#eventos) de tipo _start_ antes de llamara a [slideScreen](#implementación) y un [navigationEvent](./display.md#eventos) de tipo _end_ para _slideScreen.then()_. Omite las _screen_ que contienen la clase _disable_.

-   **previousScreen** _fn_: responsable de desplazar al usuario a la anterior screen usando [slideScreen](#implementación). Activa los [navigationEvent](./display.md#eventos) de tipo _start_ antes de llamara a [slideScreen](#implementación) y un [navigationEvent](./display.md#eventos) de tipo _end_ para _slideScreen.then()_. Omite las _screen_ que contienen la clase _disable_.

-   **goTo** (_targetScreen: HTMLElement_)_fn_: responsable de desplazar al usuario a la screen indicada usando [slideScreen](#implementación). Activa los [navigationEvent](./display.md#eventos) de tipo _start_ antes de llamara a [slideScreen](#implementación) y un [navigationEvent](./display.md#eventos) de tipo _end_ para _slideScreen.then()_.

## Implementación

-   **slideScreen** (_settings: {currentScreen: {screen: HTMLElement, stateId: string}, targetScreen: {screen: HTMLElement, stateId: string}}_) _async fn_: responsable de aplicar el movimiento entre pantallas. Retorna una promesa que se resuelve con _resolve({currentScreen: object, targetScreen: object, isApplied: true})_ si el _value_ regresado por [states.setStateList](./states.md#interfaz)_([{stateId: currentScreen.stateId, target: currentScreen.screen}, {stateId: targetScreen.stateId, target: targetScreen.screen}]).then_ contiene un [status](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled#status) de _fulfilled_ para todos sus _stateChange_ y se rechaza con _reject({currentScreen: object, targetScreen: object, isApplied: false})_. Se agregara un `promise.catch((reason) => console.error("no se pudo completar el desplazamiento: %o", reason))`
