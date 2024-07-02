MODO DE INSTALACION:

1) Clonar el repositorio
- git clone https://github.com/tomascardenas96/tp-final-gula.git
- instalar dependencias: Ruta raíz Frontend:
	- Ruta raíz Backend: npm install
	- Ruta raíz Mobile: npm install.

2) Creación de Base de Datos relacional local (tenemos 2 opciones).
- AUTOMATICO: En la carpeta raiz del backend, correr el siguiente script (npm run init-db), este script creara la base de datos y tambien los datos que vamos a necesitar en la base de datos.

	o

- MANUAL: Ingresar al gestor de la base de datos y ejecutar las siguientes queries: 
	- Creacion de base de datos: CREATE DATABASE IF NOT EXISTS `tp-gula`.
	- Creacion de categorias: INSERT INTO `tp-gula.category`(description) VALUES ("Carnes"), ("Hamburguesas"), ("Panchos"), ("Bebidas"), ("Postres"), ("Cervezas"), ("Papas fritas"), ("Pastas"), ("Pizzas").

3) Modificar credenciales de conexión de Base de datos en módulo principal de Backend para que coincidan con los datos de la base de datos local:
	- Puerto: 3306
	- Database: `tp-gula`  
	- User: root
	- Password: root

4) Poner el proyecto en marcha:
- Correr servidor en la carpeta raíz de backend (servidor)
	- npm run start: dev

- En el backend, Correr ngrok desde la consola cmd (para crear un tunel https, de lo contrario mercado pago no podra enviarte notificaciones sobre las compras):
	- ngrok http 3070
	- Luego de ejecutar el script, copiar la URL de la columna 'Forwarding', luego ingresar al archivo .env que esta en la raiz del backend y modificar la variable de entorno llamada WEBHOOK_MERCADO_PAGO con la nueva URL anteriormente copiada desde la consola de ngrok.
	- Reiniciar el servidor para efectuar los cambios.

- Correr frontend desde la carpeta raíz (landing-page)
	- npm run dev

5) Iniciar sesion en https://www.mercadopago.com.ar con nuestra cuenta de prueba para poder procesar pagos.
	- Nombre de usuario: TESTUSER798872303
	- Contraseña: L4Aj5WbKEd

6) Por ultimo abrir el link que te envia la consola del frontend desde el navegador para acceder al contenido .

-----------------------------------------------------------------------------------------------------------------------------------------------------

MODO DE USO:

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

