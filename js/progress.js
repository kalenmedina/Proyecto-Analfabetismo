/**
 * Sistema de seguimiento de progreso
 * Utiliza localStorage para guardar el progreso del usuario
 */

const STORAGE_KEY = 'proyecto_analfabetismo_progreso';
const USER_KEY = 'proyecto_analfabetismo_usuario';

/**
 * Inicializa el sistema de progreso
 */
function inicializarProgreso() {
    // Cargar nombre de usuario
    cargarNombreUsuario();
    
    // Inicializar localStorage si no existe
    if (!localStorage.getItem(STORAGE_KEY)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({}));
    }
}

/**
 * Cargar o crear nombre de usuario
 */
function cargarNombreUsuario() {
    let usuario = localStorage.getItem(USER_KEY);
    
    if (!usuario) {
        usuario = prompt('¿Cuál es tu nombre?', 'Estudiante');
        if (usuario) {
            localStorage.setItem(USER_KEY, usuario);
        }
    }
    
    const userNameElement = document.getElementById('userName');
    if (userNameElement) {
        userNameElement.textContent = usuario || 'Estudiante';
    }
}

/**
 * Obtener progreso de un libro específico
 */
function obtenerProgresoLibro(idLibro) {
    const progreso = JSON.parse(localStorage.getItem('progreso') || '{}');
    
    if (!progreso[idLibro]) {
        progreso[idLibro] = {
            completadas: 0,
            respuestas: {}
        };
        guardarProgreso(progreso);
    }
    
    return progreso[idLibro];
}

/**
 * Guardar progreso
 */
function guardarProgreso(progreso) {
    localStorage.setItem('progreso', JSON.stringify(progreso));
}

/**
 * Registrar respuesta correcta o incorrecta
 */
function registrarRespuesta(idLibro, numeroPregunta, esCorrecta) {
    const progreso = JSON.parse(localStorage.getItem('progreso') || '{}');
    
    if (!progreso[idLibro]) {
        progreso[idLibro] = { completadas: 0, respuestas: {} };
    }
    
    if (!progreso[idLibro].respuestas) {
        progreso[idLibro].respuestas = {};
    }
    
    progreso[idLibro].respuestas[numeroPregunta] = {
        contestada: true,
        correcta: esCorrecta,
        fecha: new Date().toISOString()
    };
    
    guardarProgreso(progreso);
}

/**
 * Marcar libro como completado
 */
function marcarLibroCompleto(idLibro) {
    const progreso = JSON.parse(localStorage.getItem('progreso') || '{}');
    
    if (!progreso[idLibro]) {
        progreso[idLibro] = { completadas: 0 };
    }
    
    progreso[idLibro].completada = true;
    progreso[idLibro].fechaCompletacion = new Date().toISOString();
    
    guardarProgreso(progreso);
}

/**
 * Obtener estadísticas generales
 */
function obtenerEstadisticas() {
    const progreso = JSON.parse(localStorage.getItem('progreso') || '{}');
    const usuario = localStorage.getItem(USER_KEY) || 'Estudiante';
    
    let totalLibros = 0;
    let librosCompletados = 0;
    let totalRespuestas = 0;
    let respuestasCorrectas = 0;
    let ultimaActividad = null;
    
    for (const libro in progreso) {
        totalLibros++;
        
        if (progreso[libro].completada) {
            librosCompletados++;
        }
        
        if (progreso[libro].respuestas) {
            const respuestas = progreso[libro].respuestas;
            for (const respuesta in respuestas) {
                totalRespuestas++;
                if (respuestas[respuesta].correcta) {
                    respuestasCorrectas++;
                }
                
                const fecha = new Date(respuestas[respuesta].fecha);
                if (!ultimaActividad || fecha > ultimaActividad) {
                    ultimaActividad = fecha;
                }
            }
        }
    }
    
    return {
        usuario: usuario,
        totalLibros: totalLibros,
        librosCompletados: librosCompletados,
        totalRespuestas: totalRespuestas,
        respuestasCorrectas: respuestasCorrectas,
        porcentajeAcierto: totalRespuestas > 0 ? Math.round((respuestasCorrectas / totalRespuestas) * 100) : 0,
        ultimaActividad: ultimaActividad ? ultimaActividad.toLocaleString() : 'Sin actividad'
    };
}

/**
 * Exportar progreso como JSON
 */
function exportarProgreso() {
    const progreso = JSON.parse(localStorage.getItem('progreso') || '{}');
    const usuario = localStorage.getItem(USER_KEY) || 'Estudiante';
    const estadisticas = obtenerEstadisticas();
    
    const datos = {
        usuario: usuario,
        exportadoEn: new Date().toISOString(),
        estadisticas: estadisticas,
        detalles: progreso
    };
    
    return JSON.stringify(datos, null, 2);
}

/**
 * Limpiar todo el progreso (solo para desarrollo)
 */
function limpiarProgreso() {
    if (confirm('¿Estás seguro de que deseas borrar todo el progreso? Esta acción no se puede deshacer.')) {
        localStorage.removeItem('progreso');
        localStorage.removeItem(USER_KEY);
        location.reload();
    }
}
