// cart.js - funksionaliteti i faqes së shportës
function renderCartPage() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItemsDiv = document.getElementById("cart-items");
  const cartTotalSpan = document.getElementById("cart-total");
  cartItemsDiv.innerHTML = "";
  let total = 0;
  if (cart.length === 0) {
    cartItemsDiv.innerHTML =
      "<p style='text-align:center;color:#888;font-size:1.1rem;'>Shporta është bosh.</p>";
    cartTotalSpan.textContent = "0 ALL";
    return;
  }
  cart.forEach((item, idx) => {
    total += item.price * item.quantity;
    const itemDiv = document.createElement("div");
    itemDiv.className = "cart-item";
    itemDiv.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <div class="cart-item-details">
        <div><strong>${item.name}</strong></div>
        <div>${item.size ? item.size + " | " : ""}${
      item.color ? item.color + " | " : ""
    }${item.price} ALL</div>
        <div style="margin-top:10px;display:flex;justify-content:center;align-items:center;gap:18px;">
          <button class="qty-btn" data-idx="${idx}" data-action="decrease" style="font-size:1.3rem;padding:2px 10px;">-</button>
          <span style="font-size:1.1rem;min-width:24px;display:inline-block;text-align:center;">${
            item.quantity
          }</span>
          <button class="qty-btn" data-idx="${idx}" data-action="increase" style="font-size:1.3rem;padding:2px 10px;">+</button>
        </div>
      </div>
      <button class="remove-btn" data-idx="${idx}">Remove</button>
    `;
    cartItemsDiv.appendChild(itemDiv);
  });
  cartTotalSpan.textContent = total + " ALL";
  // Lidh eventet për butonat Remove
  document.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const idx = parseInt(this.getAttribute("data-idx"));
      cart.splice(idx, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCartPage();
    });
  });
  // Lidh eventet për butonat +/-
  document.querySelectorAll(".qty-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const idx = parseInt(this.getAttribute("data-idx"));
      const action = this.getAttribute("data-action");
      if (action === "increase") cart[idx].quantity++;
      if (action === "decrease" && cart[idx].quantity > 1) cart[idx].quantity--;
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCartPage();
    });
  });
}
document.addEventListener("DOMContentLoaded", renderCartPage);
