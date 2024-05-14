# players _module_

## Responsabilidad

Configurar y manejar a los _players_

## Interfaz

-   **setPlayer** (_settings: {id: string, name: string, role: string}_) _fn_: Responsable crear un _player_:

    ```
    if(!Boolean(typeof id === "string") OR !Boolean(id)) return
    playersGroup.set(id, new Player({id, name, role, avatarSources}))
    ```

-   **reset** _fn_: responsable de resetear los _playersGroup_ y _avatarSources_ a sus valores iniciales:

    ```
    [playersGroup, avatarSources].forEach((item) => {item.clear()})
    ```

-   **getPlayerById** (_id: string_) _fn_: retorna el jugador asociado con _id_ , si no existe retorna `{}`:

    ```
    return Object(Object(playersGroup.get(id)).getAllProperties())
    ```

-   **getAllPlayers** _fn_: retorna _playersGroup_:

    ```
    return Object.fromEntries([...playersGroup].map(([key]) => {[key, getPlayerById(key)]}))
    ```

-   **getPlayerByToken** (_token: string_) _fn_: retorna el jugador asociado con _token_ , si no existe retorna `{}`:

    ```
    return getPlayerByPropertyValue("token", token)
    ```

-   **getPlayersIdList** _fn_: retorna un _array_ que contiene los _id_ de los jugadores ordenados según su _order_, si no existe retorna `[]`

    ```
    return Object.values(getAllPlayers).sort((a, b) => {a.order - b.order}).map((item) => {item.id})
    ```

-   **getCPUPlayer** _fn_: retorna al _player_ `player.role === "CPU"`, si no existe regresa `{}`

    ```
    return getPlayerByPropertyValue("role", "CPU")
    ```

-   **getNamePattern** _fn_: retorna _namePattern_

-   **setAvatarSource** _({url: string, id: string}) fn_: Agrega un _source_ a _avatarSources_:

    ```
    if(!Boolean(typeof id === "string") OR !Boolean(id)) return
    avatarSources.set(id, url)
    ```

## Implementación

-   **namePattern** _string_: expresión regular ([ajustada a la sintaxis del atributo _pattern_](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/pattern#examples)) que define los valores aceptados para _player.name_:

    ```
    namePattern = ""
    ```

-   **playersGroup** _map_: Estructura que contiene a los _players_:

    ```
    {player1: object, player2: object}
    ```

    -   Su valor inicial es un _map_ vacío

-   **avatarSources** _map_: Estructura en la que se almacenan los urls de los avatares:

    ```
    {player1: string, player2: string, CPU: string}
    ```

    -   Su valor inicial es un _map_ vacío

-   **getPlayerByPropertyValue** _(name: string, value: anything) fn_: retorna un _player_ según el valor de una propiedad:

    ```
    id = Object([...playersGroup.entries()].find((item) => {item.getProperty(name) === value})).getProperty("id")
    return getPlayerById(id)
    ```
