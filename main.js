/* ==========================================================================
   FÓRMULA ÍNTIMA - MAIN.JS (CATÁLOGO + CARRITO LATERAL + WHATSAPP)
   ========================================================================== */

// 1. CONFIGURACIÓN GENERAL
// Cambia este número por el WhatsApp real del local (código país + código área + número sin 0 ni 15)
const WHATSAPP_NUMERO = "5491145678900"; 

const SUPABASE_URL = "https://TU_PROYECTO.supabase.co";
const SUPABASE_ANON_KEY = "TU_CLAVE_ANON_PUBLICA";

const supabase = (typeof window.supabase !== 'undefined' && SUPABASE_URL !== "https://TU_PROYECTO.supabase.co")
    ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    : null;

// PRODUCTOS DEMO
const PRODUCTOS_LOCALES_DEMO = [
    {
        id: "1",
        titulo: "Gel Lubricante Sexitive Dante al Infierno 500ml",
        marca: "Sexitive",
        categoria: "cosmetica",
        precio_tachado: 34999,
        precio_oferta: 27999,
        precio_transferencia: 25199,
        cuotas: "3 cuotas sin interés de $9.333",
        badge_descuento: "20% OFF",
        envio_gratis: true,
        imagen_url: "https://via.placeholder.com/350x350/F4E4D9/40171F?text=Dante+al+Infierno"
    },
    {
        id: "2",
        titulo: "Spray Retardante Sexitive Héroe Extra Time 20ml",
        marca: "Sexitive",
        categoria: "cosmetica",
        precio_tachado: 29500,
        precio_oferta: 23600,
        precio_transferencia: 21240,
        cuotas: "3 cuotas sin interés de $7.866",
        badge_descuento: "20% OFF",
        envio_gratis: true,
        imagen_url: "https://via.placeholder.com/350x350/F4E4D9/40171F?text=Heroe+Spray"
    },
    {
        id: "3",
        titulo: "Perfume con Feromonas Her Aphrodisiac Roll-on",
        marca: "Sexitive",
        categoria: "cosmetica",
        precio_tachado: 38800,
        precio_oferta: 32990,
        precio_transferencia: 29691,
        cuotas: "3 cuotas sin interés de $10.996",
        badge_descuento: "15% OFF",
        envio_gratis: true,
        imagen_url: "https://via.placeholder.com/350x350/F4E4D9/40171F?text=Her+Aphrodisiac"
    },
    {
        id: "4",
        titulo: "Succionador de Clítoris — 10 funciones de pulso",
        marca: "Satisfyer",
        categoria: "sextoys",
        precio_tachado: 89900,
        precio_oferta: 71920,
        precio_transferencia: 64728,
        cuotas: "3 cuotas sin interés de $23.973",
        badge_descuento: "20% OFF",
        envio_gratis: true,
        imagen_url: "https://via.placeholder.com/350x350/F4E4D9/40171F?text=Succionador"
    },
    {
        id: "5",
        titulo: "Body de Encaje Línea Inclusiva Real",
        marca: "Fórmula Íntima",
        categoria: "lenceria",
        precio_tachado: 62000,
        precio_oferta: 52700,
        precio_transferencia: 47430,
        cuotas: "3 cuotas sin interés de $17.566",
        badge_descuento: "15% OFF",
        envio_gratis: true,
        imagen_url: "https://via.placeholder.com/350x350/F4E4D9/40171F?text=Body+Encaje"
    },
    {
        id: "6",
        titulo: "Aceite de Masajes Sensual Vainilla 200ml",
        marca: "Pretty Love",
        categoria: "cosmetica",
        precio_tachado: 25600,
        precio_oferta: 21760,
        precio_transferencia: 19584,
        cuotas: "3 cuotas sin interés de $7.253",
        badge_descuento: "15% OFF",
        envio_gratis: false,
        imagen_url: "https://via.placeholder.com/350x350/F4E4D9/40171F?text=Aceite+Vainilla"
    }
];

// ESTADO
let todosLosProductos = [];
let productosFiltrados = [];
// El carrito ahora almacena objetos con formato: { id, titulo, marca, precio, imagen_url, cantidad }
let carrito = JSON.parse(localStorage.getItem('fi_carrito_v2')) || [];

// ELEMENTOS DOM
const contenedorGrilla = document.querySelector('.productos-grilla');
const contadorProductos = document.querySelector('.catalogo__contador');
const selectOrden = document.getElementById('ordenar-catalogo');
const buscadorInput = document.getElementById('input-buscar');
const botonLimpiarFiltros = document.querySelector('.filtros__limpiar');
const formFiltros = document.getElementById('formulario-filtros');
const contadorCarritoBadge = document.querySelector('.carrito-enlace__contador');
const botonAbrirCarrito = document.querySelector('.carrito-enlace');

// Elementos Drawer Carrito
const carritoDrawer = document.getElementById('carrito-drawer');
const carritoOverlay = document.getElementById('carrito-overlay');
const carritoCerrar = document.getElementById('carrito-cerrar');
const carritoItemsContenedor = document.getElementById('carrito-items-contenedor');
const carritoSubtotalTexto = document.getElementById('carrito-subtotal');
const carritoTotalTexto = document.getElementById('carrito-total');
const carritoCuotasTexto = document.getElementById('carrito-cuotas-texto');
const botonIniciarCompra = document.getElementById('boton-iniciar-compra');
const cuponToggle = document.getElementById('cupon-toggle');
const cuponContenido = document.getElementById('cupon-contenido');

// ==========================================================================
// 2. INICIALIZACIÓN
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    actualizarCarritoUI();
    obtenerProductos();
    configurarEventosFiltros();
    configurarEventosDrawer();
});

// Obtener Productos
async function obtenerProductos() {
    if (supabase) {
        try {
            const { data, error } = await supabase
                .from('productos')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            todosLosProductos = (data && data.length > 0) ? data : PRODUCTOS_LOCALES_DEMO;
        } catch (err) {
            console.warn("Conectando con productos de respaldo:", err.message);
            todosLosProductos = PRODUCTOS_LOCALES_DEMO;
        }
    } else {
        todosLosProductos = PRODUCTOS_LOCALES_DEMO;
    }

    productosFiltrados = [...todosLosProductos];
    aplicarFiltrosYRender();
}

// ==========================================================================
// 3. RENDERIZADO DEL CATÁLOGO
// ==========================================================================
function renderizarProductos(productos) {
    if (!contenedorGrilla) return;

    if (productos.length === 0) {
        contenedorGrilla.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: #777;">
                <p style="font-size: 1.2rem; margin-bottom: 0.5rem;">No encontramos productos con esos filtros.</p>
                <button type="button" onclick="limpiarTodosLosFiltros()" class="boton-accion" style="padding: 0.6rem 1.2rem; cursor: pointer; border: 1px solid #6D1D26; background: #FFF8ED; color: #6D1D26; font-weight: bold; border-radius: 4px;">Ver todos los productos</button>
            </div>
        `;
        if (contadorProductos) contadorProductos.textContent = `0 productos encontrados`;
        return;
    }

    if (contadorProductos) {
        contadorProductos.textContent = `${productos.length} producto${productos.length === 1 ? '' : 's'} elegido${productos.length === 1 ? '' : 's'} para vos`;
    }

    contenedorGrilla.innerHTML = productos.map(prod => {
        const foto = prod.imagen_url || 'https://via.placeholder.com/350x350/F4E4D9/40171F?text=Fórmula+Íntima';
        const precioOfertaFormateado = Number(prod.precio_oferta).toLocaleString('es-AR');
        const precioTachadoHTML = prod.precio_tachado 
            ? `<div class="tarjeta-producto__precio-tachado">$${Number(prod.precio_tachado).toLocaleString('es-AR')}</div>` 
            : '';
        const transferenciaHTML = prod.precio_transferencia 
            ? `<div class="tarjeta-producto__transferencia">$${Number(prod.precio_transferencia).toLocaleString('es-AR')} con Transferencia o depósito</div>` 
            : '';
        const cuotasHTML = prod.cuotas 
            ? `<div class="tarjeta-producto__cuotas">${prod.cuotas}</div>` 
            : '';
        const descBadgeHTML = prod.badge_descuento 
            ? `<span class="tarjeta-producto__etiqueta tarjeta-producto__etiqueta--descuento">${prod.badge_descuento}</span>` 
            : '';
        const envioBadgeHTML = prod.envio_gratis 
            ? `<span class="tarjeta-producto__etiqueta tarjeta-producto__etiqueta--envio">Envío gratis</span>` 
            : '';

        return `
            <article class="tarjeta-producto" itemscope itemtype="https://schema.org/Product">
                <div class="tarjeta-producto__badges">
                    ${descBadgeHTML}
                    ${envioBadgeHTML}
                </div>
                
                <button type="button" class="tarjeta-producto__favorito" onclick="toggleFavorito(this)" aria-label="Guardar en favoritos">♡</button>
                
                <a href="#producto-${prod.id}" class="tarjeta-producto__imagen-contenedor" aria-hidden="true" tabindex="-1">
                    <img src="${foto}" alt="${prod.titulo}" class="tarjeta-producto__imagen" itemprop="image" loading="lazy">
                </a>

                <div class="tarjeta-producto__cuerpo">
                    <span class="tarjeta-producto__marca" itemprop="brand">${prod.marca || 'Fórmula Íntima'}</span>
                    
                    <a href="#producto-${prod.id}" class="tarjeta-producto__titulo-enlace">
                        <h3 class="tarjeta-producto__titulo" itemprop="name">${prod.titulo}</h3>
                    </a>
                    
                    <div class="tarjeta-producto__precios" itemprop="offers" itemscope itemtype="https://schema.org/Offer">
                        <meta itemprop="priceCurrency" content="ARS">
                        ${precioTachadoHTML}
                        <div class="tarjeta-producto__precio-oferta">
                            $<span itemprop="price">${precioOfertaFormateado}</span>
                        </div>
                        ${cuotasHTML}
                        ${transferenciaHTML}
                        <link itemprop="availability" href="https://schema.org/InStock" />
                    </div>

                    <div class="tarjeta-producto__acciones">
                        <button type="button" class="tarjeta-producto__boton tarjeta-producto__boton--comprar" onclick="agregarAlCarrito('${prod.id}')">
                            Agregar al carrito
                        </button>
                        <button type="button" class="tarjeta-producto__boton tarjeta-producto__boton--ver" onclick="verDetalleRapido('${prod.id}')">
                            Ver
                        </button>
                    </div>
                </div>
            </article>
        `;
    }).join('');
}

// ==========================================================================
// 4. LÓGICA DEL CARRITO (DRAWER LATERAL)
// ==========================================================================
function configurarEventosDrawer() {
    // Abrir carrito al hacer clic en "Mi carrito" en la cabecera
    if (botonAbrirCarrito) {
        botonAbrirCarrito.addEventListener('click', (e) => {
            e.preventDefault();
            abrirDrawerCarrito();
        });
    }

    if (carritoCerrar) carritoCerrar.addEventListener('click', cerrarDrawerCarrito);
    if (carritoOverlay) carritoOverlay.addEventListener('click', cerrarDrawerCarrito);

    // Toggle cupón de descuento
    if (cuponToggle && cuponContenido) {
        cuponToggle.addEventListener('click', () => {
            cuponContenido.classList.toggle('carrito-cupon__formulario--activo');
        });
    }

    // Botón Iniciar Compra (WhatsApp)
    if (botonIniciarCompra) {
        botonIniciarCompra.addEventListener('click', enviarPedidoAWhatsApp);
    }
}

function abrirDrawerCarrito() {
    if (carritoDrawer) {
        carritoDrawer.classList.add('carrito-drawer--activo');
        carritoDrawer.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // Evita scroll de fondo
    }
}

function cerrarDrawerCarrito() {
    if (carritoDrawer) {
        carritoDrawer.classList.remove('carrito-drawer--activo');
        carritoDrawer.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }
}

// Agregar producto
window.agregarAlCarrito = function(id) {
    const prod = todosLosProductos.find(p => p.id === id);
    if (!prod) return;

    const itemExistente = carrito.find(item => item.id === id);

    if (itemExistente) {
        itemExistente.cantidad += 1;
    } else {
        carrito.push({
            id: prod.id,
            titulo: prod.titulo,
            marca: prod.marca || 'Fórmula Íntima',
            precio: parseFloat(prod.precio_oferta),
            imagen_url: prod.imagen_url || 'https://via.placeholder.com/80x80/F4E4D9/40171F?text=Foto',
            cantidad: 1
        });
    }

    guardarCarrito();
    actualizarCarritoUI();
    abrirDrawerCarrito(); // Abre el drawer de inmediato como en las tiendas modernas
};

// Modificar cantidad [+ / -]
window.cambiarCantidadItem = function(id, cambio) {
    const item = carrito.find(p => p.id === id);
    if (!item) return;

    item.cantidad += cambio;

    if (item.cantidad <= 0) {
        carrito = carrito.filter(p => p.id !== id);
    }

    guardarCarrito();
    actualizarCarritoUI();
};

// Eliminar producto
window.eliminarItemCarrito = function(id) {
    carrito = carrito.filter(p => p.id !== id);
    guardarCarrito();
    actualizarCarritoUI();
};

function guardarCarrito() {
    localStorage.setItem('fi_carrito_v2', JSON.stringify(carrito));
}

// Actualizar Vista del Carrito y Cálculos
function actualizarCarritoUI() {
    const totalCantidadItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    
    // Actualizar badge de la cabecera
    if (contadorCarritoBadge) {
        contadorCarritoBadge.textContent = totalCantidadItems;
    }

    if (!carritoItemsContenedor) return;

    if (carrito.length === 0) {
        carritoItemsContenedor.innerHTML = `
            <div class="carrito-vacio">
                <p>El carrito de compras está vacío.</p>
                <span style="font-size: 2rem;">🛍️</span>
            </div>
        `;
        if (carritoSubtotalTexto) carritoSubtotalTexto.textContent = "$ 0";
        if (carritoTotalTexto) carritoTotalTexto.textContent = "$ 0";
        if (carritoCuotasTexto) carritoCuotasTexto.textContent = "o 3 cuotas sin interés de $ 0";
        if (botonIniciarCompra) botonIniciarCompra.disabled = true;
        return;
    }

    if (botonIniciarCompra) botonIniciarCompra.disabled = false;

    // Calcular montos
    const subtotal = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    const cuota3 = Math.round(subtotal / 3);

    // Renderizar items idénticos a la imagen
    carritoItemsContenedor.innerHTML = carrito.map(item => `
        <div class="carrito-item">
            <div class="carrito-item__imagen-caja">
                <img src="${item.imagen_url}" alt="${item.titulo}" class="carrito-item__imagen">
            </div>

            <div class="carrito-item__info">
                <span class="carrito-item__marca">${item.marca}</span>
                <h4 class="carrito-item__titulo">${item.titulo}</h4>
                
                <div class="carrito-item__cantidad">
                    <button type="button" class="carrito-item__btn-cant" onclick="cambiarCantidadItem('${item.id}', -1)">-</button>
                    <span class="carrito-item__cant-numero">${item.cantidad}</span>
                    <button type="button" class="carrito-item__btn-cant" onclick="cambiarCantidadItem('${item.id}', 1)">+</button>
                </div>
            </div>

            <div class="carrito-item__col-derecha">
                <button type="button" class="carrito-item__btn-eliminar" onclick="eliminarItemCarrito('${item.id}')" aria-label="Eliminar producto">&times;</button>
                <span class="carrito-item__precio">$ ${(item.precio * item.cantidad).toLocaleString('es-AR')}</span>
            </div>
        </div>
    `).join('');

    // Pintar totales
    if (carritoSubtotalTexto) carritoSubtotalTexto.textContent = `$ ${subtotal.toLocaleString('es-AR')}`;
    if (carritoTotalTexto) carritoTotalTexto.textContent = `$ ${subtotal.toLocaleString('es-AR')}`;
    if (carritoCuotasTexto) carritoCuotasTexto.textContent = `o 3 cuotas sin interés de $ ${cuota3.toLocaleString('es-AR')}`;
}

// ==========================================================================
// 5. ENVIAR PEDIDO POR WHATSAPP
// ==========================================================================
function enviarPedidoAWhatsApp() {
    if (carrito.length === 0) return;

    const subtotal = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    
    // Armar el mensaje con formato prolijo
    let mensaje = `*¡Hola Fórmula Íntima!* 🌸\nQuiero realizar el siguiente pedido desde la web:\n\n`;

    carrito.forEach((item, index) => {
        const totalPorItem = (item.precio * item.cantidad).toLocaleString('es-AR');
        mensaje += `*${index + 1}.* ${item.titulo}\n`;
        mensaje += `   • Cantidad: ${item.cantidad}\n`;
        mensaje += `   • Precio: $${totalPorItem}\n\n`;
    });

    mensaje += `----------------------------\n`;
    mensaje += `*Total a abonar: $${subtotal.toLocaleString('es-AR')}*\n`;
    mensaje += `(Consulte por medios de pago y envío discreto) ✨\n\n`;
    mensaje += `¡Muchas gracias!`;

    // Codificar para URL y abrir WhatsApp
    const urlWhatsApp = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensaje)}`;
    window.open(urlWhatsApp, '_blank');
}

// ==========================================================================
// 6. FILTROS Y BÚSQUEDA
// ==========================================================================
function configurarEventosFiltros() {
    if (formFiltros) {
        formFiltros.addEventListener('change', aplicarFiltrosYRender);
        formFiltros.addEventListener('submit', (e) => {
            e.preventDefault();
            aplicarFiltrosYRender();
        });
    }

    if (buscadorInput) {
        buscadorInput.addEventListener('input', aplicarFiltrosYRender);
    }

    if (selectOrden) {
        selectOrden.addEventListener('change', aplicarFiltrosYRender);
    }

    if (botonLimpiarFiltros) {
        botonLimpiarFiltros.addEventListener('click', (e) => {
            e.preventDefault();
            limpiarTodosLosFiltros();
        });
    }
}

function aplicarFiltrosYRender() {
    let resultado = [...todosLosProductos];

    const query = buscadorInput ? buscadorInput.value.toLowerCase().trim() : '';
    if (query !== '') {
        resultado = resultado.filter(p => 
            p.titulo.toLowerCase().includes(query) || 
            (p.marca && p.marca.toLowerCase().includes(query))
        );
    }

    const categoriasChecked = Array.from(document.querySelectorAll('input[name="categoria"]:checked')).map(cb => cb.value.toLowerCase());
    if (categoriasChecked.length > 0) {
        resultado = resultado.filter(p => categoriasChecked.includes(p.categoria.toLowerCase()));
    }

    const marcasChecked = Array.from(document.querySelectorAll('input[name="marca"]:checked')).map(cb => cb.value.toLowerCase());
    if (marcasChecked.length > 0) {
        resultado = resultado.filter(p => marcasChecked.includes((p.marca || '').toLowerCase()));
    }

    const inputDesde = document.querySelector('input[placeholder="Desde"]');
    const inputHasta = document.querySelector('input[placeholder="Hasta"]');
    const minPrecio = inputDesde && inputDesde.value ? parseFloat(inputDesde.value) : 0;
    const maxPrecio = inputHasta && inputHasta.value ? parseFloat(inputHasta.value) : Infinity;

    resultado = resultado.filter(p => p.precio_oferta >= minPrecio && p.precio_oferta <= maxPrecio);

    const tipoOrden = selectOrden ? selectOrden.value : 'destacados';
    switch (tipoOrden) {
        case 'precio-menor':
            resultado.sort((a, b) => a.precio_oferta - b.precio_oferta);
            break;
        case 'precio-mayor':
            resultado.sort((a, b) => b.precio_oferta - a.precio_oferta);
            break;
        case 'alfabetico-az':
            resultado.sort((a, b) => a.titulo.localeCompare(b.titulo));
            break;
        case 'alfabetico-za':
            resultado.sort((a, b) => b.titulo.localeCompare(a.titulo));
            break;
    }

    productosFiltrados = resultado;
    renderizarProductos(productosFiltrados);
}

window.limpiarTodosLosFiltros = function() {
    if (formFiltros) formFiltros.reset();
    if (buscadorInput) buscadorInput.value = '';
    if (selectOrden) selectOrden.value = 'destacados';
    aplicarFiltrosYRender();
};

window.toggleFavorito = function(btn) {
    if (btn.textContent === '♡') {
        btn.textContent = '❤️';
        btn.style.color = '#6D1D26';
    } else {
        btn.textContent = '♡';
        btn.style.color = '';
    }
};

window.verDetalleRapido = function(id) {
    const prod = todosLosProductos.find(p => p.id === id);
    if (!prod) return;
    alert(`"${prod.titulo}"\nMarca: ${prod.marca || 'Fórmula Íntima'}\nPrecio: $${Number(prod.precio_oferta).toLocaleString('es-AR')}\n${prod.cuotas || ''}`);
};