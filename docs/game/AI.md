# AI _module_

## Responsabilidad

seleccionar los movimientos de _player_ si el _game.type_ es _PVSCPU_

## Interfaz

-   **init** (_player: object_) _fn_: responsable de activar el modulo:
    -   se deberá escuchar el evento [nextPlayerEvent](./game.md#eventos) cuando _nextPlayerId_ = _playerId_
-   **disconnect** _fn_: responsable de invocar [nextPlayerEvent.unsubscribe()](./game.md#eventos)

## Implementación

-   **delayTime** _string_: responsable de almacenar el tiempo de retraso en segundos que tardar el modulo en
