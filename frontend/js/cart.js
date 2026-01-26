function goBack() {
  window.location.href = "products.html";
}

function loadCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const container = document.getElementById("cartContainer");
  let total = 0;

  container.innerHTML = "";

  if(cart.length === 0){
    container.innerHTML = "<p>Your cart is empty!</p>";
  }

  cart.forEach(item => {
    total += item.price;
    container.innerHTML += `
      <div class="card">
        <img src="http://localhost:8081/api/v1/products/images/${item.imagePath}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>₹${item.price}</p>
      </div>
    `;
  });

  document.getElementById("total").innerText = "Total: ₹" + total;
}

function clearCart() {
  localStorage.removeItem("cart");
  loadCart();
}
document.querySelectorAll("button").forEach(btn => {
  if (btn.innerText === "Clear Cart") btn.classList.add("clear-cart");
});

loadCart();
