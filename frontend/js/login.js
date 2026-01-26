function parseJwt(token) {
  return JSON.parse(atob(token.split('.')[1]));
}

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  fetch("http://localhost:8081/api/v1/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username,
      password
    })
  })
    .then(res => {
      if (!res.ok) throw new Error("Invalid credentials");
      return res.json();
    })
    .then(data => {
      const token = data.token;
      localStorage.setItem("token", token);

      const payload = parseJwt(token);

      if (payload.role === "ROLE_ADMIN") {
        window.location.href = "admin.html";
      } else {
        window.location.href = "products.html";
      }
    })
    .catch(err => {
      document.getElementById("error").innerText = "Invalid username or password";
    });
}
