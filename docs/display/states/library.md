# library _module_

## Responsabilidad

responsable de almacenar los estados validos. Es una instancia de [_Library_](../../library.md)

## Instanciación

```
fallbackValue: undefined

records = {stateId1, stateId2, ...}

si type es "state":
stateId:{stateId: string, type: string, classList: array }

si type es "transition":
stateId:{stateId: string, type: string, classList: array, propertyNameList: array  }

si type es "animation":
stateId:{stateId: string, type: string, classList: array, animationName: string }

- classList es el arreglo de clases a aplicar al target
- propertyNameList es el arreglo que contiene todas las propertyName que reportara transitionEndEvent al aplicar classList
- animationName es la animationName que reportara animationEndEvent
- type = "state" cuando se requiera de un cambio instantáneo
- type = "transition" cuando se requiera de un cambio que utiliza css transition
- type = "animation" cuando se requiera de un cambio que utiliza css animation
```
