# carrousel _module_

## Responsabilidad

Responsable de la navegación entre screens

## Interfaz

-   **nextScreen** _fn_: responsable de desplazar al usuario a la siguiente screen usando [slideScreen](#implementación). Activa los [navigationEvent](./display.md#eventos) de tipo _start_ antes de llamara a [slideScreen](#implementación) y un [navigationEvent](./display.md#eventos) de tipo _end_ para _slideScreen.then()_. Omite las _screen_ que contienen la clase _disable_.

-   **previousScreen** _fn_: responsable de desplazar al usuario a la anterior screen usando [slideScreen](#implementación). Activa los [navigationEvent](./display.md#eventos) de tipo _start_ antes de llamara a [slideScreen](#implementación) y un [navigationEvent](./display.md#eventos) de tipo _end_ para _slideScreen.then()_. Omite las _screen_ que contienen la clase _disable_.

-   **goTo** (_targetScreenId: string_) _fn_: responsable de desplazar al usuario a la screen indicada usando [slideScreen](#implementación). Activa los [navigationEvent](./display.md#eventos) de tipo _start_ antes de llamara a [slideScreen](#implementación) y un [navigationEvent](./display.md#eventos) de tipo _end_ para _slideScreen.then()_.

-   **disableScreen** (_targetScreenId: string_) _fn_: desactiva la _screen_ asociada con _targetScreenId_, haciéndola intransitable para _nextScreen_ y _previousScreen_:

    -   `screen = screenList.find((item) => {item.id === targetScreenId})`
    -   Invoca [states.setStateList](./states.md#interfaz)([{stateId: "disableScreen", target: screen}], false)

-   **enableAllScreens** _fn_: activa todas las _screen_, haciéndolas transitables para _nextScreen_ y _previousScreen_:

    -   `screenList.forEach((item) => {states.removeState("disableScreen", item)})`

## Implementación

-   **slideScreen** (_settings: {currentScreen: {screen: HTMLElement, stateId: string}, targetScreen: {screen: HTMLElement, stateId: string}}_) _async fn_: responsable de aplicar el movimiento entre pantallas. Retorna una promesa que se resuelve con _resolve({currentScreen: object, targetScreen: object, isApplied: true})_ si el _value_ regresado por [states.setStateList](./states.md#interfaz)_([{stateId: currentScreen.stateId, target: currentScreen.screen}, {stateId: targetScreen.stateId, target: targetScreen.screen}]).then_ contiene un [status](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled#status) de _fulfilled_ para todos sus _stateChange_ y se rechaza con _reject({currentScreen: object, targetScreen: object, isApplied: false})_. Se agregara un `promise.catch((reason) => console.error("no se pudo completar el desplazamiento: %o", reason))`

-   **screenList** _array_: `Array.from(document.querySelector("#carrousel .screen"))`

-   **getCurrentScreen** _fn_: Retorna `screenList.find((item) => {item.matches("")})`
