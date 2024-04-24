# AvatarManager _class_

## Responsabilidad

Manejar y configurar una lista de [AvatarImage](./AvatarImage.md)

## Constructor

```
AvatarManager(...imgElements: HTMLElement){
    this.avatarImageList = imgElements.map((item)=>{new avatarImage(item)})
}
```

## Interfaz

-   **setSources** (_src: string, resourceId: string_) _fn_: Configura para cada _item_ dentro de _avatarImageList_ el atributo _src_ si el _item_ puede ser asociado con _resourceId_:

    ```
    avatarImageList.forEach((item) => {
        if(item.getElement().classList.contains(resourceId)){
            item.setSrc(src)
        }
    })
    ```

-   **reset** _fn_: Configura cada item dentro de _avatarImageList_ a su estado inicial:

    ```
    avatarImageList.forEach((item) => {item.reset()})
    ```

## Implementación

-   **avatarImageList** _array_: Lista que contiene todos los [avatarImage](./AvatarImage.md)
