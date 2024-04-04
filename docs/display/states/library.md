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
stateId:{stateId: string, type: string, classList: array, propertyNameList: array }

si type es "animation":
stateId:{stateId: string, type: string, classList: array, animationName: string }
```

-   _classList_ es el arreglo de clases a aplicar al _target_
-   _propertyNameList_ es el arreglo que contiene todas las _propertyName_ que reportara _transitionEndEvent_ al aplicar _classList_
-   _animationName_ es la _animationName_ que reportara _animationEndEvent_
-   `type === "state"` cuando se requiera de un cambio instantáneo
-   `type === "transition"` cuando se requiera de un cambio que utiliza _css transition_
-   `type === "animation"` cuando se requiera de un cambio que utiliza _css animation_

## Lista de estados

-   **invalidMove**: estado aplicado a una celda cuando hay un movimiento invalido. Realmente podria ser tratado como una animacion, pero debido a que es infinita no es conveniente tratarla como tal
-   **vanish**: transición aplicada a una celda invalida para desvanecer el efecto de _invalidMove_
-   **smoothPopOut**: transición que se aplica cuando se insertan los tokens
-   **currentPlayer**: transición que se aplica en el cambio de turno
-   **drawResult**: transición que se aplica al _board_ cuando hay un empate
-   **player1Cell**: transición que se aplica a la _cell_ cuando forma parte de _winnerMove_ y _winnerId_ es _player1_
-   **player2Cell**: transición que se aplica a la _cell_ cuando forma parte de _winnerMove_ y _winnerId_ es _player2_
-   **player1Round**: transición que se aplica a _roundIndicator_ cuando _player1_ gano el round
-   **player2Round**: transición que se aplica a _roundIndicator_ cuando _player2_ gano el round
-   **drawRound**: transición que se aplica a _roundIndicator_ cuando hay un empate
-   **currentRound**: transición que se aplica a _roundIndicator_ cuando inicia un round
