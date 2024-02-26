# Actions _module_

## Responsabilidad

Responsable de ejecutar las acciones en la vista. Una **acción** es una función que:

-   depende de la funcionalidad de uno o varios módulos para cumplir un propósito especializado
-   es un manejador de eventos

## Interfaz

-   **init** _fn_: responsable de inicializar la vista:
    -   agregar los _click eventListeners_ para las screens:
        -   la _homeScreen_ requiere invocar [carrousel.nextScreen](./carrousel.md#interfaz) para moverse a la siguiente pantalla al seleccionar cualquier _radio_
        -   la _player1NameScreen, player2NameScreen y difficultyScreen_ si se presiona el _previousButton_ se invoca el [carrousel.previousScreen](./carrousel.md#interfaz), si se presiona el _nextButton_ se debera confirmar que el _input.checkValidity()_ sea _true_ para activar [carrousel.nextScreen](./carrousel.md#interfaz)
-   **loadInitialSettings** _fn_: responsable de cargar la configuración inicial como por ejemplo el regex para testear el playerName
-   **addComponent** _fn_: responsable de crear, insertar y agregar el estado de un elemento definido en la [librería de _elements_](./elements.md##Interfaz)
-   **dropToken** _fn_: responsable de agregar el token en la celda correspondiente al registrar un moveEvent de tipo valid, recordar también eliminar del board todas las animaciones de invalidMove (removiendo la clase)
-   **updateSessionInput** (_screen_: HTMLElement, _field_: string, _value_: string) _fn_: responsable de actualizar los input de session.
-   **updateImgListSrc** (_changeList: [{imgElement: HTMLElement, url: string}, ...]_) _fn_: responsable de actualizar el _src_ de una lista de _imgElement_
-   **setNoCurrentPlayer** _fn_: handler para [roundEndEvent](../game/game.md#eventos) y [navigationEvent](./display.md#eventos) de _type = start_ cuando _currentScreen.screen = gameScreen_ responsable de eliminar la clase _currentPlayer_ de _playerCardContainer_, configurando una especie de estado neutral en el que no hay _currentPlayer_
-   **interactionEventHandler** _fn_: handler de [interactionEvent](../display/display.md#eventos) para los siguientes casos:
    -   si `data.type === "nextRound"` entonces se deben aplicar los estilos adecuados a #roundIndicatorContainer
-   **responseEventHandler** _fn_: handler de [responseEvent](../avatarProvider.md#eventos) encargado de actualizar el _src_ de las imágenes en la _#homeScreen_ usando _updateImgListSrc_

## Implementación

-   **submitSessionForm** (_navigationEvent Data: Object_) _fn_: handler para [navigationEvent](./display.md#eventos) responsable de obtener, procesar y enviar la información de los _sessionForms_ (_la información contenida en el elemento data.currentScreen.screen_) activando [sessionEvent](./display.md#eventos). Se requiere de un comportamiento especial si el jugador selecciona _PVSCPU_ el cual consiste en seleccionar aleatoriamente si el jugador sera _player1_ o _player2_ para que el juego sea mas dinámico y justo
-   **resetSessionForms** (): handler para [interactionEvent](./display.md#eventos) de tipo _goHome_ que se encarga de resetear todos los _sessionForms_
-   **bodyClickHandler** (_e: object_) _fn_: handler para manejar los _click events_ en _body_. Define una serie de _arrays_ de elementos y su correspondiente handler, cuando se detecta que _e.target_ esta incluido dentro de la lista se invoca al handler usando [utilities.executeIfMatch](../utilities.md#interfaz):

    -   **list**

        -   **previousScreenTriggersList**: contiene todos los elementos que pretenden activar un [navigationEvent](./display.md#eventos) con `data.type === "previous"` como por ejemplo los _.navigationButton.previous_
        -   **nextScreenTriggersList**: contiene todos los elementos que pretenden activar un [navigationEvent](./display.md#eventos) con `data.type === "next"` como por ejemplo los _.gameTypeLabel, .navigationButton.next_
        -   **cellsList**: contiene todos los elementos _.cell_
        -   **pauseButtonList**: contiene todo los elementos _.pauseButton_
        -   **pauseOptionLabelList**: contiene todo los elementos _.pauseOptionLabel_
        -   **playButtonList**: contiene todo los elementos _.playButtonLabel_

    -   **callback**
    -   **matchCallback**: `matchCallback = (value, listItem) => listItem.contains(value.target)`
