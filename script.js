// Terrenos disponibles
const productos = [
    {
        id: 1,
        titulo: "Terreno Termas de Rio Hondo",
        precio: "Consultar",
        precioNumerico: 0,
        categoria: "terrenos",
        descripcion: "Excelente lote ubicado entre Rondeau y Wagner 601, ideal para construcción de vivienda. Zona tranquila y con excelente ubicación.",
        imagen: "img/Lote Termas Nony.jpg",
        caracteristicas: ["297 m²", "11x27 metros", "Excelente ubicación", "Zona residencial"],
        ubicacion: { lat: -30.953, lng: -64.314 },
        contacto: "+54 9 385 698-7001",
        destacado: true,
        fechaCreacion: new Date('2024-09-18'),
        detalles: {
            superficie: "297 m² (11x27 metros)",
            ubicacion: "Entre Rondeau y Wagner 601",
            frente: "11 metros",
            fondo: "27 metros",
            zonificacion: "Residencial",
            googleMaps: "https://maps.app.goo.gl/bwBbZLCxapYEJzcMA"
        }
    },
    {
        id: 2,
        titulo: "Terreno Loreto, Barrio Chacras ",
        precio: "Consultar",
        precioNumerico: 0,
        categoria: "terrenos",
        descripcion: "Hermoso lote en Barrio Chacras, ubicación privilegiada con excelente acceso y servicios disponibles.",
        imagen: "img/Lote Walter Chacras 1.jpeg",
        caracteristicas: ["281.25 m²", "12.50x22.50 metros", "Barrio Chacras", "Servicios disponibles"],
        ubicacion: { lat: -30.948, lng: -64.310 },
        contacto: "+54 9 385 496-5677",
        destacado: true,
        fechaCreacion: new Date('2024-09-18'),
        detalles: {
            superficie: "281.25 m² (12.50x22.50 metros)",
            ubicacion: "Barrio Chacras",
            frente: "12.50 metros",
            fondo: "22.50 metros",
            zonificacion: "Residencial",
            googleMaps: "https://maps.app.goo.gl/abBSFz9ouLE371HZ8"
        },
        imagenesAdicionales: [
            "img/Lote Walter Chacras 2.jpeg",
            "img/Lote Walter Chacras 3.jpeg",
            "img/Lote Walter Chacras 4.jpeg"
        ]
    }
];

// Variables globales
let filtroActivo = 'todos';
let filtrosAvanzados = {
    busqueda: '',
    precio: 'all',
    ordenamiento: 'reciente'
};
let modal = null;

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    inicializarApp();
});

function inicializarApp() {
    configurarNavegacion();
    configurarFiltrosAvanzados();
    mostrarCatalogo();
    mostrarSeccionesCategoria();
    actualizarContadores();
    configurarModal();
    configurarFormulario();
    configurarAnimaciones();
    configurarScrollSuave();
}

// Navegación móvil
function configurarNavegacion() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Configurar filtros avanzados
function configurarFiltrosAvanzados() {
    const searchInput = document.getElementById('search-input');
    const priceFilter = document.getElementById('price-filter');
    const sortFilter = document.getElementById('sort-filter');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            filtrosAvanzados.busqueda = e.target.value.toLowerCase();
            mostrarCatalogo();
        });
    }

    if (priceFilter) {
        priceFilter.addEventListener('change', (e) => {
            filtrosAvanzados.precio = e.target.value;
            mostrarCatalogo();
        });
    }

    if (sortFilter) {
        sortFilter.addEventListener('change', (e) => {
            filtrosAvanzados.ordenamiento = e.target.value;
            mostrarCatalogo();
        });
    }
}

// Cambiar pestaña del catálogo
function cambiarTab(categoria) {
    // Actualizar pestañas activas
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    const tabActiva = document.querySelector(`[data-tab="${categoria}"]`);
    if (tabActiva) {
        tabActiva.classList.add('active');
    }

    // Actualizar filtro activo
    filtroActivo = categoria;
    
    // Mostrar productos filtrados
    mostrarCatalogo();
    
    // Scroll al catálogo si no está visible
    const catalogoSection = document.getElementById('catalogo');
    if (catalogoSection) {
        catalogoSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Filtrar productos
function filtrarProductos() {
    let productosFiltrados = [...productos];

    // Filtro por categoría
    if (filtroActivo !== 'todos') {
        productosFiltrados = productosFiltrados.filter(producto => 
            producto.categoria === filtroActivo
        );
    }

    // Filtro por búsqueda
    if (filtrosAvanzados.busqueda) {
        productosFiltrados = productosFiltrados.filter(producto => 
            producto.titulo.toLowerCase().includes(filtrosAvanzados.busqueda) ||
            producto.descripcion.toLowerCase().includes(filtrosAvanzados.busqueda) ||
            producto.caracteristicas.some(carac => 
                carac.toLowerCase().includes(filtrosAvanzados.busqueda)
            )
        );
    }

    // Filtro por precio
    if (filtrosAvanzados.precio !== 'all') {
        const [min, max] = filtrosAvanzados.precio.split('-').map(Number);
        productosFiltrados = productosFiltrados.filter(producto => {
            const precio = producto.precioNumerico;
            return precio >= min && precio <= max;
        });
    }

    // Ordenamiento
    switch (filtrosAvanzados.ordenamiento) {
        case 'precio-menor':
            productosFiltrados.sort((a, b) => a.precioNumerico - b.precioNumerico);
            break;
        case 'precio-mayor':
            productosFiltrados.sort((a, b) => b.precioNumerico - a.precioNumerico);
            break;
        case 'titulo':
            productosFiltrados.sort((a, b) => a.titulo.localeCompare(b.titulo));
            break;
        case 'reciente':
        default:
            productosFiltrados.sort((a, b) => b.fechaCreacion - a.fechaCreacion);
            break;
    }

    return productosFiltrados;
}

// Mostrar catálogo
function mostrarCatalogo() {
    const container = document.getElementById('catalog-container');
    const emptyState = document.getElementById('empty-state');
    
    if (!container) return;

    const productosFiltrados = filtrarProductos();
    
    if (productosFiltrados.length === 0) {
        container.innerHTML = '';
        if (emptyState) emptyState.style.display = 'block';
        return;
    }

    if (emptyState) emptyState.style.display = 'none';

    container.innerHTML = productosFiltrados.map(producto => `
        <div class="product-card fade-in" data-id="${producto.id}">
            <div class="product-image">
                <img src="${producto.imagen}" alt="${producto.titulo}" loading="lazy">
                <div class="product-badge">${getCategoriaTexto(producto.categoria)}</div>
                ${producto.destacado ? '<div class="product-featured"><i class="fas fa-star"></i> Destacado</div>' : ''}
            </div>
            <div class="product-info">
                <h3 class="product-title">${producto.titulo}</h3>
                <div class="product-price">${producto.precio}</div>
                <p class="product-description">${producto.descripcion}</p>
                <div class="product-features">
                    ${producto.caracteristicas.map(caracteristica => 
                        `<span class="feature-tag">${caracteristica}</span>`
                    ).join('')}
                </div>
                <div class="product-actions">
                    <button class="btn btn-primary" onclick="abrirModal(${producto.id})">
                        <i class="fas fa-eye"></i> Ver Detalles
                    </button>
                    <a href="https://wa.me/${producto.contacto.replace(/[^0-9]/g, '')}" 
                       class="btn btn-secondary" target="_blank">
                        <i class="fab fa-whatsapp"></i> Contactar
                    </a>
                </div>
            </div>
        </div>
    `).join('');

    // Activar animaciones
    activarAnimaciones();
}

// Mostrar secciones de categoría con productos destacados
function mostrarSeccionesCategoria() {
    const categorias = ['terrenos', 'productos', 'comercios'];
    
    categorias.forEach(categoria => {
        const container = document.getElementById(`${categoria}-preview`);
        if (!container) return;

        const productosCategoria = productos
            .filter(p => p.categoria === categoria)
            .filter(p => p.destacado)
            .slice(0, 3); // Máximo 3 productos destacados

        if (productosCategoria.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: #7f8c8d; padding: 2rem;">Próximamente nuevos productos en esta categoría</p>';
            return;
        }

        container.innerHTML = productosCategoria.map(producto => `
            <div class="product-card fade-in" data-id="${producto.id}">
                <div class="product-image">
                    <img src="${producto.imagen}" alt="${producto.titulo}" loading="lazy">
                    <div class="product-badge">${getCategoriaTexto(producto.categoria)}</div>
                    <div class="product-featured"><i class="fas fa-star"></i> Destacado</div>
                </div>
                <div class="product-info">
                    <h3 class="product-title">${producto.titulo}</h3>
                    <div class="product-price">${producto.precio}</div>
                    <p class="product-description">${producto.descripcion.substring(0, 100)}...</p>
                    <div class="product-actions">
                        <button class="btn btn-primary" onclick="abrirModal(${producto.id})">
                            <i class="fas fa-eye"></i> Ver Detalles
                        </button>
                        <a href="https://wa.me/${producto.contacto.replace(/[^0-9]/g, '')}" 
                           class="btn btn-secondary" target="_blank">
                            <i class="fab fa-whatsapp"></i> Contactar
                        </a>
                    </div>
                </div>
            </div>
        `).join('');
    });

    activarAnimaciones();
}

// Actualizar contadores de productos
function actualizarContadores() {
    const contadores = {
        todos: productos.length,
        terrenos: productos.filter(p => p.categoria === 'terrenos').length,
        productos: productos.filter(p => p.categoria === 'productos').length,
        comercios: productos.filter(p => p.categoria === 'comercios').length
    };

    Object.keys(contadores).forEach(categoria => {
        const elemento = document.getElementById(`count-${categoria}`);
        if (elemento) {
            elemento.textContent = contadores[categoria];
        }
    });
}

// Limpiar filtros
function limpiarFiltros() {
    // Resetear filtros avanzados
    filtrosAvanzados = {
        busqueda: '',
        precio: 'all',
        ordenamiento: 'reciente'
    };

    // Resetear inputs
    const searchInput = document.getElementById('search-input');
    const priceFilter = document.getElementById('price-filter');
    const sortFilter = document.getElementById('sort-filter');

    if (searchInput) searchInput.value = '';
    if (priceFilter) priceFilter.value = 'all';
    if (sortFilter) sortFilter.value = 'reciente';

    // Cambiar a pestaña "todos"
    cambiarTab('todos');
}

function getCategoriaTexto(categoria) {
    const categorias = {
        'terrenos': 'Terreno',
        'productos': 'Producto',
        'comercios': 'Fondo de Comercio'
    };
    return categorias[categoria] || categoria;
}

// Scroll suave
function configurarScrollSuave() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Modal de detalles
function configurarModal() {
    modal = document.getElementById('product-modal');
    const closeBtn = document.querySelector('.close');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', cerrarModal);
    }
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            cerrarModal();
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            cerrarModal();
        }
    });
}

function abrirModal(productId) {
    const producto = productos.find(p => p.id === productId);
    if (!producto || !modal) return;
    
    const modalBody = document.getElementById('modal-body');
    
    // Crear galería de imágenes si existen imágenes adicionales
    let galeriaHTML = '';
    if (producto.imagenesAdicionales && producto.imagenesAdicionales.length > 0) {
        const todasLasImagenes = [producto.imagen, ...producto.imagenesAdicionales];
        galeriaHTML = `
            <div style="margin-bottom: 1rem;">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 0.5rem;">
                    ${todasLasImagenes.map((img, index) => `
                        <img src="${img}" alt="${producto.titulo} - Imagen ${index + 1}" 
                             style="width: 100%; height: 120px; object-fit: cover; border-radius: 8px; cursor: pointer; border: 2px solid ${index === 0 ? '#3498db' : 'transparent'};" 
                             onclick="cambiarImagenPrincipal('${img}', this)">
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    modalBody.innerHTML = `
        <div style="padding: 2rem;">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 2rem;">
                <div>
                    <img id="imagen-principal" src="${producto.imagen}" alt="${producto.titulo}" 
                         style="width: 100%; height: 300px; object-fit: cover; border-radius: 10px;">
                    ${galeriaHTML}
                </div>
                <div>
                    <h2 style="color: #2c3e50; margin-bottom: 1rem;">${producto.titulo}</h2>
                    <div style="font-size: 1.8rem; color: #27ae60; font-weight: bold; margin-bottom: 1rem;">
                        ${producto.precio}
                    </div>
                    <p style="color: #7f8c8d; margin-bottom: 1.5rem; line-height: 1.6;">
                        ${producto.descripcion}
                    </p>
                    <div style="margin-bottom: 1.5rem;">
                        <h4 style="color: #2c3e50; margin-bottom: 0.5rem;">Características:</h4>
                        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                            ${producto.caracteristicas.map(caracteristica => 
                                `<span style="background: #ecf0f1; color: #2c3e50; padding: 4px 12px; border-radius: 15px; font-size: 0.9rem;">${caracteristica}</span>`
                            ).join('')}
                        </div>
                    </div>
                </div>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                <div>
                    <h4 style="color: #2c3e50; margin-bottom: 1rem;">Detalles Técnicos:</h4>
                    <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 10px;">
                        ${Object.entries(producto.detalles)
                            .filter(([key]) => key !== 'googleMaps') // Excluir googleMaps de los detalles
                            .map(([key, value]) => 
                            `<div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; padding-bottom: 0.5rem; border-bottom: 1px solid #ecf0f1;">
                                <strong style="color: #2c3e50;">${capitalize(key)}:</strong>
                                <span style="color: #7f8c8d;">${value}</span>
                            </div>`
                        ).join('')}
                    </div>
                </div>
                
                <div>
                    <h4 style="color: #2c3e50; margin-bottom: 1rem;">Ubicación:</h4>
                    <div id="modal-map" style="width: 100%; height: 200px; background: linear-gradient(135deg, #3498db 0%, #2980b9 100%); border-radius: 10px; display: flex; align-items: center; justify-content: center; color: white; cursor: pointer; transition: all 0.3s ease; position: relative; overflow: hidden;" 
                         onclick="window.open('${producto.detalles.googleMaps}', '_blank')"
                         onmouseover="this.style.transform='scale(1.05)'"
                         onmouseout="this.style.transform='scale(1)'">
                        <div style="text-align: center; z-index: 2;">
                            <i class="fas fa-map-marker-alt" style="font-size: 2.5rem; margin-bottom: 0.5rem; color: white; text-shadow: 0 2px 4px rgba(0,0,0,0.3);"></i>
                            <p style="margin: 0; font-weight: 600; font-size: 1.1rem;">Ver en Google Maps</p>
                            <small style="opacity: 0.9;">Haz clic para abrir la ubicación</small>
                        </div>
                        <div style="position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%); pointer-events: none;"></div>
                    </div>
                    
                    <div style="margin-top: 1.5rem;">
                        <h4 style="color: #2c3e50; margin-bottom: 1rem;">Contacto:</h4>
                        <div style="display: flex; justify-content: center;">
                            <a href="https://wa.me/${producto.contacto.replace(/[^0-9]/g, '')}" 
                               class="btn btn-primary" target="_blank" style="text-align: center; padding: 12px 24px; font-size: 1.1rem;">
                                <i class="fab fa-whatsapp"></i> WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Aquí podrías inicializar Google Maps si tienes la API
    // initializeMap(producto.ubicacion);
}

function cerrarModal() {
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function cambiarImagenPrincipal(nuevaImagen, elementoClick) {
    const imagenPrincipal = document.getElementById('imagen-principal');
    if (imagenPrincipal) {
        imagenPrincipal.src = nuevaImagen;
    }
    
    // Actualizar bordes de las miniaturas
    const todasLasMiniaturas = elementoClick.parentNode.querySelectorAll('img');
    todasLasMiniaturas.forEach(img => {
        img.style.border = '2px solid transparent';
    });
    elementoClick.style.border = '2px solid #3498db';
}

function capitalize(string) {
    const palabras = {
        'superficie': 'Superficie',
        'frente': 'Frente',
        'servicios': 'Servicios',
        'zonificacion': 'Zonificación',
        'antiguedad': 'Antigüedad',
        'facturacion': 'Facturación',
        'incluye': 'Incluye',
        'marca': 'Marca',
        'año': 'Año',
        'kilometraje': 'Kilometraje',
        'combustible': 'Combustible',
        'transmision': 'Transmisión',
        'modelo': 'Modelo',
        'potencia': 'Potencia',
        'uso': 'Uso del suelo',
        'acceso': 'Acceso',
        'agua': 'Agua',
        'googleMaps': 'Google Maps'
    };
    return palabras[string] || string.charAt(0).toUpperCase() + string.slice(1);
}

// Configurar formulario de contacto
function configurarFormulario() {
    const form = document.getElementById('contact-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener datos del formulario
            const nombre = form.querySelector('input[type="text"]').value;
            const email = form.querySelector('input[type="email"]').value;
            const telefono = form.querySelector('input[type="tel"]').value;
            const mensaje = form.querySelector('textarea').value;
            
            // Simular envío
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> ¡Enviado!';
                submitBtn.style.background = '#27ae60';
                
                // Resetear formulario
                form.reset();
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 2000);
            }, 1500);
        });
    }
}

// Animaciones al hacer scroll
function configurarAnimaciones() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observar elementos que deben animarse
    const elementsToAnimate = document.querySelectorAll('.fade-in');
    elementsToAnimate.forEach(el => observer.observe(el));
}

function activarAnimaciones() {
    setTimeout(() => {
        configurarAnimaciones();
    }, 100);
}

// Header con efecto de scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (header) {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(44, 62, 80, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)';
            header.style.backdropFilter = 'none';
        }
    }
});

// Función para agregar nuevos productos (para uso futuro)
function agregarProducto(nuevoProducto) {
    // Generar ID único
    nuevoProducto.id = productos.length > 0 ? Math.max(...productos.map(p => p.id)) + 1 : 1;
    
    // Agregar fecha de creación
    nuevoProducto.fechaCreacion = new Date();
    
    // Agregar al array
    productos.push(nuevoProducto);
    
    // Actualizar vistas
    mostrarCatalogo();
    mostrarSeccionesCategoria();
    actualizarContadores();
    
    console.log('Producto agregado:', nuevoProducto);
}

// Función para eliminar productos (para uso futuro)
function eliminarProducto(productId) {
    const index = productos.findIndex(p => p.id === productId);
    if (index !== -1) {
        productos.splice(index, 1);
        mostrarCatalogo();
        mostrarSeccionesCategoria();
        actualizarContadores();
        console.log('Producto eliminado:', productId);
    }
}

// Exportar funciones para uso global
window.cambiarTab = cambiarTab;
window.limpiarFiltros = limpiarFiltros;
window.abrirModal = abrirModal;
window.cerrarModal = cerrarModal;
window.cambiarImagenPrincipal = cambiarImagenPrincipal;
window.agregarProducto = agregarProducto;
window.eliminarProducto = eliminarProducto;