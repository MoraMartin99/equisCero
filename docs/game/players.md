# Players _module_

## Responsabilidad

configurar a los _players_

## Interfaz

-   **setPlayer** (_settings: {id: string, name: string, role: string}_) _fn_: responsable de configurar a los jugadores.

-   **reset** _fn_: responsable de resetear los _playersGroup_ y _avatarURL_ a sus valores iniciales

-   **getPlayerById** (_id: string_) _fn_: retorna el jugador asociado con _id_ usando [utilities.basicDeepCopy](../utilities.md#interfaz), si no existe retorna `{}`

-   **getAllPlayers** _fn_: retorna _playersGroup_ usando [utilities.basicDeepCopy](../utilities.md#interfaz)

-   **getPlayerByToken** (_token: string_) _fn_: retorna el jugador asociado con _token_ usando [utilities.basicDeepCopy](../utilities.md#interfaz), si no existe retorna `{}`

-   **getPlayersIdList** _fn_: retorna un _array_ que contiene los _id_ de los jugadores ordenados según su _token_, primero las _x_ y luego los _0_. Si no existe retorna `[]`

-   **getCPUPlayer** _fn_: retorna al _player_ `player.type === "CPU"`, si no existe regresa `{}`

-   **getNamePattern** _fn_: retorna _namePattern_

## Implementación

-   **playersGroup** _object_: estructura que contiene a los _players_

    ```
    valores iniciales

    playersGroup: {player1: {id: "player1", name: "player1", role: undefined, getAvatarURL: fn, token: "x"},
    player2: {id: "player2", name: "player2", role: undefined, getAvatarURL: fn, token: "0"}}

    getAvatarURL = ()=>{
        if(this.role === "CPU")return avatarURL.CPU
        if(this.role === "user")return avatarURL.player1
        return avatarURL[this.id]
    }
    ```

    -   _role_ es exclusivo para `type.getType() === "PVSCPU"` y sus valores pueden ser _CPU_ para identificar al _player_ que representa a la computadora y _user_ para representar al usuario

-   **avatarURL** _object_: estructura en la que se almacenan los urls de los avatares:

    ```
    valores iniciales
    avatarURL: {player1: undefined, player2: undefined, CPU: undefined}
    ```

-   **namePattern** _string_: expresión regular ([ajustada a la sintaxis del atributo _pattern_](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/pattern#examples)) que define los valores aceptados para _player.name_:
    ```
    namePattern = ""
    ```

Requerimientos:

-   existen _player1_ con el `token = "x"` y _player2_ con el `token = "0"`
-   se pueden modificar los _players_ en cualquier momento y sin fricción
-   en caso que el cliente requiera jugar contra cpu, aleatoriamente se decidirá si el cliente sera _player1_ o _player2_
