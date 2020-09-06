$(document).ready(function () {

    var clix = [0, 0, 0, 0]; // head,eyes,nose,mouth
    var w = 367; // Separación entre cada imagen del rostro del monstruo
    var num_monsters = 10; //Numero de rostros de la animación

    goLightning();
    window.onblur = stopLightning;
    window.onfocus = goLightning;
    var int1, int2, int3; // variables para identificar la función de ejecución de cada una de las imagenes

    function goLightning() {
        //Intervalo de repeticion para la imagen uno de 4s
        int1 = setInterval(function () {
            lightning_one();
        },
            4000
        );

        //Intervalo de repeticion para la imagen uno de 5s
        int2 = setInterval(function () {
            lightning_two();
        },
            5000
        );

        //Intervalo de repeticion para la imagen uno de 7s
        int3 = setInterval(function () {
            lightning_three();
        },
            7000
        );
    }
    //Formatea los intervalos de repeticion de las funciones para cada una de las tres imagenes
    function stopLightning() {
        window.clearInterval(int1);
        window.clearInterval(int2);
        window.clearInterval(int3);
    }

    //Funcion para el la imagen 1
    function lightning_one() {
        $("#container #lightning1").fadeIn(250).fadeOut(250);
    };

    //Funcion para el la imagen 2
    function lightning_two() {
        $("#container #lightning2").fadeIn("fast").fadeOut("fast");
    };

    //Funcion para el la imagen 3
    function lightning_three() {
        $("#container #lightning3").fadeIn("fast").fadeOut("fast");
    };

    // Eventos para las transiciones de cada parte del rostro del monstruo
    $("#head").click(function () {
        moveMe(0, this)
    });

    $("#eyes").click(function () {
        moveMe(1, this)
    });

    $("#nose").click(function () {
        moveMe(2, this)
    });

    $("#mouth").click(function () {
        moveMe(3, this)
    });

    $("#btnRandom").click(randomize); //Llamada a la funcion aleatoria para crear rostros

    $("#btnReset").click(reset); //Llamada a la funcion rest para restaurar la animacion

    //Función para ejecutar la animación de las imagnes del rostro de los monstruos
    function moveMe(i, obj) {

        if (clix[i] < 9) {
            $(obj).animate({ left: "-=367px" }, 500);
            clix[i] = clix[i] + 1;
        } else {
            clix[i] = 0;
            $(obj).animate({ left: "0px" }, 500);
        }
    }

    //Función para generar partes del rostro de forma aleatoria
    function getRandom(num) {
        var my_random_num = Math.floor(Math.random() * num);
        return my_random_num;
    }

    //Función para controlar la animación del rostro del monstruo de forma aleatoria
    function randomize() {
        //La siguiente función se ejecuta para cada una de las partes del rotro del monstruo
        $(".face").each(function (index) {
            var target_position = parseInt((getRandom(num_monsters) + clix[index]) % num_monsters);
            var current_position = clix[index];

            clix[index] = target_position;

            if (target_position > current_position) {
                var move_to = (target_position - (current_position % w)) * w;
                $(this).animate({ left: "-=" + move_to + "px" }, 500);//mueve la imagen hacia la izquierda
            } else if (target_position < current_position) {
                var move_to = ((current_position % w) - target_position) * w;
                $(this).animate({ left: "+=" + move_to + "px" }, 500); //mueve la imagen hacia la derecha
            } else {

            }
        });
    };

    //Fucnión para restablecer la animacion del rostro
    function reset() {
        $(".face").each(function (index) {
            var move_to = clix[index] * w;
            clix[index] = 0;
            $(this).animate({ left: "+=" + move_to + "px" }, 500);
        });
    }
});
