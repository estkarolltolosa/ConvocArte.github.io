

    // === Sesión y bienvenida ===
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) {
      document.getElementById("welcomeText").textContent = `Bienvenido, ${user.name}`;
    }

    document.getElementById("logoutBtn").addEventListener("click", () => {
      localStorage.removeItem("currentUser");
      window.location.href = "../index.html";
    });

    // === Manejo del modal de edición de perfil ===
    const editProfileBtn = document.getElementById("editProfileBtn");
    const editProfileModal = document.getElementById("editProfileModal");
    const cancelEditBtn = document.getElementById("cancelEditBtn");
    const editProfileForm = document.getElementById("editProfileForm");

    const infoEmpresa = document.getElementById("infoEmpresa");
    const infoUbicacion = document.getElementById("infoUbicacion");
    const infoContacto = document.getElementById("infoContacto");
    const infoBio = document.getElementById("infoBio");
    const organizerAvatar = document.getElementById("organizerAvatar");

   editProfileBtn.addEventListener("click", () => {
  document.getElementById("editEmpresa").value = infoEmpresa.textContent;
  document.getElementById("editUbicacion").value = infoUbicacion.textContent;
  document.getElementById("editContacto").value = infoContacto.textContent;
  document.getElementById("editBio").value = infoBio.textContent;
  document.getElementById("previewFoto").src = organizerAvatar.src;

  // 🔹 Mostrar nombre del archivo guardado (si existe)
  const saved = JSON.parse(localStorage.getItem("organizerInfo"));
  const cvInfo = document.getElementById("cvInfo");
  if (saved && saved.cv) {
    cvInfo.textContent = `Archivo guardado: ${saved.cv}`;
    cvInfo.style.color = "#4a47a3";
  } else {
    cvInfo.textContent = "Ningún archivo seleccionado";
    cvInfo.style.color = "gray";
  }

  editProfileModal.style.display = "flex";
});


    // Cerrar modal
    cancelEditBtn.addEventListener("click", () => {
      editProfileModal.style.display = "none";
    });

    // Previsualizar imagen
    document.getElementById("editFoto").addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (ev) => {
          document.getElementById("previewFoto").src = ev.target.result;
        };
        reader.readAsDataURL(file);
      }
    });


    // Guardar cambios
    editProfileForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // === Crear objeto base ===
      const organizerInfo = {
        empresa: document.getElementById("editEmpresa").value,
        ubicacion: document.getElementById("editUbicacion").value,
        contacto: document.getElementById("editContacto").value,
        bio: document.getElementById("editBio").value,
        foto: document.getElementById("previewFoto").src,
      };

      // === Guardar hoja de vida (solo el nombre del archivo) ===
      const cvFile = document.getElementById("editCV").files[0];
      if (cvFile) {
        organizerInfo.cv = cvFile.name;
      } else {
        // Si no se selecciona uno nuevo, conservar el anterior (si existe)
        const saved = JSON.parse(localStorage.getItem("organizerInfo"));
        if (saved && saved.cv) organizerInfo.cv = saved.cv;
      }

      // === Guardar en localStorage ===
      localStorage.setItem("organizerInfo", JSON.stringify(organizerInfo));

      // === Actualizar UI visible ===
      infoEmpresa.textContent = organizerInfo.empresa;
      infoUbicacion.textContent = organizerInfo.ubicacion;
      infoContacto.textContent = organizerInfo.contacto;
      infoBio.textContent = organizerInfo.bio;
      organizerAvatar.src = organizerInfo.foto;
      if (organizerInfo.cv) {
        document.getElementById("cvInfo").textContent = `Archivo guardado: ${organizerInfo.cv}`;
        document.getElementById("cvInfo").style.color = "#4a47a3";
      }

      // === Cerrar modal ===
      editProfileModal.style.display = "none";
      setTimeout(() => {
        location.reload();
      }, 400); // le damos un mini delay para que cierre suavemente el modal
    });

    // Cargar datos guardados al iniciar
    document.addEventListener("DOMContentLoaded", () => {
      const saved = JSON.parse(localStorage.getItem("organizerInfo"));

      if (saved) {
        infoEmpresa.textContent = saved.empresa;
        infoUbicacion.textContent = saved.ubicacion;
        infoContacto.textContent = saved.contacto;
        infoBio.textContent = saved.bio;
        if (saved.foto) organizerAvatar.src = saved.foto;

        // 🔹 Mostrar CV en el perfil
        const cvFileDisplay = document.getElementById("cvFileDisplay");
        const cvStatus = document.getElementById("cvStatus");
        if (saved.cv) {
          cvFileDisplay.textContent = saved.cv;
          cvStatus.style.color = "#4a47a3";
        } else {
          cvFileDisplay.textContent = "No cargada";
          cvStatus.style.color = "gray";
        }
      }

      if (user) {
        document.getElementById("welcomeText").textContent = `Bienvenido, ${user.name}`;
      }
      // 📸 Foto de perfil
      const editFoto = document.getElementById("editFoto");
      const previewFoto = document.getElementById("previewFoto");

      editFoto.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (ev) => {
            previewFoto.src = ev.target.result; // muestra la foto
          };
          reader.readAsDataURL(file);
        }
      });

      // 📄 Hoja de vida (PDF o DOC)
      const editCV = document.getElementById("editCV");
      const cvInfo = document.getElementById("cvInfo");

      editCV.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
          cvInfo.textContent = `Archivo seleccionado: ${file.name}`;
        } else {
          cvInfo.textContent = "Ningún archivo seleccionado";
        }
      });
      // Si el usuario no tiene hoja de vida cargada, mostrar modal automáticamente
      if (!saved || !saved.cv) {
        alert("Por último, carga tu hoja de vida. Si no es tu primera vez, puedes omitir este paso.");
        setTimeout(() => {
          editProfileModal.style.display = "flex";
        }, 800);
      }
    });


