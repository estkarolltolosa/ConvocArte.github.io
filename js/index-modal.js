
    document.addEventListener("DOMContentLoaded", () => {
      const modal = document.getElementById("modal-terminos");
      const btnAceptar = document.getElementById("btn-aceptar");
      const btnRechazar = document.getElementById("btn-rechazar");

      let destino = ""; // Guardará hacia dónde redirigir (artista u organizador)

      // Botones principales
      document.getElementById("btn-artista").addEventListener("click", () => {
        destino = "views/login.html?role=artista";
        modal.style.display = "flex";
      });

      document.getElementById("btn-organizador").addEventListener("click", () => {
        destino = "views/login.html?role=organizador";
        modal.style.display = "flex";
      });

      // Aceptar términos
      btnAceptar.addEventListener("click", () => {
        localStorage.setItem("aceptoTerminos", "true");
        modal.style.display = "none";
        if (destino) window.location.href = destino;
      });

      // Rechazar términos
      btnRechazar.addEventListener("click", () => {
        modal.style.display = "none";
        alert("Debes aceptar los términos y condiciones para continuar.");
      });

      // Cierre del modal si se hace clic fuera del contenido
      window.addEventListener("click", (e) => {
        if (e.target === modal) modal.style.display = "none";
      });
    });
