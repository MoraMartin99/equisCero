# avatarImage _class_

## Responsabilidad

Representar una _img_ que contiene un avatar

## Constructor

```
avatarImage(element: HTMLElement)
```

## Interfaz

-   **setSrc** (_src: string_) _fn_: Configura el atributo _src_ de _element_ utilizando [elements.updateElement](./elements.md#interfaz)(element, {attributes: {addList: [{name: "src", value: src}...]}})

-   **getElement** _fn_: Regresa _element_

-   **reset** _fn_: Elimina el el atributo _src_ de _element_ utilizando [elements.updateElement](./elements.md#interfaz)(attributes: { removeList: [name: "src"]})

## Implementación

-   **element** _HTMLElement_
