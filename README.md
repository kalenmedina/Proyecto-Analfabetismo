# Proyecto Analfabetismo - Plataforma Educativa Interactiva

## 📚 Descripción

Plataforma educativa interactiva diseñada para ayudar a personas con analfabetismo o bajo nivel de alfabetización a través de:

- **Libros Interactivos**: Historias visuales con emojis y descripciones simples
- **Cuestionarios**: Preguntas con opciones de respuesta visual (emojis y texto)
- **Sistema de Progreso**: Seguimiento automático del aprendizaje
- **Interfaz Intuitiva**: Diseño amigable y accesible

## 🚀 Características Principales

### 1. **Libros Interactivos**
- 4 libros educativos disponibles
- Navegación sencilla
- Visualización del progreso
- Emojis para facilitar la comprensión

### 2. **Sistema de Cuestionarios**
- Preguntas adaptadas a cada libro
- Opciones con emojis visuales
- Retroalimentación inmediata
- Validación automática de respuestas

### 3. **Seguimiento de Progreso**
- Almacenamiento local en localStorage
- Estadísticas generales
- Historial de respuestas
- Exportación de datos

### 4. **Interfaz Responsive**
- Diseño adaptable a dispositivos móviles
- Navegación intuitiva
- Animaciones suaves

## 📁 Estructura del Proyecto

```
Proyecto-Analfabetismo/
├── index.html              # Página principal
├── cuestionario.html       # Página de cuestionarios
├── styles/
│   ├── main.css           # Estilos generales
│   ├── libros.css         # Estilos de libros
│   └── cuestionario.css   # Estilos de cuestionarios
├── js/
│   ├── libros.js          # Lógica de libros
│   ├── cuestionario.js    # Lógica de cuestionarios
│   └── progress.js        # Sistema de progreso
└── README.md              # Este archivo
```

## 🛠️ Cómo Usar

### Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/kalenmedina/Proyecto-Analfabetismo.git
```

2. Abre `index.html` en tu navegador

### Desarrollo Local

Puedes usar un servidor local (recomendado para mejor rendimiento):

```bash
# Con Python 3
python -m http.server 8000

# Con Node.js (si tienes http-server instalado)
http-server
```

Luego accede a `http://localhost:8000`

## 📊 Datos Almacenados

La plataforma utiliza `localStorage` para guardar:

- **Usuario**: Nombre del estudiante
- **Progreso**: Respuestas y completación de cuestionarios
- **Estadísticas**: Porcentaje de aciertos, libros completados, etc.

### Estructura de localStorage

```json
{
  "proyecto_analfabetismo_usuario": "Nombre del Estudiante",
  "progreso": {
    "libro1": {
      "completadas": 1,
      "respuestas": {
        "0": { "opcionSeleccionada": 0, "correcta": true },
        "1": { "opcionSeleccionada": 1, "correcta": false }
      }
    }
  }
}
```

## 🎨 Personalización

### Agregar Nuevos Libros

En `js/libros.js`, agrega un nuevo objeto al array `libros`:

```javascript
{
    id: 'libro5',
    titulo: 'Tu Nuevo Libro',
    descripcion: 'Descripción del libro',
    emoji: '📖',
    paginas: 5
}
```

### Agregar Nuevas Preguntas

En `js/cuestionario.js`, agrega un nuevo array al objeto `cuestionarios`:

```javascript
libroX: [
    {
        id: 1,
        texto: '¿Tu pregunta?',
        imagen: '',
        opciones: [
            { texto: 'Opción 1', emoji: '✅', correcta: true },
            { texto: 'Opción 2', emoji: '❌', correcta: false }
        ]
    }
]
```

## 🔧 API de Progreso

### Funciones Disponibles

```javascript
// Obtener progreso de un libro
obtenerProgresoLibro(idLibro)

// Registrar respuesta
registrarRespuesta(idLibro, numeroPregunta, esCorrecta)

// Obtener estadísticas
obtenerEstadisticas()

// Exportar progreso
exportarProgreso()

// Limpiar todo (desarrollo)
limpiarProgreso()
```

## 🎯 Objetivos Educativos

- ✅ Mejorar alfabetización básica
- ✅ Fomentar el aprendizaje autónomo
- ✅ Proporcionar retroalimentación inmediata
- ✅ Seguimiento del progreso personalizado
- ✅ Interfaz accesible para todos

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo licencia MIT.

## ���� Contacto

¿Preguntas o sugerencias? Abre un issue en el repositorio.

---

**Hecho con ❤️ para la educación de todos**
