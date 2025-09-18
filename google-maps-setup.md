# Configuración de Google Maps para Clasificados Peralta

## Pasos para integrar Google Maps

### 1. Obtener API Key de Google Maps

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita la API de Google Maps JavaScript
4. Ve a "Credenciales" y crea una nueva API Key
5. Restringe la API Key a tu dominio para seguridad

### 2. Agregar el script de Google Maps al HTML

Agrega esta línea antes del cierre de `</body>` en tu `index.html`:

```html
<script src="https://maps.googleapis.com/maps/api/js?key=TU_API_KEY_AQUI&callback=initMap&libraries=geometry,drawing,places" async defer></script>
```

Reemplaza `TU_API_KEY_AQUI` con tu API key real.

### 3. Código JavaScript para los mapas

Agrega estas funciones a tu `script.js`:

```javascript
// Variable global para almacenar mapas
let mapasInstancias = {};

// Función para inicializar un mapa en el modal
function initializeModalMap(ubicacion, elementId = 'modal-map') {
    const mapElement = document.getElementById(elementId);
    if (!mapElement) return;

    const map = new google.maps.Map(mapElement, {
        zoom: 15,
        center: ubicacion,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [
            {
                featureType: "poi",
                elementType: "labels",
                stylers: [{ visibility: "off" }]
            }
        ]
    });

    // Agregar marcador
    const marker = new google.maps.Marker({
        position: ubicacion,
        map: map,
        title: 'Ubicación del producto',
        icon: {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#e74c3c">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
            `),
            scaledSize: new google.maps.Size(32, 32)
        }
    });

    // Info window
    const infoWindow = new google.maps.InfoWindow({
        content: `
            <div style="padding: 10px;">
                <h4 style="margin: 0 0 5px 0; color: #2c3e50;">Ubicación</h4>
                <p style="margin: 0; color: #7f8c8d;">Haz clic para ver en Google Maps</p>
            </div>
        `
    });

    marker.addListener('click', () => {
        infoWindow.open(map, marker);
        // Abrir en Google Maps
        window.open(`https://maps.google.com/maps?q=${ubicacion.lat},${ubicacion.lng}`, '_blank');
    });

    return map;
}

// Función de callback requerida por Google Maps
function initMap() {
    console.log('Google Maps API cargada correctamente');
}
```

### 4. Actualizar la función abrirModal

En la función `abrirModal()` de tu `script.js`, reemplaza esta línea:

```javascript
<div id="modal-map" style="width: 100%; height: 200px; background: #ecf0f1; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: #7f8c8d;">
```

Por:

```javascript
<div id="modal-map" style="width: 100%; height: 200px; border-radius: 10px;"></div>
```

Y agrega al final de la función `abrirModal()`:

```javascript
// Inicializar mapa después de que el modal esté visible
setTimeout(() => {
    if (typeof google !== 'undefined' && google.maps) {
        initializeModalMap(producto.ubicacion);
    }
}, 300);
```

### 5. Agregar mapa general (opcional)

Si quieres un mapa que muestre todas las ubicaciones, agrega esta sección al HTML:

```html
<section class="section">
    <div class="container">
        <h2 class="section-title">Ubicaciones</h2>
        <div id="mapa-general" style="width: 100%; height: 400px; border-radius: 15px; box-shadow: 0 5px 20px rgba(0,0,0,0.1);"></div>
    </div>
</section>
```

Y esta función al JavaScript:

```javascript
function initializeGeneralMap() {
    const mapElement = document.getElementById('mapa-general');
    if (!mapElement) return;

    // Centro en Peralta
    const center = { lat: -30.950, lng: -64.312 };
    
    const map = new google.maps.Map(mapElement, {
        zoom: 13,
        center: center,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    // Agregar marcadores para todos los productos
    productos.forEach(producto => {
        if (producto.ubicacion) {
            const marker = new google.maps.Marker({
                position: producto.ubicacion,
                map: map,
                title: producto.titulo
            });

            const infoWindow = new google.maps.InfoWindow({
                content: `
                    <div style="max-width: 200px;">
                        <h4 style="margin: 0 0 5px 0;">${producto.titulo}</h4>
                        <p style="margin: 0 0 5px 0; color: #27ae60; font-weight: bold;">${producto.precio}</p>
                        <button onclick="abrirModal(${producto.id})" style="background: #3498db; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer;">Ver detalles</button>
                    </div>
                `
            });

            marker.addListener('click', () => {
                infoWindow.open(map, marker);
            });
        }
    });
}
```

### 6. Consideraciones de seguridad

- **Nunca** expongas tu API key en el código público
- Restringe la API key a tu dominio específico
- Considera usar variables de entorno para la API key en producción
- Monitorea el uso de la API para evitar costos inesperados

### 7. Costos

Google Maps tiene un plan gratuito que incluye:
- $200 USD de crédito mensual
- Aproximadamente 28,000 cargas de mapa por mes

Para un sitio de clasificados familiar, esto debería ser más que suficiente.

## Notas adicionales

- Los mapas se cargarán automáticamente cuando abras los detalles de un producto
- Las coordenadas están configuradas para la zona de Peralta, Córdoba
- Puedes personalizar los estilos del mapa editando el array `styles` en la configuración
- Para obtener coordenadas exactas, puedes usar [este sitio](https://www.latlong.net/)

