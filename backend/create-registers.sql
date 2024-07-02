USE `tp-gula`;

-- Agregamos algunos datos para mostrar en la demostracion. 
-- Categorias
INSERT INTO
    category (description)
VALUES
    ("Carnes"),
    ("Hamburguesas"),
    ("Panchos"),
    ("Bebidas"),
    ("Postres"),
    ("Cervezas"),
    ("Papas fritas"),
    ("Pastas"),
    ("Pizzas");

-- Comercios
INSERT INTO
    shop(
        name,
        location,
        phone,
        profilename,
        user,
        picture
    )
VALUES
    (
        "Jooks cerveceria",
        "Benito Juarez",
        "2281303030",
        "jookscerveceria",
        1,
        "jooks.jpg"
    ),
    (
        "Lo de chairo",
        "Benito Juarez",
        "2281404040",
        "lodechairo",
        2,
        "chairo.jpg"
    ),
    (
        "Palelo buffet",
        "Benito Juarez",
        "2281505050",
        "palelobuffet",
        3,
        "palelo.jpg"
    ),
    (
        "La paperia",
        "Benito Juarez",
        "2281505050",
        "lapaperiabj",
        2,
        "paperia.jpg"
    );

-- Platos
INSERT INTO
    food(
        description,
        price,
        stock,
        shop,
        category,
        image,
        review
    )
VALUES
    (
        "Milanesa a la napolitana c/ papas",
        5600,
        100,
        1,
        9,
        "milanesa.jpg",
        "Las milanesas mas grandes y sabrosas!"
    ),
    (
        "Hamburguesa doble cheddar",
        4400,
        55,
        1,
        2,
        "doble-cheddar.jpg",
        "Lunes a la mañana? No importa, siempre es buen momento para una buena doble cheddar"
    ),
    (
        "Empanadas de jyq x 12U",
        7500,
        66,
        2,
        1,
        "empanadas.jpg",
        "Las empanadas mas pipi cucu de la cuadra"
    ),
    (
        "Agua saborizada levite x 500cc",
        1200,
        122,
        2,
        4,
        "levite.jpg",
        "Agua saborizada levite x 500cc"
    ),
    (
        "Pizza a la calabresa x 8 porciones",
        5900,
        98,
        3,
        9,
        "calabresa.jpg",
        "No te mueras sin probar nuestra exquisita pizza a la calabresa"
    ),
    (
        "Pizza muzzarella x 8 porciones",
        5200,
        66,
        3,
        9,
        "muzzarella.jpg",
        "Pizza muzzarella con abundante quesito, como dios manda"
    );

-- Publicaciones
INSERT INTO
    post(description, shop)
VALUES
    (
        "¡Prueba nuestra deliciosa pizza Margarita con mozzarella fresca y albahaca recién cortada! Perfecta para cualquier ocasión.",
        1
    );

INSERT INTO
    post(description, shop, image)
VALUES
    (
        "Disfruta de nuestro sushi de atún rojo con aguacate y salsa de soya. ¡Una explosión de sabor en cada bocado!",
        3,
        "sushi.jpg"
    );

INSERT INTO
    post(description, shop, image)
VALUES
    (
        "Ven y prueba nuestro auténtico asado 100% argentino con chimi y fideos caseros. ¡Una experiencia culinaria inolvidable!",
        2,
        "asado.jpg"
    );

INSERT INTO
    post(description, shop)
VALUES
    (
        "No te pierdas nuestra hamburguesa de ternera con queso cheddar y tocino crujiente. ¡El placer en cada mordisco!",
        3
    );

INSERT INTO
    post(description, shop, image)
VALUES
    (
        "Descubre el sabor de nuestras enchiladas de pollo con salsa roja y queso gratinado. ¡Un platillo tradicional mexicano!",
        1,
        "enchiladas.jpg"
    );

INSERT INTO
    post(description, shop, image)
VALUES
    (
        "Prueba nuestra paella de mariscos con arroz dorado y una variedad de mariscos frescos. ¡Un manjar mediterráneo!",
        3,
        "mariscos.jpg"
    );

INSERT INTO
    post(description, shop)
VALUES
    (
        "Disfruta de nuestro curry tailandés de pollo con leche de coco y vegetales frescos. ¡Una explosión de sabores exóticos!",
        1
    );

INSERT INTO
    post(description, shop)
VALUES
    (
        "Ven y prueba nuestro falafel de garbanzos con salsa tahini y ensalada fresca. ¡Una opción saludable y deliciosa!",
        2
    );

INSERT INTO
    post(description, shop, image)
VALUES
    (
        "No te pierdas nuestras crêpes de Nutella con fresas frescas y crema batida. ¡El postre perfecto para cualquier momento!",
        2,
        "crepes.jpg"
    );