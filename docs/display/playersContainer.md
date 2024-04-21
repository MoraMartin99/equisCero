# playersContainer _module_

## Responsabilidad

Representar un _playersContainer_

## Constructor

```
playersContainer(element: HTMLElement)
```

## Interfaz

-   **reset** _fn_: regresa _element_ a su estado inicial (_remplazo de resetPlayerCardContainer_):

    `playerCardList.forEach((item) => {item.reset()})`

-   **setCards** (_settings: [{ playerId: string, name: string, src: string }, ...]_) _fn_: Configura las _playerCardContainer_ según _settings_:

```
    settings.forEach(({ playerId, name, src }) => {
       const card =  getCardObject(playerId)
       card.setCard?.({name, src})
    })
```

-   **setNoCurrentPlayer** () _fn_: responsable de configurar un estado neutral en para cada _item_ de _playerCardList_ (_remplazo de setNoCurrentPlayer_):

    `playerCardList.forEach((item)=>{item.setCard({isCurrentPlayer: false})})`

-   **getCard** (_playerId: string_) _fn_: regresa el _item.getElement()_ de _playerCardList_ que coincide con _playerId_:

    `return getCardObject(playerId).getElement?.()`

## Implementación

-   **element** _HTMLElement_

-   **playerCardList** _array_: Lista que contiene todos los _playerCardContainer_:

    `Array.from(element.querySelector(".playerCardContainer")).map((item)=>{new PlayerCardContainer(item)})`

-   **getCardObject** (_playerId: string_) _fn_: regresa el _item_ de _playerCardList_ que coincide con _playerId_:

    `return Object(playerCardList.find((item)=>{item.getElement().matches(playerId)}))`
