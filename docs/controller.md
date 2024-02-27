# Controller

## Responsabilidad

Manejar la vista y el modelo

## Interfaz

## Implementación

-   **getPlayerAvatarQS** _fn_: responsable de retornar la query string adecuada para obtener los avatares de los jugadores a [avatarProvider](./avatarProvider.md)
-   **getCPUAvatarQS** _fn_: responsable de retornar la query string adecuada para obtener el avatar del CPU a [avatarProvider](./avatarProvider.md)
-   **init** _fn_: responsable de iniciar la app. Deberia llamar [_display.actions.init_](./display/actions.md) y a [_avatarProvider.getAvatars_](./avatarProvider.md)
-   **matchInputWithSession** (_data_: object de navigationEvent): método para reflejar los datos de session en la interfaz como por ejemplo cargar los nombres en los input y seleccionar correctamente los radio de dificultad. Activado por un [_navigationEvent_](./display/display.md) de tipo previous. Obtiene la información de [_game.session_](./game/game.md) e invoca [_display.action.updateSessionInput_](./display/actions.md) para aplicar los cambios.
