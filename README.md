# Artimañas 2020

Este es el repositorio para el código del sitio web de Artimañas 2020.

## Instrucciones para desarrollo

La aplicación web consiste de dos partes:

1. CMS: [Directus](https://directus.io/)
2. Componente de SSR (Server Side Rendering): [Next.js](https://nextjs.org/)

### Configurando el entorno

Hay 3 variables de entorno que se deben configurar en el archivo `.env`, la primera corresponde a la contraseña de la base de datos de MySQL y las otras dos a la seguridad de Directus:

- `MYSQL_PASSWORD`
- `DIRECTUS_AUTH_PUBLICKEY`
- `DIRECTUS_AUTH_SECRETKEY`

Estas pueden ser cualquier string, pero se deben asignar antes de crear los contenedores, y si se modifican posteriormente, los contenedores no funcionaran correctamente.

El script `setup-env.sh` permite generar valores para las variables de entorno automáticamente y crear e iniciar los contenedores de docker después de esto.

``` bash
./setup-env.sh
```

### CMS y base de datos

Directus depende de una base de datos SQL que se puede levantar usando [Docker](https://www.docker.com/) con el archivo de [docker-compose](https://docs.docker.com/compose/) provisto:

```bash
docker-compose up -d
```

Cuando el contenedor de la base de datos se cree por primera vez, la base de datos se inicializará con el dump que se encuentra en `./db/init.sql`. Este contiene las tablas para las obras, biografías, e información general del sitio, así como los usuarios correspondientes a cada alumno de la materia. Para modificar los datos una vez iniciados los contenedores, se puede acceder a la interfaz web de directus en [http://localhost:8080](http://localhost:8080) con las siguientes credenciales:

- Usuario: `admin@artiweb.net`
- Contraseña: `password`

Eventualmente, este dump deberá ser actualizado con el contenido real/final, para que el entorno de desarrollo sea lo mas fiel posible con respecto al de producción. Esto se puede llevar a cabo con el script provisto en la raíz del repositorio (`manage-db`):

``` bash
./manage-db.sh backup
```

### Sitio web (front end)

Una vez que la base de datos haya sido inicializada, se puede iniciar el servidor de desarrollo (componente de SSR) con:

```bash
npm run dev
```

Los archivos en el directorio `src` se pueden editar y los cambios se verán reflejados en el navegador sin la necesidad de recargar la página.
