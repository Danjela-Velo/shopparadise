let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  // Për shportën
  const cartBadge = document.querySelector(
    '.header-action-btn[aria-label="cart item"] .btn-badge'
  );
  if (cartBadge) cartBadge.textContent = count > 0 ? count : "";
  // Për yllin (favourite) - gjithmonë bosh
  const favBadge = document.querySelector(
    '.header-action-btn[aria-label="favourite item"] .btn-badge'
  );
  if (favBadge) favBadge.textContent = "";
}

function addToCart(product) {
  const existing = cart.find((item) => item.id === product.id);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  updateCartNavbar();
  showCartPopup();
}

function toggleCart() {
  const cartSection = document.getElementById("cart");
  cartSection.style.display =
    cartSection.style.display === "none" ? "block" : "none";
  showCartItems();
}

function showCartItems() {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotalContainer = document.getElementById("cart-total");
  cartItemsContainer.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Shporta është bosh.</p>";
    cartTotalContainer.textContent = "";
    return;
  }

  cart.forEach((item) => {
    const itemElement = document.createElement("div");
    itemElement.className = "cart-item";
    itemElement.innerHTML = `${item.name} - ${item.quantity} x ${item.price} Lekë`;
    cartItemsContainer.appendChild(itemElement);
    total += item.quantity * item.price;
  });

  let finalTotal = total;
  if (total >= 5000) {
    finalTotal = total * 0.8;
    cartTotalContainer.innerHTML = `<strong>Totali me zbritje: ${finalTotal.toFixed(
      0
    )} Lekë</strong> <br> <small>(Zbritje 20% aplikuar)</small>`;
  } else {
    cartTotalContainer.innerHTML = `<strong>Totali: ${total} Lekë</strong>`;
  }
}

function updateCartNavbar() {
  const badge = document.querySelector(
    '.header-action-btn[aria-label="cart item"] .btn-badge'
  );
  const dataText = document.querySelector(
    '.header-action-btn[aria-label="cart item"] .btn-text'
  );
  const cartDropdown = document.getElementById("navbar-cart-dropdown");
  // Mos vazhdo nëse nuk ekziston dropdown-i (p.sh. në cart.html)
  if (!cartDropdown) return;
  // Përdor id të veçanta për dropdown-in e navbar-it
  const cartItemsDiv = cartDropdown.querySelector("#cart-items");
  const cartTotalSpan = cartDropdown.querySelector("#cart-total");

  let total = 0;
  let count = 0;
  cartItemsDiv.innerHTML = "";

  cart.forEach((item, idx) => {
    count += item.quantity;
    total += item.price * item.quantity;
    const itemDiv = document.createElement("div");
    itemDiv.style.display = "flex";
    itemDiv.style.alignItems = "center";
    itemDiv.style.marginBottom = "8px";
    itemDiv.innerHTML = `
      <img src="${item.img}" style="width:40px;height:40px;object-fit:cover;border-radius:5px;margin-right:10px;">
      <span style="flex:1;">${item.name}</span>
      <span>${item.price}L x ${item.quantity}</span>
      <button class="remove-navbar-btn" data-idx="${idx}" style="margin-left:10px;background:#e9dcc7;color:#222;border:none;padding:4px 8px;border-radius:5px;cursor:pointer;">Hiq</button>
    `;
    cartItemsDiv.appendChild(itemDiv);
  });
  badge && (badge.textContent = count > 0 ? count : "");
  dataText && (dataText.textContent = total.toFixed(2) + "L");
  cartTotalSpan && (cartTotalSpan.textContent = total + "L");
  // Lidh eventet për butonat Hiq në navbar
  cartItemsDiv.querySelectorAll(".remove-navbar-btn").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      const idx = parseInt(this.getAttribute("data-idx"));
      cart.splice(idx, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartNavbar();
    });
  });
}

// Për popup-in që të shfaqet "Produkti u shtua në shportë!"
function showCartPopup() {
  const popup = document.getElementById("cart-popup");
  if (!popup) return;
  popup.textContent = "Produkti u shtua në shportë!";
  popup.style.display = "block";
  setTimeout(() => {
    popup.style.display = "none";
  }, 1800);
}

// Për dropdown-in e shportës në navbar kur vendos kursorin
window.addEventListener("DOMContentLoaded", () => {
  updateCartNavbar();
  const cartBtn = document.querySelector(
    '.header-action-btn[aria-label="cart item"]'
  );
  const cartDropdown = document.getElementById("navbar-cart-dropdown");
  let dropdownTimeout;
  if (cartBtn && cartDropdown) {
    cartBtn.addEventListener("mouseenter", () => {
      clearTimeout(dropdownTimeout);
      cartDropdown.classList.add("show");
      updateCartNavbar();
    });
    cartBtn.addEventListener("mouseleave", () => {
      dropdownTimeout = setTimeout(() => {
        cartDropdown.classList.remove("show");
      }, 300);
    });
    cartDropdown.addEventListener("mouseenter", () => {
      clearTimeout(dropdownTimeout);
      cartDropdown.classList.add("show");
    });
    cartDropdown.addEventListener("mouseleave", () => {
      dropdownTimeout = setTimeout(() => {
        cartDropdown.classList.remove("show");
      }, 300);
    });
  }
  // Lidh çdo buton "add to cart" te produktet
  document.querySelectorAll(".shop-card").forEach((card) => {
    const addBtn = card.querySelector(
      '.action-btn ion-icon[name="bag-handle-outline"]'
    )?.parentElement;
    if (addBtn) {
      addBtn.addEventListener("click", () => {
        const img = card.querySelector("img").getAttribute("src");
        const name = card.querySelector(".card-title").textContent.trim();
        const priceText = card.querySelector(".price .span").textContent.trim();
        const price = parseInt(priceText.replace(/[^\d]/g, ""));
        const id = name + "-" + price;
        addToCart({ id, name, price, img });
      });
    }
  });
});

updateCartCount();

/* Hamburger menu (mobile navbar) toggle*/
const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
};

const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
};

addEventOnElem(navTogglers, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
};

addEventOnElem(navbarLinks, "click", closeNavbar);

// SEARCH FUNKSIONALITETI PER SHOP

document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.querySelector(".search-field");
  if (!searchInput) return;
  searchInput.addEventListener("input", function () {
    const query = this.value.trim().toLowerCase();
    document.querySelectorAll(".shop-card").forEach((card) => {
      const title = card.querySelector(".card-title").textContent.toLowerCase();
      // Mund të shtosh edhe kategori ose tags në të ardhmen
      if (
        query === "" ||
        title.includes(query) ||
        (query.includes("fustan") && title.includes("fustan")) ||
        (query.includes("set") && title.includes("set")) ||
        (query.includes("pantallon") && title.includes("pantallon"))
      ) {
        card.parentElement.style.display = "";
      } else {
        card.parentElement.style.display = "none";
      }
    });
  });
});
