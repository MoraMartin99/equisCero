# library _module_

## Responsabilidad

responsable de almacenar las templates de _elements_. Es una instancia de [_Library_](../../library.md)

## Instanciación

```
fallbackValue: undefined

records = {templateId1, templateId2, ...}

templateId: {HTMLTag: string, change: object, setTemplate (settings: {}): fn}

- HTMLTag es la etiqueta HTML con la que se construirá el elemento
- change es el objeto que recibe elements.updateElement y permite configurar el elemento
- setTemplate es una función que recibe settings y aplica los cambios a this.change. Cada template tiene su propio setTemplate personalizado para ella
```
