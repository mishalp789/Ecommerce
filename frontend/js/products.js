let currentPage = 0;
let totalPages = 0;

const token = localStorage.getItem("token");
if (!token) {
  window.location.href = "login.html";
}

function logout() {
  localStorage.clear();
  window.location.href = "login.html";
}

// Fetch products
function fetchProducts(page = 0) {
  fetch(`http://localhost:8081/api/v1/products?page=${page}&size=8`, {
    headers: {
      "Authorization": "Bearer " + token
    }
  })
    .then(res => {
      if (!res.ok) throw new Error("Forbidden");
      return res.json();
    })
    .then(data => {
      currentPage = data.number;
      totalPages = data.totalPages;
      displayProducts(data.content);
      document.getElementById("pageInfo").innerText =
        `Page ${currentPage + 1} of ${totalPages}`;
    })
    .catch(err => {
      alert("Session expired or unauthorized");
      logout();
    });
}

function displayProducts(products) {
  const container = document.getElementById("productContainer");
  container.innerHTML = "";

  products.forEach(p => {
    container.innerHTML += `
      <div class="card">
        <img src="http://localhost:8081/api/v1/products/images/${p.imagePath}">
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>
        <button onclick="addToCart(${p.id}, '${p.name}', ${p.price}, '${p.imagePath}')">
  Add to Cart
</button>

      </div>
    `;
  });
}

function nextPage() {
  if (currentPage < totalPages - 1) {
    fetchProducts(currentPage + 1);
  }
}

function prevPage() {
  if (currentPage > 0) {
    fetchProducts(currentPage - 1);
  }
}

fetchProducts();


function searchProducts() {
  const query = document.getElementById("searchBox").value.toLowerCase();
  const filtered = allProducts.filter(p => p.name.toLowerCase().includes(query));
  displayProducts(filtered);
}

// Save all products after fetching for search
let allProducts = [];

function fetchProducts(page = 0) {
  fetch(`http://localhost:8081/api/v1/products?page=${page}&size=8`, {
    headers: { "Authorization": "Bearer " + token }
  })
  .then(res => res.json())
  .then(data => {
    currentPage = data.number;
    totalPages = data.totalPages;
    allProducts = data.content;  // store for search
    displayProducts(data.content);
    document.getElementById("pageInfo").innerText =
      `Page ${currentPage + 1} of ${totalPages}`;
  });
}


function getCart(){
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function addToCart(id, name, price, imagePath) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.push({
    id: id,
    name: name,
    price: price,
    imagePath: imagePath
  });

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart");
}
