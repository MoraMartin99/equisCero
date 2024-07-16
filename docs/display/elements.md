# elements _module_

## Responsabilidad

Responsable de crear y modificar los HTMLElements

## Interfaz

-   **updateElement** (_element: HTMLElement, change: object_) _fn_: responsable de modificar _element_ y retornarlo

    ```
    change: {HTMLId: string, events: object, classes: object, attributes: object, content: string, styles: object }

    events: {itemsToAdd: [{event: string, handler: fn}, ...], itemsToRemove: [{event: string, handler: fn}, ...]}

    classes: {itemsToAdd: [class1, ...], itemsToRemove: [class1, ...]}

    attributes: {itemsToAdd: [{name: string, value: string}...], itemsToRemove: [name, ...]}

    styles: {itemsToAdd: [{propertyName: string, value: string}...], itemsToRemove: [propertyName: string, ...]}
    ```

    -   _content_ se carga como innerHTML

-   **removeElementList** (_elementList: [element: HTMLElement, ...]_) _fn_: Remueve del dom todos los _element_ de _elementList_

-   **appendElement** (_targetElement: HTMLElement, parentElement: HTMLElement, order: number opcional_) _fn_: Inserta y retorna _targetElement_ como descendiente directo de _parentElement_ en el orden indicado por _order_, si _order_ es _undefined_ o no puede ser aplicado se insertara _targetElement_ como el ultimo hijo de _parentElement_

## Implementación
