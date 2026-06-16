document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.querySelector("form");

  if (formulario) {
    formulario.addEventListener("submit", function (evento) {
      evento.preventDefault();

      const nombres = document.getElementById("nombres").value;
      const apellidos = document.getElementById("apellidos").value;
      const correo = document.getElementById("email").value;

      const clienteJSON = {
        "nombres": nombres,
        "apellidos": apellidos,
        "correo": correo,
        "totalPagado": 3588.00
      };

      console.log("--- Datos en formato JSON ---");
      console.log(JSON.stringify(clienteJSON, null, 2));

      const clienteXML = `<?xml version="1.0" encoding="UTF-8"?>
<factura>
  <cliente>
    <nombres>${nombres}</nombres>
    <apellidos>${apellidos}</apellidos>
    <correo>${correo}</correo>
  </cliente>
  <total>3588.00</total>
</factura>`;

      console.log("--- Datos en formato XML ---");
      console.log(clienteXML);

      const facturaModal = new bootstrap.Modal(document.getElementById('facturaModal'));
      facturaModal.show();
    });
  }
});
