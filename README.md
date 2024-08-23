# Pokedex

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Ejecutar el proyecto en modo desarrollo

1.  Clonar el repositorio.

2.  Restaurar los modulos de node
```
  npm install
```
3.  Descargar nest-cli
```
  npm i -g @nestjs/cli
```

4. Levantar la base de datos
```
  docker-compose up -d
```

#### Configuracion de las variables de entorno
5. Clonar el archivo __.template.env__ y renombrar la copia a __.development.env__

6. Setear las variables de entorno definidas en el archivo __.development.env__

---

#### Ejecutar la aplicacion

7. Ejecutar este comando en la raiz del proyecto
```
npm run start:dev
```

8. Reconstruir la base de datos
```
  http://localhost:3000/api/v2/pokemon/:pokeid
```


### Stack Usado

* MongoDB
* NestJs
