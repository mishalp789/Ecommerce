let currentPage = 0;
let totalPages = 0;
const PAGE_SIZE = 6;
const BASE_URL = "http://localhost:8081/api/v1/products";

function parseJwt(token) {
  return JSON.parse(atob(token.split('.')[1]));
}

function logout() {
  localStorage.clear();
  window.location.href = "login.html";
}

// --- Login check ---
const token = localStorage.getItem("token");
if (!token) window.location.href = "login.html";

const payload = parseJwt(token);
if (payload.role !== "ROLE_ADMIN") {
  alert("Access denied");
  window.location.href = "products.html";
}

document.getElementById("roleText").innerText = "Admin";

// --- Fetch products ---
function fetchProducts(page = 0) {
  fetch(`${BASE_URL}?page=${page}&size=${PAGE_SIZE}`, {
    headers: {
      "Authorization": "Bearer " + token
    }
  })
    .then(res => res.json())
    .then(data => {
      currentPage = data.number;
      totalPages = data.totalPages;
      displayProducts(data.content);
      document.getElementById("pageInfo").innerText =
        `Page ${currentPage + 1} of ${totalPages}`;
    })
    .catch(err => console.error(err));
}

// --- Display products ---
function displayProducts(products) {
  const container = document.getElementById("productContainer");
  container.innerHTML = "";

  products.forEach(p => {
    container.innerHTML += `
      <div class="card">
        <img 
          src="${BASE_URL}/images/${p.imagePath}" 
          alt="${p.name}"
          onerror="this.src='placeholder.png'"
        >
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>
        <button onclick="editProduct(${p.id}, '${p.name}', ${p.price})">Edit</button>
        <button onclick="deleteProduct(${p.id})">Delete</button>
      </div>
    `;
  });
}

// --- Save (Add / Update) ---
function saveProduct() {
  const id = document.getElementById("productId").value;
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const image = document.getElementById("image").files[0];

  if (!name || price <= 0) {
    alert("Enter valid name and price");
    return;
  }

  if (!id) {
    // Add new product (JSON first)
    addProductWithoutImage(name, price).then(product => {
      if (image) uploadProductImage(product.id, image).then(() => fetchProducts(currentPage));
      else fetchProducts(currentPage);
    });
  } else {
    // Update existing product
    updateProductWithoutImage(id, name, price).then(() => {
      if (image) uploadProductImage(id, image).then(() => fetchProducts(currentPage));
      else fetchProducts(currentPage);
    });
  }

  clearForm();
}

// --- Helper: Add product (JSON only) ---
function addProductWithoutImage(name, price) {
  return fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
    body: JSON.stringify({ name, price })
  }).then(res => res.json());
}

// --- Helper: Update product (JSON only) ---
function updateProductWithoutImage(id, name, price) {
  return fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
    body: JSON.stringify({ name, price })
  }).then(res => res.json());
}

// --- Helper: Upload image ---
function uploadProductImage(id, imageFile) {
  const formData = new FormData();
  formData.append("file", imageFile);

  return fetch(`${BASE_URL}/${id}/image`, {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + token
    },
    body: formData
  }).then(res => res.json());
}

// --- Edit product ---
function editProduct(id, name, price) {
  document.getElementById("productId").value = id;
  document.getElementById("name").value = name;
  document.getElementById("price").value = price;
}

// --- Delete product ---
function deleteProduct(id) {
  if (!confirm("Delete product?")) return;

  fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": "Bearer " + token
    }
  }).then(() => fetchProducts(currentPage));
}

// --- Clear form ---
function clearForm() {
  document.getElementById("productId").value = "";
  document.getElementById("name").value = "";
  document.getElementById("price").value = "";
  document.getElementById("image").value = "";
}

// --- Pagination ---
function nextPage() {
  if (currentPage < totalPages - 1) fetchProducts(currentPage + 1);
}

function prevPage() {
  if (currentPage > 0) fetchProducts(currentPage - 1);
}

// --- Initial fetch ---
fetchProducts();
