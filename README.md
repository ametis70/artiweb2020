<p align="center">
<img src="https://github.com/ametis70/artiweb2020/raw/main/public/android-chrome-192x192.png" alt="Logo de Artimañas 2020" />
</p>

# Artimañas 2020

Este es el repositorio del código del sitio web de Artimañas 2020.

## Acerca

Este sitio web fue desarrollado con [Next.js](https://nextjs.org/) y [Directus](https://directus.io/).

### Actualizaciones 

Posterior a la muestra, este sitio fue actualizado (por motivos educativos y de preservación) con los siguientes cambios:

- Se actualizó Directus 8 (PHP) a Directus 9 (Node.js)
- Se reemplazó MySQL con SQLite, para eliminar el paso de tener que configurar una instancia de MySQL/MariaDB
- El esquema de la base de datos se simplificó (se eliminaron campos redundantes y se aprovecharon mejor las relaciones entre tablas)
- Se actualizó Next.js (10 a 11) y se removió [next-optimized-images](https://github.com/cyrilwanner/next-optimized-images) para utilizar las [transformaciones de assets](https://docs.directus.io/reference/files/#requesting-a-thumbnail) de Directus
- Se removieron dependencias y se simplificó el código
- Se generaron paginas individuales para cada obra con sus respectivos metadatos
- Se agregaron los assets (imágenes e investigaciones) al repositorio, que antes solo estaban disponibles en una instancia privada de Directus
- Se desplegó el sitio en [vercel.com](https://vercel.com)

## Desarrollo

Para correr los servidores de desarrollo y Directus, se requiere [Node.js](https://nodejs.org/en/) (probado con la versión 14.18.1). Una vez instalado, se deben seguir los siguientes pasos:

1. Instalar dependencias del proyecto

```sh
npm i
```

2. Configurar el entorno

```sh
npm run setup:env
```

3. Iniciar el servidor

```sh
npm run dev
```

Alternativamente, se pueden iniciar los servidores en diferentes shells con:

```sh
npm run dev:web
npm run dev:cms
```

Por defecto, el servidor web corre en el puerto 5000, mientras que el de Directus en el 8055, y se pueden acceder desde http://locahost:5000 y http://localhost:8055 respectivamente.

Las credenciales para acceder a Directus se pueden encontrar en el archivo `.env` generado, y son:

- **username**: admin@taller5.ludic.cc
- **password**: admin

### Compilando el sitio de manera estática

Para generar una versión estática, se debe seguir los pasos 1 y 2 de la sección de Desarrollo, y posteriormente usar los siguientes comandos:

```sh
npm run build
npm run export
```

### Variables de entorno

Se pueden agregar las siguientes variables de entorno a un archivo `.env.local` en la raíz del repositorio para modificar algunos aspectos del sitio:
| Variable | Qué afecta |
|------|-----|
|`NEXT_PUBLIC_MATOMO_URL` | URL a un servidor de [Matomo](https://matomo.org/). Si no está presente, se deshabilita el soporte para Matomo. |
| `NEXT_PUBLIC_OG_DOMAIN` | Dominio para usar en las URLs de [OpenGraph](https://ogp.me/) |
| `NEXT_PUBLIC_BASE_PATH` | Ruta base para servir los assets. Si no se especifíca, se usa `/` por defecto |

## Créditos

El sitio web fue diseñado en conjunto con alumnxs de la cursada y con el apoyo de lxs profesorxs.
