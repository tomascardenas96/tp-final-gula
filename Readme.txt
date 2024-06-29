Readme app Gula 

Modo de instalación:
Clonar el repositorio
- git clone https://github.com/tomascardenas96/tp-final-gula.git
- instalar dependencias:Ruta raíz Frontend: npm install
                                        :Ruta raíz Backend: npm instal
                                        :Ruta raíz Mobile: npm install.
Creación de Base de Datos relacional local.
    -Nombre de Base de datos : tp-gula
- modificar credenciales de conexión de Base de datos en módulo principal de Backend:
- puerto 3306
- Database: tp-gula  
-user name
-password: root

Correr servidor: - en la carpeta raíz de backend (servidor)
npm run start: dev

-Correr frontend: - en la carpeta raíz de frontend (landing-page)
-npm run dev

-Correr mobile: -en la carpeta raíz de Mobile(gula-app-mobile):
	- Descargar repositorio: https://github.com/Gastonfauret/gula-app-mobile.git
	- Instalación de librerías y dependencias detalladas en el README.md.
	- En el telefono celular descargar la aplicacion: “Expo Go” (Logo Blanco y Negro).
	- En el repositorio clonado, en la carpeta raíz (gula-app-mobile), iniciar la aplicación con la siguiente sentencia: npx expo start
	- Al iniciar el proyecto nos mostrará un código QR que debemos escanear con la aplicación Expo Go, y veremos cómo se inicia el proyecto en ambos dispositivos.
	- Para finalizar la reproducción, presionamos: Ctrl + c.






Modo de uso:


Página de registro (‘/register’): register page
Rellenar los campos correspondientes con los siguientes datos:
Nombre completo: (entre 6 y 30 caracteres).
Email.
Contraseña (entre 8 y 12 caracteres).
Confirmar contraseña.
Localidad.
Fecha de nacimiento.
Una vez completado, presiona el botón de registro y serás redirigido a la página de inicio de sesión.

Página de login (‘/’): login page
Completar los campos correspondientes con credenciales existentes:
Email.
Password
Presionar el botón ‘Entrar’ y serás redirigido a la página de home en caso que los datos sean correctos.

Página inicio (‘/home’): home page
Campo de búsqueda lateral superior izquierdo:
Este campo filtra los comercios adheridos según el nombre registrado.
Menú lateral izquierdo:
Inicio: redireccion a pagina de inicio.
Publicaciones: redirección a sección publicaciones.
Mensajes: redirección a casilla de mensajes.
Notificaciones: modal de notificaciones existentes.
Carrito: modal de compras registradas a realizar.

Menu lateral derecho:
botón de redirección a perfil
Botón de ajustes: modal con datos a modificar.
Botón de configuración de idioma.
Botón de comercios: modal de registro de comercios.
Botón de cerrar sesión.

Menu central: 
Barra de búsqueda de comida: permite filtrar comida por su nombre, mostrando todos los comercios adheridos con esa descripción de búsqueda, permitiendo agregar uno o más productos al carrito de compra.

Categorías: sección  de categorías de comidas, distinguidas por sus respectivos iconos de referencia. Al presionar sobre cualquiera de estos, serás redirigido a los productos filtrados por categorías.

Comercios adheridos: Botones con imágenes de los comercios adheridos a gula, cada botón redirige al perfil de cada comercio. 

Sección Publicidad: en esta sección los usuarios premium podrán cargar flyers publicitarios.

Sección de publicaciones: para crear un nuevo posteo selecciona el comercio correspondiente ,en el cuerpo del componente podrás agregar un comentario.
Dentro del mismo encontrarás un contador de caracteres y un botón de publicar. Cada tarjeta de publicación cuenta con valoración de estrella y comentarios para que los usuarios puedan dejar su opinión.


Página de configuraciones (‘/settings’): settings page

Modificar datos de perfil:
Foto de perfil: opción para cambiar la foto de perfil.
Nombre de perfil: campo para ingresar nombre y apellido.
Localidad: campo para ingresar a zona de residencia.
Fecha de nacimiento: campo para ingresar dia,mes y año de nacimiento.
TODOS LOS CAMPOS SON OPCIONALES.


Modificar datos de cuenta:
Nombre completo: campo para editar tu nombre de usuario.
Contraseña: campo para editar contraseña para inicio de sesión (entre 8 y 12 caracteres).


Página de gestión de comercios (‘/shops-managment’): shops management page

Agregar un nuevo comercio: 
Nombre: ingresar nombre del comercio a crear.
Localidad: ingresar localidad de referencia.
Teléfono: ingresar numero de telefono. 
Nombre del perfil: URL para acceder al perfil.
Foto de perfil: campo FOTO para subir imágen de perfil de comercio. (*campo opcional). 
Botón crear: crea el perfil de comercio.

Tus comercios:  
Tarjetas con descripción de cada comercio creado por el usuario activo.

EN ESTA SECCIÓN PODRÁS VER, EDITAR,O ELIMINAR TUS COMERCIOS ACTIVOS.

Página de perfil de comercio (‘/shop/:profilename’): shop profile page

Presentación de perfil: datos principales, redes sociales, cantidad de publicaciones realizadas y recomendaciones del comercio actual.

Publicaciones: registro de publicaciones efectuadas por el comercio.

Lista de categorías: selecciona una categoría para filtrar los productos disponibles de esta.

Recomendaciones: los usuarios podrán dar su valoración a través de las estrellas, generando un número promedio que se verá reflejado en la tarjeta de perfil de cada comercio.

Carta: en caso de ser propietario del comercio actual podrás agregar un nuevo producto, en caso contrario no tendrás esta opción. 
Debajo encontrarás la comida que el comercio tiene disponible, filtrada por sus respectivas categorías.

Barra indicadora de estado: esta barra te indicará si el comercio está abierto o cerrado.

