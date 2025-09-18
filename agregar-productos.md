# 📝 Cómo Agregar Nuevos Productos

Esta guía te enseña a agregar nuevos productos, terrenos o fondos de comercio a la página de manera fácil.

## 🔧 Pasos Simples

### 1. Preparar la Información

Antes de agregar el producto, ten lista esta información:
- **Título**: Nombre descriptivo del producto
- **Precio**: Precio de venta
- **Categoría**: `terrenos`, `productos`, o `comercios`
- **Descripción**: Descripción detallada
- **Fotos**: Al menos una foto del producto
- **Características**: Lista de características principales
- **Ubicación**: Dirección o coordenadas
- **Contacto**: Número de teléfono

### 2. Subir las Fotos

1. **Crea una carpeta** llamada `images` si no existe
2. **Guarda tu foto** con un nombre descriptivo: `terreno-centro-peralta.jpg`
3. **Anota la ruta**: `images/terreno-centro-peralta.jpg`

### 3. Editar el Archivo JavaScript

1. **Abre** el archivo `script.js`
2. **Busca** la línea que dice `const productos = [`
3. **Agrega tu producto** siguiendo este ejemplo:

## 📋 Plantilla para Copiar y Pegar

```javascript
{
    id: 8, // ⚠️ IMPORTANTE: Usar el siguiente número disponible
    titulo: "NOMBRE DEL PRODUCTO",
    precio: "$XXX.XXX",
    precioNumerico: XXXXXX, // Precio sin símbolos ni puntos (ej: 2500000)
    categoria: "CATEGORIA", // terrenos, productos, o comercios
    descripcion: "DESCRIPCIÓN DETALLADA DEL PRODUCTO...",
    imagen: "images/NOMBRE-FOTO.jpg",
    caracteristicas: ["Característica 1", "Característica 2", "Característica 3"],
    ubicacion: { lat: -30.XXX, lng: -64.XXX }, // Coordenadas de la ubicación
    contacto: "+54 9 XXXX XX-XXXX",
    destacado: true, // true = aparece como destacado, false = producto normal
    fechaCreacion: new Date('2024-01-XX'), // Fecha de publicación
    detalles: {
        // Agregar detalles específicos según el tipo de producto
    }
},
```

### ⭐ Productos Destacados

Los productos marcados con `destacado: true` aparecerán:
- Con una etiqueta de "Destacado" con estrella
- En las secciones de vista previa de cada categoría
- Destacados visualmente en el catálogo

**Recomendación**: Marca como destacados solo los mejores productos de cada categoría (máximo 3 por categoría).

## 🏡 Ejemplos por Categoría

### Para Terrenos
```javascript
{
    id: 8,
    titulo: "Terreno Residencial Zona Norte",
    precio: "$3.200.000",
    precioNumerico: 3200000,
    categoria: "terrenos",
    descripcion: "Excelente terreno en zona residencial, ideal para construcción de vivienda unifamiliar.",
    imagen: "images/terreno-zona-norte.jpg",
    caracteristicas: ["600 m²", "Todos los servicios", "Esquina", "Escriturado"],
    ubicacion: { lat: -30.945, lng: -64.308 },
    contacto: "+54 9 3564 XX-XXXX",
    destacado: true,
    fechaCreacion: new Date('2024-01-25'),
    detalles: {
        superficie: "600 m²",
        frente: "20 metros",
        servicios: "Agua, luz, gas, cloacas",
        zonificacion: "Residencial"
    }
},
```

### Para Productos
```javascript
{
    id: 9,
    titulo: "Camioneta Toyota Hilux 2020",
    precio: "$8.500.000",
    precioNumerico: 8500000,
    categoria: "productos",
    descripcion: "Toyota Hilux 2020 en excelente estado, único dueño, service en concesionario.",
    imagen: "images/hilux-2020.jpg",
    caracteristicas: ["2020", "4x4", "Único dueño", "Service al día"],
    ubicacion: { lat: -30.952, lng: -64.315 },
    contacto: "+54 9 3564 XX-XXXX",
    destacado: false,
    fechaCreacion: new Date('2024-01-22'),
    detalles: {
        marca: "Toyota Hilux",
        año: "2020",
        kilometraje: "45.000 km",
        combustible: "Diesel",
        transmision: "Manual"
    }
},
```

### Para Fondos de Comercio
```javascript
{
    id: 10,
    titulo: "Panadería en Funcionamiento",
    precio: "$6.800.000",
    precioNumerico: 6800000,
    categoria: "comercios",
    descripcion: "Panadería con 15 años de funcionamiento, clientela establecida, equipamiento completo.",
    imagen: "images/panaderia.jpg",
    caracteristicas: ["15 años", "Funcionando", "Equipada", "Clientela fiel"],
    ubicacion: { lat: -30.953, lng: -64.311 },
    contacto: "+54 9 3564 XX-XXXX",
    destacado: true,
    fechaCreacion: new Date('2024-01-18'),
    detalles: {
        superficie: "80 m²",
        antiguedad: "15 años",
        facturacion: "Consultar",
        incluye: "Horno, amasadora, heladera, mostrador, caja registradora"
    }
},
```

## 📍 Cómo Obtener Coordenadas

### Método Fácil:
1. Ve a [Google Maps](https://maps.google.com)
2. Busca la dirección del producto
3. **Haz clic derecho** en el punto exacto
4. Selecciona "¿Qué hay aquí?"
5. **Copia los números** que aparecen (ejemplo: -30.953, -64.314)

### Coordenadas de Referencia para Peralta:
- **Centro**: `{ lat: -30.953, lng: -64.314 }`
- **Zona Norte**: `{ lat: -30.948, lng: -64.310 }`
- **Zona Sur**: `{ lat: -30.958, lng: -64.318 }`
- **Zona Este**: `{ lat: -30.950, lng: -64.308 }`
- **Zona Oeste**: `{ lat: -30.955, lng: -64.320 }`

## ✅ Lista de Verificación

Antes de guardar, verifica que:
- [ ] El **ID es único** (no hay otro producto con el mismo número)
- [ ] La **categoría** es exactamente: `terrenos`, `productos`, o `comercios`
- [ ] La **imagen existe** en la carpeta images
- [ ] El **precio** tiene el formato `"$X.XXX.XXX"`
- [ ] Las **coordenadas** son correctas
- [ ] El **número de contacto** es válido

## 🔄 Pasos Finales

1. **Guarda** el archivo `script.js`
2. **Actualiza** la página en el navegador (F5)
3. **Verifica** que el producto aparece correctamente
4. **Prueba** el filtro correspondiente
5. **Abre** el modal para verificar todos los datos

## 🚨 Problemas Comunes

### El producto no aparece:
- Verifica que el ID sea único
- Revisa que la coma final esté correcta
- Comprueba que la categoría sea exacta

### La imagen no se ve:
- Verifica que la ruta sea correcta
- Asegúrate de que la imagen esté en la carpeta `images`
- Comprueba que el nombre del archivo coincida exactamente

### Error en el mapa:
- Verifica que las coordenadas tengan el formato correcto
- Usa punto (.) como separador decimal, no coma

## 💡 Consejos

- **Fotos**: Usa imágenes de buena calidad, idealmente 400x250 píxeles o más
- **Nombres**: Usa nombres descriptivos para las fotos: `terreno-esquina-centro.jpg`
- **Precios**: Mantén el formato consistente: `"$2.500.000"`
- **Descripciones**: Sé específico pero conciso, máximo 2-3 líneas
- **Características**: Usa palabras clave que la gente busca

## 📞 Contacto Técnico

Si tienes problemas agregando productos o necesitas ayuda, no dudes en consultar el archivo `README.md` o verificar que todos los archivos estén en su lugar correcto.

---

**¡Éxito agregando tus productos! 🎉**
