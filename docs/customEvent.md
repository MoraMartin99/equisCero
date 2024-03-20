# CustomEvent _class_

## Responsabilidad

Proveer un mecanismos para crear, activar, suscribir y anular suscripciones de eventos creados por el usuario

## Constructor

```
CustomEvent()
```

## Interfaz

-   **trigger** (_data: object_) _fn_: realiza un `subscribersList.forEach(callback => callback(data))`
-   **subscribe** (_callback: fn, appendFirst: boolean default false_) _fn_: realiza un `subscribersList.push(callback)`, si `appendFirst === true` entonces `subscribersList.unshift(callback)`
-   **unsubscribe** (_callback: fn_) _fn_: elimina de _subscribersList_ el _callback_

## Implementación

-   **subscribersList** _array_: estructura que almacena los _callback_
