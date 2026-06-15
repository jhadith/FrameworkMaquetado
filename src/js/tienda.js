// ==============================================================
// SECCIÓN DEL ESTUDIANTE: LÓGICA DE TARJETAS CON PRODUCTOS (PÁGINA 1)
// ==============================================================

// Base de datos de productos reales de tecnología (con datos realistas e imágenes de Unsplash)
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

// Estado global de la aplicación
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
let categoriaActiva = "Todos";
let terminoBusqueda = "";

// Inicialización de la tienda
document.addEventListener("DOMContentLoaded", () => {
  renderProductos();
  actualizarVistaCarrito();
  setupEventListeners();
  
  // Refresca iconos de Lucide al cargar la vista
  if (window.lucide) {
    lucide.createIcons();
  }
});

// Configurar los manejadores de eventos
function setupEventListeners() {
  // Manejador del buscador
  const buscador = document.getElementById("search-input");
  if (buscador) {
    buscador.addEventListener("input", (e) => {
      terminoBusqueda = e.target.value.toLowerCase();
      renderProductos();
    });
  }

  // Prevenir envío por defecto del formulario del buscador
  const buscarForm = document.querySelector("form[role='search']");
  if (buscarForm) {
    buscarForm.addEventListener("submit", (e) => e.preventDefault());
  }

  // Manejar el cambio de categorías (desde el menú)
  const enlacesMenu = document.querySelectorAll(".nav-link");
  enlacesMenu.forEach(enlace => {
    enlace.addEventListener("click", (e) => {
      const texto = e.target.innerText.trim();
      
      // Mapeo simple de categorías según el texto del menú
      if (texto === "Todos") {
        categoriaActiva = "Todos";
      } else if (texto === "Laptops") {
        categoriaActiva = "Laptops";
      } else if (texto === "Computadoras") {
        categoriaActiva = "Computadoras";
      } else if (texto === "Gadgets") {
        categoriaActiva = "Gadgets";
      } else {
        return; // No filtrar en otros enlaces
      }

      e.preventDefault();
      
      // Actualizar clase activa en Bootstrap nav links
      enlacesMenu.forEach(el => {
        el.classList.remove("link-secondary");
        el.classList.add("link-body-emphasis");
      });
      e.target.classList.remove("link-body-emphasis");
      e.target.classList.add("link-secondary");

      renderProductos();
    });
  });
}

// Renderizar tarjetas de productos utilizando clases nativas de Bootstrap 5
function renderProductos() {
  const grid = document.getElementById("productos-grid");
  if (!grid) return;

  grid.innerHTML = "";

  const productosFiltrados = PRODUCTOS.filter(producto => {
    const coincideCategoria = categoriaActiva === "Todos" || producto.category === categoriaActiva;
    const coincideBusqueda = producto.name.toLowerCase().includes(terminoBusqueda) || 
                              producto.description.toLowerCase().includes(terminoBusqueda);
    return coincideCategoria && coincideBusqueda;
  });

  if (productosFiltrados.length === 0) {
    grid.innerHTML = `
      <div class="col-12 text-center py-5">
        <div class="text-secondary h5">No se encontraron productos</div>
        <p class="text-muted">Prueba con otro término de búsqueda o categoría.</p>
      </div>
    `;
    return;
  }

  productosFiltrados.forEach(producto => {
    const descuento = producto.originalPrice ? Math.round(((producto.originalPrice - producto.price) / producto.originalPrice) * 100) : 0;
    
    const cardHTML = `
      <div class="col">
        <div class="card h-100 shadow-sm border border-light-subtle bg-body">
          
          <!-- Imagen y Badge -->
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

          <!-- Contenido de la tarjeta con clases de alto contraste -->
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

            <!-- Estrellas (Amazon) -->
            <div class="d-flex align-items-center mt-2 mb-3 gap-1">
              <span class="text-warning d-flex">
                ${obtenerEstrellasHTML(producto.rating)}
              </span>
              <span class="text-muted" style="font-size: 0.8rem;">(${producto.rating})</span>
            </div>

            <!-- Precios y Acciones -->
            <div class="d-flex align-items-center justify-content-between mt-auto pt-2 border-top border-light-subtle">
              <div class="d-flex flex-column">
                <span class="text-body fw-bold" style="font-size: 1.15rem;">
                  $${producto.price.toFixed(2)}
                </span>
                ${producto.originalPrice ? `
                  <small class="text-muted text-decoration-line-through" style="font-size: 0.75rem;">
                    $${producto.originalPrice.toFixed(2)}
                  </small>
                ` : ''}
              </div>

              <div class="d-flex gap-1.5">
                <a 
                  href="${producto.amazonLink}" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  class="btn btn-sm btn-outline-secondary d-flex align-items-center justify-content-center" 
                  style="width: 32px; height: 32px;"
                  title="Ver en Amazon"
                >
                  <i data-lucide="external-link" style="width: 14px; height: 14px;"></i>
                </a>
                <button 
                  onclick="agregarAlCarrito(${producto.id})" 
                  class="btn btn-sm btn-primary d-flex align-items-center gap-1 px-3"
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
    grid.insertAdjacentHTML('beforeend', cardHTML);
  });

  // Re-inicializa iconos lucide que acabamos de inyectar
  if (window.lucide) {
    lucide.createIcons();
  }
}

// Helper para dibujar estrellas de Amazon
function obtenerEstrellasHTML(rating) {
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

// Control de apertura y cierre del Carrito lateral (Bootstrap Offcanvas API)
function toggleCart(abrir) {
  const sidebarElement = document.getElementById("cart-sidebar");
  if (!sidebarElement) return;

  let bsOffcanvas = bootstrap.Offcanvas.getInstance(sidebarElement);
  if (!bsOffcanvas) {
    bsOffcanvas = new bootstrap.Offcanvas(sidebarElement);
  }

  if (abrir) {
    bsOffcanvas.show();
  } else {
    bsOffcanvas.hide();
  }
}

// Agregar un producto al carrito
function agregarAlCarrito(productId) {
  const producto = PRODUCTOS.find(p => p.id === productId);
  if (!producto) return;

  const itemExistente = carrito.find(item => item.id === productId);

  if (itemExistente) {
    itemExistente.quantity += 1;
  } else {
    carrito.push({
      id: producto.id,
      name: producto.name,
      price: producto.price,
      image: producto.image,
      category: producto.category,
      quantity: 1
    });
  }

  guardarYActualizarCarrito();
  
  // Abrir carrito lateral para dar retroalimentación visual al usuario
  toggleCart(true);
}

// Cambiar cantidad de un producto (+ o -)
function cambiarCantidad(productId, delta) {
  const item = carrito.find(item => item.id === productId);
  if (!item) return;

  item.quantity += delta;

  if (item.quantity <= 0) {
    eliminarDelCarrito(productId);
  } else {
    guardarYActualizarCarrito();
  }
}

// Eliminar un producto del carrito
function eliminarDelCarrito(productId) {
  carrito = carrito.filter(item => item.id !== productId);
  guardarYActualizarCarrito();
}

// Guardar en LocalStorage y actualizar la UI
function guardarYActualizarCarrito() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarVistaCarrito();
}

// Actualizar todos los elementos de la interfaz del carrito
function actualizarVistaCarrito() {
  const itemsContainer = document.getElementById("cart-items-container");
  const cartCount = document.getElementById("cart-count");
  const cartSubtotal = document.getElementById("cart-subtotal");
  const checkoutBtn = document.getElementById("cart-checkout-btn");

  if (!itemsContainer) return;

  itemsContainer.innerHTML = "";

  // Calcular cantidad total de productos
  const totalCantidad = carrito.reduce((acc, item) => acc + item.quantity, 0);
  
  // Actualizar el Badge del botón del carrito en el Navbar
  if (cartCount) {
    if (totalCantidad > 0) {
      cartCount.innerText = totalCantidad;
      cartCount.style.display = 'flex';
    } else {
      cartCount.style.display = 'none';
    }
  }

  // Si el carrito está vacío
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
      checkoutBtn.classList.add("disabled");
      checkoutBtn.setAttribute("aria-disabled", "true");
    }
    
    if (window.lucide) lucide.createIcons();
    return;
  }

  if (checkoutBtn) {
    checkoutBtn.classList.remove("disabled");
    checkoutBtn.removeAttribute("aria-disabled");
  }

  // Rellenar items del carrito
  let subtotal = 0;
  
  carrito.forEach(item => {
    subtotal += item.price * item.quantity;
    
    const itemHTML = `
      <div class="d-flex align-items-center gap-2 p-2 bg-body-secondary rounded-3 mb-2 border border-secondary-subtle">
        <!-- Imagen -->
        <img src="${item.image}" alt="${item.name}" class="rounded object-fit-cover bg-body" style="width: 45px; height: 45px; flex-shrink: 0;">
        
        <!-- Nombre y Precio (Evita desbordamiento con style min-width y text-truncate) -->
        <div class="flex-grow-1" style="min-width: 0;">
          <h6 class="text-body fw-bold mb-0 text-truncate" style="font-size: 0.85rem;" title="${item.name}">${item.name}</h6>
          <small class="text-secondary">$${item.price.toFixed(2)}</small>
        </div>

        <!-- Controles y Quitar (Mantiene su ancho fijo con flex-shrink: 0) -->
        <div class="d-flex flex-column align-items-end gap-1.5" style="flex-shrink: 0;">
          <!-- Control de cantidades -->
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

          <!-- Botón Eliminar -->
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

  if (cartSubtotal) {
    cartSubtotal.innerText = `$${subtotal.toFixed(2)}`;
  }

  if (window.lucide) {
    lucide.createIcons();
  }
}

// Abrir modal con detalles expandidos de un producto (Bootstrap Modal API)
function abrirModalDetalles(productId) {
  const producto = PRODUCTOS.find(p => p.id === productId);
  if (!producto) return;

  // Cargar datos en los elementos del modal estático de index.html
  document.getElementById("modal-product-img").src = producto.image;
  document.getElementById("modal-product-img").alt = producto.name;
  document.getElementById("modal-product-cat").innerText = producto.category;
  document.getElementById("modal-product-name").innerText = producto.name;
  document.getElementById("modal-product-desc").innerText = producto.description;
  document.getElementById("modal-product-price").innerText = `$${producto.price.toFixed(2)}`;
  
  const originalPriceEl = document.getElementById("modal-product-orig-price");
  if (producto.originalPrice) {
    originalPriceEl.innerText = `$${producto.originalPrice.toFixed(2)}`;
    originalPriceEl.style.display = 'inline-block';
  } else {
    originalPriceEl.style.display = 'none';
  }

  document.getElementById("modal-product-stars").innerHTML = obtenerEstrellasHTML(producto.rating);
  document.getElementById("modal-product-rating").innerText = `(${producto.rating})`;
  document.getElementById("modal-product-amazon").href = producto.amazonLink;
  
  const addBtn = document.getElementById("modal-add-btn");
  addBtn.onclick = () => {
    agregarAlCarrito(producto.id);
    cerrarModalDetalles();
  };

  // Mostrar modal con la API de Bootstrap
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

// Cerrar modal
function cerrarModalDetalles() {
  const modalEl = document.getElementById("product-details-modal");
  let bsModal = bootstrap.Modal.getInstance(modalEl);
  if (bsModal) {
    bsModal.hide();
  }
}

// Hacer globales las funciones que se llaman desde el HTML inline
window.agregarAlCarrito = agregarAlCarrito;
window.cambiarCantidad = cambiarCantidad;
window.eliminarDelCarrito = eliminarDelCarrito;
window.toggleCart = toggleCart;
window.abrirModalDetalles = abrirModalDetalles;
window.cerrarModalDetalles = cerrarModalDetalles;

// ==============================================================
// FIN DE LA SECCIÓN DEL ESTUDIANTE
// ==============================================================
