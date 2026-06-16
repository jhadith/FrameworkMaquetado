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
    console.log("Agregar función para los datos de facturación");
  } else {
    alert("El numero de tarjeta no es válido");
  }
});
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
