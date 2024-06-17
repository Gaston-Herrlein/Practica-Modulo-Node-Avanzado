# Practica de Node.js Avanzado

👤 Herrlein Gaston

💻 Bootcamp Full Stack Web XVI

📅 03 Junio 2024

# TENGO QUE CARGAR USUSARIOS EN LA BBDD

## Enunciado del ejercicio:

### Índice de retos:

- [Autenticación](#Autenticación)
- [Internacionalización](#Internacionalización)
- [Subida de imagen con tarea en background](#UploadImage)
- [Testing (opcional)](#Testing)

## Autenticación

#### Consignas

Implementar autenticación JWT al API

1. POST /api/authenticate para hacer login y devolver un token JWT
2. GET /api/anuncios incluyendo el JWT en una cabecera o query-string hará la petición
   correcta (200 OK)
3. GET /api/anuncios sin token responderá con un código de status HTTP 401 y un json
   con info del error
4. GET /api/anuncios con un token caducado responderá con un código de status HTTP
   401 y un json con info del error

## Internacionalización

#### Consignas

Deberá disponer de un selector de idioma donde el usuario pueda cambiar de inglés a
español o viceversa. No será necesario internacionalizar el API.

Idiomas disponibles:

- Español
- Inglés

## UploadImage

#### Consigna

Podría ser tal que `POST /api/anuncios` y debería permitir que el cliente del API suba una imagen y esta sea guardada en el servidor, de tal forma que cuando hagamos las peticiones `GET /api/anuncios` nos sean devueltas las rutas a éstas imágenes y dichas rutas funcionen.

Cada imagen que se suba debe tener un thumbnail!

Podemos hacer un microservicio que reciba trabajos (con cote.js o de una cola de
RabbitMQ), creando dichos thumbnails

- hacer que el API mande un mensaje (con cote.js o con una cola de RabbitMQ) con la ruta del filesystem a la imágen.
- crear un worker que esté suscrito al mensaje/cola y vaya haciendo thumbnails de cada imágen a un tamaño de 100x100 píxeles.

## Testing

#### Consignas

Hagamos que la calidad sea una característica de nuestro software. Incluir tests del API de Anuncios con Supertest.

Los tests se deberán poder ejecutar con `npm test`.

## Resolucion.

### Índice de contenido:

- [Se definen rutas](#Routes)
- [Responsabilidad de vistas](#Views)
- [Controladores](#Controladore)
- [Models](#Models)

## Routes

Se separan en dos tipos de rutas. Ya que la authenticacion se realizo mediante JWT, no seria posible ver determinadas vistas sin client que gestione ese token. Aunque se podria recurrir a herramientas como Postman eh decidido crear rutas alternativas para ver estas vistas sin necesidad de estar logueado.

#### Rutas sin auth

> - `GET` `/`: renderiza _index.ejs_
> - `GET` `/register`: renderiza _register.ejs_
> - `GET` `/login`: renderiza _login.ejs_
> - `GET` `/articles`: renderiza _articles.ejs_
> - `GET` `/new-article`: renderiza _newArticle.ejs_
> - `GET` `/change-locale/:locale`: llama al controlador _.changeLocale_
> - `GET` `/api`: renderiza _index.ejs_
> - `POST` `/api/auth`: si las credenciales osn correctas genera un JWT para el usuario

#### Rutas con auth

> - `GET` `/api/articles`: renderiza _articles.ejs_
> - `GET` `/api/articles/tags`: renderiza _tags.ejs_
> - `GET` `/api/articles/:id`: renderiza _articles.ejs_ con un solo articulo
> - `POST` `/api/articles`: controlador que permite crear un nuevo articulo
> - `PUT` `/api/articles/:id`: se actualiza un articulo
> - `DELETE` `/api/articles/:id`: se elimina un articulo

## Views

- Vistas principales:

  - _index.ejs_
  - _login.ejs_
  - _register.ejs_
  - _articles.ejs_
  - _newArticles.ejs_
  - _tags.ejs_
  - _error.ejs_: renderiza un modal que nos sirve para notificar errores

- Vistas secundarias:

  - _navbar.ejs_: renderiza la barra de navegacion
  - _footer.ejs_: renderiza el footer

## Controladore

- Login

  > Controlador para loguearse

- Register

  > Controlador para registrarse

- Lang

  > Controlador para cambiar de idioma

- UploatFile

  > Controlador para cargar las imagenes de los anuncios

## Models

- **_user:_** modulo para definir estructura de usuarios
- **_article:_** modulo para definir estructura de articulos
- **_index:_**: modulo que exporta users y article de forma conjunta
