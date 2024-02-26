# Elements _module_

## Responsabilidad

Responsable de crear y modificar los HTMLElements

## Interfaz

-   **updateElement** (_element: HTMLElement, change: object_) _fn_: responsable de modificar elementos

```
change: {HTMLId: string, events: object, classes: object, attributes: object, content: string, styles: object }

events: {addList: [{event, handler}, ...], removeList: [{event, handler}, ...]}
classes: {addList: [class1, ...], removeList: [class1, ...]}
attributes: {addList: [{name: string, value: string}...], removeList: [name: string, ...]}
styles: {addList: [{propertyName: string, value: string}...], removeList: [propertyName: string, ...]}

- content se carga como innerHTML
```

-   **loadElement** (_templateId: string, parentElement: HTMLElement, settings: object_) _fn_: responsable de crear elementos basados en las templates de [**library**](./elements/library.md), configurarlos con _updateElement_ y _settings_ y agregarlos al DOM con _appendElement_

## Implementación

-   **appendElement** _fn_
-   [**library**](./elements/library.md) _module_
