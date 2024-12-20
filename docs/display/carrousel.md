# carrousel _module_

## Responsabilidad

Responsable de la navegación entre screens

## Constructor

```
carrousel(carrouselElement: HTMLElement)
```

## Interfaz

-   **nextScreen** _fn_: Responsable de desplazar al usuario a la siguiente _screen_ usando [slideScreen](#implementación). Activa los [navigationEvent](./display.md#eventos). Omite las _screen_ que contienen la clase _disable_:

    ```
    currentScreen = getActiveScreen()

    settings = {currentScreen: {screen: currentScreen, state: slideCenterToLeftState}, targetScreen: {screen: getSiblingScreen(currentScreen, 1), state: slideRightToCenterState}}

    navigationEvent.trigger({eventName: "navigationEvent", type: "next", status: "start", currentScreen:{id: currentScreen.screen.id, state: currentScreen.state}, targetScreen:{id: targetScreen.screen.id, state: targetScreen.state}})

    slideScreen(settings).then((value) => {

        navigationEvent.trigger({eventName: "navigationEvent", type: "next", status: "end", currentScreen:{id: currentScreen.screen.id, state: currentScreen.state}, targetScreen:{id: targetScreen.screen.id, state: targetScreen.state}})

    })
    ```

-   **previousScreen** _fn_: Responsable de desplazar al usuario a la anterior _screen_ usando [slideScreen](#implementación). Activa los [navigationEvent](./display.md#eventos). Omite las _screen_ que contienen la clase _disable_:

    ```
    currentScreen = getActiveScreen()

    settings = {currentScreen: {screen: currentScreen, state: slideCenterToRightState}, targetScreen: {screen: getSiblingScreen(currentScreen, -1), state: slideLeftToCenterState}}

    navigationEvent.trigger({eventName: "navigationEvent", type: "previous", status: "start", currentScreen:{id: currentScreen.screen.id, state: currentScreen.state}, targetScreen:{id: targetScreen.screen.id, state: targetScreen.state}})

    slideScreen(settings).then((value) => {

        navigationEvent.trigger({eventName: "navigationEvent", type: "previous", status: "end", currentScreen:{id: currentScreen.screen.id, state: currentScreen.state}, targetScreen:{id: targetScreen.screen.id, state: targetScreen.state}})

    })
    ```

-   **goTo** (_targetScreenId: string_) _fn_: responsable de desplazar al usuario a la _screen_ indicada usando [slideScreen](#implementación). Activa los [navigationEvent](./display.md#eventos). Omite las _screen_ que contienen la clase _disable_:

    ```
    currentScreen = getActiveScreen()
    targetScreen = getScreenList().find((item) => {item.id === targetScreenId})

    settings = {currentScreen: {screen: currentScreen, state: slideCenterToLeftState}, targetScreen: {screen: targetScreen, state: slideRightToCenterState}}

    navigationEvent.trigger({eventName: "navigationEvent", type: "goTo", status: "start", currentScreen:{id: currentScreen.screen.id, state: currentScreen.state}, targetScreen:{id: targetScreen.screen.id, state: targetScreen.state}})

    slideScreen(settings).then((value) => {

        navigationEvent.trigger({eventName: "navigationEvent", type: "goTo", status: "end", currentScreen:{id: currentScreen.screen.id, state: currentScreen.state}, targetScreen:{id: targetScreen.screen.id, state: targetScreen.state}})

    })
    ```

-   **disableScreen** (_targetScreenId: string_) _fn_: desactiva la _screen_ asociada con _targetScreenId_, haciéndola intransitable para _nextScreen_ y _previousScreen_:

    -   `screen = getScreenList().find((item) => {item.id === targetScreenId})`
    -   Invoca _disableScreenState_.apply(screen, 0)

-   **enableAllScreens** _fn_: activa todas las _screen_, haciéndolas transitables para _nextScreen_ y _previousScreen_:

    ```
    getScreenList().forEach((item) => {disableScreenState.remove(item)})
    ```

## Implementación

-   **carrouselElement** _HTMLElement_

-   **slideScreen** (_settings: {currentScreen: {screen: HTMLElement, state: instancia de [State](./State.md)}, targetScreen: {screen: HTMLElement, state: instancia de [State](./State.md)}}_) _async fn_: **Retorna una promesa** que representa la ejecución del movimiento entre pantallas.

    ```
    async slideScreen (...){

        promise  = new Promise((resolve, reject) => {

            resetScreenListState([currentScreen.screen, targetScreen.screen])
            stateQueueSettledValuesArr = await stateQueue.add([ {state: currentScreen.state, target: currentScreen.screen}, {state: targetScreen.state, target: targetScreen.screen} ])

            if(stateQueueSettledValuesArr.every((item) => {item.status === "fulfilled"})){
                resolve({currentScreen targetScreen, isApplied: true})
            }

            reject({currentScreen, targetScreen, isApplied: false})

        })

        promise.catch((reason) => console.error("no se pudo completar el desplazamiento: %o", reason))

        return promise
    }
    ```

-   **getScreenList** _fn_: retorna `Array.from(carrouselElement.querySelector(".screen"))`

-   **getActiveScreen** _fn_: Retorna `getScreenList().find((item) => {item.matches(".activeScreen")})`

-   **getSiblingScreen** (_referenceScreen: HTMLElement, indexOffset: number_): Retorna el _screen_ con un _index_ relativo a _referenceScreen_ desplazado las posiciones indicadas por _indexOffset_. Ignora las _screen_ con la clase _disable_. Transforma _indexOffset_ para que siempre este contenido dentro de la longitud de la lista de _screens_. Si no se puede regresar _screen_, retorna `undefined`:

    ```
    screenList = getScreenList().filter((screen) => {
        return !disableScreenState.getProperty("classList").every((class) => {screen.classList.contains(class)})
        })

    referenceIndex = screenList.indexOf(referenceScreen)
    length = screenList.length
    if(referenceIndex < 0 OR !Number.isInteger(indexOffset)) return undefined
    targetIndex = (referenceIndex + indexOffset) % length > 0 ? (referenceIndex + indexOffset) % length : length + (referenceIndex + indexOffset) % length
    return screenList[targetIndex]
    ```

-   **disableScreenState** _object_: Estado aplicado a _screen_ cuando desee ignorarse dentro de _carrousel_ y no ser transitable. Aplica la clase _disable_

    ```
    State(["disable"])
    ```

-   **slideLeftToCenterState** _object_: Animación aplicada a _screen_ cuando se requiera que se mueva de la izquierda del _carrousel_ al centro:

    ```
    AnimationState(["slideLeftToCenter", "activeScreen"], "slideLeftToCenter")
    ```

-   **slideCenterToRightState** _object_: Animación aplicada a _screen_ cuando se requiera que se mueva de el centro a la derecha del _carrousel_:

    ```
    AnimationState(["slideCenterToRight", "inactiveRightScreen"], "slideCenterToRight")
    ```

-   **slideRightToCenterState** _object_: Animación aplicada a _screen_ cuando se requiera que se mueva de la derecha del _carrousel_ al centro:

    ```
    AnimationState(["slideRightToCenter", "activeScreen"], "slideRightToCenter")
    ```

-   **slideCenterToLeftState** _object_: Animación aplicada a _screen_ cuando se requiera que se mueva del centro a la izquierda del _carrousel_:

    ```
    AnimationState(["slideCenterToLeft", "inactiveLeftScreen"], "slideCenterToLeft")
    ```

-   **resetScreenListState** (_screenList: [screenElement1, ...]_): Elimina de cada _item_ dentro de _screenList_ _slideLeftToCenterState_, _slideCenterToRightState_, _slideRightToCenterState_ y _slideCenterToLeftState_:

    ```
    screenList.forEach((item) => {
        [slideLeftToCenterState, slideCenterToRightState, slideRightToCenterState, slideCenterToLeftState].forEach((state) => {state.remove(item)})
    })
    ```
