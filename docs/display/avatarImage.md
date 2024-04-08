# avatarImage _class_

## Responsabilidad

Representar una _img_ que contiene un avatar

## Constructor

```
avatarImage(imgElement: HTMLElement)
```

## Interfaz

-   **setSrc** (_src: string_) _fn_: Configura el atributo _src_ de _imgElement_ utilizando [elements.updateElement](./elements.md#interfaz)(imgElement, {attributes: {addList: [{name: "src", value: src}...]}})

-   **getElement** _fn_: Regresa _imgElement_

-   **reset** _fn_: Elimina el el atributo _src_ de _imgElement_ utilizando [elements.updateElement](./elements.md#interfaz)(attributes: { removeList: [name: "src"]})

## Implementación

-   **imgElement** _HTMLElement_
