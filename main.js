/* ==========================================================================
   FÓRMULA ÍNTIMA - MAIN.JS (SIN CONFLICTO DE VARIABLES GLOBALES)
   ========================================================================== */

// NÚMERO DE WHATSAPP OFICIAL DEL LOCAL
const WHATSAPP_NUMERO = "5491145678900"; 

// SUPABASE CONFIG (Usamos clienteSupabase para no chocar con window.supabase)
const SUPABASE_URL = "https://TU_PROYECTO.supabase.co";
const SUPABASE_ANON_KEY = "TU_CLAVE_ANON_PUBLICA";

const clienteSupabase = (typeof window.supabase !== 'undefined' && SUPABASE_URL !== "https://TU_PROYECTO.supabase.co")
    ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    : null;

// PRODUCTOS DE DEMOSTRACIÓN
const PRODUCTOS_LOCALES_DEMO = [
    {
        id: "1",
        titulo: "Gel Lubricante Sexitive Dante al Infierno 500ml",
        marca: "Sexitive",
        categoria: "cosmetica",
        color: "rojo",
        modelo: "liso",
        precio_tachado: 34999,
        precio_oferta: 27999,
        precio_transferencia: 25199,
        cuotas: "3 cuotas sin interés de $9.333",
        badge_descuento: "20% OFF",
        envio_gratis: true,
        imagen_url: "https://placehold.co/400x400/F4E4D9/6D1D26?text=Dante+al+Infierno"
    },
    {
        id: "2",
        titulo: "Spray Retardante Sexitive Héroe Extra Time 20ml",
        marca: "Sexitive",
        categoria: "cosmetica",
        color: "negro",
        modelo: "liso",
        precio_tachado: 29500,
        precio_oferta: 23600,
        precio_transferencia: 21240,
        cuotas: "3 cuotas sin interés de $7.866",
        badge_descuento: "20% OFF",
        envio_gratis: true,
        imagen_url: "https://placehold.co/400x400/F4E4D9/6D1D26?text=Heroe+Spray"
    },
    {
        id: "3",
        titulo: "Perfume con Feromonas Her Aphrodisiac Roll-on",
        marca: "Sexitive",
        categoria: "cosmetica",
        color: "rosa",
        modelo: "liso",
        precio_tachado: 38800,
        precio_oferta: 32990,
        precio_transferencia: 29691,
        cuotas: "3 cuotas sin interés de $10.996",
        badge_descuento: "15% OFF",
        envio_gratis: true,
        imagen_url: "https://placehold.co/400x400/F4E4D9/6D1D26?text=Her+Aphrodisiac"
    },
    {
        id: "4",
        titulo: "Succionador de Clítoris — 10 funciones de pulso",
        marca: "Satisfyer",
        categoria: "sextoys",
        color: "rosa",
        modelo: "ondas",
        precio_tachado: 89900,
        precio_oferta: 71920,
        precio_transferencia: 64728,
        cuotas: "3 cuotas sin interés de $23.973",
        badge_descuento: "20% OFF",
        envio_gratis: true,
        imagen_url: "https://placehold.co/400x400/F4E4D9/6D1D26?text=Succionador+Satisfyer"
    },
    {
        id: "5",
        titulo: "Body de Encaje Línea Inclusiva Real",
        marca: "Fórmula Íntima",
        categoria: "lenceria",
        color: "negro",
        modelo: "liso",
        precio_tachado: 62000,
        precio_oferta: 52700,
        precio_transferencia: 47430,
        cuotas: "3 cuotas sin interés de $17.566",
        badge_descuento: "15% OFF",
        envio_gratis: true,
        imagen_url: "https://placehold.co/400x400/F4E4D9/6D1D26?text=Body+Encaje+Inclusivo"
    },
    {
        id: "6",
        titulo: "Aceite de Masajes Sensual Vainilla 200ml",
        marca: "Pretty Love",
        categoria: "cosmetica",
        color: "piel",
        modelo: "liso",
        precio_tachado: 25600,
        precio_oferta: 21760,
        precio_transferencia: 19584,
        cuotas: "3 cuotas sin interés de $7.253",
        badge_descuento: "15% OFF",
        envio_gratis: false,
        imagen_url: "https://placehold.co/400x400/F4E4D9/6D1D26?text=Aceite+Vainilla"
    },
    {
        id: "7",
        titulo: "Mini Vibrador Punto G Qamra Delfín",
        marca: "Pretty Love",
        categoria: "sextoys",
        color: "rojo",
        modelo: "delfin",
        precio_tachado: 14000,
        precio_oferta: 11200,
        precio_transferencia: 10080,
        cuotas: "3 cuotas sin interés de $3.733",
        badge_descuento: "20% OFF",
        envio_gratis: true,
        imagen_url: "https://placehold.co/400x400/F4E4D9/6D1D26?text=Vibrador+Delfin"
    },
    {
        id: "8",
        titulo: "Arnés y Conjunto de Cuero Fetiche",
        marca: "Svakom",
        categoria: "fetiche",
        color: "negro",
        modelo: "ondas",
        precio_tachado: 45000,
        precio_oferta: 38000,
        precio_transferencia: 34200,
        cuotas: "3 cuotas sin interés de $12.666",
        badge_descuento: "15% OFF",
        envio_gratis: true,
        imagen_url: "https://placehold.co/400x400/F4E4D9/6D1D26?text=Arnes+Fetiche"
    },
    {
        id: "9",
        titulo: "Copa Menstrual y Gel Íntimo Uso Diario ESI",
        marca: "Lovense",
        categoria: "bienestar",
        color: "rosa",
        modelo: "liso",
        precio_tachado: 22000,
        precio_oferta: 18700,
        precio_transferencia: 16830,
        cuotas: "3 cuotas sin interés de $6.233",
        badge_descuento: "15% OFF",
        envio_gratis: true,
        imagen_url: "https://placehold.co/400x400/F4E4D9/6D1D26?text=Bienestar+y+ESI"
    }
];

// TEXTOS DE LAS CARDS FLOTANTES DEL FOOTER
const DATOS_MODALES_INFO = {
    "acerca": {
        badge: "NUESTRA IDENTIDAD",
        titulo: "Acerca de Fórmula Íntima",
        contenido: `
            <p>Fórmula Íntima nace con el propósito de abordar la sexualidad desde una mirada amplia, natural y consciente.</p>
            <p>Más que ofrecer productos, buscamos crear un espacio donde el placer, el bienestar y la salud sexual convivan con información, acompañamiento y respeto, derribando prejuicios y mitos.</p>
            <div class="modal-info__destacado">
                Celebramos la diversidad de cuerpos, identidades y talles. El placer es para todes.
            </div>
        `
    },
    "faq": {
        badge: "AYUDA FRECUENTE",
        titulo: "Preguntas Frecuentes",
        contenido: `
            <p><strong>¿El envío es realmente discreto?</strong><br>
            Totalmente. Los paquetes no tienen logos, nombres del rubro ni alusión a sex shop. Llegan en cajas o bolsas neutras y cerradas.</p>
            <p><strong>¿Cómo coordino el pago y la entrega?</strong><br>
            Al presionar "Iniciar compra" en el carrito, se genera un mensaje automático con tus productos y precios y te deriva directo a nuestro WhatsApp oficial para coordinar todo de forma personalizada.</p>
            <p><strong>¿Tienen atención confidencial?</strong><br>
            Sí, te asesoramos de manera 100% privada, cálida y sin prejuicios.</p>
        `
    },
    "envios": {
        badge: "LOGÍSTICA Y ENTREGA",
        titulo: "Formas de Envío",
        contenido: `
            <p>Realizamos envíos a todo el país garantizando la máxima confidencialidad:</p>
            <ul>
                <li><strong>Andreani a domicilio o sucursal:</strong> Seguimiento online y empaque neutro sin identificación del rubro.</li>
                <li><strong>Envíos express en el día:</strong> Por mensajería privada en CABA y GBA coordinando horario por WhatsApp.</li>
            </ul>
            <div class="modal-info__destacado">
                📦 Empaque 100% discreto: nadie sabe lo que hay dentro del paquete.
            </div>
        `
    },
    "pagos": {
        badge: "MEDIOS DE PAGO",
        titulo: "Formas de Pago",
        contenido: `
            <p>Podés abonar tu pedido como te resulte más cómodo:</p>
            <ul>
                <li><strong>Transferencia o Depósito Bancario:</strong> Tenés un descuento extra exclusivo sobre el precio de oferta.</li>
                <li><strong>Mercado Pago:</strong> Dinero en cuenta, tarjetas de débito y crédito.</li>
                <li><strong>Cuotas sin interés:</strong> 3 cuotas sin interés disponibles en toda la tienda.</li>
            </ul>
            <p>Al enviarnos tu pedido por WhatsApp te pasamos el alias bancario o el link de pago al instante.</p>
        `
    },
    "como-comprar": {
        badge: "COMPRA POR WHATSAPP",
        titulo: "¿Cómo comprar en la tienda?",
        contenido: `
            <p>El modo de compra es directo, personalizado y sin vueltas a través de WhatsApp:</p>
            <ol>
                <li><strong>Elegí tus productos:</strong> Navegá el catálogo y presioná <em>"Agregar al carrito"</em> en lo que te guste.</li>
                <li><strong>Revisá tu selección:</strong> En el carrito lateral podés sumar cantidades y ver el total calculado automáticamente.</li>
                <li><strong>Iniciá la compra:</strong> Tocá el botón <em>"Iniciar compra"</em>.</li>
                <li><strong>Mensaje automático a WhatsApp:</strong> El sistema arma el mensaje con tu lista de productos y el total, y te abre nuestro WhatsApp para finalizar el pago y el envío discreto.</li>
            </ol>
        `
    },
    "devoluciones": {
        badge: "GARANTÍA Y CUIDADO",
        titulo: "Políticas de Devolución",
        contenido: `
            <p>Por normativas de salud, bioseguridad e higiene en artículos de uso íntimo y lencería, los cambios o devoluciones aplican únicamente ante <strong>fallas de funcionamiento o fabricación</strong>.</p>
            <p>Todos los dispositivos electrónicos son testeados previamente. Ante cualquier inconveniente o gestión de arrepentimiento de compra, escribinos por WhatsApp indicando tu pedido.</p>
        `
    }
};

const NOMBRES_CATEGORIAS = {
    "cosmetica": "Cosmética y Geles",
    "sextoys": "Sex Toys",
    "lenceria": "Lencería",
    "fetiche": "Fetiche / Bondage",
    "bienestar": "Bienestar / ESI"
};

// ESTADO GLOBAL
let todosLosProductos = [...PRODUCTOS_LOCALES_DEMO];
let productosFiltrados = [...PRODUCTOS_LOCALES_DEMO];
let carrito = [];

try {
    carrito = JSON.parse(localStorage.getItem('fi_carrito_v2')) || [];
} catch (e) {
    carrito = [];
}

// ==========================================================================
// 1. FUNCIONES GLOBALES DE FILTROS Y CONEXIÓN CON EL FOOTER
// ==========================================================================
window.filtrarDesdeEnlace = function(categoriaClave) {
    const formFiltros = document.getElementById('formulario-filtros');
    const buscadorInput = document.getElementById('input-buscar');
    
    // Limpiar selecciones anteriores
    if (formFiltros) formFiltros.reset();
    if (buscadorInput) buscadorInput.value = '';

    // Marcar el checkbox en "Filtrar por"
    const checkbox = document.querySelector(`input[name="categoria"][value="${categoriaClave}"]`);
    if (checkbox) {
        checkbox.checked = true;
    }

    // Actualizar migas de pan
    const migasActual = document.getElementById('migas-categoria-actual');
    if (migasActual) {
        migasActual.textContent = NOMBRES_CATEGORIAS[categoriaClave] || "Todos los productos";
    }

    // Filtrar productos y bajar/subir hasta el catálogo
    window.aplicarFiltros();

    const seccionCatalogo = document.getElementById('contenido-principal');
    if (seccionCatalogo) {
        seccionCatalogo.scrollIntoView({ behavior: 'smooth' });
    }
};

window.toggleAcordeonFiltro = function(cabecera) {
    const grupo = cabecera.closest('.filtro-grupo');
    const icono = cabecera.querySelector('.filtro-grupo__icono');
    if (!grupo) return;
    grupo.classList.toggle('filtro-grupo--cerrado');
    if (icono) {
        icono.textContent = grupo.classList.contains('filtro-grupo--cerrado') ? '∨' : '∧';
    }
};

window.aplicarFiltros = function() {
    const buscadorInput = document.getElementById('input-buscar');
    const inputPrecioDesde = document.getElementById('filtro-precio-desde');
    const inputPrecioHasta = document.getElementById('filtro-precio-hasta');
    const selectOrden = document.getElementById('ordenar-catalogo');

    let resultado = [...todosLosProductos];

    // 1. Buscador
    const textoBuscador = buscadorInput ? buscadorInput.value.toLowerCase().trim() : '';
    if (textoBuscador !== '') {
        resultado = resultado.filter(p => 
            p.titulo.toLowerCase().includes(textoBuscador) || 
            (p.marca && p.marca.toLowerCase().includes(textoBuscador))
        );
    }

    // 2. Categorías
    const categoriasSeleccionadas = Array.from(document.querySelectorAll('input[name="categoria"]:checked'))
        .map(input => input.value.toLowerCase());
    if (categoriasSeleccionadas.length > 0) {
        resultado = resultado.filter(p => p.categoria && categoriasSeleccionadas.includes(p.categoria.toLowerCase()));
    }

    // 3. Marcas
    const marcasSeleccionadas = Array.from(document.querySelectorAll('input[name="marca"]:checked'))
        .map(input => input.value.toLowerCase());
    if (marcasSeleccionadas.length > 0) {
        resultado = resultado.filter(p => p.marca && marcasSeleccionadas.includes(p.marca.toLowerCase()));
    }

    // 4. Colores
    const coloresSeleccionados = Array.from(document.querySelectorAll('input[name="color"]:checked'))
        .map(input => input.value.toLowerCase());
    if (coloresSeleccionados.length > 0) {
        resultado = resultado.filter(p => p.color && coloresSeleccionados.includes(p.color.toLowerCase()));
    }

    // 5. Modelos
    const modelosSeleccionados = Array.from(document.querySelectorAll('input[name="modelo"]:checked'))
        .map(input => input.value.toLowerCase());
    if (modelosSeleccionados.length > 0) {
        resultado = resultado.filter(p => p.modelo && modelosSeleccionados.includes(p.modelo.toLowerCase()));
    }

    // 6. Rango de Precio
    const precioDesde = inputPrecioDesde && inputPrecioDesde.value ? parseFloat(inputPrecioDesde.value) : 0;
    const precioHasta = inputPrecioHasta && inputPrecioHasta.value ? parseFloat(inputPrecioHasta.value) : Infinity;

    resultado = resultado.filter(p => {
        const precio = parseFloat(p.precio_oferta);
        return precio >= precioDesde && precio <= precioHasta;
    });

    // 7. Ordenamiento
    const orden = selectOrden ? selectOrden.value : 'destacados';
    switch (orden) {
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
};

window.limpiarFiltros = function() {
    const formFiltros = document.getElementById('formulario-filtros');
    const buscadorInput = document.getElementById('input-buscar');
    const selectOrden = document.getElementById('ordenar-catalogo');
    const migasActual = document.getElementById('migas-categoria-actual');

    if (formFiltros) formFiltros.reset();
    if (buscadorInput) buscadorInput.value = '';
    if (selectOrden) selectOrden.value = 'destacados';
    if (migasActual) migasActual.textContent = 'Todos los productos';
    window.aplicarFiltros();
};

// ==========================================================================
// 2. RENDERIZADO DE PRODUCTOS
// ==========================================================================
function renderizarProductos(productos) {
    const contenedorGrilla = document.getElementById('grilla-productos');
    const contadorProductos = document.getElementById('contador-productos-texto');
    if (!contenedorGrilla) return;

    if (contadorProductos) {
        contadorProductos.textContent = `${productos.length} producto${productos.length === 1 ? '' : 's'} elegido${productos.length === 1 ? '' : 's'} para vos`;
    }

    if (productos.length === 0) {
        contenedorGrilla.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: #777;">
                <p style="font-size: 1.15rem; margin-bottom: 1rem;">No encontramos productos con esos filtros seleccionados.</p>
                <button type="button" onclick="window.limpiarFiltros()" class="catalogo__boton-ver-mas">
                    Ver todos los productos
                </button>
            </div>
        `;
        return;
    }

    contenedorGrilla.innerHTML = productos.map(prod => {
        const foto = prod.imagen_url || 'https://placehold.co/400x400/F4E4D9/6D1D26?text=Formula+Intima';
        const precioOferta = Number(prod.precio_oferta).toLocaleString('es-AR');
        const precioTachado = prod.precio_tachado 
            ? `<div class="tarjeta-producto__precio-tachado">$${Number(prod.precio_tachado).toLocaleString('es-AR')}</div>` 
            : '';
        const transferencia = prod.precio_transferencia 
            ? `<div class="tarjeta-producto__transferencia">$${Number(prod.precio_transferencia).toLocaleString('es-AR')} con Transferencia o depósito</div>` 
            : '';
        const cuotas = prod.cuotas 
            ? `<div class="tarjeta-producto__cuotas">${prod.cuotas}</div>` 
            : '';
        const badgeDesc = prod.badge_descuento 
            ? `<span class="tarjeta-producto__etiqueta tarjeta-producto__etiqueta--descuento">${prod.badge_descuento}</span>` 
            : '';
        const badgeEnvio = prod.envio_gratis 
            ? `<span class="tarjeta-producto__etiqueta tarjeta-producto__etiqueta--envio">Envío gratis</span>` 
            : '';

        return `
            <article class="tarjeta-producto" itemscope itemtype="https://schema.org/Product">
                <div class="tarjeta-producto__badges">
                    ${badgeDesc}
                    ${badgeEnvio}
                </div>
                
                <button type="button" class="tarjeta-producto__favorito" onclick="window.toggleFavorito(this)" aria-label="Favorito">♡</button>
                
                <div onclick="window.verDetalleRapido('${prod.id}')" class="tarjeta-producto__imagen-contenedor">
                    <img src="${foto}" alt="${prod.titulo}" class="tarjeta-producto__imagen" itemprop="image" loading="lazy">
                </div>

                <div class="tarjeta-producto__cuerpo">
                    <span class="tarjeta-producto__marca" itemprop="brand">${prod.marca || 'Fórmula Íntima'}</span>
                    
                    <a href="#producto-${prod.id}" onclick="event.preventDefault(); window.verDetalleRapido('${prod.id}')" class="tarjeta-producto__titulo-enlace">
                        <h3 class="tarjeta-producto__titulo" itemprop="name">${prod.titulo}</h3>
                    </a>
                    
                    <div class="tarjeta-producto__precios" itemprop="offers" itemscope itemtype="https://schema.org/Offer">
                        <meta itemprop="priceCurrency" content="ARS">
                        ${precioTachado}
                        <div class="tarjeta-producto__precio-oferta">
                            $<span itemprop="price">${precioOferta}</span>
                        </div>
                        ${cuotas}
                        ${transferencia}
                        <link itemprop="availability" href="https://schema.org/InStock" />
                    </div>

                    <div class="tarjeta-producto__acciones">
                        <button type="button" class="tarjeta-producto__boton tarjeta-producto__boton--comprar" onclick="window.agregarAlCarrito('${prod.id}')">
                            Agregar al carrito
                        </button>
                        <button type="button" class="tarjeta-producto__boton tarjeta-producto__boton--ver" onclick="window.verDetalleRapido('${prod.id}')">
                            Ver
                        </button>
                    </div>
                </div>
            </article>
        `;
    }).join('');
}

function actualizarContadoresCategorias() {
    const conteos = {};
    todosLosProductos.forEach(p => {
        const cat = (p.categoria || '').toLowerCase();
        conteos[cat] = (conteos[cat] || 0) + 1;
    });

    document.querySelectorAll('.filtro-conteo').forEach(span => {
        const cat = span.getAttribute('data-cat');
        span.textContent = `(${conteos[cat] || 0})`;
    });
}

// ==========================================================================
// 3. CARRITO DE COMPRAS LATERAL Y WHATSAPP
// ==========================================================================
window.abrirDrawerCarrito = function() {
    const carritoDrawer = document.getElementById('carrito-drawer');
    if (carritoDrawer) {
        carritoDrawer.classList.add('carrito-drawer--activo');
        carritoDrawer.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }
};

window.cerrarDrawerCarrito = function() {
    const carritoDrawer = document.getElementById('carrito-drawer');
    if (carritoDrawer) {
        carritoDrawer.classList.remove('carrito-drawer--activo');
        carritoDrawer.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }
};

window.toggleCuponCarrito = function() {
    const cuponContenido = document.getElementById('cupon-contenido');
    if (cuponContenido) {
        cuponContenido.classList.toggle('carrito-cupon__formulario--activo');
    }
};

window.agregarAlCarrito = function(id) {
    const prod = todosLosProductos.find(p => String(p.id) === String(id));
    if (!prod) return;

    const itemExistente = carrito.find(item => String(item.id) === String(id));

    if (itemExistente) {
        itemExistente.cantidad += 1;
    } else {
        carrito.push({
            id: prod.id,
            titulo: prod.titulo,
            marca: prod.marca || 'Fórmula Íntima',
            precio: parseFloat(prod.precio_oferta),
            imagen_url: prod.imagen_url || 'https://placehold.co/100x100/F4E4D9/6D1D26?text=Foto',
            cantidad: 1
        });
    }

    guardarCarrito();
    actualizarCarritoUI();
    window.abrirDrawerCarrito();
};

window.cambiarCantidadItem = function(id, cambio) {
    const item = carrito.find(p => String(p.id) === String(id));
    if (!item) return;

    item.cantidad += cambio;
    if (item.cantidad <= 0) {
        carrito = carrito.filter(p => String(p.id) !== String(id));
    }

    guardarCarrito();
    actualizarCarritoUI();
};

window.eliminarItemCarrito = function(id) {
    carrito = carrito.filter(p => String(p.id) !== String(id));
    guardarCarrito();
    actualizarCarritoUI();
};

function guardarCarrito() {
    try {
        localStorage.setItem('fi_carrito_v2', JSON.stringify(carrito));
    } catch (e) {}
}

function actualizarCarritoUI() {
    const contadorCarritoBadge = document.getElementById('carrito-badge-contador');
    const carritoItemsContenedor = document.getElementById('carrito-items-contenedor');
    const carritoSubtotalTexto = document.getElementById('carrito-subtotal');
    const carritoTotalTexto = document.getElementById('carrito-total');
    const carritoCuotasTexto = document.getElementById('carrito-cuotas-texto');
    const botonIniciarCompra = document.getElementById('boton-iniciar-compra');

    const totalCantidadItems = carrito.reduce((acc, item) => acc + (item.cantidad || 1), 0);
    if (contadorCarritoBadge) contadorCarritoBadge.textContent = totalCantidadItems;

    if (!carritoItemsContenedor) return;

    if (carrito.length === 0) {
        carritoItemsContenedor.innerHTML = `
            <div class="carrito-vacio">
                <p>Tu carrito de compras está vacío.</p>
                <span style="font-size: 2.2rem;">🛍️</span>
            </div>
        `;
        if (carritoSubtotalTexto) carritoSubtotalTexto.textContent = "$ 0";
        if (carritoTotalTexto) carritoTotalTexto.textContent = "$ 0";
        if (carritoCuotasTexto) carritoCuotasTexto.textContent = "o 3 cuotas sin interés de $ 0";
        if (botonIniciarCompra) botonIniciarCompra.disabled = true;
        return;
    }

    if (botonIniciarCompra) botonIniciarCompra.disabled = false;

    const subtotal = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    const cuota3 = Math.round(subtotal / 3);

    carritoItemsContenedor.innerHTML = carrito.map(item => `
        <div class="carrito-item">
            <div class="carrito-item__imagen-caja">
                <img src="${item.imagen_url}" alt="${item.titulo}" class="carrito-item__imagen">
            </div>

            <div class="carrito-item__info">
                <span class="carrito-item__marca">${item.marca}</span>
                <h4 class="carrito-item__titulo">${item.titulo}</h4>
                
                <div class="carrito-item__cantidad">
                    <button type="button" class="carrito-item__btn-cant" onclick="window.cambiarCantidadItem('${item.id}', -1)">-</button>
                    <span class="carrito-item__cant-numero">${item.cantidad}</span>
                    <button type="button" class="carrito-item__btn-cant" onclick="window.cambiarCantidadItem('${item.id}', 1)">+</button>
                </div>
            </div>

            <div class="carrito-item__col-derecha">
                <button type="button" class="carrito-item__btn-eliminar" onclick="window.eliminarItemCarrito('${item.id}')" aria-label="Eliminar">&times;</button>
                <span class="carrito-item__precio">$ ${(item.precio * item.cantidad).toLocaleString('es-AR')}</span>
            </div>
        </div>
    `).join('');

    if (carritoSubtotalTexto) carritoSubtotalTexto.textContent = `$ ${subtotal.toLocaleString('es-AR')}`;
    if (carritoTotalTexto) carritoTotalTexto.textContent = `$ ${subtotal.toLocaleString('es-AR')}`;
    if (carritoCuotasTexto) carritoCuotasTexto.textContent = `o 3 cuotas sin interés de $ ${cuota3.toLocaleString('es-AR')}`;
}

window.enviarPedidoAWhatsApp = function() {
    if (carrito.length === 0) return;

    const subtotal = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    const inputCupon = document.getElementById('cupon-input');
    const cuponTexto = (inputCupon && inputCupon.value.trim() !== '') ? `\nCupón ingresado: *${inputCupon.value.trim()}*` : '';
    
    let mensaje = `*¡Hola Fórmula Íntima!* 🌸\nQuiero realizar el siguiente pedido desde la tienda online:\n\n`;

    carrito.forEach((item, index) => {
        const totalPorItem = (item.precio * item.cantidad).toLocaleString('es-AR');
        mensaje += `*${index + 1}.* ${item.titulo}\n`;
        mensaje += `   • Cantidad: ${item.cantidad}\n`;
        mensaje += `   • Subtotal: $${totalPorItem}\n\n`;
    });

    mensaje += `----------------------------\n`;
    mensaje += `*Total del pedido: $${subtotal.toLocaleString('es-AR')}*${cuponTexto}\n`;
    mensaje += `Quedo a la espera para coordinar el pago y el envío discreto. ✨\n\n`;
    mensaje += `¡Muchas gracias!`;

    const urlWhatsApp = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensaje)}`;
    window.open(urlWhatsApp, '_blank');
};

// ==========================================================================
// 4. CARDS FLOTANTES DEL FOOTER (MODALES)
// ==========================================================================
window.abrirModalInfo = function(clave) {
    const modalInfo = document.getElementById('modal-info');
    const modalInfoBadge = document.getElementById('modal-info-badge');
    const modalInfoTitulo = document.getElementById('modal-info-titulo');
    const modalInfoContenido = document.getElementById('modal-info-contenido');

    const data = DATOS_MODALES_INFO[clave];
    if (!data || !modalInfo) return;

    if (modalInfoBadge) modalInfoBadge.textContent = data.badge;
    if (modalInfoTitulo) modalInfoTitulo.textContent = data.titulo;
    if (modalInfoContenido) modalInfoContenido.innerHTML = data.contenido;

    modalInfo.classList.add('modal-info--activo');
    modalInfo.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
};

window.cerrarModalInfo = function() {
    const modalInfo = document.getElementById('modal-info');
    if (!modalInfo) return;
    modalInfo.classList.remove('modal-info--activo');
    modalInfo.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
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
    const prod = todosLosProductos.find(p => String(p.id) === String(id));
    if (!prod) return;

    const modalInfo = document.getElementById('modal-info');
    const modalInfoBadge = document.getElementById('modal-info-badge');
    const modalInfoTitulo = document.getElementById('modal-info-titulo');
    const modalInfoContenido = document.getElementById('modal-info-contenido');
    if (!modalInfo) return;

    modalInfoBadge.textContent = prod.marca || 'FÓRMULA ÍNTIMA';
    modalInfoTitulo.textContent = prod.titulo;
    modalInfoContenido.innerHTML = `
        <div style="text-align:center; margin-bottom:1rem; background:#F4E4D9; padding:1rem; border-radius:6px;">
            <img src="${prod.imagen_url}" alt="${prod.titulo}" style="max-height:200px; margin:0 auto; object-fit:contain;">
        </div>
        <p style="font-size:1.4rem; font-weight:800; color:#6D1D26; margin-bottom:0.3rem;">
            $${Number(prod.precio_oferta).toLocaleString('es-AR')}
        </p>
        ${prod.cuotas ? `<p style="font-size:0.85rem; color:#666;">${prod.cuotas}</p>` : ''}
        ${prod.precio_transferencia ? `<div class="modal-info__destacado">$${Number(prod.precio_transferencia).toLocaleString('es-AR')} abonando por Transferencia Bancaria</div>` : ''}
        <button type="button" onclick="window.cerrarModalInfo(); window.agregarAlCarrito('${prod.id}');" style="width:100%; padding:0.9rem; background:#40171F; color:#FFF8ED; border:none; border-radius:4px; font-weight:700; cursor:pointer; margin-top:0.5rem;">
            Agregar al carrito
        </button>
    `;

    modalInfo.classList.add('modal-info--activo');
    modalInfo.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
};

// ==========================================================================
// 5. INICIALIZACIÓN AUTOMÁTICA
// ==========================================================================
async function iniciarTienda() {
    actualizarCarritoUI();
    actualizarContadoresCategorias();
    window.aplicarFiltros();

    if (clienteSupabase) {
        try {
            const { data, error } = await clienteSupabase
                .from('productos')
                .select('*')
                .order('created_at', { ascending: false });

            if (!error && data && data.length > 0) {
                todosLosProductos = data;
                actualizarContadoresCategorias();
                window.aplicarFiltros();
            }
        } catch (err) {
            console.warn("Usando catálogo local de demostración.");
        }
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            window.cerrarModalInfo();
            window.cerrarDrawerCarrito();
        }
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciarTienda);
} else {
    iniciarTienda();
}