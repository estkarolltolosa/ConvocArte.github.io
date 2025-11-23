
    // === Datos del usuario ===
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) {
      document.getElementById("welcomeText").textContent = `Bienvenido, ${user.name}`;
    }

    document.getElementById("logoutBtn").addEventListener("click", () => {
      localStorage.removeItem("currentUser");
      window.location.href = "../index.html";
      localStorage.removeItem("portfolio")
    });

    // === Portafolio ===
    const portfolioGrid = document.getElementById("portfolioGrid");
    const fileInput = document.getElementById("fileInput");
    const MAX_ITEMS = 6;
    const portfolio = JSON.parse(localStorage.getItem("portfolio")) || Array(MAX_ITEMS).fill(null);

    const renderGallery = () => {
      portfolioGrid.innerHTML = "";
      portfolio.forEach((img, i) => {
        const div = document.createElement("div");
        div.classList.add("portfolio-item", img ? "filled" : "empty");
        div.dataset.index = i;

        if (img) {
          const image = document.createElement("img");
          image.src = img;
          div.appendChild(image);
        }
        portfolioGrid.appendChild(div);
      });
    };

    renderGallery();

    portfolioGrid.addEventListener("click", (e) => {
      const item = e.target.closest(".portfolio-item");
      if (item) {
        fileInput.dataset.index = item.dataset.index;
        fileInput.click();
      }
    });

    fileInput.addEventListener("change", (e) => {
      const index = parseInt(fileInput.dataset.index);
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (ev) => {
          portfolio[index] = ev.target.result;
          localStorage.setItem("portfolio", JSON.stringify(portfolio));
          renderGallery();
        };
        reader.readAsDataURL(file);
      }
    });

    // === Modal de edición de perfil ===
    const editProfileBtn = document.getElementById("editProfileBtn");
    const editProfileModal = document.getElementById("editProfileModal");
    const cancelEditBtn = document.getElementById("cancelEditBtn");
    const editProfileForm = document.getElementById("editProfileForm");

    const artistAvatar = document.getElementById("artistAvatar");
    const infoEspecialidad = document.getElementById("infoEspecialidad");
    const infoUbicacion = document.getElementById("infoUbicacion");
    const infoRedes = document.getElementById("infoRedes");
    const infoBio = document.getElementById("infoBio");
    const cvInfo = document.getElementById("cvInfo");
    const cvFileDisplay = document.getElementById("cvFileDisplay"); // 🔹 NUEVO

    // === Abrir modal y cargar datos ===
    editProfileBtn.addEventListener("click", () => {
      document.getElementById("editEspecialidad").value = infoEspecialidad.textContent;
      document.getElementById("editUbicacion").value = infoUbicacion.textContent;
      document.getElementById("editRedes").value = infoRedes.textContent;
      document.getElementById("editBio").value = infoBio.textContent;
      document.getElementById("previewFoto").src = artistAvatar.src;

      const saved = JSON.parse(localStorage.getItem("artistInfo"));
      if (saved && saved.cv) {
        cvInfo.textContent = `Archivo guardado: ${saved.cv}`;
        cvInfo.style.color = "#4a47a3";
      } else {
        cvInfo.textContent = "Ningún archivo seleccionado";
        cvInfo.style.color = "gray";
      }

      editProfileModal.classList.add("active");
    });

    // === Cerrar modal ===
    cancelEditBtn.addEventListener("click", () => {
      editProfileModal.classList.remove("active");
    });

    // === Cambiar y previsualizar foto de perfil ===
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

    // === Mostrar nombre del CV seleccionado ===
    document.getElementById("editCV").addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        cvInfo.textContent = `Archivo seleccionado: ${file.name}`;
        cvInfo.style.color = "#4a47a3";
      } else {
        cvInfo.textContent = "Ningún archivo seleccionado";
        cvInfo.style.color = "gray";
      }
    });

    // === Guardar cambios ===
    editProfileForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const artistInfo = {
        especialidad: document.getElementById("editEspecialidad").value,
        ubicacion: document.getElementById("editUbicacion").value,
        redes: document.getElementById("editRedes").value,
        bio: document.getElementById("editBio").value,
        foto: document.getElementById("previewFoto").src,
      };

      // === Guardar CV (mantener el anterior si no se selecciona uno nuevo) ===
      const cvFile = document.getElementById("editCV").files[0];
      if (cvFile) {
        artistInfo.cv = cvFile.name;
      } else {
        const saved = JSON.parse(localStorage.getItem("artistInfo"));
        if (saved && saved.cv) artistInfo.cv = saved.cv;
      }

      // === Guardar en localStorage ===
      localStorage.setItem("artistInfo", JSON.stringify(artistInfo));

      // === Reflejar cambios inmediatamente ===
      infoEspecialidad.textContent = artistInfo.especialidad;
      infoUbicacion.textContent = artistInfo.ubicacion;
      infoRedes.textContent = artistInfo.redes;
      infoBio.textContent = artistInfo.bio;
      artistAvatar.src = artistInfo.foto;

      if (artistInfo.cv) {
        cvInfo.textContent = `Archivo guardado: ${artistInfo.cv}`;
        cvInfo.style.color = "#4a47a3";
        cvFileDisplay.textContent = `📄 ${artistInfo.cv}`; // 🔹 NUEVO
        cvFileDisplay.style.color = "#4a47a3"; // 🔹 NUEVO

      } else {
        cvFileDisplay.textContent = "📄 No cargada"; // 🔹 NUEVO
        cvFileDisplay.style.color = "gray"; // 🔹 NUEVO
      }

      editProfileModal.classList.remove("active");
    });

    // === Cargar datos guardados al iniciar ===
    document.addEventListener("DOMContentLoaded", () => {
      const saved = JSON.parse(localStorage.getItem("artistInfo"));
      if (saved) {
        infoEspecialidad.textContent = saved.especialidad || "";
        infoUbicacion.textContent = saved.ubicacion || "";
        infoRedes.textContent = saved.redes || "";
        infoBio.textContent = saved.bio || "";
        if (saved.foto) artistAvatar.src = saved.foto;
        if (saved.cv) {
          cvInfo.textContent = `Archivo guardado: ${saved.cv}`;
          cvInfo.style.color = "#4a47a3";
          cvFileDisplay.textContent = `📄 ${saved.cv}`; // 🔹 NUEVO
          cvFileDisplay.style.color = "#4a47a3"; // 🔹 NUEVO
        }
      } else {
        cvFileDisplay.textContent = "📄 No cargada"; // 🔹 NUEVO
        cvFileDisplay.style.color = "gray"; // 🔹 NUEVO
      }

      // Mostrar modal automáticamente si no hay hoja de vida
      if (!saved || !saved.cv) {
        setTimeout(() => {
          alert("Por último, carga tu hoja de vida. Si ya la tienes, puedes omitir este paso.");
          editProfileModal.classList.add("active");
        }, 800);
      }
    });
 