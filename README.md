# Tech Posts Frontend

<!-- [![Netlify Status](https://api.netlify.com/api/v1/badges/ea77ae72-8d7b-4800-9391-29d59d9ef891/deploy-status)](https://app.netlify.com/sites/tech-posts-demo/deploys) -->

<p align="center">
  <a href="https://reactjs.org/" target="blank"><img src="./docs/react.svg" width="200" alt="React Logo" /></a>
</p>

## Descripción

App Web para la administración de publicaciones.

## Inicio

Primero instale las depedencias con yarn y luego copie el [template](./.env.template) con las variables de entorno en la
raiz del proyecto y ejecute el comando `dev`.

```sh
yarn install
cp .env.template .env
yarn dev
```

## Lista de Comandos

```sh
# Ejecutra en modo desarrollo con "watch"
yarn dev

# Compilar proyecto
yarn build

# Previsualizar en modo producción
yarn preview

# Formatear todo el código usando prettier
yarn format

# Ejecutar el mockserver para probar el frontend
yarn serve

# Ejecutar en modo desarrollo la app junto al mockserver
yarn dev:mock

# Previsualizar en modo producción la app junto al mockserver
yarn preview:mock
```

<!-- ## Mockup

En el archivo [./public/mock/db.json](./public/mock/db.json) se encuentra un mockup de datos para desplegar una "demo"
de la aplicación y así poder mostrar la interfaz de forma estática.

> NOTA: Esta demo no es funcional solo sirve para mostrar la interfaz usando datos ficticios.

**Demo** &#x279c; [https://tech-posts-demo.netlify.app/](https://tech-posts-demo.netlify.app/) -->

## Contribuir

Realice un fork al proyecto en el branch `develop`, introdusca sus cambios y cree un `Pull Request` hacia el branch
`main`.

> NOTA: Este proyecto ha sido construido y probado usando el siguiente conjunto de tecnologías:

- node v18.13.0
- yarn v1.22.19
- vite v4.0.0
- React v18.2.0

## Vistas

- Signup

![Signup](./docs/signup.png)

- Login

![Login](./docs/login.png)

- Home

![Home](./docs/home.png)
