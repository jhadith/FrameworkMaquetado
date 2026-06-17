// Parte 1: Base de Datos de Productos y Estado Global

// Arreglo de objetos (base de datos local en memoria) que representa el catálogo de productos disponibles en la tienda.
// Cada objeto contiene atributos clave como identificadores (id), nombres (name), categorías, descripciones detalladas,
// precios decimales, calificaciones de usuarios, enlaces de imágenes reales y enlaces de compra externa en Amazon.
const PRODUCTOS = [
  {
    id: 1,
    name: "Apple MacBook Pro M3 Max",
    category: "Laptops",
    description: "La laptop definitiva para desarrolladores y creadores de contenido. Equipado con el chip M3 Max, 48 GB de memoria unificada y 1 TB de almacenamiento SSD ultra rápido.",
    price: 3499.00,
    originalPrice: 3999.00,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=80",
    amazonLink: "https://www.amazon.com/s?k=macbook+pro+m3+max"
  },
  {
    id: 2,
    name: "ASUS ROG Zephyrus G14",
    category: "Laptops",
    description: "Laptop gamer de alto rendimiento y ultraportátil. Cuenta con un procesador AMD Ryzen 9, tarjeta de video NVIDIA RTX 4060, y pantalla ROG Nebula HDR de 120Hz.",
    price: 1599.00,
    originalPrice: 1799.00,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&auto=format&fit=crop&q=80",
    amazonLink: "https://www.amazon.com/s?k=asus+rog+zephyrus+g14"
  },
  {
    id: 3,
    name: "Lenovo ThinkPad X1 Carbon Gen 11",
    category: "Laptops",
    description: "El estándar de oro para la productividad en movimiento. Chasis ultraligero de fibra de carbono, procesador Intel Core i7 de 13ª generación y teclado legendario.",
    price: 1899.00,
    originalPrice: 2199.00,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&auto=format&fit=crop&q=80",
    amazonLink: "https://www.amazon.com/s?k=thinkpad+x1+carbon"
  },
  {
    id: 4,
    name: "Monitor Samsung Odyssey G7 32\"",
    category: "Computadoras",
    description: "Monitor de juegos curvado con pantalla WQHD de 240Hz, tiempo de respuesta de 1ms, compatibilidad con G-Sync y curvatura inmersiva de 1000R.",
    price: 599.00,
    originalPrice: 699.00,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&auto=format&fit=crop&q=80",
    amazonLink: "https://www.amazon.com/s?k=samsung+odyssey+g7"
  },
  {
    id: 5,
    name: "Teclado Mecánico Keychron K2",
    category: "Computadoras",
    description: "Teclado mecánico inalámbrico con diseño compacto del 75% e iluminación RGB. Interruptores mecánicos Gateron G Pro Brown con hot-swap.",
    price: 89.00,
    originalPrice: 99.00,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=500&auto=format&fit=crop&q=80",
    amazonLink: "https://www.amazon.com/s?k=keychron+k2"
  },
  {
    id: 6,
    name: "Mouse Gamer Logitech G502 Hero",
    category: "Computadoras",
    description: "Mouse de alto rendimiento con sensor óptico HERO de 25,600 DPI, 11 botones completamente programables y pesas ajustables de precisión.",
    price: 45.00,
    originalPrice: 79.00,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&auto=format&fit=crop&q=80",
    amazonLink: "https://www.amazon.com/s?k=logitech+g502+hero"
  },
  {
    id: 7,
    name: "Auriculares Sony WH-1000XM5",
    category: "Gadgets",
    description: "Audífonos inalámbricos de diadema con cancelación activa de ruido líder del sector, hasta 30 horas de batería y soporte para audio de alta resolución LDAC.",
    price: 348.00,
    originalPrice: 399.00,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80",
    amazonLink: "https://www.amazon.com/s?k=sony+wh-1000xm5"
  },
  {
    id: 8,
    name: "Apple Watch Series 9 GPS",
    category: "Gadgets",
    description: "Smartwatch con pantalla Retina siempre activa, chip S9 SIP para gestos sin tocar la pantalla, sensor de oxígeno en sangre y monitoreo avanzado de salud.",
    price: 389.00,
    originalPrice: 429.00,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&auto=format&fit=crop&q=80",
    amazonLink: "https://www.amazon.com/s?k=apple+watch+series+9"
  },
  {
    id: 9,
    name: "Cámara Web Logitech C920x Pro",
    category: "Gadgets",
    description: "Cámara web para videollamadas y grabaciones en resolución Full HD 1080p a 30 fps con audio estéreo claro y corrección automática de luz integrada.",
    price: 69.00,
    originalPrice: 89.00,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1616763355548-1b606f439f86?w=500&auto=format&fit=crop&q=80",
    amazonLink: "https://www.amazon.com/s?k=logitech+c920"
  }
];

// Estado global que rastrea los datos interactivos en tiempo de ejecucion:
// 'carrito': Arreglo de productos elegidos, se carga desde localStorage parseando el texto plano JSON. Si no existe, se inicializa como arreglo vacio.
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
// 'categoriaActiva': Almacena el filtro de categoria seleccionado actualmente en el menu de navegacion.
let categoriaActiva = "Todos";
// 'terminoBusqueda': Almacena la cadena ingresada por el usuario en el campo de busqueda.
let terminoBusqueda = "";
// 'productoPendienteEliminar': Almacena temporalmente el ID del producto que el usuario desea remover, para confirmar en el modal de Bootstrap.
let productoPendienteEliminar = null;


// Parte 2: Inicializacion de Componentes al Cargar la Pagina

document.addEventListener("DOMContentLoaded", () => {
  // El navegador dispara DOMContentLoaded cuando el documento HTML esta completamente estructurado.
  // Es el momento seguro para iniciar las funciones de renderizado y asociar escuchadores de eventos al DOM.
  renderProductos();
  actualizarVistaCarrito();
  setupEventListeners();

  // Lucide Icons genera iconos vectoriales limpios y responsivos. Si la libreria lucide esta enlazada en el HTML,
  // lucide.createIcons() busca las etiquetas con atributos 'data-lucide' y dibuja el SVG correspondiente.
  if (window.lucide) {
    lucide.createIcons();
  }
});


// Parte 3: Escuchadores de Eventos del Sistema (Event Listeners)

function setupEventListeners() {
  // Manejador del cuadro de busqueda de texto interactivo.
  const buscador = document.getElementById("search-input");
  if (buscador) {
    // Escucha el evento 'input' en tiempo real (cada tecla pulsada por el usuario).
    buscador.addEventListener("input", (e) => {
      // Convierte el valor buscado a minusculas para hacer una busqueda insensible a mayusculas/minusculas (case-insensitive).
      terminoBusqueda = e.target.value.toLowerCase();
      // Vuelve a dibujar el catalogo filtrando los productos segun el termino ingresado.
      renderProductos();
    });
  }

  // Previene el envio por defecto si el usuario pulsa Enter en el formulario del buscador.
  // Evita la recarga no deseada de la pagina.
  const buscarForm = document.querySelector("form[role='search']");
  if (buscarForm) {
    buscarForm.addEventListener("submit", (e) => e.preventDefault());
  }

  // Maneja el filtrado de categorias interactivo.
  // document.querySelectorAll selecciona todos los elementos que coincidan con la regla CSS indicada y retorna un NodeList.
  const enlacesMenu = document.querySelectorAll("#category-filter .nav-link");
  enlacesMenu.forEach(enlace => {
    enlace.addEventListener("click", (e) => {
      // e.currentTarget referencia al enlace especifico sobre el cual se hizo clic.
      // dataset.category obtiene el valor configurado en el atributo 'data-category' del HTML.
      const texto = e.currentTarget.dataset.category;

      // Control de seleccion de categoria activa segun el enlace clicleado.
      if (texto === "Todos") {
        categoriaActiva = "Todos";
      } else if (texto === "Laptops") {
        categoriaActiva = "Laptops";
      } else if (texto === "Computadoras") {
        categoriaActiva = "Computadoras";
      } else if (texto === "Gadgets") {
        categoriaActiva = "Gadgets";
      } else {
        return; // Detiene la funcion si es un enlace diferente a los filtros.
      }

      // Evita la navegacion predeterminada del enlace de hipertexto.
      e.preventDefault();

      // Modifica las clases visuales de Bootstrap en el menu de navegacion.
      // Quita la clase activa (link-secondary) y restablece el estilo de enlace de enfasis de cuerpo en todos los elementos.
      enlacesMenu.forEach(el => {
        el.classList.remove("link-secondary");
        el.classList.add("link-body-emphasis");
      });
      // Aplica el estilo activo de Bootstrap al elemento seleccionado especifico.
      e.currentTarget.classList.remove("link-body-emphasis");
      e.currentTarget.classList.add("link-secondary");

      // Redibuja las tarjetas de productos aplicando el nuevo filtro de categoria.
      renderProductos();

      // Cierre automatico del menu colapsable de Bootstrap en dispositivos moviles (resoluciones menores a 992px)
      const menuMovil = document.getElementById("marketplace-menu");
      const menuAbierto = menuMovil && menuMovil.classList.contains("show");
      if (menuAbierto && window.innerWidth < 992) {
        // Obtiene o crea la instancia de colapso de Bootstrap y fuerza su ocultacion.
        const bsCollapse = bootstrap.Collapse.getOrCreateInstance(menuMovil, { toggle: false });
        bsCollapse.hide();
      }
    });
  });

  // Manejador del boton de confirmacion de eliminacion del item de la lista en el modal.
  const confirmarEliminarBtn = document.getElementById("confirm-remove-item");
  if (confirmarEliminarBtn) {
    confirmarEliminarBtn.addEventListener("click", () => {
      if (productoPendienteEliminar !== null) {
        eliminarDelCarrito(productoPendienteEliminar);
        productoPendienteEliminar = null; // Limpia el estado temporal
      }

      // Oculta el modal de confirmacion usando la API JavaScript de Bootstrap 5.
      const modalEl = document.getElementById("remove-item-modal");
      const bsModal = bootstrap.Modal.getInstance(modalEl);
      if (bsModal) {
        bsModal.hide();
      }
    });
  }
}


// Parte 4: Renderizado Dinamico de las Tarjetas de Producto

function renderProductos() {
  const grid = document.getElementById("productos-grid");
  if (!grid) return;

  // Limpia el grid antes de inyectar las tarjetas filtradas.
  grid.innerHTML = "";

  // filter() genera un subarreglo con los productos que cumplen las dos condiciones dadas.
  const productosFiltrados = PRODUCTOS.filter(producto => {
    const coincideCategoria = categoriaActiva === "Todos" || producto.category === categoriaActiva;
    const coincideBusqueda = producto.name.toLowerCase().includes(terminoBusqueda) ||
      producto.description.toLowerCase().includes(terminoBusqueda);
    return coincideCategoria && coincideBusqueda;
  });

  // Si no hay coincidencias con la busqueda o categoria, muestra una interfaz amigable.
  if (productosFiltrados.length === 0) {
    grid.innerHTML = `
      <div class="col-12 text-center py-5">
        <div class="text-secondary h5">No se encontraron productos</div>
        <p class="text-muted">Prueba con otro término de búsqueda o categoría.</p>
      </div>
    `;
    return;
  }

  // Genera cada tarjeta del catalogo utilizando clases nativas y semanticas de Bootstrap 5.
  productosFiltrados.forEach(producto => {
    // Calcula el porcentaje de descuento si existe un precio original superior al precio de venta.
    const descuento = producto.originalPrice ? Math.round(((producto.originalPrice - producto.price) / producto.originalPrice) * 100) : 0;

    // Plantilla HTML modularizada para inyectar cada tarjeta de producto.
    const cardHTML = `
      <div class="col">
        <div class="card h-100 shadow-sm border border-light-subtle bg-body">
          
          <!-- Imagen y etiquetas del producto -->
          <div class="position-relative overflow-hidden bg-body-tertiary d-flex align-items-center justify-content-center border-bottom" style="height: 200px;">
            <img 
              src="${producto.image}" 
              alt="${producto.name}" 
              class="w-100 h-100 object-fit-cover cursor-pointer"
              style="transition: transform 0.3s;"
              onclick="abrirModalDetalles(${producto.id})"
            >
            ${descuento > 0 ? `
              <span class="badge bg-danger position-absolute top-0 start-0 m-2 shadow-sm">
                ${descuento}% OFF
              </span>
            ` : ''}
            <span class="badge bg-dark position-absolute top-0 end-0 m-2">
              ${producto.category}
            </span>
          </div>

          <!-- Detalles e informacion de la tarjeta -->
          <div class="card-body d-flex flex-column">
            <h5 
              class="card-title text-body fw-bold cursor-pointer mb-2"
              onclick="abrirModalDetalles(${producto.id})"
              style="font-size: 1.05rem; line-height: 1.3;"
            >
              ${producto.name}
            </h5>
            
            <p class="card-text text-secondary mt-1 flex-grow-1" style="font-size: 0.85rem; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; line-height: 1.4;">
              ${producto.description}
            </p>

            <!-- Sistema de calificacion mediante estrellas vectoriales (Amazon UX style) -->
            <div class="d-flex align-items-center mt-2 mb-3 gap-1">
              <span class="text-warning d-flex">
                ${obtenerEstrellasHTML(producto.rating)}
              </span>
              <span class="text-muted" style="font-size: 0.8rem;">(${producto.rating})</span>
            </div>

            <!-- Area de precios e interaccion de compra -->
            <div class="product-card-actions d-flex align-items-center justify-content-between mt-auto pt-2 border-top border-light-subtle">
              <div class="product-card-price d-flex flex-column">
                <span class="text-body fw-bold product-price">
                  $${producto.price.toFixed(2)}
                </span>
                ${producto.originalPrice ? `
                  <small class="text-muted text-decoration-line-through" style="font-size: 0.75rem;">
                    $${producto.originalPrice.toFixed(2)}
                  </small>
                ` : ''}
              </div>

              <div class="product-card-buttons d-flex gap-1">
                <a 
                  href="${producto.amazonLink}" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  class="btn btn-sm btn-outline-secondary d-flex align-items-center justify-content-center product-external-btn" 
                  title="Ver en Amazon"
                >
                  <i data-lucide="external-link" style="width: 14px; height: 14px;"></i>
                </a>
                <button 
                  onclick="agregarAlCarrito(${producto.id})" 
                  class="btn btn-sm btn-primary d-flex align-items-center justify-content-center gap-1 px-3 product-add-btn"
                >
                  <i data-lucide="shopping-cart" style="width: 14px; height: 14px;"></i>
                  <span>Añadir</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    `;

    // insertAdjacentHTML inserta los nodos parseados al final del grid sin destruir ni re-analizar los elementos previos.
    // Esto es mas optimo en rendimiento que utilizar el operador += en innerHTML.
    grid.insertAdjacentHTML('beforeend', cardHTML);
  });

  // Re-inicializa los iconos de Lucide cargados dinamicamente con las plantillas insertadas.
  if (window.lucide) {
    lucide.createIcons();
  }
}

function obtenerEstrellasHTML(rating) {
  // Genera un bloque HTML que contiene 5 iconos vectoriales de estrellas completas, medias o vacias segun el rating numerico.
  let html = "";
  const enteras = Math.floor(rating);
  const tieneMedio = rating % 1 >= 0.5;

  for (let i = 1; i <= 5; i++) {
    if (i <= enteras) {
      html += `<i data-lucide="star" style="width: 14px; height: 14px; fill: currentColor;"></i>`;
    } else if (i === enteras + 1 && tieneMedio) {
      html += `<i data-lucide="star-half" style="width: 14px; height: 14px; fill: currentColor;"></i>`;
    } else {
      html += `<i data-lucide="star" style="width: 14px; height: 14px;" class="text-secondary opacity-50"></i>`;
    }
  }
  return html;
}


// Parte 5: Logica de Administracion del Carrito y Almacenamiento Local (LocalStorage)

function toggleCart(abrir) {
  // Esta funcion despliega u oculta el contenedor Offcanvas (panel lateral) de Bootstrap.
  const sidebarElement = document.getElementById("cart-sidebar");
  if (!sidebarElement) return;

  // Busca una instancia activa creada anteriormente para el elemento dado.
  let bsOffcanvas = bootstrap.Offcanvas.getInstance(sidebarElement);
  if (!bsOffcanvas) {
    // Si no existia una instancia, la inicializa.
    bsOffcanvas = new bootstrap.Offcanvas(sidebarElement);
  }

  // Llama a los metodos de la API de Bootstrap para controlar la visibilidad del Offcanvas lateral.
  if (abrir) {
    bsOffcanvas.show();
  } else {
    bsOffcanvas.hide();
  }
}

function agregarAlCarrito(productId) {
  // Busca el objeto del producto dentro del arreglo principal por su identificador unico.
  const producto = PRODUCTOS.find(p => p.id === productId);
  if (!producto) return;

  // Comprueba si el item ya fue agregado al carrito previamente.
  const itemExistente = carrito.find(item => item.id === productId);

  if (itemExistente) {
    // Si ya existe en el carrito, se incrementa la cantidad en una unidad.
    itemExistente.quantity += 1;
  } else {
    // Si es un producto nuevo en la sesion actual, se agrega al arreglo estructurando los campos necesarios.
    carrito.push({
      id: producto.id,
      name: producto.name,
      price: producto.price,
      image: producto.image,
      category: producto.category,
      quantity: 1
    });
  }

  // Serializa los cambios y los guarda en persistencia del navegador.
  guardarYActualizarCarrito();

  // Muestra una breve microanimacion visual en el boton del carrito como respuesta interactiva.
  mostrarConfirmacionAgregado(producto.name);
}

function cambiarCantidad(productId, delta) {
  // Permite incrementar o disminuir la cantidad de un item desde el panel lateral del carrito.
  const item = carrito.find(item => item.id === productId);
  if (!item) return;

  // Si el item tiene cantidad 1 y se presiona '-' (delta < 0), se solicita confirmacion mediante un modal.
  if (item.quantity === 1 && delta < 0) {
    solicitarConfirmacionEliminar(item);
    return;
  }

  item.quantity += delta;

  // Asegura que no existan cantidades invalidas menores a 1 en el flujo normal.
  if (item.quantity <= 0) {
    item.quantity = 1;
  } else {
    guardarYActualizarCarrito();
  }
}

function mostrarConfirmacionAgregado(nombreProducto) {
  // Ofrece una microinteraccion aplicando clases temporales de animacion CSS al boton flotante del carrito.
  const cartBtn = document.getElementById("cart-btn");
  if (!cartBtn) return;

  cartBtn.setAttribute("title", `${nombreProducto} agregado al carrito`);
  cartBtn.classList.add("cart-added");

  // Remueve las clases y atributos de animacion despues de 900 milisegundos.
  setTimeout(() => {
    cartBtn.classList.remove("cart-added");
    cartBtn.removeAttribute("title");
  }, 900);
}

function solicitarConfirmacionEliminar(item) {
  // Almacena el ID del producto que se eliminara una vez confirmada la accion.
  productoPendienteEliminar = item.id;

  // Inyecta el nombre del producto en el cuerpo del modal de advertencia.
  const nombreEl = document.getElementById("remove-item-name");
  if (nombreEl) {
    nombreEl.innerText = item.name;
  }

  // Despliega el modal de confirmacion con la API de Bootstrap.
  const modalEl = document.getElementById("remove-item-modal");
  if (!modalEl) return;

  const bsModal = bootstrap.Modal.getOrCreateInstance(modalEl);
  bsModal.show();
}

function eliminarDelCarrito(productId) {
  // filter() genera un nuevo arreglo excluyendo el producto cuyo id coincide con el que se desea remover.
  carrito = carrito.filter(item => item.id !== productId);
  guardarYActualizarCarrito();
}

function guardarYActualizarCarrito() {
  // JSON.stringify() convierte el arreglo de objetos del carrito en una cadena de texto (string).
  // localStorage.setItem guarda de forma persistente esa cadena en el almacenamiento local del navegador del usuario.
  localStorage.setItem('carrito', JSON.stringify(carrito));
  // Llama a la actualizacion de la interfaz grafica.
  actualizarVistaCarrito();
}


// Parte 6: Actualizacion de la Interfaz Grafica del Carrito lateral

function actualizarVistaCarrito() {
  const itemsContainer = document.getElementById("cart-items-container");
  const cartCount = document.getElementById("cart-count");
  const cartSubtotal = document.getElementById("cart-subtotal");
  const checkoutBtn = document.getElementById("cart-checkout-btn");

  if (!itemsContainer) return;

  // Vacia la lista del sidebar del carrito.
  itemsContainer.innerHTML = "";

  // reduce() acumula los valores sumando el campo quantity de cada objeto en el carrito.
  const totalCantidad = carrito.reduce((acc, item) => acc + item.quantity, 0);

  // Actualiza la burbuja numerica (badge de cantidad) flotante del boton del navbar.
  if (cartCount) {
    if (totalCantidad > 0) {
      cartCount.innerText = totalCantidad;
      cartCount.style.display = 'flex'; // Hace visible el indicador
    } else {
      cartCount.style.display = 'none'; // Oculta el indicador si esta vacio
    }
  }

  // Renderiza una vista vacia si no hay productos agregados en el carrito.
  if (carrito.length === 0) {
    itemsContainer.innerHTML = `
      <div class="d-flex flex-column align-items-center justify-content-center py-5 text-center">
        <i data-lucide="shopping-bag" style="width: 48px; height: 48px;" class="text-secondary mb-3"></i>
        <p class="text-secondary fw-semibold mb-1">Tu carrito está vacío</p>
        <button onclick="toggleCart(false)" class="btn btn-link btn-sm text-decoration-none">
          Explorar productos
        </button>
      </div>
    `;
    if (cartSubtotal) cartSubtotal.innerText = "$0.00";
    if (checkoutBtn) {
      // Bloquea el boton de pago para evitar navegacion si el carrito no tiene items.
      checkoutBtn.classList.add("disabled");
      checkoutBtn.setAttribute("aria-disabled", "true");
    }

    if (window.lucide) lucide.createIcons();
    return;
  }

  // Activa el boton de checkout en la interfaz de usuario.
  if (checkoutBtn) {
    checkoutBtn.classList.remove("disabled");
    checkoutBtn.removeAttribute("aria-disabled");
  }

  // Inyecta dinamicamente los productos en el panel lateral del carrito.
  let subtotal = 0;

  carrito.forEach(item => {
    subtotal += item.price * item.quantity;

    const itemHTML = `
      <div class="d-flex align-items-center gap-2 p-2 bg-body-secondary rounded-3 mb-2 border border-secondary-subtle">
        <!-- Miniatura del Producto -->
        <img src="${item.image}" alt="${item.name}" class="rounded object-fit-cover bg-body" style="width: 45px; height: 45px; flex-shrink: 0;">
        
        <!-- Nombre truncado y precio unitario -->
        <div class="flex-grow-1" style="min-width: 0;">
          <h6 class="text-body fw-bold mb-0 text-truncate" style="font-size: 0.85rem;" title="${item.name}">${item.name}</h6>
          <small class="text-secondary">$${item.price.toFixed(2)}</small>
        </div>

        <!-- Controles interactivos de cantidad y boton de remocion rápida -->
        <div class="d-flex flex-column align-items-end gap-1.5" style="flex-shrink: 0;">
          <div class="input-group input-group-sm" style="width: 85px;">
            <button 
              onclick="cambiarCantidad(${item.id}, -1)" 
              class="btn btn-outline-secondary px-2 py-0"
              style="font-size: 0.7rem;"
            >
              -
            </button>
            <span class="input-group-text bg-body px-1 py-0 text-body fw-semibold justify-content-center" style="font-size: 0.75rem; flex-grow: 1; min-width: 25px;">
              ${item.quantity}
            </span>
            <button 
              onclick="cambiarCantidad(${item.id}, 1)" 
              class="btn btn-outline-secondary px-2 py-0"
              style="font-size: 0.7rem;"
            >
              +
            </button>
          </div>

          <!-- Boton simple para quitar el producto -->
          <button 
            onclick="eliminarDelCarrito(${item.id})" 
            class="btn btn-link text-danger p-0 border-0 text-decoration-none d-flex align-items-center gap-0.5"
            style="font-size: 0.7rem;"
          >
            <i data-lucide="trash-2" style="width: 10px; height: 10px;"></i>
            <span>Quitar</span>
          </button>
        </div>
      </div>
    `;
    itemsContainer.insertAdjacentHTML('beforeend', itemHTML);
  });

  // Muestra el total acumulado en pantalla.
  if (cartSubtotal) {
    cartSubtotal.innerText = `$${subtotal.toFixed(2)}`;
  }

  if (window.lucide) {
    lucide.createIcons();
  }
}


// Parte 7: Modal de Detalles Extendidos del Producto

function abrirModalDetalles(productId) {
  // Esta funcion recupera un producto y lo dibuja detalladamente en un modal emergente centralizado.
  const producto = PRODUCTOS.find(p => p.id === productId);
  if (!producto) return;

  // Modifica los atributos de los elementos estaticos que ya existen dentro de la estructura modal en index.html.
  document.getElementById("modal-product-img").src = producto.image;
  document.getElementById("modal-product-img").alt = producto.name;
  document.getElementById("modal-product-cat").innerText = producto.category;
  document.getElementById("modal-product-name").innerText = producto.name;
  document.getElementById("modal-product-desc").innerText = producto.description;
  document.getElementById("modal-product-price").innerText = `$${producto.price.toFixed(2)}`;

  const originalPriceEl = document.getElementById("modal-product-orig-price");
  if (producto.originalPrice) {
    originalPriceEl.innerText = `$${producto.originalPrice.toFixed(2)}`;
    // style.display = 'inline-block' vuelve a hacer visible la etiqueta si esta oculta.
    originalPriceEl.style.display = 'inline-block';
  } else {
    // Si el producto no tiene un descuento (precio original), oculta el elemento visual para no confundir al usuario.
    originalPriceEl.style.display = 'none';
  }

  // Inserta la representacion en estrellas dinamica de la calificacion.
  document.getElementById("modal-product-stars").innerHTML = obtenerEstrellasHTML(producto.rating);
  document.getElementById("modal-product-rating").innerText = `(${producto.rating})`;
  document.getElementById("modal-product-amazon").href = producto.amazonLink;

  // Configura el evento de clic en el boton de agregar al carrito dentro del modal.
  const addBtn = document.getElementById("modal-add-btn");
  addBtn.onclick = () => {
    agregarAlCarrito(producto.id);
    cerrarModalDetalles();
  };

  // Muestra el modal mediante el modulo nativo bootstrap.Modal.
  const modalEl = document.getElementById("product-details-modal");
  let bsModal = bootstrap.Modal.getInstance(modalEl);
  if (!bsModal) {
    bsModal = new bootstrap.Modal(modalEl);
  }
  bsModal.show();

  if (window.lucide) {
    lucide.createIcons();
  }
}

function cerrarModalDetalles() {
  // Fuerza el cierre del modal centrado si es necesario.
  const modalEl = document.getElementById("product-details-modal");
  let bsModal = bootstrap.Modal.getInstance(modalEl);
  if (bsModal) {
    bsModal.hide();
  }
}


// Parte 8: Enlace de Funciones en el Ambito Global (Window Scope)

// Dado que este archivo JavaScript puede modularizarse o compilarse en ambitos aislados, los eventos de HTML inline
// (como onclick="agregarAlCarrito(1)") necesitan buscar las funciones en el objeto 'window' global de la pagina.
// Asignamos explicitamente cada funcion interactiva a propiedades del objeto window para garantizar su acceso.
window.agregarAlCarrito = agregarAlCarrito;
window.cambiarCantidad = cambiarCantidad;
window.eliminarDelCarrito = eliminarDelCarrito;
window.toggleCart = toggleCart;
window.abrirModalDetalles = abrirModalDetalles;
window.cerrarModalDetalles = cerrarModalDetalles;
