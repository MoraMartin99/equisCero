# AvatarProvider _class_

## Responsabilidad

proveer un API para solicitar avatares

## Constructor

```
AvatarProvider(settings:{providerId: string, baseURL: string, player1AvatarQSComposer: fn, player2AvatarQSComposer: fn, CPUAvatarQSComposer: fn, fallbackAvatarsURL: {player1: string, player2: string, CPU: string}})

donde player1AvatarQSComposer, player2AvatarQSComposer y CPUAvatarQSComposer son funciones que retornan el queryStrings correspondiente
```

## Interfaz

### Eventos

-   **responseEvent**: activado cuando se tiene una respuesta del servidor respecto a un recurso

```
    data:{eventName:string, responseType: string, resource:{url: string, id: string}}

    donde responseType puede ser:

    - successful
    - fail

    donde resource.id puede ser:
    - player1
    - player2
    - CPU
```

### Métodos

-   **getAvatars** _fn_: responsable de solicitar los avatares a _getAvatar_. Invoca las _QSComposer_ para generar los _queryString_

## Implementación

-   **getAvatar** (_queryString: string_, _resourceId: string_, _fallbackAvatarURL: string_) _async fn_: construlle la URL del recurso usando _baseURL_ y _queryString_ y le hace un _fetch_, si se encuentra el recurso (_promise.then()_) activa _responseEvent_ de tipo _successful_ devolviendo la URL del recurso y si no se encuentra el recurso (_promise.catch()_) se activa _responseEvent_ de tipo _fail_ devolviendo como URL del recurso _fallbackAvatarURL_ y se imprime el error:

```
console.error("no se pudo aplicar obtener el recurso: %o", {...reason, requestURL: string})

- requestURL = baseURL + queryString
```
