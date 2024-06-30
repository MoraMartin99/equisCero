# Controller _class_

## Responsabilidad

Manejar la vista y el modelo

## Implementación

### Eventos

-   **sessionEvent**: activado cuando se requiera actualizar información de la sesión del modelo. Instancia de [customEvent](./customEvent.md)

    ```
    data:{eventName:string, changes: {field: value, ...} }
    ```

    donde **field** puede ser:

    -   **type**, donde su _value_ es _string_
    -   **totalRounds**, donde su _value_ es _string_
    -   **difficultyLevel**, donde su _value_ es _string_
    -   **players**, donde su _value_ es `{ Id: {name: string, Id: string, role: string OR undefined}, ... }`

### Métodos

-   **display** _module_: Instancia de [display](./display/display.md)

-   **game** _module_: Instancia de [game](./game/game.md)

-   **avatarProvider** _module_: Instancia de [avatarProvider](./avatarProvider.md):

-   **init** _fn_: responsable de inicializar la aplicación:

    -   Invocar [_game.init_](./game/game.md#interfaz)
    -   Invocar [_display.init_](./display/display.md#interfaz)({pattern: [game.getNamePattern](./game/game.md#interfaz)})
    -   subscribirse a los eventos de _display_:

        -   [display.navigationEvent](./display/display.md#eventos).subscribe([game.navigationEventHandler](./game/game.md#interfaz))
        -   [display.navigationEvent](./display/display.md#eventos).subscribe(_navigationEventHandler_)
        -   [display.interactionEventHandler](./display/display.md#eventos).subscribe([game.interactionEventHandler](./game/actions.md#interfaz))
        -   [display.interactionEventHandler](./display/display.md#eventos).subscribe(_interactionEventHandler_)
        -   [display.submitEvent](./display/display.md#eventos).subscribe(_submitEventHandler_)

    -   subscribirse a los eventos de _game_:

        -   [game.moveEvent](./game/game.md#eventos).subscribe([display.moveEventHandler](./display/display.md#interfaz), _true_)
        -   [game.nextPlayerEvent](./game/game.md#eventos).subscribe([display.nextPlayerEventHandler](./display/display.md#interfaz), _true_)
        -   [game.roundEndEvent](./game/game.md#eventos).subscribe([display.roundEndEventHandler](./display/display.md#interfaz))
        -   [game.gameEndEvent](./game/game.md#eventos).subscribe([display.gameEndEventHandler](./display/display.md#interfaz))

    -   subscribirse a los eventos de _avatarProvider_:

        -   [responseEvent](./avatarProvider.md#eventos).subscribe([display.responseEventHandler](./display/display.md))
        -   [responseEvent](./avatarProvider.md#eventos).subscribe([game.responseEventHandler](./game/game.md))

    -   subscribirse a los eventos de _controller_:

        -   [sessionEvent](#eventos).subscribe([game.sessionEventHandler](./game/game.md#interfaz))

    -   Invocar _requestAvatars_

-   **getQueryString** (_type: string_) _fn_: retorna una _queryString_ pseudoaleatoria según el _type_. _type_ puede ser _player_ o _cpu_.

-   **requestAvatars** _fn_: Solicita a [avatarProvider](./avatarProvider.md) los avatares de _player1_, _player2_ y _cpu_ usando [_avatarProvider.getAvatars_](./avatarProvider.md#interfaz)([{resourceId: "player1", queryString: getQueryString("player"), fallbackAvatarURL: ...}, ...])

-   **navigationEventHandler** (_data: object_) _fn_: handler de [navigationEvent](./display/display.md#eventos) para los siguientes casos:

    -   si `data.status === "start" & data.targetScreen.id = "gameScreen"` entonces:

        -   `player1 = game.getPlayerById("player1")`

        -   `player2 = game.getPlayerById("player2")`

        -   [display.setGameScreen](./display/display.md)({player1: { playerId: player1.id, name: player1.name, src: player1.avatarSource}, ..., totalRounds: game.getTotalRounds})

-   **interactionEventHandler** _fn_: handler de [navigationEvent](./display/display.md#eventos) para los siguientes casos:

    -   si `data.type === "goHome"` entonces invoca _requestAvatars()_

-   **submitEventHandler** (_data: object_) _fn_: handler de [submitEvent](./display/display.md#eventos) para los siguientes casos:

    -   Si `data.senderId === "homeMenu"` entonces:

        -   Se obtiene `{totalRounds, type} === data.fields.gameTypeRadio`

        -   Se invoca `sessionEvent.trigger({eventName:"sessionEvent", changes: {type, totalRounds}})`

    -   Si `data.senderId === "player1NameMenu"` entonces:

        -   Se obtiene `{value: name} === data.fields.playerName`, Si `Boolean(name) === false` entonces `name === "player1"`

        -   Si `game.getType() === "PVSP"` entonces se invoca `sessionEvent.trigger({eventName:"sessionEvent", changes : { players : {player1: {name, Id: "player1", role: undefined}}}})`

        -   Si `game.getType() === "PVSCPU"` entonces se reasignara el _player.id_ aleatoriamente para _player1_ y _player2_ para mantener el juego justo:

        ```
        const playersIdList = ["player1", "player2"]
        const userPlayerId = playersIdList[Math.round( Math.random() * (playersIdList.length - 1))]
        const cpuPlayerId = playersIdList.filter((item)=> item !== userPlayerId)[0]

        sessionEvent.trigger({eventName:"sessionEvent", changes: { players: { [userPlayerId]: { name, Id: userPlayerId, role: "user" }, [cpuPlayerId]: {name: "CPU", Id: cpuPlayerId, role: "CPU"} } } })
        ```

    -   Si `data.senderId === "player2NameMenu"` entonces:

        -   Se obtiene `{value: name} === data.fields.playerName`, Si `Boolean(name) === false` entonces `name === "player2"`

        -   Se invoca `sessionEvent.trigger({eventName:"sessionEvent", changes: { players: { player2: {name, Id: "player2", role: undefined} } }})`

    -   Si `data.senderId === "difficultyScreen"` entonces:

        -   Se obtiene `{value: difficultyLevel} === data.fields.difficultyRadio`

        -   Se invoca `sessionEvent.trigger({eventName:"sessionEvent", changes: { difficultyLevel }]})`
