# AvatarProvider _class_

## Responsabilidad

proveer un API para solicitar avatares

## Constructor

```
AvatarProvider(settings:{providerId: string, baseURL: string})
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

-   **getAvatars** (_[{resourceId: string, queryString: string, fallbackAvatarURL: string}, ...]_) _fn_: responsable de solicitar los avatares a _getAvatar_.

## Implementación

-   **getAvatar** (_resourceId: string, queryString: string, fallbackAvatarURL: string_) _async fn_: construlle la URL del recurso usando _baseURL_ y _queryString_ y le hace un _fetch_, si se encuentra el recurso (_promise.then()_) activa _responseEvent_ de tipo _successful_ devolviendo la URL del recurso y si no se encuentra el recurso (_promise.catch()_) se activa _responseEvent_ de tipo _fail_ devolviendo como URL del recurso _fallbackAvatarURL_ y se imprime el error:

```
console.error("no se pudo aplicar obtener el recurso: %o", {...reason, requestURL: string})
- requestURL = baseURL + queryString
```
