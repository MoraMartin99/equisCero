# library _module_

## Responsabilidad

responsable de almacenar las templates de _elements_. Es una instancia de [_Library_](../../library.md)

## Instanciación

```
fallbackValue: {}

records = {templateId1, templateId2, ...}

templateId: {HTMLTag: string, change: object, setTemplate (settings: {}): fn}
```

-   _HTMLTag_ es la etiqueta HTML con la que se construirá el elemento
-   _change_ es el objeto que recibe elements.updateElement y permite configurar el elemento
-   _setTemplate_ es una función que recibe _settings_ y aplica los cambios a _this.change_. Cada template tiene su propio setTemplate personalizado para ella

## Lista de templates

-   **token1**: el _svg_ que representa el token _x_
-   **token2**: el _svg_ que representa el token _0_
-   **winnerAvatar**: es el _img_ que representa la imagen de un jugador genérico ganador en _resultMenu_. En sus _settings_ se especifica el atributo _src_
-   **maskContainer**: es el _div_ que representa la mascara que contiene las _img_ de los jugadores cuando ocurre un empate en el _resultMenu_. En sus _settings_ se especifica el atributo _src1_ que representa la src para la _img_ del _player1_ y _src2_ que representa la src para la _img_ del _player2_
-   **resultMessage1**: es el _p_ que representa el mensaje de felicitaciones cuando es el final de un round y existe un ganador en _resultMenu_. En sus _settings_ se especifica _name_ que representa el nombre del ganador y _round_ que representa el round actual.
-   **resultMessage2**: es el _p_ que representa el mensaje de felicitaciones cuando es el final del juego y existe un ganador en _resultMenu_. En sus _settings_ se especifica _name_ que representa el nombre del ganador
-   **resultMessage3**: es el _p_ que representa el mensaje de felicitaciones cuando no existe un ganador en _resultMenu_.
-   **roundEndResultButton**: es el _nextRoundButton_ en _resultMenu_.
-   **gameEndResultButtons**: es el _restartGameButton_ y _goHomeButton_ en _resultMenu_.
-   **roundIndicator**: es el elemento dentro de _roundIndicatorContainer_ que representa cada round. En sus _settings_ se especifica el atributo _round_ que codifica su _id_ y el atributo _data-round_
