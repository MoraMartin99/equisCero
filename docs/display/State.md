# State _class_

## Responsabilidad

Representar un estado que se desea aplicar a un _HTMLElement_ utilizando sus clases y que es de aplicación inmediata, es decir, que no activa un _animationEvent_ ni un _transitionEvent_,

## Constructor

```
State(classList: [class1: string, ...]){
    this.type = "state"
    this.classList = classList
}
```

## Interfaz

## Implementación

-   **type** _string_: Representa el tipo de estado que se desea aplicar

-   **classList** _array_: Lista que contiene las clases necesarias para aplicar el estado
