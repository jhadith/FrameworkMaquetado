//Parte 1: Inicializacion y Carga del Carrito en el Checkout

document.addEventListener("DOMContentLoaded", () => {
  // document.addEventListener escucha el evento DOMContentLoaded, que se dispara cuando el HTML
  // ha sido completamente cargado y parseado. Esto asegura que los elementos del DOM existan
  // antes de intentar manipularlos con JavaScript, evitando errores de referencia nula.
  renderCarritoFactura();
});

function renderCarritoFactura() {
  // Esta funcion recupera los productos almacenados en el navegador y los dibuja en la pantalla de facturacion.

  // localStorage.getItem('carrito') obtiene la cadena de texto JSON guardada bajo la clave 'carrito'.
  // JSON.parse() convierte esa cadena de texto JSON de vuelta a un arreglo de objetos de JavaScript.
  // El operador lógico || (OR) asigna un arreglo vacio [] como valor por defecto si 'carrito' no existe en localStorage.
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  // document.getElementById busca un elemento HTML por su atributo 'id' unico.
  // Es la forma mas rapida y directa de acceder a un elemento especifico en el DOM.
  const listaCarrito = document.getElementById("lista-carrito-factura");
  const badgeCantidad = document.getElementById("badge-cantidad-factura");

  // Si no se encuentra el contenedor del carrito en el DOM, se detiene la ejecucion para evitar errores.
  if (!listaCarrito) return;

  // Se limpia el contenido HTML previo dentro del contenedor para evitar duplicar elementos al renderizar de nuevo.
  listaCarrito.innerHTML = "";
  let total = 0;
  let cantidadItems = 0;

  // forEach es un metodo de arreglos que ejecuta una funcion por cada elemento (item) dentro del carrito.
  carrito.forEach(item => {
    // Se calcula el subtotal multiplicando precio por cantidad de cada item y se suma al acumulador 'total'.
    total += item.price * item.quantity;
    // Se acumula la cantidad total de unidades de productos en el carrito.
    cantidadItems += item.quantity;

    // document.createElement crea un nuevo elemento HTML del tipo especificado (en este caso, un elemento de lista <li>).
    const li = document.createElement("li");

    // className asigna las clases de estilos de Bootstrap al elemento recien creado.
    // list-group-item: define el diseño de item de lista de Bootstrap.
    // d-flex: activa Flexbox para alinear elementos internos.
    // justify-content-between: separa los elementos a los extremos izquierdo y derecho.
    // align-items-center: centra los elementos verticalmente.
    // lh-sm: establece un interlineado pequeño (line-height small).
    // px-3 py-2: aplica paddings horizontales y verticales.
    li.className = "list-group-item d-flex justify-content-between align-items-center lh-sm px-3 py-2";

    // innerHTML inserta codigo HTML dentro de la etiqueta <li>. Se usa interpolacion con comillas invertidas (template strings)
    // para inyectar variables dinamicas directamente en la estructura HTML (${item.name}, ${item.quantity}, etc.).
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
    // appendChild inserta el elemento <li> configurado dentro de la lista contenedora (<ul>) en el DOM visible.
    listaCarrito.appendChild(li);
  });

  // Si no hay productos en el carrito, se genera un mensaje amigable para informar al usuario.
  if (carrito.length === 0) {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-center text-muted";
    li.innerText = "El carrito está vacío";
    listaCarrito.appendChild(li);
  }

  // Fila del total final de la orden.
  const liTotal = document.createElement("li");
  liTotal.className = "list-group-item d-flex justify-content-between";
  // toFixed(2) formatea el numero de punto flotante para mostrar exactamente dos decimales (centavos).
  liTotal.innerHTML = `
    <span>Total (USD)</span>
    <strong>$${total.toFixed(2)}</strong>
  `;
  listaCarrito.appendChild(liTotal);

  // Actualiza el indicador visual de cantidad de productos en la parte superior del desglose.
  if (badgeCantidad) badgeCantidad.innerText = cantidadItems;
}


//Parte 2: Captura del Formulario y Procesamiento de la Compra

// document.querySelector busca el primer elemento en el DOM que coincida con el selector CSS dado (en este caso, la etiqueta <form>).
const formulario = document.querySelector("form");

// addEventListener adjunta un manejador de eventos que se ejecutara cuando el usuario envie el formulario (haga clic en el boton submit).
formulario.addEventListener("submit", function (evento) {
  // evento.preventDefault() detiene el comportamiento por defecto del navegador de recargar la pagina
  // o enviar la peticion HTTP directamente. Esto nos permite manejar la validacion y flujo por JS.
  evento.preventDefault();

  // Se recopilan los valores ingresados por el usuario en los campos del formulario usando document.getElementById().value.
  // Se estructuran en un objeto JavaScript de facil lectura y manipulacion.
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

  // Se recopilan los datos sensibles del pago con tarjeta.
  let datosPago = {
    nombreTarjeta: document.getElementById("nombre_tarjeta").value,
    numeroTarjeta: document.getElementById("numero_tarjeta").value,
    fechaVencimiento: document.getElementById("vencimiento").value,
    codigoCVV: document.getElementById("cvv").value,
  };

  // Se comprueba si el numero de tarjeta cumple con el algoritmo Luhn.
  // Si es valido, se procede a generar y mostrar la factura. De lo contrario, se despliega una alerta.
  if (comprobarNumeroTarjeta(datosPago)) {
    generarFactura(persona, datosPago);
  } else {
    alert("El numero de tarjeta no es válido");
  }
});


//Parte 3: Generacion de Factura Impresa en Pantalla (Modal)

function generarFactura(persona, datosPago) {
  // Recupera el carrito del almacenamiento local para armar el detalle de la compra en la factura.
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const modalBody = document.getElementById('factura-modal-body');

  if (carrito.length === 0) {
    alert("Tu carrito está vacío. No hay nada que facturar.");
    return;
  }

  let total = 0;
  let itemsTableRows = '';

  // Bucle para iterar los productos y generar las filas de la tabla de la factura dinamicamente.
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

  // String(datosPago.numeroTarjeta) asegura que el valor sea procesado como texto.
  // .replace(/\D/g, "") es una expresion regular que remueve todos los caracteres que no sean digitos numericos.
  // .slice(-4) toma los ultimos 4 caracteres de la tarjeta para mostrarlos de forma segura (mascara de seguridad).
  const numTarjetaStr = String(datosPago.numeroTarjeta).replace(/\D/g, "");
  const tarjetaMask = "**** **** **** " + numTarjetaStr.slice(-4);

  // Obtiene la fecha local actual del cliente formateada segun su region.
  const fechaActual = new Date().toLocaleDateString();

  // Estructura HTML responsiva con clases de Bootstrap que representa el diseño estetico de la factura.
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

  // Inyecta el fragmento de HTML dinámico dentro del cuerpo del modal en el documento.
  modalBody.innerHTML = facturaHTML;

  // Si la libreria Lucide Icons esta cargada globalmente en la ventana, analiza el nuevo HTML inyectado
  // y reemplaza los atributos data-lucide="nombre-icono" por etiquetas SVG reales.
  if (window.lucide) {
    lucide.createIcons();
  }

  // Llama a la funcion encargada de exportar la factura en JSON y XML para el envio de datos a la base de datos simulada.
  enviarFactura(persona, datosPago, carrito, total);

  // Instancia y despliega el modal de Bootstrap 5 utilizando su API JavaScript para mostrar el recibo en pantalla.
  const facturaModal = new bootstrap.Modal(document.getElementById('facturaModal'));
  facturaModal.show();
}


// Parte 4: Serializacion y Simulación de Envío de Datos (JSON y XML)

function enviarFactura(persona, datosPago, carrito, total) {
  // Construye una estructura de datos limpia en formato de Objeto de JavaScript para representacion en JSON.
  const facturaJSON = {
    cliente: persona,
    pago: {
      metodo: "Tarjeta de Crédito",
      titular: datosPago.nombreTarjeta,
      ultimosDigitos: String(datosPago.numeroTarjeta).slice(-4)
    },
    // map() transforma el arreglo original de productos seleccionados del carrito a un nuevo formato estructurado.
    productos: carrito.map(item => ({
      id: item.id,
      nombre: item.name,
      cantidad: item.quantity,
      precioUnitario: item.price,
      subtotal: item.price * item.quantity
    })),
    total: total,
    // toISOString() formatea la fecha del sistema en un estandar internacional ISO 8601 (YYYY-MM-DDTHH:mm:ss.sssZ).
    fecha: new Date().toISOString()
  };

  // JSON.stringify convierte el objeto de JavaScript a una cadena de texto JSON limpia.
  // Los parametros null y 2 dan formato identado (2 espacios) para facilitar su visualizacion e impresion legible.
  const jsonString = JSON.stringify(facturaJSON, null, 2);
  console.log("=== Factura enviada en formato JSON ===");
  console.log(jsonString);

  // Seccion de procesamiento XML.
  let productosXML = '';
  // Se itera cada elemento para estructurarlo bajo etiquetas XML personalizadas.
  facturaJSON.productos.forEach(item => {
    // CDATA (Character Data) se usa para envolver textos como el nombre del producto, evitando que caracteres especiales
    // (como <, > o &) rompan la sintaxis del motor analizador XML.
    productosXML += `
      <producto>
        <id>${item.id}</id>
        <nombre><![CDATA[${item.nombre}]]></nombre>
        <cantidad>${item.cantidad}</cantidad>
        <precioUnitario>${item.precioUnitario}</precioUnitario>
        <subtotal>${item.subtotal}</subtotal>
      </producto>`;
  });

  // Se genera la estructura general del archivo XML agregando la declaracion de version y codificacion UTF-8.
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

  // setTimeout simula una peticion asincrona a un servidor remoto o base de datos.
  // Ejecuta la funcion interna despues de transcurrido 1000 milisegundos (1 segundo).
  setTimeout(() => {
    console.log("La factura ha sido guardada exitosamente en la base de datos.");
  }, 1000);
}


// Parte 5: Algoritmo Luhn para Validacion de Tarjetas de Credito

function comprobarNumeroTarjeta(datosPago) {
  // Remueve cualquier caracter que no sea un digito (espacios, guiones) para validar solo numeros.
  const numLimpio = String(datosPago.numeroTarjeta).replace(/\D/g, "");

  // Si la cadena numerica resultante queda vacia, se retorna falso inmediatamente.
  if (!numLimpio) return false;

  let suma = 0;
  let alternar = false;

  // Bucle inverso: recorre el numero de tarjeta de derecha a izquierda.
  for (let i = numLimpio.length - 1; i >= 0; i--) {
    // Convierte el caracter en posicion 'i' a un entero decimal de base 10.
    let digito = parseInt(numLimpio[i], 10);

    // Cada segundo digito se multiplica por dos.
    if (alternar) {
      // Si el resultado de la multiplicacion es mayor a 9, se restan 9 (lo cual equivale a sumar sus digitos, ej: 14 -> 1+4 = 5 o 14-9 = 5).
      digito = digito * 2 > 9 ? digito * 2 - 9 : digito * 2;
    }

    // Se suma el digito procesado al acumulador total.
    suma += digito;

    // Cambia el estado para alternar la multiplicacion del siguiente digito en la proxima iteracion.
    alternar = !alternar;
  }

  // Si la suma de todos los digitos procesados es multiplo de 10 (el residuo de la division entre 10 es cero), la tarjeta es valida.
  return suma % 10 === 0;
}
