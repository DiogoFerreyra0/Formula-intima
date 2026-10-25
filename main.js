/* ==========================================================================
   FÓRMULA ÍNTIMA - MAIN.JS (CATÁLOGO + FILTROS + CARRITO WHATSAPP BLINDADO)
   ========================================================================== */

const WHATSAPP_NUMERO = "5491145678900"; 
const SUPABASE_URL = "https://TU_PROYECTO.supabase.co";
const SUPABASE_ANON_KEY = "TU_CLAVE_ANON_PUBLICA";

const supabase = (typeof window.supabase !== 'undefined' && SUPABASE_URL !== "https://TU_PROYECTO.supabase.co")
    ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    : null;

// PRODUCTOS BASE CON ATRIBUTOS
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
        imagen_url: "https://via.placeholder.com/350x350/F4E4D9/40171F?text=Dante+al+Infierno"
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
        imagen_url: "https://via.placeholder.com/350x350/F4E4D9/40171F?text=Heroe+Spray"
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
        imagen_url: "https://via.placeholder.com/350x350/F4E4D9/40171F?text=Her+Aphrodisiac"
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
        imagen_url: "https://via.placeholder.com/350x350/F4E4D9/40171F?text=Succionador"
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
        imagen_url: "https://via.placeholder.com/350x350/F4E4D9/40171F?text=Body+Encaje"
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
        imagen_url: "https://via.placeholder.com/350x350/F4E4D9/40171F?text=Aceite+Vainilla"
    }
];

// ESTADO
let todosLosProductos = [];
let productosFiltrados = [];
let carrito = JSON.parse(localStorage.getItem('fi_carrito_v2')) || [];

// ELEMENTOS DEL DOM
const contenedorGrilla = document.querySelector('.productos-grilla');
const contadorProductos = document.querySelector('.catalogo__contador');
const selectOrden = document.getElementById('ordenar-catalogo');
const buscadorInput = document.getElementById('input-buscar');
const formFiltros = document.getElementById('formulario-filtros');
const botonLimpiar = document.getElementById('boton-limpiar-filtros') || document.querySelector('.filtros__limpiar');
const inputPrecioDesde = document.getElementById('filtro-precio-desde');
const inputPrecioHasta = document.getElementById('filtro-precio-hasta');
const contadorCarritoBadge = document.querySelector('.carrito-enlace__contador');
const botonAbrirCarrito = document.getElementById('boton-abrir-carrito') || document.querySelector('.carrito-enlace');

// Elementos Drawer Carrito
const carritoDrawer = document.getElementById('carrito-drawer');
const carritoOverlay = document.getElementById('carrito-overlay');
const carritoCerrar = document.getElementById('carrito-cerrar');
const carritoItemsContenedor = document.getElementById('carrito-items-contenedor');
const carritoSubtotalTexto = document.getElementById('carrito-subtotal');
const carritoTotalTexto = document.getElementById('carrito-total');
const carritoCuotasTexto = document.getElementById('carrito-cuotas-texto');
const botonIniciarCompra = document.getElementById('boton-iniciar-compra');

// ==========================================================================
// 1. INICIALIZACIÓN INMEDIATA Y SEGURA
// ==========================================================================
function iniciarTienda() {
    actualizarCarritoUI();
    obtenerProductos();
    configurarEventosFiltros();
    configurarAcordeonesFiltros();
    configurarEventosDrawer();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciarTienda);
} else {
    iniciarTienda();
}

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
            console.warn("Usando catálogo local de respaldo:", err.message);
            todosLosProductos = PRODUCTOS_LOCALES_DEMO;
        }
    } else {
        todosLosProductos = PRODUCTOS_LOCALES_DEMO;
    }

    actualizarContadoresCategorias();
    aplicarFiltros();
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
// 2. FILTROS Y ACORDEÓN
// ==========================================================================
function configurarEventosFiltros() {
    if (formFiltros) {
        formFiltros.addEventListener('change', (e) => {
            if (e.target.type !== 'number') aplicarFiltros();
        });
        formFiltros.addEventListener('submit', (e) => {
            e.preventDefault();
            aplicarFiltros();
        });
    }

    if (buscadorInput) buscadorInput.addEventListener('input', aplicarFiltros);
    if (selectOrden) selectOrden.addEventListener('change', aplicarFiltros);

    if (botonLimpiar) {
        botonLimpiar.addEventListener('click', (e) => {
            e.preventDefault();
            limpiarFiltros();
        });
    }
}

function configurarAcordeonesFiltros() {
    document.querySelectorAll('.filtro-grupo__cabecera').forEach(cabecera => {
        cabecera.addEventListener('click', () => {
            const grupo = cabecera.closest('.filtro-grupo');
            const icono = cabecera.querySelector('.filtro-grupo__icono');
            grupo.classList.toggle('filtro-grupo--cerrado');
            if (icono) {
                icono.textContent = grupo.classList.contains('filtro-grupo--cerrado') ? '∨' : '∧';
            }
        });
    });
}

function aplicarFiltros() {
    let resultado = [...todosLosProductos];

    const textoBuscador = buscadorInput ? buscadorInput.value.toLowerCase().trim() : '';
    if (textoBuscador !== '') {
        resultado = resultado.filter(p => 
            p.titulo.toLowerCase().includes(textoBuscador) || 
            (p.marca && p.marca.toLowerCase().includes(textoBuscador))
        );
    }

    const categoriasSeleccionadas = Array.from(document.querySelectorAll('input[name="categoria"]:checked'))
        .map(input => input.value.toLowerCase());
    if (categoriasSeleccionadas.length > 0) {
        resultado = resultado.filter(p => p.categoria && categoriasSeleccionadas.includes(p.categoria.toLowerCase()));
    }

    const marcasSeleccionadas = Array.from(document.querySelectorAll('input[name="marca"]:checked'))
        .map(input => input.value.toLowerCase());
    if (marcasSeleccionadas.length > 0) {
        resultado = resultado.filter(p => p.marca && marcasSeleccionadas.includes(p.marca.toLowerCase()));
    }

    const coloresSeleccionados = Array.from(document.querySelectorAll('input[name="color"]:checked'))
        .map(input => input.value.toLowerCase());
    if (coloresSeleccionados.length > 0) {
        resultado = resultado.filter(p => p.color && coloresSeleccionados.includes(p.color.toLowerCase()));
    }

    const modelosSeleccionados = Array.from(document.querySelectorAll('input[name="modelo"]:checked'))
        .map(input => input.value.toLowerCase());
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

function limpiarFiltros() {
    if (formFiltros) formFiltros.reset();
    if (buscadorInput) buscadorInput.value = '';
    if (selectOrden) selectOrden.value = 'destacados';
    aplicarFiltros();
}

// ==========================================================================
// 3. RENDERIZADO DEL CATÁLOGO
// ==========================================================================
function renderizarProductos(productos) {
    if (!contenedorGrilla) return;

    if (contadorProductos) {
        contadorProductos.textContent = `${productos.length} producto${productos.length === 1 ? '' : 's'} elegido${productos.length === 1 ? '' : 's'} para vos`;
    }

    if (productos.length === 0) {
        contenedorGrilla.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: #777;">
                <p style="font-size: 1.2rem; margin-bottom: 1rem;">No se encontraron productos con los filtros seleccionados.</p>
                <button type="button" onclick="limpiarFiltros()" class="catalogo__boton-ver-mas" style="padding: 0.6rem 1.5rem; cursor: pointer;">
                    Restablecer filtros
                </button>
            </div>
        `;
        return;
    }

    contenedorGrilla.innerHTML = productos.map(prod => {
        const foto = prod.imagen_url || 'https://via.placeholder.com/350x350/F4E4D9/40171F?text=Fórmula+Íntima';
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
                
                <button type="button" class="tarjeta-producto__favorito" onclick="toggleFavorito(this)" aria-label="Favorito">♡</button>
                
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
                        ${precioTachado}
                        <div class="tarjeta-producto__precio-oferta">
                            $<span itemprop="price">${precioOferta}</span>
                        </div>
                        ${cuotas}
                        ${transferencia}
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
// 4. CARRITO DE COMPRAS LATERAL (DRAWER)
// ==========================================================================
function configurarEventosDrawer() {
    if (botonAbrirCarrito) {
        botonAbrirCarrito.addEventListener('click', (e) => {
            e.preventDefault();
            abrirDrawerCarrito();
        });
    }
    if (carritoCerrar) carritoCerrar.addEventListener('click', cerrarDrawerCarrito);
    if (carritoOverlay) carritoOverlay.addEventListener('click', cerrarDrawerCarrito);

    if (botonIniciarCompra) {
        botonIniciarCompra.addEventListener('click', enviarPedidoAWhatsApp);
    }
}

function abrirDrawerCarrito() {
    if (carritoDrawer) {
        carritoDrawer.classList.add('carrito-drawer--activo');
        carritoDrawer.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }
}

function cerrarDrawerCarrito() {
    if (carritoDrawer) {
        carritoDrawer.classList.remove('carrito-drawer--activo');
        carritoDrawer.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }
}

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
    abrirDrawerCarrito();
};

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

window.eliminarItemCarrito = function(id) {
    carrito = carrito.filter(p => p.id !== id);
    guardarCarrito();
    actualizarCarritoUI();
};

function guardarCarrito() {
    localStorage.setItem('fi_carrito_v2', JSON.stringify(carrito));
}

function actualizarCarritoUI() {
    const totalCantidadItems = carrito.reduce((acc, item) => acc + (item.cantidad || 1), 0);
    if (contadorCarritoBadge) contadorCarritoBadge.textContent = totalCantidadItems;

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
                    <button type="button" class="carrito-item__btn-cant" onclick="cambiarCantidadItem('${item.id}', -1)">-</button>
                    <span class="carrito-item__cant-numero">${item.cantidad}</span>
                    <button type="button" class="carrito-item__btn-cant" onclick="cambiarCantidadItem('${item.id}', 1)">+</button>
                </div>
            </div>

            <div class="carrito-item__col-derecha">
                <button type="button" class="carrito-item__btn-eliminar" onclick="eliminarItemCarrito('${item.id}')" aria-label="Eliminar">&times;</button>
                <span class="carrito-item__precio">$ ${(item.precio * item.cantidad).toLocaleString('es-AR')}</span>
            </div>
        </div>
    `).join('');

    if (carritoSubtotalTexto) carritoSubtotalTexto.textContent = `$ ${subtotal.toLocaleString('es-AR')}`;
    if (carritoTotalTexto) carritoTotalTexto.textContent = `$ ${subtotal.toLocaleString('es-AR')}`;
    if (carritoCuotasTexto) carritoCuotasTexto.textContent = `o 3 cuotas sin interés de $ ${cuota3.toLocaleString('es-AR')}`;
}

function enviarPedidoAWhatsApp() {
    if (carrito.length === 0) return;

    const subtotal = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    
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

    const urlWhatsApp = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensaje)}`;
    window.open(urlWhatsApp, '_blank');
}

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

// ==========================================================================
// 7. CARDS FLOTANTES (MODALES) DE INFORMACIÓN Y AYUDA
// ==========================================================================
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
            Totalmente. Los paquetes no tienen logos, nombres del rubro ni alusión a sex shop. Llegan en cajas o bolsas neutras y precintadas.</p>
            <p><strong>¿Cómo coordino el pago y la entrega?</strong><br>
            Al presionar "Iniciar compra" en el carrito, se genera un mensaje detallado con tus artículos y te deriva directo a nuestro WhatsApp oficial para que te asesoremos personalmente.</p>
            <p><strong>¿Tienen atención confidencial?</strong><br>
            Sí, te atendemos de forma 100% personalizada y segura sin intermediarios.</p>
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
                📦 Empaque 100% discreto: nadie sabe lo que hay dentro de la caja.
            </div>
        `
    },
    "pagos": {
        badge: "MEDIOS DE PAGO",
        titulo: "Formas de Pago",
        contenido: `
            <p>Podés abonar como te resulte más cómodo:</p>
            <ul>
                <li><strong>Transferencia Bancaria:</strong> Descuento extra exclusivo sobre el total de tu pedido.</li>
                <li><strong>Mercado Pago:</strong> Dinero en cuenta, tarjetas de débito y crédito.</li>
                <li><strong>Cuotas sin interés:</strong> Disponibles según las promociones vigentes.</li>
            </ul>
            <p>Al confirmar tu compra por WhatsApp, te enviamos el link de pago o los datos de la cuenta de manera inmediata.</p>
        `
    },
    "como-comprar": {
        badge: "GUÍA DE COMPRA",
        titulo: "¿Cómo comprar en la tienda?",
        contenido: `
            <p>El proceso es simple, guiado y 100% seguro a través de WhatsApp:</p>
            <ol>
                <li><strong>Elegí tus productos:</strong> Navegá el catálogo y agregá los artículos que desees al carrito.</li>
                <li><strong>Revisá tu pedido:</strong> En el carrito lateral podés ajustar cantidades y verificar el total.</li>
                <li><strong>Iniciá la compra:</strong> Hacé clic en el botón <em>"Iniciar compra"</em>.</li>
                <li><strong>Confirmá por WhatsApp:</strong> Se abrirá la conversación con el detalle exacto de tu pedido armado para que coordinemos el pago y el envío discreto.</li>
            </ol>
        `
    },
    "devoluciones": {
        badge: "GARANTÍA Y CUIDADO",
        titulo: "Políticas de Devolución",
        contenido: `
            <p>Por normativas de salud, bioseguridad e higiene en productos de uso íntimo y lencería, solo se aceptan cambios o devoluciones por <strong>fallas de fabricación</strong> dentro de los plazos establecidos.</p>
            <p>Todos los productos electrónicos son revisados antes de su despacho. En caso de reclamo o ejercicio del botón de arrepentimiento legal, contactanos directamente por WhatsApp con tu número de orden.</p>
        `
    }
};

// Eventos de apertura y cierre de las Cards Flotantes
const modalInfo = document.getElementById('modal-info');
const modalInfoOverlay = document.getElementById('modal-info-overlay');
const modalInfoCerrar = document.getElementById('modal-info-cerrar');
const modalInfoBtnOk = document.getElementById('modal-info-btn-ok');
const modalInfoBadge = document.getElementById('modal-info-badge');
const modalInfoTitulo = document.getElementById('modal-info-titulo');
const modalInfoContenido = document.getElementById('modal-info-contenido');

function abrirModalInfo(clave) {
    const data = DATOS_MODALES_INFO[clave];
    if (!data || !modalInfo) return;

    modalInfoBadge.textContent = data.badge;
    modalInfoTitulo.textContent = data.titulo;
    modalInfoContenido.innerHTML = data.contenido;

    modalInfo.classList.add('modal-info--activo');
    modalInfo.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function cerrarModalInfo() {
    if (!modalInfo) return;
    modalInfo.classList.remove('modal-info--activo');
    modalInfo.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

// Conectar botones del footer
document.querySelectorAll('.pie-pagina__enlace-modal').forEach(boton => {
    boton.addEventListener('click', () => {
        const modalClave = boton.getAttribute('data-modal');
        abrirModalInfo(modalClave);
    });
});

if (modalInfoCerrar) modalInfoCerrar.addEventListener('click', cerrarModalInfo);
if (modalInfoOverlay) modalInfoOverlay.addEventListener('click', cerrarModalInfo);
if (modalInfoBtnOk) modalInfoBtnOk.addEventListener('click', cerrarModalInfo);

// Cerrar con la tecla ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalInfo && modalInfo.classList.contains('modal-info--activo')) {
        cerrarModalInfo();
    }
});