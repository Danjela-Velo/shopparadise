let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCount = document.getElementById("cart-count");
  if (cartCount) cartCount.textContent = count;
}

function addToCart(id, name, price) {
  const existing = cart.find((item) => item.id === id);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ id, name, price, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  showCartItems();
  alert(`${name} u shtua në shportë!`);
}

function toggleCart() {
  const cartSection = document.getElementById("cart");
  if (cartSection) {
    cartSection.style.display =
      cartSection.style.display === "none" ? "block" : "none";
    showCartItems();
  }
}

function showCartItems() {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotalContainer = document.getElementById("cart-total");
  if (!cartItemsContainer || !cartTotalContainer) return;
  cartItemsContainer.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Shporta është bosh.</p>";
    cartTotalContainer.textContent = "";
    return;
  }

  cart.forEach((item) => {
    const itemElement = document.createElement("div");
    itemElement.textContent = `${item.name} - ${item.quantity} x ${item.price} Lekë`;
    cartItemsContainer.appendChild(itemElement);
    total += item.quantity * item.price;
  });

  cartTotalContainer.textContent = `Totali: ${total} Lekë`;
}

// Azhurnimi kur faqja ngarkohet
updateCartCount();
