# Fathom3 Test

:warning: **El codigo esta todo alojado en la rama de master**


## Installation
Sigue estos pasos para configurar y ejecutar el proyecto de React en tu entorno local

## Installation Database
- Asegúrate de tener una conexión de base de datos configurada en tu archivo schema.prisma. Verifica que la configuración de conexión sea correcta, incluyendo el adaptador de base de datos y otros detalles de autenticación si es necesario.
- Genera los modelos y el cliente de Prisma:
 ``` bash
  npx prisma generate
```

## OverView
- En la parte del FrontEnd, MalagaFront, he hecho lo siguiente:
-  Dentro de la carpeta del frontend he create otras subcarpetas como: Authcontext: donde nos ocupamos de todo lo que tiene 
  que ver con el login del usuario, sobre todo la logica de login and logout.
  - En la carpeta de components es donde alojamos todos los componentes de la app, esta carpeta esta dividida de la siguiente manera: -  CreatePost: aqui es donde esta todo lo relacionado con la creacion de un post, los estilos y el componente en si.
  - Home, es la home page, la pagina principal
  - Login nos ocupamos de todo lo que tiene 
  que ver con el login del usuario, sobre todo la logica de login and logout.
- Navbar, el componente de navegacion, con sus estilos
- NotFound , carpeta donde tenemos un componente en caso de que la ruta deseada no exista
- Posts , Carpeta donde tenemos todo lo relacionado con los ** posts** todos los posts de la app se renderizan aqui
- Register, Carpeta donde esta toda la logica y estilos para crear un usuario
- SinglePost, todo lo relacionado con la visializacion de un solo post con sus respectivos estilos
- UI , componentes genericos de la app, que son llamados en mas de un sitio, ejemplo: spinner
- UpdatePost, Carpeta donde tenemos todo lo relacionado con la actualizacion de un post y sus estilos
- Routes, donde tenemos todas nuestras rutas y revisamos si tenemos autorizacion para verlas o no


## Usage
- Paso   1: Clona el repositorio: Utiliza el siguiente comando para clonar el repositorio en tu máquina local:
```bash
git clone https://github.com/Nerfi/malagaTest.git

```

- Paso 2: Accede al directorio del proyecto: Navega al directorio del proyecto recién clonado utilizando el siguiente comando:
```bash
cd malagaTest
```

- Paso 3: Instala las dependencias: Ejecuta el siguiente comando para instalar las dependencias del proyecto:

```bash
npm install
```


- Paso 4: Inicia la aplicación: Utiliza el siguiente comando para iniciar la aplicación de React: 

```bash
npm start
```

# Fathom3 Test BackEnd
- Paso 1: Asegúrate de tener Node.js instalado en tu sistema. Puedes verificar la versión instalada ejecutando el siguiente comando en tu terminal:
 ```bash
node -v

```

- Paso 2: Abre una terminal y navega hasta el directorio raíz de tu proyecto donde se encuentra el backend. Por ejemplo:
```bash
cd path/to/your/project/backend

```

- Paso 3:  Instala las dependencias del backend ejecutando el siguiente comando:
```bash

npm install
```

- Paso 4: Inicia el servidor del backend ejecutando el siguiente comando:

```bash

npm start
```
- Esto ejecutará el script definido en el archivo package.json para iniciar el servidor. El comando puede variar dependiendo de cómo se haya configurado el proyecto.

## Contributing

Pull requests are welcome

## License

[MIT](https://choosealicense.com/licenses/mit/)
