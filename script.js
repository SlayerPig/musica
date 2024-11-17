// Elementos HTML
const iniciarBtn = document.getElementById('iniciar-btn');
const conejoImg = document.getElementById('conejo');
const mensaje = document.getElementById('mensaje');
const siBtn = document.getElementById('si-btn');
const noBtn = document.getElementById('no-btn');
const reiniciarBtn = document.getElementById('reiniciar-btn');
const topPuntuaciones = document.getElementById('top-puntuaciones');
const listaPuntuaciones = document.getElementById('lista-puntuaciones');

// Variables
let puntuacion = 0;
let teclasPresionadas = new Set(); // Usamos un Set para evitar duplicados
let respuestas = []; // Para guardar las respuestas del usuario
let nombre = '';

// Función para iniciar la conversación
iniciarBtn.addEventListener('click', () => {
    iniciarBtn.style.display = 'none'; // Ocultar el botón "Iniciar"
    conejoImg.style.display = 'block'; // Mostrar imagen de Floppy
    mensaje.style.display = 'block'; // Mostrar mensaje inicial
    mensaje.textContent = "Hola, mi nombre es Floppy y soy un conejo programador. ¿Quieres saber sobre programación?";
    siBtn.style.display = 'inline-block';
    noBtn.style.display = 'inline-block';
});

// Respuesta "Sí"
siBtn.addEventListener('click', () => {
    mensaje.textContent = "¡Genial! Presiona cualquier letra para que te explique más sobre programación.";
    siBtn.style.display = 'none';
    noBtn.style.display = 'none';
    document.addEventListener('keypress', (e) => {
        mostrarMensajePorLetra(e.key.toLowerCase());
    });
});

// Respuesta "No"
noBtn.addEventListener('click', () => {
    mensaje.textContent = "¡Pero espera! Programación es divertida y bien pagada. Puedes crear cosas increíbles, desde calculadoras hasta videojuegos. ¿Seguro que no quieres aprender?";
    noBtn.textContent = "No, gracias";
    noBtn.addEventListener('click', () => {
        mensaje.textContent = "¡De acuerdo! Ya no te enseñaré nada.";
        noBtn.style.display = 'none';
        siBtn.style.display = 'none';
        setTimeout(() => {
            mensaje.textContent = "¡Es una broma! Sabía que te interesaría. Presiona cualquier letra para que te explique más sobre programación.";
            siBtn.style.display = 'none';
            noBtn.style.display = 'none';
            document.addEventListener('keypress', (e) => {
                mostrarMensajePorLetra(e.key.toLowerCase());
            });
        }, 3000); // Espera de 3 segundos
    });
});

// Función para mostrar mensajes de Floppy basados en la tecla presionada
function mostrarMensajePorLetra(tecla) {
    if (teclasPresionadas.has(tecla)) {
        // Si la tecla ya fue presionada, no hacer nada
        return;
    }

    teclasPresionadas.add(tecla); // Agregar la tecla al Set de teclas presionadas
    let mensajeFloppy = "";

    // Aquí agregaríamos el mensaje personalizado para cada letra.
    switch(tecla.toUpperCase()) {
        case 'A': mensajeFloppy = "La 'A'. Esto es básico: algoritmos. Son como un mapa que le dice a tu computadora por dónde ir."; break;
        case 'B': mensajeFloppy = "La 'B' me hace pensar en variables. Son como cajitas donde guardas datos. ¡No pierdas la llave!"; break;
        case 'C': mensajeFloppy = "'Ciclo for'. Es como si dijeras: haz esto, pero muchas veces. Ideal para trabajos repetitivos."; break;
        case 'D': mensajeFloppy = "'Depuración'. Básicamente, buscar y arreglar errores. Como limpiar manchas en una ventana."; break;
        case 'E': mensajeFloppy = "'Estructuras de datos'. Todo en orden, todo en su lugar. Piensa en un armario bien organizado."; break;
        // Agrega aquí más casos de acuerdo a cada tecla.
        default: mensajeFloppy = `¿${tecla.toUpperCase()}? Mmm, no tengo algo para esa, pero seguro hay algo interesante detrás.`; break;
    }

    // Mostrar el mensaje en el HTML
    document.getElementById("mensaje").textContent = mensajeFloppy;

    // Guardar las respuestas
    respuestas.push(tecla.toUpperCase());

    // Si ya presionó todas las letras
    if (respuestas.length === 26) {
        mensaje.textContent = "¡Has presionado todas las letras! Ahora, vamos a empezar el cuestionario.";
        setTimeout(startCuestionario, 2000);
    }
}

// Función para iniciar el cuestionario
function startCuestionario() {
    // Mostrar las preguntas con botones
    let puntuacion = parseFloat(localStorage.getItem('puntuacion')) || 0; // Recuperar la puntuación si existe
    const preguntas = [
        { pregunta: "¿Qué es un algoritmo?", opciones: ["Un mapa de instrucciones", "Un tipo de comida", "Una persona", "Un juego"], respuestaCorrecta: 0, esDeProgramacion: true },
        { pregunta: "¿Qué hace una función?", opciones: ["Repetir código", "Hacer algo una vez", "Borrar datos", "Mostrar una imagen"], respuestaCorrecta: 0, esDeProgramacion: true },
        { pregunta: "¿Qué es una variable?", opciones: ["Un tipo de bucle", "Un contenedor para datos", "Un error en el código", "Un tipo de función"], respuestaCorrecta: 1, esDeProgramacion: true },
        { pregunta: "¿Qué es un ciclo 'for'?", opciones: ["Un tipo de función", "Una estructura de control para repetir acciones", "Una forma de almacenar datos", "Un error común en programación"], respuestaCorrecta: 1, esDeProgramacion: true },
        { pregunta: "¿Qué hace el operador '=='?", opciones: ["Suma dos números", "Compara dos valores", "Asigna un valor a una variable", "Hace un ciclo"], respuestaCorrecta: 1, esDeProgramacion: true },
        { pregunta: "¿Qué color es el sol?", opciones: ["Amarillo", "Azul", "Rojo", "Verde"], respuestaCorrecta: 0, esDeProgramacion: false },
        { pregunta: "¿Cuál es el animal más rápido del mundo?", opciones: ["El guepardo", "El águila", "Un caracol", "Un pingüino"], respuestaCorrecta: 0, esDeProgramacion: false },
        { pregunta: "¿Qué prefieres comer?", opciones: ["Pizza", "Chocolate", "Codear hasta el amanecer", "Sopa de letras"], respuestaCorrecta: 2, esDeProgramacion: false },
        { pregunta: "Si un árbol cae en el bosque y nadie lo escucha, ¿hace ruido?", opciones: ["Sí", "No", "Depende del árbol", "Solo si es un roble"], respuestaCorrecta: 0, esDeProgramacion: false },
        { pregunta: "¿Cuál es la respuesta a la vida, el universo y todo lo demás?", opciones: ["42", "Pi", "Un código de error", "El color morado"], respuestaCorrecta: 0, esDeProgramacion: false }
    ];

    let preguntaActual = 0;

    // Mostrar la primera pregunta
    mostrarPregunta(preguntas[preguntaActual]);

    // Función para mostrar las preguntas
    function mostrarPregunta(pregunta) {
        mensaje.textContent = pregunta.pregunta;
        const opcionesHTML = pregunta.opciones.map((opcion, index) => {
            return `<button class="opcion-btn" data-index="${index}">${opcion}</button>`;
        }).join('');
        mensaje.innerHTML += `<div>${opcionesHTML}</div>`;

        // Manejo de respuestas
        const botones = document.querySelectorAll('.opcion-btn');
        botones.forEach(boton => {
            boton.addEventListener('click', (e) => {
                // Si la respuesta es correcta
                if (e.target.dataset.index == pregunta.respuestaCorrecta) {
                    if (pregunta.esDeProgramacion) {
                        puntuacion += 1; // Las preguntas de programación suman 1 punto
                    } else {
                        puntuacion += 0.3; // Las preguntas de ayuda suman 0.3 puntos
                    }
                }
                localStorage.setItem('puntuacion', puntuacion); // Guardar la puntuación en localStorage
                preguntaActual++;
                if (preguntaActual < preguntas.length) {
                    mostrarPregunta(preguntas[preguntaActual]);
                } else {
                    mostrarResultado();
                }
            });
        });
    }

    // Mostrar el resultado final
    function mostrarResultado() {
        let promedio = puntuacion / preguntas.length * 10; // Calculamos el promedio sobre todas las preguntas

        // Aplicamos la regla para redondear el promedio
        if (promedio < 5) {
            promedio = 5;  // Si el puntaje es menor que 5, se redondea a 5
        } else if (promedio >= 5 && (promedio % 1) > 0.5) {
            promedio = 6;  // Si el puntaje es mayor a 5 y tiene decimal mayor a 0.50, se redondea a 6
        }

        let mensajeFinal = `¡Has terminado el cuestionario! Tu puntuación es: ${puntuacion.toFixed(2)}/${preguntas.length}`;

        // Verificamos si aprobó o reprobó
        if (promedio < 6) {
            mensajeFinal += ` Lamentablemente, sacaste un ${promedio.toFixed(2)}. No has alcanzado el puntaje mínimo para aprobar.`;
            mensajeFinal += " No mereces un dulce... 😢";
        } else {
            mensajeFinal += ` ¡Felicidades, sacaste un ${promedio.toFixed(2)} y aprobaste! Te mereces un dulce. 🍬`;
        }

        mensaje.textContent = mensajeFinal;

        // Guardar el puntaje y el nombre
        nombre = prompt("¿Cuál es tu nombre?");
        guardarPuntaje(nombre, puntuacion);

        // Mostrar el top de puntuaciones
        mostrarTopPuntuaciones();

        // Mostrar el botón de reiniciar
        reiniciarBtn.style.display = 'inline-block';
    }
}

// Función para guardar el puntaje
function guardarPuntaje(nombre, puntuacion) {
    // Obtener las puntuaciones guardadas anteriormente
    let puntuaciones = JSON.parse(localStorage.getItem('puntuaciones')) || [];  // Si no hay puntuaciones, inicia un arreglo vacío

    // Agregar la nueva puntuación
    puntuaciones.push({ nombre, puntuacion });

    // Ordenar las puntuaciones de mayor a menor
    puntuaciones.sort((a, b) => b.puntuacion - a.puntuacion);

    // Mantener solo las 5 mejores puntuaciones
    if (puntuaciones.length > 5) {
        puntuaciones.pop();
    }

    // Guardar las puntuaciones actualizadas en localStorage
    localStorage.setItem('puntuaciones', JSON.stringify(puntuaciones));
}



// Función para mostrar el top de puntuaciones
function mostrarTopPuntuaciones() {
    let puntuaciones = JSON.parse(localStorage.getItem('puntuaciones')) || [];
    listaPuntuaciones.innerHTML = puntuaciones.map(p => `<li>${p.nombre}: ${p.puntuacion}</li>`).join('');
    topPuntuaciones.style.display = 'block';
}

// Reiniciar el juego
reiniciarBtn.addEventListener('click', () => {
    // Reiniciar variables y reiniciar la página
    teclasPresionadas.clear();
    respuestas = [];
    puntuacion = 0;
    topPuntuaciones.style.display = 'none';
    reiniciarBtn.style.display = 'none';
    iniciarBtn.style.display = 'inline-block'; // Mostrar el botón de "Iniciar"
});