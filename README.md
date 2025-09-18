# Clasificados Peralta 🏡

Una página web moderna y responsive para clasificados familiares, especializada en terrenos, productos y fondos de comercio.

## 🌟 Características

- **Catálogo Organizado**: Secciones dedicadas para cada categoría con navegación por pestañas
- **Filtros Avanzados**: Búsqueda por texto, filtros de precio y opciones de ordenamiento
- **Secciones Especializadas**: Cada categoría tiene su propia sección con productos destacados
- **Contadores Dinámicos**: Muestra la cantidad de productos en cada categoría
- **Productos Destacados**: Sistema para resaltar productos importantes
- **Diseño Responsive**: Funciona perfectamente en móviles, tablets y escritorio
- **Modal Detallado**: Vista expandida con información completa de cada producto
- **Integración WhatsApp**: Botones directos para contacto por WhatsApp
- **Animaciones Suaves**: Transiciones y efectos que mejoran la experiencia
- **Formulario de Contacto**: Sistema de contacto integrado
- **Preparado para Google Maps**: Estructura lista para integrar mapas

## 🎨 Paleta de Colores

- **Azul Principal**: `#2c3e50` - Headers y elementos principales
- **Verde Acción**: `#27ae60` - Botones de contacto y llamadas a acción
- **Naranja Destacado**: `#f39c12` - Elementos importantes y precios
- **Azul Claro**: `#3498db` - Enlaces y elementos secundarios
- **Grises**: `#ecf0f1`, `#7f8c8d` - Fondos y texto secundario

## 📁 Estructura del Proyecto

```
clasificadosperalta/
├── index.html              # Página principal
├── styles.css             # Estilos CSS
├── script.js              # JavaScript funcional
├── google-maps-setup.md   # Guía para configurar Google Maps
└── README.md              # Esta documentación
```

## 🚀 Cómo Empezar

1. **Descarga los archivos** y colócalos en tu servidor web
2. **Abre index.html** en tu navegador para ver el resultado
3. **Personaliza el contenido** siguiendo las instrucciones de abajo
4. **Opcional**: Configura Google Maps siguiendo `google-maps-setup.md`

## ✏️ Personalización

### Cambiar Información de Contacto

Edita estos elementos en `index.html`:

```html
<!-- Busca estas líneas y actualiza con tus datos -->
<p>+54 9 XXX XXX-XXXX</p>
<p>+54 9 XXX XXX-XXXX</p>
<p>info@clasificadosperalta.com</p>
```

### Agregar/Editar Productos

Los productos se definen en `script.js` en el array `productos`. Ejemplo:

```javascript
{
    id: 7, // ID único
    titulo: "Tu Nuevo Producto",
    precio: "$1.500.000",
    categoria: "terrenos", // "terrenos", "productos", o "comercios"
    descripcion: "Descripción detallada del producto...",
    imagen: "URL_DE_LA_IMAGEN",
    caracteristicas: ["Característica 1", "Característica 2"],
    ubicacion: { lat: -30.950, lng: -64.312 },
    contacto: "+54 9 XXX XXX-XXXX",
    detalles: {
        superficie: "500 m²",
        // Más detalles específicos...
    }
}
```

### Cambiar Imágenes

Las imágenes actuales usan Unsplash como placeholder. Para usar tus propias imágenes:

1. **Crea una carpeta** `images/` en tu proyecto
2. **Sube tus fotos** a esa carpeta
3. **Cambia las URLs** en el array de productos:

```javascript
imagen: "images/mi-terreno.jpg"
```

### Personalizar Colores

Para cambiar los colores, edita estas variables CSS en `styles.css`:

```css
/* Busca y modifica estos colores */
#2c3e50  /* Azul principal */
#27ae60  /* Verde botones */
#f39c12  /* Naranja destacado */
#3498db  /* Azul claro */
```

## 📱 Funcionalidades Principales

### Catálogo Organizado
- **Navegación por Pestañas**: Cambia fácilmente entre categorías
- **Contadores Dinámicos**: Ve cuántos productos hay en cada categoría
- **Vista General**: Pestaña "Todos" para ver todo el inventario
- **Productos Destacados**: Marcados con estrella para mayor visibilidad

### Filtros Avanzados
- **Búsqueda por Texto**: Busca en títulos, descripciones y características
- **Filtros de Precio**: Rangos predefinidos para encontrar productos por presupuesto
  - Hasta $2.000.000
  - $2M - $5M
  - $5M - $10M
  - Más de $10M
- **Ordenamiento**: 
  - Más recientes
  - Precio: menor a mayor
  - Precio: mayor a menor
  - Orden alfabético

### Secciones Especializadas
- **Terrenos**: Sección dedicada con características específicas de terrenos
- **Productos**: Enfocada en vehículos, maquinaria y otros productos
- **Fondos de Comercio**: Especializada en oportunidades de negocio
- **Vista Previa**: Cada sección muestra hasta 3 productos destacados

### Modal de Detalles
Cada producto tiene un modal con:
- Galería de imágenes
- Información detallada
- Características específicas
- Ubicación (preparado para Google Maps)
- Botones de contacto directo

### Contacto Integrado
- **WhatsApp**: Enlaces directos con el número
- **Llamadas**: Enlaces `tel:` para móviles
- **Formulario**: Sistema de contacto por email

## 🗺️ Integrar Google Maps

Sigue las instrucciones detalladas en `google-maps-setup.md` para:
- Obtener una API Key de Google Maps
- Configurar mapas interactivos
- Mostrar ubicaciones de productos
- Crear un mapa general con todos los productos

## 📞 Configurar WhatsApp

Los botones de WhatsApp usan este formato:
```
https://wa.me/NUMERO?text=Hola, me interesa el PRODUCTO
```

Para personalizar el mensaje:
```javascript
// En script.js, busca esta línea:
href="https://wa.me/${producto.contacto.replace(/[^0-9]/g, '')}"

// Y cámbiala por:
href="https://wa.me/${producto.contacto.replace(/[^0-9]/g, '')}?text=Hola, me interesa ${producto.titulo}"
```

## 🔧 Funciones Adicionales

### Agregar Productos Dinámicamente

Usa esta función en la consola del navegador:

```javascript
agregarProducto({
    titulo: "Nuevo Producto",
    precio: "$2.000.000",
    categoria: "terrenos",
    descripcion: "Descripción...",
    imagen: "URL_IMAGEN",
    caracteristicas: ["Característica 1"],
    ubicacion: { lat: -30.950, lng: -64.312 },
    contacto: "+54 9 XXX XXX-XXXX",
    detalles: { superficie: "400 m²" }
});
```

### Eliminar Productos

```javascript
eliminarProducto(ID_DEL_PRODUCTO);
```

## 🌐 Deployment

### Hosting Gratuito (GitHub Pages)
1. Crea un repositorio en GitHub
2. Sube todos los archivos
3. Ve a Settings > Pages
4. Selecciona la rama main
5. Tu sitio estará en `https://tu-usuario.github.io/nombre-repo`

### Hosting Pago
Funciona en cualquier servidor web:
- Hostinger
- GoDaddy  
- SiteGround
- Cualquier hosting con soporte HTML/CSS/JS

## 📈 Mejoras Futuras

Ideas para expandir el proyecto:
- **Panel de Administración**: Para agregar productos sin tocar código
- **Base de Datos**: MySQL/PostgreSQL para almacenar productos
- **Sistema de Usuarios**: Registro y login
- **Favoritos**: Guardar productos de interés
- **Búsqueda Avanzada**: Filtros por precio, ubicación, etc.
- **Galería Múltiple**: Varias fotos por producto
- **Comentarios**: Sistema de reseñas

## 🆘 Soporte

Si necesitas ayuda:
1. **Revisa la documentación** de este README
2. **Consulta** `google-maps-setup.md` para mapas
3. **Inspecciona el código** - está bien comentado
4. **Usa la consola del navegador** para detectar errores

## 📄 Licencia

Este proyecto está disponible para uso personal y comercial. 
Creado específicamente para Clasificados Peralta.

---

**¡Listo para usar! 🎉**

Abre `index.html` en tu navegador y comienza a personalizar tu sitio de clasificados.
