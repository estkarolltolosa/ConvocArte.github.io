// auth.js
document.addEventListener("DOMContentLoaded", () => {
  // === REGISTRO ===
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();
      const role = document.getElementById("role").value;

      if (!name || !email || !password || !role) {
        alert("Por favor completa todos los campos.");
        return;
      }

      const newUser = { name, email, password, role };

      let storedUsers = JSON.parse(localStorage.getItem("usuarios")) || usuarios;
      storedUsers.push(newUser);
      localStorage.setItem("usuarios", JSON.stringify(storedUsers));

      alert(`✅ Registro exitoso como ${role}. Ahora puedes iniciar sesión.`);
      window.location.href = "login.html";
    });
  }

  // === LOGIN ===
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();

      let storedUsers = JSON.parse(localStorage.getItem("usuarios")) || usuarios;

      const foundUser = storedUsers.find(
        (u) => u.email === email && u.password === password
      );

      if (foundUser) {
        localStorage.setItem("currentUser", JSON.stringify(foundUser));

        alert(`🎉 Bienvenido, ${foundUser.name} (${foundUser.role})`);

        if (foundUser.role === "artista") {
          window.location.href = "../views/perfil-artista.html";
        } else {
          window.location.href = "../views/perfil-organizador.html";
        }
      } else {
        alert("⚠️ Credenciales incorrectas. Intenta nuevamente.");
      }
    });
  }
});
