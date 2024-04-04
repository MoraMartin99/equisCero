# Elements _module_

## Responsabilidad

Responsable de crear y modificar los HTMLElements

## Interfaz

-   **updateElement** (_element: HTMLElement, change: object_) _fn_: responsable de modificar _element_ y retornarlo

```
change: {HTMLId: string, events: object, classes: object, attributes: object, content: string, styles: object }

events: {addList: [{event, handler}, ...], removeList: [{event, handler}, ...]}
classes: {addList: [class1, ...], removeList: [class1, ...]}
attributes: {addList: [{name: string, value: string}...], removeList: [name: string, ...]}
styles: {addList: [{propertyName: string, value: string}...], removeList: [propertyName: string, ...]}

- content se carga como innerHTML
```

-   **loadElement** (_{templateId: string, parentElement: HTMLElement, settings: object, order: number}_) _fn_: responsable de crear elementos basados en templates de [**library**](./elements/library.md) y retornarlos:
    -   Obtiene el _template_ asociado a _templateId_ usando [library.getItem(templateId)](../library.md#interfaz)
    -   Invoca [template.setTemplate(settings)](./elements/library.md) para configurar _template.change_
    -   Crea un elemento HTML usando _createElement(template.HTMLTag)_
    -   Configura el elemento usando _updateElement_
    -   Inserta el elemento usando _appendElement_

## Implementación

-   **appendElement** (_targetElement: HTMLElement, parentElement: HTMLElement, order: number opcional_) _fn_: Inserta _targetElement_ como decendiente directo de _parentElement_ en el orden indicado por _order_, si _order_ es _undefined_ o no puede ser aplicado se insertara _targetElement_ como el ultimo hijo de _parentElement_
-   **createElement** (_HTMLTag: string_) _fn_: crea un elemento HTML basado en _HTMLTag_ y lo retorna. Si _HTMLTag_ no es _string_ retorna `{}`
-   [**library**](./elements/library.md) _module_
