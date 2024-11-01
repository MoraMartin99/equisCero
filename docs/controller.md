# Controller _class_

## Responsabilidad

Manejar la vista y el modelo

## Constructor

```
Controller(view, model, avatarProvider)
```

## Implementación

-   **playerIdList** _array_: Lista que contiene los playerId

-   **getQueryString** (_type: string_) _fn_: retorna una _queryString_ pseudoaleatoria según el _type_. _type_ puede ser _player_ o _cpu_.

-   **requestAvatars** _fn_: Solicita a _avatarProvider_ los avatares de _player1_, _player2_ y _cpu_

-   **avatarProviderSettings** _object_: Objeto que contiene la configuración de _providerId_ y _baseURL_ para _avatarProvider_

-   **avatarFallbackSources** _object_: Objeto que contiene los _src_ de respaldo para _player1_, _player2_ y _CPU_

-   **avatarGetterHandler** _(data: object) fn_: Handler para el _responseEvent_ de _avatarProvider_

-   **submitEventHandler** _(data: object) fn_: Handler para el _submitEvent_ del _view_

    _Nota_

    -   Es aquí donde randomizamos quien juega con las _x_ y los _0_ en _PVSCPU_

-   **navigationEventHandler** _(data: object) fn_: Handler para los _navigationEvent_ del _view_.

    _Nota_

    -   Es aquí donde detectamos cuando el _player_ se dirige al _gameScreen_ y configuramos el _view_ con los datos del juego

-   **gameStartEvent** _(data: object) fn_: Handler para _gameStartEvent_ de _model_

-   **nextPlayerEventHandler** _(data: object) fn_: Handler para _nextPlayerEvent_ de _model_

-   **interactionEvent** _(data: object) fn_: Handler para _interactionEvent_ de _view_

-   **moveEventHandler** _(data: object) fn_: Handler para _moveEvent_ de _model_

-   **roundEndEventHandler** _(data: object) fn_: Handler para _roundEndEvent_ de _model_

-   **gameEndEventHandler** _(data: object) fn_: Handler para _gameEndEvent_ de _model_
