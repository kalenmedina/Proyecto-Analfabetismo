// Preguntas de los cuestionarios
const cuestionarios = {
    libro1: [
        {
            id: 1,
            texto: '¿Qué animal vive en la selva?',
            imagen: '',
            opciones: [
                { texto: 'Tigre', emoji: '🐯', correcta: true },
                { texto: 'Pingüino', emoji: '🐧', correcta: false },
                { texto: 'Oso polar', emoji: '🐻‍❄️', correcta: false },
                { texto: 'Camello', emoji: '🐫', correcta: false }
            ]
        },
        {
            id: 2,
            texto: '¿Cuál es el color del árbol más grande de la selva?',
            imagen: '',
            opciones: [
                { texto: 'Verde', emoji: '💚', correcta: true },
                { texto: 'Azul', emoji: '💙', correcta: false },
                { texto: 'Rojo', emoji: '❤️', correcta: false },
                { texto: 'Amarillo', emoji: '💛', correcta: false }
            ]
        },
        {
            id: 3,
            texto: '¿Qué sonido escuchas en la selva?',
            imagen: '',
            opciones: [
                { texto: 'Pájaro cantando', emoji: '🐦', correcta: true },
                { texto: 'Coche pasando', emoji: '🚗', correcta: false },
                { texto: 'Teléfono sonando', emoji: '☎️', correcta: false },
                { texto: 'Reloj tictac', emoji: '⏰', correcta: false }
            ]
        }
    ],
    libro2: [
        {
            id: 1,
            texto: '¿El héroe es valiente?',
            imagen: '',
            opciones: [
                { texto: 'Sí', emoji: '✅', correcta: true },
                { texto: 'No', emoji: '❌', correcta: false }
            ]
        },
        {
            id: 2,
            texto: '¿Hace amigos en su viaje?',
            imagen: '',
            opciones: [
                { texto: 'Sí', emoji: '✅', correcta: true },
                { texto: 'No', emoji: '❌', correcta: false }
            ]
        }
    ],
    libro3: [
        {
            id: 1,
            texto: '¿El león es un animal feroz?',
            imagen: '',
            opciones: [
                { texto: 'Sí', emoji: '✅', correcta: true },
                { texto: 'No', emoji: '❌', correcta: false }
            ]
        },
        {
            id: 2,
            texto: '¿Las aves pueden volar?',
            imagen: '',
            opciones: [
                { texto: 'Sí', emoji: '✅', correcta: true },
                { texto: 'No', emoji: '❌', correcta: false }
            ]
        }
    ],
    libro4: [
        {
            id: 1,
            texto: '¿Las estrellas brillan en la noche?',
            imagen: '',
            opciones: [
                { texto: 'Sí', emoji: '✅', correcta: true },
                { texto: 'No', emoji: '❌', correcta: false }
            ]
        },
        {
            id: 2,
            texto: '¿El sol es una estrella?',
            imagen: '',
            opciones: [
                { texto: 'Sí', emoji: '✅', correcta: true },
                { texto: 'No', emoji: '❌', correcta: false }
            ]
        }
    ]
};

let libroActual = '';
let preguntaActual = 0;
let respuestas = {};

document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    libroActual = params.get('libro') || sessionStorage.getItem('libroActual');
    
    if (!libroActual || !cuestionarios[libroActual]) {
        alert('No se encontró el cuestionario');
        window.location.href = 'index.html';
        return;
    }
    
    cargarPregunta();
    configurarEventos();
});

function cargarPregunta() {
    const preguntas = cuestionarios[libroActual];
    const pregunta = preguntas[preguntaActual];
    
    if (!pregunta) {
        mostrarResultados();
        return;
    }
    
    // Actualizar título
    document.getElementById('preguntaTitulo').textContent = `Pregunta ${preguntaActual + 1}`;
    
    // Actualizar texto
    document.getElementById('preguntaTexto').textContent = pregunta.texto;
    
    // Actualizar imagen si existe
    if (pregunta.imagen) {
        document.getElementById('preguntaImagen').src = pregunta.imagen;
        document.getElementById('preguntaImagen').style.display = 'block';
    } else {
        document.getElementById('preguntaImagen').style.display = 'none';
    }
    
    // Cargar opciones
    cargarOpciones(pregunta);
    
    // Actualizar contador
    document.getElementById('contador').textContent = `${preguntaActual + 1}/${preguntas.length}`;
    
    // Actualizar botones de navegación
    document.getElementById('anteriorBtn').disabled = preguntaActual === 0;
    document.getElementById('siguienteBtn').disabled = !respuestas[preguntaActual];
}

function cargarOpciones(pregunta) {
    const container = document.getElementById('opcionesContainer');
    container.innerHTML = '';
    
    pregunta.opciones.forEach((opcion, index) => {
        const div = document.createElement('div');
        div.className = 'opcion';
        
        if (respuestas[preguntaActual] === index) {
            div.classList.add('seleccionada');
        }
        
        div.innerHTML = `
            <span class="emoji-opcion">${opcion.emoji}</span>
            <span>${opcion.texto}</span>
        `;
        
        div.onclick = () => seleccionarOpcion(index, opcion.correcta);
        container.appendChild(div);
    });
}

function seleccionarOpcion(index, esCorrecta) {
    respuestas[preguntaActual] = index;
    
    // Guardar respuesta en localStorage
    const progreso = JSON.parse(localStorage.getItem('progreso') || '{}');
    if (!progreso[libroActual]) {
        progreso[libroActual] = { completadas: 0, respuestas: {} };
    }
    progreso[libroActual].respuestas[preguntaActual] = {
        opcionSeleccionada: index,
        correcta: esCorrecta
    };
    localStorage.setItem('progreso', JSON.stringify(progreso));
    
    // Actualizar UI
    cargarPregunta();
    
    // Mostrar retroalimentación
    setTimeout(() => {
        if (esCorrecta) {
            alert('¡Correcto! 🎉');
        } else {
            alert('Intenta de nuevo ❌');
        }
    }, 300);
}

function siguientePregunta() {
    if (respuestas[preguntaActual] !== undefined) {
        preguntaActual++;
        cargarPregunta();
        window.scrollTo(0, 0);
    }
}

function preguntaAnterior() {
    if (preguntaActual > 0) {
        preguntaActual--;
        cargarPregunta();
        window.scrollTo(0, 0);
    }
}

function mostrarResultados() {
    const preguntas = cuestionarios[libroActual];
    let respuestasCorrectas = 0;
    
    for (let i = 0; i < preguntas.length; i++) {
        if (respuestas[i] !== undefined) {
            const opcionSeleccionada = preguntas[i].opciones[respuestas[i]];
            if (opcionSeleccionada.correcta) {
                respuestasCorrectas++;
            }
        }
    }
    
    const porcentaje = Math.round((respuestasCorrectas / preguntas.length) * 100);
    
    // Guardar progreso completado
    const progreso = JSON.parse(localStorage.getItem('progreso') || '{}');
    if (!progreso[libroActual]) {
        progreso[libroActual] = { completadas: 0 };
    }
    progreso[libroActual].completadas++;
    localStorage.setItem('progreso', JSON.stringify(progreso));
    
    alert(`
✅ ¡CUESTIONARIO COMPLETADO!

Respuestas correctas: ${respuestasCorrectas}/${preguntas.length}
Porcentaje: ${porcentaje}%

${porcentaje >= 70 ? '¡Excelente trabajo! 🌟' : 'Puedes intentarlo de nuevo 💪'}
    `);
    
    window.location.href = 'index.html';
}

function configurarEventos() {
    document.getElementById('backBtn').addEventListener('click', function() {
        if (confirm('¿Deseas volver? Se perderá el progreso actual')) {
            window.location.href = 'index.html';
        }
    });
}
