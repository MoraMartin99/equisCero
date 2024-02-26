# Carrousel _module_

## Responsabilidad

Responsable de la navegación entre screens

## Interfaz

-   **nextScreen** _fn_: responsable de desplazar al usuario a la siguiente screen usando [slideScreen](#implementación). Activa los [navigationEvent](./display.md#eventos) de tipo _start_ antes de llamara a [slideScreen](#implementación) y un [navigationEvent](./display.md#eventos) de tipo _end_ para _slideScreen.then()_.
-   **previousScreen** _fn_: responsable de desplazar al usuario a la anterior screen usando [slideScreen](#implementación). Activa los [navigationEvent](./display.md#eventos) de tipo _start_ antes de llamara a [slideScreen](#implementación) y un [navigationEvent](./display.md#eventos) de tipo _end_ para _slideScreen.then()_.
-   **goTo** _fn_: responsable de desplazar al usuario a la screen indicada usando [slideScreen](#implementación). Activa los [navigationEvent](./display.md#eventos) de tipo _start_ antes de llamara a [slideScreen](#implementación) y un [navigationEvent](./display.md#eventos) de tipo _end_ para _slideScreen.then()_.

## Implementación

-   **slideScreen** (_settings: {currentScreen: {screen: HTMLElement, stateId: string}, targetScreen: {screen: HTMLElement, stateId: string}}_) _async fn_: responsable de aplicar el mecanismo para moverse entre pantallas. retorna una promesa que se resuelve con _resolve({currentScreen: object, targetScreen: object, isApplied: true})_ si el _value_ regresado por [states.setStateList()](./states.md#interfaz)_.then_ contiene un [status](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled#status) de _fulfilled_ para todos sus _stateChange_ y se rechaza con _reject({currentScreen: object, targetScreen: object, isApplied: false})_
