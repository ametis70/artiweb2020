# Artimañas 2020

Este es el repositorio del código del sitio web de Artimañas 2020.

## Acerca

Este sitio web fue desarrollado con [Next.js](https://nextjs.org/) y [Directus](https://directus.io/).

### Actualizaciones 

Posterior a la muestra, este sitio fue actualizado (por motivos educativos y de preservación) con los siguientes cambios:

- Se actualizó Directus 8 (PHP) a Directus 9 (Node.js)
- Se reemplazó MySQL con SQLite, para eliminar el paso de tener que configurar una instancia de MySQL/MariaDB
- El esquema de la base de datos se simplificó (se eliminaron campos redudantes y se aprovecharon mejor las relaciones entre tablas)
- Se actualizó Next.js (10 a 11) y se removió [next-optimized-images](https://github.com/cyrilwanner/next-optimized-images) para utilizar las [transformaciones de assets](https://docs.directus.io/reference/files/#requesting-a-thumbnail) de Directus
- Se removieron dependencias y se simplificó el código
- Se generaron paginas individuales para cada obra con sus respectivos metadatos
- Se agregaron los assets al repositorio, que antes solo estaban disponibles en una instancia privada de Directus
- Se desplegó el sitio en [vercel.com](https://vercel.com)

## Desarrollo

Para correr el servidor de desarrollo y el servidor de directus, se requiere [Node.js](https://nodejs.org/en/) (probado con la versión 14.18.1). Una vez instalado, se deben seguir los siguientes pasos:

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

Alternativamente, se pueden iniciar el servidor de desarrollo y el servidor de Directus en diferentes shells con:

```sh
npm run dev:web
npm run dev:cms
```

### Compilando el sitio de manera estática

Para generar una versión estática, se debe seguir los pasos 1 y 2 de la sección de Desarrollo, y posteriormente usar los siguientes comandos:

```sh
npm run build
npm run export
```

## Créditos

El sitio web fue diseñado en conjunto con alumnxs de la cursada y con el apoyo de lxs profesorxs.
