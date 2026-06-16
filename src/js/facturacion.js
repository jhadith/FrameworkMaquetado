document.addEventListener("DOMContentLoaded", () => {
  renderCarritoFactura();
});

function renderCarritoFactura() {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const listaCarrito = document.getElementById("lista-carrito-factura");
  const badgeCantidad = document.getElementById("badge-cantidad-factura");

  if (!listaCarrito) return;

  listaCarrito.innerHTML = "";
  let total = 0;
  let cantidadItems = 0;

  carrito.forEach(item => {
    total += item.price * item.quantity;
    cantidadItems += item.quantity;

    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center lh-sm px-3 py-2";
    li.innerHTML = `
      <div class="d-flex align-items-center gap-3" style="min-width: 0;">
        <img src="${item.image}" alt="${item.name}" class="rounded object-fit-cover border border-secondary-subtle" style="width: 45px; height: 45px; flex-shrink: 0;">
        <div style="min-width: 0;">
          <h6 class="my-0 text-truncate" style="font-size: 0.85rem;" title="${item.name}">${item.name}</h6>
          <small class="text-muted">Cant: ${item.quantity}</small>
        </div>
      </div>
      <span class="text-muted fw-medium" style="white-space: nowrap; margin-left: 10px;">$${(item.price * item.quantity).toFixed(2)}</span>
    `;
    listaCarrito.appendChild(li);
  });

  if (carrito.length === 0) {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-center text-muted";
    li.innerText = "El carrito está vacío";
    listaCarrito.appendChild(li);
  }

  // Fila del total
  const liTotal = document.createElement("li");
  liTotal.className = "list-group-item d-flex justify-content-between";
  liTotal.innerHTML = `
    <span>Total (USD)</span>
    <strong>$${total.toFixed(2)}</strong>
  `;
  listaCarrito.appendChild(liTotal);

  if (badgeCantidad) badgeCantidad.innerText = cantidadItems;
}

const formulario = document.querySelector("form");

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();

  let persona = {
    nombres: document.getElementById("nombres").value,
    apellidos: document.getElementById("apellidos").value,
    correo: document.getElementById("email").value,
    telefono: document.getElementById("telefono").value,
    direccion: document.getElementById("direccion").value,
    pais: document.getElementById("pais").value,
    ciudad: document.getElementById("ciudad").value,
    codigoP: document.getElementById("codigo_postal").value,
  };

  let datosPago = {
    nombreTarjeta: document.getElementById("nombre_tarjeta").value,
    numeroTarjeta: document.getElementById("numero_tarjeta").value,
    fechaVencimiento: document.getElementById("vencimiento").value,
    codigoCVV: document.getElementById("cvv").value,
  };

  if (comprobarNumeroTarjeta(datosPago)) {
    generarFactura(persona, datosPago);
  } else {
    alert("El numero de tarjeta no es válido");
  }
});

function generarFactura(persona, datosPago) {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const modalBody = document.getElementById('factura-modal-body');

  if (carrito.length === 0) {
    alert("Tu carrito está vacío. No hay nada que facturar.");
    return;
  }

  let total = 0;
  let itemsTableRows = '';

  carrito.forEach(item => {
    total += item.price * item.quantity;
    itemsTableRows += `
      <tr>
        <td>
          <div class="d-flex align-items-center gap-2">
            <img src="${item.image}" alt="${item.name}" class="rounded object-fit-cover" style="width: 30px; height: 30px;">
            <span style="font-size: 0.9rem;">${item.name}</span>
          </div>
        </td>
        <td class="text-center align-middle">${item.quantity}</td>
        <td class="text-end align-middle">$${item.price.toFixed(2)}</td>
        <td class="text-end align-middle">$${(item.price * item.quantity).toFixed(2)}</td>
      </tr>
    `;
  });

  const numTarjetaStr = String(datosPago.numeroTarjeta).replace(/\D/g, "");
  const tarjetaMask = "**** **** **** " + numTarjetaStr.slice(-4);
  const fechaActual = new Date().toLocaleDateString();

  const facturaHTML = `
    <div class="px-2">
      <p class="text-muted mb-4">A continuación, te presentamos el recibo de tu compra. Hemos enviado una copia a tu correo electrónico.</p>
      
      <div class="row mb-4 g-3">
        <div class="col-sm-6">
          <div class="card h-100 bg-body-tertiary border-light-subtle shadow-sm">
            <div class="card-body">
              <h6 class="card-title text-primary mb-3"><i data-lucide="map-pin" class="me-2" style="width: 16px; height: 16px;"></i>Datos de Envío</h6>
              <div class="small">
                <div><strong>${persona.nombres} ${persona.apellidos}</strong></div>
                <div>${persona.direccion}</div>
                <div>${persona.ciudad}, ${persona.codigoP || ''}</div>
                <div>${persona.pais}</div>
                <div class="mt-2 text-muted">📞 ${persona.telefono}</div>
                <div class="text-muted">✉️ ${persona.correo}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="card h-100 bg-body-tertiary border-light-subtle shadow-sm">
            <div class="card-body">
              <h6 class="card-title text-primary mb-3"><i data-lucide="credit-card" class="me-2" style="width: 16px; height: 16px;"></i>Detalles del Pago</h6>
              <div class="small">
                <div class="d-flex justify-content-between mb-1"><span>Fecha:</span> <strong>${fechaActual}</strong></div>
                <div class="d-flex justify-content-between mb-1"><span>Método:</span> <strong>Tarjeta de Crédito</strong></div>
                <div class="d-flex justify-content-between mb-1"><span>Titular:</span> <strong>${datosPago.nombreTarjeta}</strong></div>
                <div class="d-flex justify-content-between"><span>Tarjeta:</span> <strong>${tarjetaMask}</strong></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h6 class="text-primary mb-3"><i data-lucide="shopping-bag" class="me-2" style="width: 16px; height: 16px;"></i>Resumen de la Orden</h6>
      <div class="table-responsive-sm border rounded shadow-sm">
        <table class="table table-bordered border-light-subtle mb-0 align-middle">
          <thead class="table-light">
            <tr style="font-size: 0.85rem;">
              <th>Producto</th>
              <th class="text-center">Cant.</th>
              <th class="text-end">Precio Unit.</th>
              <th class="text-end">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            ${itemsTableRows}
          </tbody>
          <tfoot>
            <tr class="bg-body-secondary">
              <td colspan="3" class="text-end fw-bold text-body">Total Pagado:</td>
              <td class="text-end fw-bold fs-5 text-primary">$${total.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  `;

  modalBody.innerHTML = facturaHTML;

  if (window.lucide) {
    lucide.createIcons();
  }

  // Simular envío de datos a la BD en formato XML y JSON
  enviarFactura(persona, datosPago, carrito, total);

  // Mostrar el modal
  const facturaModal = new bootstrap.Modal(document.getElementById('facturaModal'));
  facturaModal.show();
}

function enviarFactura(persona, datosPago, carrito, total) {
  // Generar JSON
  const facturaJSON = {
    cliente: persona,
    pago: {
      metodo: "Tarjeta de Crédito",
      titular: datosPago.nombreTarjeta,
      ultimosDigitos: String(datosPago.numeroTarjeta).slice(-4)
    },
    productos: carrito.map(item => ({
      id: item.id,
      nombre: item.name,
      cantidad: item.quantity,
      precioUnitario: item.price,
      subtotal: item.price * item.quantity
    })),
    total: total,
    fecha: new Date().toISOString()
  };

  const jsonString = JSON.stringify(facturaJSON, null, 2);
  console.log("=== Factura enviada en formato JSON ===");
  console.log(jsonString);

  // Generar XML
  let productosXML = '';
  facturaJSON.productos.forEach(item => {
    productosXML += `
      <producto>
        <id>${item.id}</id>
        <nombre><![CDATA[${item.nombre}]]></nombre>
        <cantidad>${item.cantidad}</cantidad>
        <precioUnitario>${item.precioUnitario}</precioUnitario>
        <subtotal>${item.subtotal}</subtotal>
      </producto>`;
  });

  const facturaXML = `<?xml version="1.0" encoding="UTF-8"?>
<factura>
  <fecha>${facturaJSON.fecha}</fecha>
  <cliente>
    <nombres><![CDATA[${persona.nombres}]]></nombres>
    <apellidos><![CDATA[${persona.apellidos}]]></apellidos>
    <correo><![CDATA[${persona.correo}]]></correo>
    <telefono>${persona.telefono}</telefono>
    <direccion><![CDATA[${persona.direccion}]]></direccion>
    <ciudad><![CDATA[${persona.ciudad}]]></ciudad>
    <pais><![CDATA[${persona.pais}]]></pais>
    <codigoPostal>${persona.codigoP}</codigoPostal>
  </cliente>
  <pago>
    <metodo>${facturaJSON.pago.metodo}</metodo>
    <titular><![CDATA[${facturaJSON.pago.titular}]]></titular>
    <ultimosDigitos>${facturaJSON.pago.ultimosDigitos}</ultimosDigitos>
  </pago>
  <productos>${productosXML}
  </productos>
  <total>${facturaJSON.total}</total>
</factura>`;

  console.log("=== Factura enviada en formato XML ===");
  console.log(facturaXML);

  // Simulación de envío a BD
  setTimeout(() => {
    console.log("La factura ha sido guardada exitosamente en la base de datos.");
  }, 1000);
}
// tarjeta valida -> 5323 6222 7777 7785
function comprobarNumeroTarjeta(datosPago) {
  const numLimpio = String(datosPago.numeroTarjeta).replace(/\D/g, "");

  if (!numLimpio) return false;

  let suma = 0;
  let alternar = false;

  for (let i = numLimpio.length - 1; i >= 0; i--) {
    let digito = parseInt(numLimpio[i], 10);

    if (alternar) {
      digito = digito * 2 > 9 ? digito * 2 - 9 : digito * 2;
    }

    suma += digito;
    alternar = !alternar;
  }
  return suma % 10 === 0;
}
