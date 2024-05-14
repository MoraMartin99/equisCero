# Player _class_

## Responsabilidad

Representar jugador

## Constructor

    ```
    Player({id: string, name: string, role: string, avatarSources: object}){
        settings: {player1: {token: "x", order: 1}, player2: {token: "0", order: 2}}
        this.#properties = {id, name, role, token: Object(settings[id]).token, order: Object(settings[id]).order}
        this.#avatarSources = avatarSources
    }
    ```

-   _order_ determine el orden el cual los jugadores deben jugar, primero las _x_ y luego los _0_

## Interfaz

-   **getProperty** _(name: string) fn_: retorna `return structuredClone(this.#properties[name])`

-   **getAllProperties** _fn_: retorna `return {...structuredClone(this.#properties), avatarSource: getAvatarSource()}`

-   **getAvatarSource** _fn_: retorna el _url_ del _avatar_:

    ```
    if(getProperty("role") === "CPU") return this.#avatarSources.CPU
    if(getProperty("role") === "user") return this.#avatarSources.user
    return this.#avatarSources.get(getProperty("id"))
    ```

## Implementación
