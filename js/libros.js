// Datos de libros
const libros = [
    {
        id: 'libro1',
        titulo: 'La Selva Misteriosa',
        descripcion: 'Explora la aventura en la selva y aprende sobre la naturaleza',
        emoji: '🌴',
        paginas: 5
    },
    {
        id: 'libro2',
        titulo: 'El Viaje del Héroe',
        descripcion: 'Un cuento de valentía y amistad',
        emoji: '⚔️',
        paginas: 4
    },
    {
        id: 'libro3',
        titulo: 'El Mundo de los Animales',
        descripcion: 'Conoce a los animales más fascinantes del planeta',
        emoji: '🦁',
        paginas: 6
    },
    {
        id: 'libro4',
        titulo: 'Las Estrellas Brillan',
        descripcion: 'Descubre los misterios del universo',
        emoji: '⭐',
        paginas: 5
    }
];

// Inicializar la plataforma
document.addEventListener('DOMContentLoaded', function() {
    cargarLibros();
    inicializarProgreso();
    configurarEventos();
});

function cargarLibros() {
    const container = document.getElementById('librosContainer');
    container.innerHTML = '';

    libros.forEach(libro => {
        const libroElement = crearElementoLibro(libro);
        container.appendChild(libroElement);
    });
}

function crearElementoLibro(libro) {
    const div = document.createElement('div');
    div.className = 'libro';
    div.onclick = () => abrirCuestionario(libro.id);

    const progreso = obtenerProgresoLibro(libro.id);
    const porcentaje = (progreso.completadas / libro.paginas) * 100;

    div.innerHTML = `
        <div class="libro-img">${libro.emoji}</div>
        <div class="libro-content">
            <h3 class="libro-title">${libro.titulo}</h3>
            <p class="libro-description">${libro.descripcion}</p>
            <div class="libro-footer">
                <span class="libro-progress">${progreso.completadas}/${libro.paginas} completadas</span>
                <button class="libro-btn" onclick="event.stopPropagation(); abrirCuestionario('${libro.id}')">Continuar</button>
            </div>
        </div>
        <div style="width: 100%; height: 4px; background: #e0e0e0;">
            <div style="width: ${porcentaje}%; height: 100%; background: #667eea; transition: width 0.3s ease;"></div>
        </div>
    `;

    return div;
}

function abrirCuestionario(idLibro) {
    // Guardar el libro actual en sessionStorage
    sessionStorage.setItem('libroActual', idLibro);
    
    // Redirigir al cuestionario
    window.location.href = `cuestionario.html?libro=${idLibro}`;
}

function configurarEventos() {
    const progressBtn = document.getElementById('progressBtn');
    progressBtn.addEventListener('click', mostrarProgreso);
}

function mostrarProgreso() {
    const stats = calcularEstadisticas();
    alert(`
📊 TU PROGRESO:

Libros completados: ${stats.librosCompletados}/${libros.length}
Total de páginas completadas: ${stats.totalPaginas}
Progreso general: ${stats.porcentajeGeneral}%

¡Continúa así! 🎉
    `);
}

function calcularEstadisticas() {
    let librosCompletados = 0;
    let totalPaginas = 0;
    let totalPaginasMaximas = 0;

    libros.forEach(libro => {
        const progreso = obtenerProgresoLibro(libro.id);
        totalPaginas += progreso.completadas;
        totalPaginasMaximas += libro.paginas;
        
        if (progreso.completadas === libro.paginas) {
            librosCompletados++;
        }
    });

    return {
        librosCompletados: librosCompletados,
        totalPaginas: totalPaginas,
        porcentajeGeneral: totalPaginasMaximas > 0 ? Math.round((totalPaginas / totalPaginasMaximas) * 100) : 0
    };
}
