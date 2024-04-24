# AvatarSessionForm _class_

## Responsabilidad

Representar un _sessionForm_ que contiene una o mas [_avatarImage_](./AvatarImage.md). **Extiende [SessionForm](./SessionForm.md)**

## Constructor

```
AvatarSessionForm(element: HTMLElement)
```

## Interfaz

-   **reset** _fn_: configura _element_ a sus valores iniciales:

    -   Invoca _super_.reset
    -   Invoca _avatarManager_.reset

-   **setAvatarSources** (_src: string, resourceId: string_) _fn_: Configura para cada _avatarImage_ dentro de _avatarManager_ el atributo _src_ si el _item_ puede ser asociado con _resourceId_:

    -   Invoca _avatarManager_.setSources(_src, resourceId_)

## Implementación

-   **avatarManager** _object_: _new [AvatarManager](./AvatarImage.md)(...element.querySelectorAll("img.avatarImage"))_
