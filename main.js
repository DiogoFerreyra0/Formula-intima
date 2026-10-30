/* ==========================================================================
   FÓRMULA ÍNTIMA - MAIN.JS (CON SELECCIÓN DE COLORES Y TALLES + WHATSAPP)
   ========================================================================== */

const WHATSAPP_NUMERO = "5491145678900"; 
const SUPABASE_URL = "https://TU_PROYECTO.supabase.co";
const SUPABASE_ANON_KEY = "TU_CLAVE_ANON_PUBLICA";

const clienteSupabase = (typeof window.supabase !== 'undefined' && SUPABASE_URL !== "https://TU_PROYECTO.supabase.co")
    ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    : null;

// PRODUCTOS BASE DE DEMOSTRACIÓN (Con talles y colores)
const PRODUCTOS_LOCALES_DEMO = [
    {
        id: "5",
        titulo: "Body de Encaje Línea Inclusiva Real",
        descripcion: "Confeccionado en encaje elastizado suave y resistente con detalles en satén. Breteles regulables y calce ergonómico pensado para celebrar la diversidad de cuerpos y talles.",
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
        colores_disponibles: ["Negro", "Rojo", "Blanco"],
        talles_disponibles: ["S", "M", "L", "XL", "2XL", "3XL"],
        imagen_url: "https://placehold.co/400x400/F4E4D9/6D1D26?text=Body+Encaje+Inclusivo",
        imagenes: [
            "https://placehold.co/400x400/F4E4D9/6D1D26?text=Body+Frente",
            "https://placehold.co/400x400/6D1D26/FFF8ED?text=Body+Espalda"
        ]
    },
    {
        id: "1",
        titulo: "Gel Lubricante Sexitive Dante al Infierno 500ml",
        descripcion: "Gel íntimo lubricante ultra deslizante. Formato generoso de 500ml ideal para masajes y prácticas intensas. Fórmula al agua compatible con preservativos y juguetes.",
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
        colores_disponibles: ["Rojo"],
        talles_disponibles: [],
        imagen_url: "https://placehold.co/400x400/F4E4D9/6D1D26?text=Dante+al+Infierno",
        imagenes: [
            "https://placehold.co/400x400/F4E4D9/6D1D26?text=Dante+Frente",
            "https://placehold.co/400x400/6D1D26/FFF8ED?text=Dante+Envase"
        ]
    },
    {
        id: "2",
        titulo: "Spray Retardante Sexitive Héroe Extra Time 20ml",
        descripcion: "Spray desensibilizante suave diseñado para prolongar el placer y el rendimiento. Textura liviana, rápida absorción y sin dejar residuos grasos.",
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
        colores_disponibles: ["Negro"],
        talles_disponibles: [],
        imagen_url: "https://placehold.co/400x400/F4E4D9/6D1D26?text=Heroe+Spray",
        imagenes: [
            "https://placehold.co/400x400/F4E4D9/6D1D26?text=Heroe+Spray+1",
            "https://placehold.co/400x400/6D1D26/FFF8ED?text=Heroe+Caja+2"
        ]
    },
    {
        id: "4",
        titulo: "Succionador de Clítoris — 10 funciones de pulso",
        descripcion: "Estimulación por ondas de presión de aire sin contacto directo. Silicona médica ultra suave de grado alimenticio, recargable mediante USB y sumergible.",
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
        colores_disponibles: ["Rosa", "Negro"],
        talles_disponibles: [],
        imagen_url: "https://placehold.co/400x400/F4E4D9/6D1D26?text=Succionador+Satisfyer",
        imagenes: [
            "https://placehold.co/400x400/F4E4D9/6D1D26?text=Succionador+Frente",
            "https://placehold.co/400x400/6D1D26/FFF8ED?text=Boquilla+Silicona"
        ]
    }
];

const DATOS_MODALES_INFO = {
    "acerca": {
        badge: "NUESTRA IDENTIDAD",
        titulo: "Acerca de Fórmula Íntima",
        contenido: `
            <p>Fórmula Íntima nace con el propósito de abordar la sexualidad desde una mirada amplia, natural y consciente.</p>
            <p>Más que ofrecer productos, buscamos crear un espacio donde el placer, el bienestar y la salud sexual convivan con información, acompañamiento y respeto, derribando prejuicios y mitos.</p>
            <div class="modal-info__destacado">
                Celebrar la diversidad de cuerpos, identidades y talles. El placer es para todes.
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
            Al presionar "Iniciar compra" en el carrito, se genera un mensaje automático con tus productos, talles y colores y te deriva directo a nuestro WhatsApp oficial para coordinar todo de forma personalizada.</p>
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
                <li><strong>Elegí tus productos:</strong> Navegá el catálogo y presioná <em>"Ver"</em> o <em>"Agregar al carrito"</em> seleccionando tu talle y color preferido.</li>
                <li><strong>Revisá tu selección:</strong> En el carrito lateral podés sumar cantidades y ver el total calculado automáticamente.</li>
                <li><strong>Iniciá la compra:</strong> Tocá el botón <em>"Iniciar compra"</em>.</li>
                <li><strong>Mensaje automático a WhatsApp:</strong> El sistema arma el mensaje con tu lista de productos detallando talles y colores, y te abre nuestro WhatsApp para finalizar el pago y el envío discreto.</li>
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

// 1. FILTROS Y NAVEGACIÓN
window.filtrarDesdeEnlace = function(categoriaClave) {
    const formFiltros = document.getElementById('formulario-filtros');
    const buscadorInput = document.getElementById('input-buscar');
    
    if (formFiltros) formFiltros.reset();
    if (buscadorInput) buscadorInput.value = '';

    const checkbox = document.querySelector(`input[name="categoria"][value="${categoriaClave}"]`);
    if (checkbox) checkbox.checked = true;

    const migasActual = document.getElementById('migas-categoria-actual');
    if (migasActual) migasActual.textContent = NOMBRES_CATEGORIAS[categoriaClave] || "Todos los productos";

    window.aplicarFiltros();

    const seccionCatalogo = document.getElementById('contenido-principal');
    if (seccionCatalogo) seccionCatalogo.scrollIntoView({ behavior: 'smooth' });
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

    const textoBuscador = buscadorInput ? buscadorInput.value.toLowerCase().trim() : '';
    if (textoBuscador !== '') {
        resultado = resultado.filter(p => 
            p.titulo.toLowerCase().includes(textoBuscador) || 
            (p.marca && p.marca.toLowerCase().includes(textoBuscador)) ||
            (p.descripcion && p.descripcion.toLowerCase().includes(textoBuscador))
        );
    }

    const categoriasSeleccionadas = Array.from(document.querySelectorAll('input[name="categoria"]:checked')).map(i => i.value.toLowerCase());
    if (categoriasSeleccionadas.length > 0) {
        resultado = resultado.filter(p => p.categoria && categoriasSeleccionadas.includes(p.categoria.toLowerCase()));
    }

    const marcasSeleccionadas = Array.from(document.querySelectorAll('input[name="marca"]:checked')).map(i => i.value.toLowerCase());
    if (marcasSeleccionadas.length > 0) {
        resultado = resultado.filter(p => p.marca && marcasSeleccionadas.includes(p.marca.toLowerCase()));
    }

    const coloresSeleccionados = Array.from(document.querySelectorAll('input[name="color"]:checked')).map(i => i.value.toLowerCase());
    if (coloresSeleccionados.length > 0) {
        resultado = resultado.filter(p => {
            if (p.colores_disponibles && p.colores_disponibles.length) {
                return p.colores_disponibles.some(c => coloresSeleccionados.includes(c.toLowerCase()));
            }
            return p.color && coloresSeleccionados.includes(p.color.toLowerCase());
        });
    }

    const modelosSeleccionados = Array.from(document.querySelectorAll('input[name="modelo"]:checked')).map(i => i.value.toLowerCase());
    if (modelosSeleccionados.length > 0) {
        resultado = resultado.filter(p => p.modelo && modelosSeleccionados.includes(p.modelo.toLowerCase()));
    }

    const precioDesde = inputPrecioDesde && inputPrecioDesde.value ? parseFloat(inputPrecioDesde.value) : 0;
    const precioHasta = inputPrecioHasta && inputPrecioHasta.value ? parseFloat(inputPrecioHasta.value) : Infinity;

    resultado = resultado.filter(p => {
        const precio = parseFloat(p.precio_oferta);
        return precio >= precioDesde && precio <= precioHasta;
    });

    const orden = selectOrden ? selectOrden.value : 'destacados';
    switch (orden) {
        case 'precio-menor': resultado.sort((a, b) => a.precio_oferta - b.precio_oferta); break;
        case 'precio-mayor': resultado.sort((a, b) => b.precio_oferta - a.precio_oferta); break;
        case 'alfabetico-az': resultado.sort((a, b) => a.titulo.localeCompare(b.titulo)); break;
        case 'alfabetico-za': resultado.sort((a, b) => b.titulo.localeCompare(a.titulo)); break;
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

// 2. RENDERIZAR PRODUCTOS
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
                <button type="button" onclick="window.limpiarFiltros()" class="catalogo__boton-ver-mas">Ver todos los productos</button>
            </div>
        `;
        return;
    }

    contenedorGrilla.innerHTML = productos.map(prod => {
        const foto = prod.imagen_url || (prod.imagenes && prod.imagenes[0]) || 'https://placehold.co/400x400/F4E4D9/6D1D26?text=Formula+Intima';
        const precioOferta = Number(prod.precio_oferta).toLocaleString('es-AR');
        const precioTachado = prod.precio_tachado ? `<div class="tarjeta-producto__precio-tachado">$${Number(prod.precio_tachado).toLocaleString('es-AR')}</div>` : '';
        const transferencia = prod.precio_transferencia ? `<div class="tarjeta-producto__transferencia">$${Number(prod.precio_transferencia).toLocaleString('es-AR')} con Transferencia o depósito</div>` : '';
        const cuotas = prod.cuotas ? `<div class="tarjeta-producto__cuotas">${prod.cuotas}</div>` : '';
        const badgeDesc = prod.badge_descuento ? `<span class="tarjeta-producto__etiqueta tarjeta-producto__etiqueta--descuento">${prod.badge_descuento}</span>` : '';
        const badgeEnvio = prod.envio_gratis ? `<span class="tarjeta-producto__etiqueta tarjeta-producto__etiqueta--envio">Envío gratis</span>` : '';

        // Badges visuales de talles disponibles
        const tieneTalles = (prod.talles_disponibles && prod.talles_disponibles.length);
        const tallesHTML = tieneTalles ? `
            <div style="font-size: 0.72rem; color: #6D1D26; font-weight: 700; margin-bottom: 0.3rem;">
                Talles: ${prod.talles_disponibles.join(', ')}
            </div>
        ` : '';

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

                    ${tallesHTML}
                    
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
                        <button type="button" class="tarjeta-producto__boton tarjeta-producto__boton--comprar" onclick="window.verDetalleRapido('${prod.id}')">
                            ${tieneTalles ? 'Elegir talle' : 'Agregar al carrito'}
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

// 3. CARRITO DE COMPRAS Y WHATSAPP
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
    if (cuponContenido) cuponContenido.classList.toggle('carrito-cupon__formulario--activo');
};

// Agregar al carrito con variante de Color y Talle
window.agregarAlCarrito = function(id, colorElegido = null, talleElegido = null) {
    const prod = todosLosProductos.find(p => String(p.id) === String(id));
    if (!prod) return;

    // Si no se pasaron, se toma la primera opción disponible
    const colorFinal = colorElegido || (prod.colores_disponibles && prod.colores_disponibles[0]) || prod.color || 'Único';
    const talleFinal = talleElegido || (prod.talles_disponibles && prod.talles_disponibles[0]) || 'Único';

    // Clave única por variante para poder agregar el mismo producto en talles distintos
    const keyVariante = `${prod.id}_${colorFinal}_${talleFinal}`;
    const itemExistente = carrito.find(item => item.keyVariante === keyVariante);
    const foto = prod.imagen_url || (prod.imagenes && prod.imagenes[0]) || 'https://placehold.co/100x100/F4E4D9/6D1D26?text=Foto';

    if (itemExistente) {
        itemExistente.cantidad += 1;
    } else {
        carrito.push({
            id: prod.id,
            keyVariante: keyVariante,
            titulo: prod.titulo,
            marca: prod.marca || 'Fórmula Íntima',
            color: colorFinal,
            talle: talleFinal,
            precio: parseFloat(prod.precio_oferta),
            imagen_url: foto,
            cantidad: 1
        });
    }

    guardarCarrito();
    actualizarCarritoUI();
    window.abrirDrawerCarrito();
};

window.cambiarCantidadItem = function(keyVariante, cambio) {
    const item = carrito.find(p => p.keyVariante === keyVariante || String(p.id) === String(keyVariante));
    if (!item) return;

    item.cantidad += cambio;
    if (item.cantidad <= 0) {
        carrito = carrito.filter(p => p !== item);
    }

    guardarCarrito();
    actualizarCarritoUI();
};

window.eliminarItemCarrito = function(keyVariante) {
    carrito = carrito.filter(p => p.keyVariante !== keyVariante && String(p.id) !== String(keyVariante));
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

    carritoItemsContenedor.innerHTML = carrito.map(item => {
        const detalleVariante = (item.talle && item.talle !== 'Único') ? `Talle: ${item.talle}` : '';
        const detalleColor = (item.color && item.color !== 'Único') ? `Color: ${item.color}` : '';
        const subDetalle = [detalleVariante, detalleColor].filter(Boolean).join(' | ');

        return `
            <div class="carrito-item">
                <div class="carrito-item__imagen-caja">
                    <img src="${item.imagen_url}" alt="${item.titulo}" class="carrito-item__imagen">
                </div>

                <div class="carrito-item__info">
                    <span class="carrito-item__marca">${item.marca}</span>
                    <h4 class="carrito-item__titulo">${item.titulo}</h4>
                    ${subDetalle ? `<div style="font-size:0.75rem; color:#6D1D26; font-weight:700;">${subDetalle}</div>` : ''}
                    
                    <div class="carrito-item__cantidad">
                        <button type="button" class="carrito-item__btn-cant" onclick="window.cambiarCantidadItem('${item.keyVariante || item.id}', -1)">-</button>
                        <span class="carrito-item__cant-numero">${item.cantidad}</span>
                        <button type="button" class="carrito-item__btn-cant" onclick="window.cambiarCantidadItem('${item.keyVariante || item.id}', 1)">+</button>
                    </div>
                </div>

                <div class="carrito-item__col-derecha">
                    <button type="button" class="carrito-item__btn-eliminar" onclick="window.eliminarItemCarrito('${item.keyVariante || item.id}')" aria-label="Eliminar">&times;</button>
                    <span class="carrito-item__precio">$ ${(item.precio * item.cantidad).toLocaleString('es-AR')}</span>
                </div>
            </div>
        `;
    }).join('');

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
        const detalleVariante = (item.talle && item.talle !== 'Único') ? ` (Talle: ${item.talle})` : '';
        const detalleColor = (item.color && item.color !== 'Único') ? ` (Color: ${item.color})` : '';

        mensaje += `*${index + 1}.* ${item.titulo}${detalleVariante}${detalleColor}\n`;
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

// 4. SUSCRIPCIÓN NEWSLETTER
window.suscribirNewsletter = async function(event) {
    event.preventDefault();
    const inputEmail = document.getElementById('input-email-newsletter');
    const boton = document.getElementById('boton-newsletter');
    const mensajeAlerta = document.getElementById('mensaje-newsletter');

    if (!inputEmail || !inputEmail.value) return;

    const email = inputEmail.value.trim().toLowerCase();
    boton.disabled = true;
    boton.textContent = "Sumando...";

    try {
        const nuevoSuscriptor = {
            id: String(Date.now()),
            email: email,
            fecha: new Date().toLocaleDateString('es-AR', {
                year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'
            })
        };

        if (clienteSupabase) {
            await clienteSupabase.from('suscriptores').insert([{ email: email }]);
        }

        let suscriptoresLocales = [];
        try {
            suscriptoresLocales = JSON.parse(localStorage.getItem('fi_suscriptores_newsletter')) || [];
        } catch (e) { suscriptoresLocales = []; }

        const yaExiste = suscriptoresLocales.some(s => s.email === email);
        if (!yaExiste) {
            suscriptoresLocales.unshift(nuevoSuscriptor);
            localStorage.setItem('fi_suscriptores_newsletter', JSON.stringify(suscriptoresLocales));
        }

        mensajeAlerta.textContent = "¡Te sumaste con éxito a la comunidad de Fórmula Íntima! 🌸";
        mensajeAlerta.className = "newsletter__alerta newsletter__alerta--exito";
        mensajeAlerta.style.display = "block";
        inputEmail.value = "";
    } catch (err) {
        mensajeAlerta.textContent = "Hubo un inconveniente al registrar tu correo. Inténtalo nuevamente.";
        mensajeAlerta.className = "newsletter__alerta newsletter__alerta--error";
        mensajeAlerta.style.display = "block";
    } finally {
        boton.disabled = false;
        boton.textContent = "Quiero sumarme";
        setTimeout(() => { mensajeAlerta.style.display = "none"; }, 5000);
    }
};

// 5. CARDS FLOTANTES DEL FOOTER
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

// 6. CARD MODAL DETALLADA CON SELECTOR DE TALLE, COLOR Y FOTOS
window.cambiarImagenPrincipalModal = function(urlNueva) {
    const imgPrincipal = document.getElementById('modal-producto-img-principal');
    if (imgPrincipal) imgPrincipal.src = urlNueva;
};

window.verDetalleRapido = function(id) {
    const prod = todosLosProductos.find(p => String(p.id) === String(id));
    if (!prod) return;

    const modalInfo = document.getElementById('modal-info');
    const modalInfoBadge = document.getElementById('modal-info-badge');
    const modalInfoTitulo = document.getElementById('modal-info-titulo');
    const modalInfoContenido = document.getElementById('modal-info-contenido');
    if (!modalInfo) return;

    const listaFotos = (prod.imagenes && Array.isArray(prod.imagenes) && prod.imagenes.length)
        ? prod.imagenes
        : [prod.imagen_url || 'https://placehold.co/400x400/F4E4D9/6D1D26?text=Foto'];

    const fotoInicial = listaFotos[0];

    // Miniaturas de galería
    const tiraMiniaturasHTML = listaFotos.length > 1 ? `
        <div style="display:flex; gap:0.5rem; justify-content:center; margin-top:0.6rem; overflow-x:auto; padding-bottom:4px;">
            ${listaFotos.map((url, i) => `
                <img src="${url}" 
                     onclick="window.cambiarImagenPrincipalModal('${url}')" 
                     onmouseover="window.cambiarImagenPrincipalModal('${url}')"
                     style="width:50px; height:50px; object-fit:contain; border:2px solid #E5D5C5; border-radius:4px; cursor:pointer; background:#fff;"
                     alt="Miniatura ${i+1}">
            `).join('')}
        </div>
    ` : '';

    // Selector de Colores si tiene
    const colores = (prod.colores_disponibles && prod.colores_disponibles.length) ? prod.colores_disponibles : (prod.color ? [prod.color] : []);
    const selectorColoresHTML = colores.length > 1 ? `
        <div style="margin-bottom:0.9rem;">
            <label style="font-size:0.85rem; font-weight:700; color:#40171F; display:block; margin-bottom:0.3rem;">Elegí el color:</label>
            <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
                ${colores.map((c, i) => `
                    <label style="display:inline-flex; align-items:center; gap:0.3rem; font-size:0.85rem; background:#FFF8ED; border:1px solid #E5D5C5; padding:4px 8px; border-radius:4px; cursor:pointer;">
                        <input type="radio" name="modal_radio_color" value="${c}" ${i === 0 ? 'checked' : ''}> ${c}
                    </label>
                `).join('')}
            </div>
        </div>
    ` : '';

    // Selector de Talles si tiene
    const talles = (prod.talles_disponibles && prod.talles_disponibles.length) ? prod.talles_disponibles : [];
    const selectorTallesHTML = talles.length > 0 ? `
        <div style="margin-bottom:1.1rem; background:#FFF8ED; border:1px dashed #E5D5C5; padding:0.8rem; border-radius:6px;">
            <label style="font-size:0.85rem; font-weight:700; color:#6D1D26; display:block; margin-bottom:0.4rem;">📏 Seleccioná tu talle:</label>
            <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
                ${talles.map((t, i) => `
                    <label style="display:inline-flex; align-items:center; gap:0.3rem; font-size:0.85rem; font-weight:700; background:#fff; border:1px solid #6D1D26; padding:5px 10px; border-radius:4px; cursor:pointer;">
                        <input type="radio" name="modal_radio_talle" value="${t}" ${i === 0 ? 'checked' : ''}> ${t}
                    </label>
                `).join('')}
            </div>
        </div>
    ` : '';

    modalInfoBadge.textContent = prod.marca || 'FÓRMULA ÍNTIMA';
    modalInfoTitulo.textContent = prod.titulo;
    modalInfoContenido.innerHTML = `
        <div style="text-align:center; margin-bottom:1.2rem; background:#F4E4D9; padding:1.2rem; border-radius:6px;">
            <img id="modal-producto-img-principal" src="${fotoInicial}" alt="${prod.titulo}" style="max-height:220px; width:auto; margin:0 auto; object-fit:contain; border-radius:4px;">
            ${tiraMiniaturasHTML}
        </div>

        <div style="margin-bottom:1rem; border-bottom:1px solid #E5D5C5; padding-bottom:0.8rem;">
            <div style="font-size:1.8rem; font-weight:800; color:#6D1D26; line-height:1.1;">
                $${Number(prod.precio_oferta).toLocaleString('es-AR')}
                ${prod.precio_tachado ? `<span style="font-size:1rem; color:#999; text-decoration:line-through; margin-left:0.5rem; font-weight:normal;">$${Number(prod.precio_tachado).toLocaleString('es-AR')}</span>` : ''}
            </div>
            ${prod.cuotas ? `<p style="font-size:0.85rem; color:#666; margin-top:0.2rem;">${prod.cuotas}</p>` : ''}
            ${prod.precio_transferencia ? `<div class="modal-info__destacado" style="margin-top:0.5rem;">$${Number(prod.precio_transferencia).toLocaleString('es-AR')} con Transferencia o depósito bancario</div>` : ''}
        </div>

        <!-- SELECTORES DE COLOR Y TALLE -->
        ${selectorColoresHTML}
        ${selectorTallesHTML}

        <!-- Descripción -->
        ${prod.descripcion ? `
            <div style="margin-bottom:1.5rem;">
                <h4 style="font-size:0.9rem; font-weight:700; color:#40171F; margin-bottom:0.4rem; text-transform:uppercase; letter-spacing:0.5px;">Descripción:</h4>
                <p style="font-size:0.92rem; color:#444; line-height:1.6; white-space:pre-line;">${prod.descripcion}</p>
            </div>
        ` : ''}

        <button type="button" onclick="window.confirmarAgregarDesdeModal('${prod.id}')" style="width:100%; padding:1rem; background:#40171F; color:#FFF8ED; border:none; border-radius:4px; font-weight:700; font-size:1rem; cursor:pointer;">
            Agregar al carrito
        </button>
    `;

    modalInfo.classList.add('modal-info--activo');
    modalInfo.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
};

// Confirmar y agregar al carrito leyendo las opciones seleccionadas en la modal
window.confirmarAgregarDesdeModal = function(id) {
    const radioColor = document.querySelector('input[name="modal_radio_color"]:checked');
    const radioTalle = document.querySelector('input[name="modal_radio_talle"]:checked');

    const colorElegido = radioColor ? radioColor.value : null;
    const talleElegido = radioTalle ? radioTalle.value : null;

    window.cerrarModalInfo();
    window.agregarAlCarrito(id, colorElegido, talleElegido);
};

// 7. INICIALIZACIÓN
async function iniciarTienda() {
    const guardadosEnAdmin = localStorage.getItem('fi_catalogo_admin');
    if (guardadosEnAdmin) {
        try {
            const parseados = JSON.parse(guardadosEnAdmin);
            if (Array.isArray(parseados) && parseados.length > 0) {
                todosLosProductos = parseados;
            }
        } catch (e) {}
    }

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
        } catch (err) {}
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

// ==========================================================================
// CONTROLADOR DE PANTALLA DE CARGA (PRELOADER)
// ==========================================================================
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;

    // Pequeña pausa estética de 400ms para asegurar fluidez visual
    setTimeout(() => {
        preloader.classList.add('preloader--oculto');
        
        // Retira el preloader del flujo luego del desvanecimiento
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 600);
    }, 400);
});

// Respaldo de seguridad: si alguna imagen externa demora, se oculta a los 3 segundos
setTimeout(() => {
    const preloader = document.getElementById('preloader');
    if (preloader && !preloader.classList.contains('preloader--oculto')) {
        preloader.classList.add('preloader--oculto');
        setTimeout(() => { preloader.style.display = 'none'; }, 600);
    }
}, 3000);

// ==========================================================================
// CONTROLADOR DE VERIFICACIÓN DE EDAD (+18)
// ==========================================================================
function verificarMayoriaEdadInicial() {
    const yaConfirmo = localStorage.getItem('fi_adulto_confirmado');
    const modalEdad = document.getElementById('modal-edad');

    if (!yaConfirmo && modalEdad) {
        modalEdad.classList.add('modal-edad--activo');
        modalEdad.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }
}

window.confirmarMayoriaEdad = function() {
    localStorage.setItem('fi_adulto_confirmado', 'true');
    const modalEdad = document.getElementById('modal-edad');
    if (modalEdad) {
        modalEdad.classList.remove('modal-edad--activo');
        modalEdad.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }
};

window.salirPorMenorEdad = function() {
    window.location.href = 'https://www.google.com';
};

// Se ejecuta al cargar la página
document.addEventListener('DOMContentLoaded', verificarMayoriaEdadInicial);