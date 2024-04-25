# TransitionState _class_

## Responsabilidad

Representar un estado que se desea aplicar a un _HTMLElement_ utilizando sus clases y que activa un _transitionEvent_. **Extiende [State](./State.md)**

## Constructor

```
TransitionState(classList: [class1: string, ...], propertyNameList: [property1: string, ...]){
    super(classList)
    this.type = "transition"
    this.propertyNameList = propertyNameList
}
```

## Interfaz

## Implementación

-   **propertyNameList** _array_: lista que contiene todas las _propertyName_ que reportara _transitionEndEvent_ al aplicar _classList_
