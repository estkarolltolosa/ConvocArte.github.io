
    const gallery = document.getElementById("eventGallery");
    const artistTableBody = document.getElementById("artistTableBody");

    let eventos = [
      { titulo: "Festival Indie", pago: "$800.000", cupos: 3, img: "../assets/img/event1.jpg", publicado: true, artistas: [] },
      { titulo: "Rock Night", pago: "$1.200.000", cupos: 2, img: "../assets/img/event2.jpg", publicado: true, artistas: [] },
      { titulo: "Expo Arte", pago: "$500.000", cupos: 4, img: "../assets/img/event3.jpg", publicado: true, artistas: [] },
    ];

    let postulaciones = [
      { artista: "Luna Vega", evento: "Festival Indie", img: "../assets/artistas/luna.jpg", estado: "pendiente" },
      { artista: "Nico Beat", evento: "Rock Night", img: "../assets/artistas/nico.jpg", estado: "pendiente" },
      { artista: "Sofi Art", evento: "Expo Arte", img: "../assets/artistas/sofi.jpg", estado: "pendiente" },
    ];

    function renderEventos() {
      gallery.innerHTML = "";
      let totalSlots = 6; // 6 eventos visibles máximo
      for (let i = 0; i < totalSlots; i++) {
        if (eventos[i]) {
          let ev = eventos[i];
          const div = document.createElement("div");
          div.className = "event-card";
          div.innerHTML = `
            <img src="${ev.img}" alt="${ev.titulo}">
            <p><b>${ev.titulo}</b></p>
            <p>${ev.pago} | Artistas: ${ev.cupos}</p>
            <div>
              ${ev.artistas.length > 0 ? ev.artistas.map(a => `<span>${a}</span>`).join('') : "<em>Sin artistas</em>"}
            </div>
            <div>
              <button class="publish-btn" onclick="togglePublicar(${i})">${ev.publicado ? "Ocultar" : "Publicar"}</button>
              <button class="delete-btn" onclick="eliminarEvento(${i})">Eliminar</button>
            </div>
          `;
          gallery.appendChild(div);
        } else {
          // Espacio vacío para añadir evento
          const div = document.createElement("div");
          div.className = "event-card";
          div.innerHTML = `<p>➕ Añadir evento</p>`;
          gallery.appendChild(div);
        }
      }
    }

    function renderPostulaciones() {
      artistTableBody.innerHTML = "";
      postulaciones.forEach((p, i) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td><img src="${p.img}" alt="${p.artista}">${p.artista}</td>
          <td>${p.evento}</td>
          <td>
            ${p.estado === "pendiente" ? `<span onclick="aceptar(${i})">✅</span><span onclick="rechazar(${i})">❌</span>` : `${p.estado === "aceptado" ? "✅" : "❌"}`}
          </td>
        `;
        artistTableBody.appendChild(row);
      });
    }

    function togglePublicar(i) { eventos[i].publicado = !eventos[i].publicado; renderEventos(); }
    function eliminarEvento(i) { if (confirm("Eliminar evento?")) { eventos.splice(i, 1); renderEventos(); } }
    function aceptar(i) { postulaciones[i].estado = "aceptado"; const ev = eventos.find(e => e.titulo === postulaciones[i].evento); if (ev) { ev.artistas.push(postulaciones[i].artista); } renderPostulaciones(); renderEventos(); }
    function rechazar(i) { postulaciones[i].estado = "rechazado"; renderPostulaciones(); }
    function logout() { localStorage.removeItem("currentUser"); window.location.href = "../index.html"; }

    renderEventos();
    renderPostulaciones();
