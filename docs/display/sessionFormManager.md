# sessionFormManager _module_

## Responsabilidad

Representar un _wrapper_ para manipular las instancias de [SessionForm](./SessionForm.md) (_Incluidas sus subclases_)

## Interfaz

-   **init** (_settings: {pattern}_)_fn_: Inicializa los _item_ de _formList_:

    ```
    formList.forEach((item) => {
        if(item instanceof PlayerNameSessionForm) item.init(pattern)
        item.init()
    })
    ```

-   **reset** _fn_: configura _item_ de _formList_ a sus valores iniciales:

    ```
    formList.forEach((item) => {item.reset()})
    ```

    -   Nota: _reset_ no elimina _pattern_ de _playerNameSessionForm_

## Implementación

-   **formList** _array_: `[new HomeSessionForm(document.querySelector("#homeMenu")), new PlayerNameSessionForm(document.querySelector("#player1NameMenu")), new PlayerNameSessionForm(document.querySelector("#player2NameMenu")), new DifficultySessionForm(document.querySelector("#difficultyMenu"))]`
