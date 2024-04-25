# AnimationState _class_

## Responsabilidad

Representar un estado que se desea aplicar a un _HTMLElement_ utilizando sus clases y que activa un _animationEvent_. **Extiende [State](./State.md)**

## Constructor

```
AnimationState(classList: [class1: string, ...], animationName: string){
    super(classList)
    this.type = "animation"
    this.animationName = animationName
}
```

## Interfaz

## Implementación

-   **animationName** _string_: es la _animationName_ que reportará _animationEndEvent_
