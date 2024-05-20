# turns (_playersIdList: array_) _module_

## Responsabilidad

Manejar los turnos. Se invoca con `turns(players.getPlayersIdList())`

## Interfaz

-   **getCurrentPlayerId** _fn_: retorna el ultimo _playerId_ de _queue_, si `queue.length = 0` retorna _undefined_
-   **nextTurn** _fn_: Responsable del cambio de turno. Agrega en _queue_ el _playerId_ correspondiente según las siguientes reglas:
    -   si `queue.length = 0` entonces `queue.push(playersIdList[0])`
    -   si `queue.length > 0 & queue[lastIndex] == playersIdList[0]` entonces `queue.push(playersIdList[1])`
    -   si `queue.length > 0 & queue[lastIndex] == playersIdList[1]` entonces `queue.push(playersIdList[0])`
-   **getCurrentTurn** _fn_: retorna `playersIdList.length`
-   **reset** _fn_: configura _queue_ a su valor inicial

## Implementación

-   **playersIdList** _array_: Arreglo ordenado que contiene _player1_ y luego _player2_
-   **queue** _array_: Arreglo que almacena los _playerId_ según su turno, su calor inicial es `[]`
