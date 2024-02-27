# Library _class_

## Constructor

```
Library (records: object, fallbackValue: anything)
```

## Responsabilidad

encapsular información y proveer métodos seguros para consultarla

## Interfaz

-   **getItem** (_itemId: string_) _fn_: retorna una [_basicDeepCopy_](./utilities.md#interfaz) del item asociado al _itemId_, si no existe retorna _fallbackValue_
-   **getAllItems** _fn_: retorna una [_basicDeepCopy_](./utilities.md#interfaz) de _records_, si no existe retorna _fallbackValue_

## Implementación
