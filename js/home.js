"use strict";

//  add event on element
const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
};

//  navbar toggle
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

//  header sticky & back top btn active
const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const headerActive = function () {
  if (window.scrollY > 150) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
};

addEventOnElem(window, "scroll", headerActive);

let lastScrolledPos = 0;

const headerSticky = function () {
  if (lastScrolledPos >= window.scrollY) {
    header.classList.remove("header-hide");
  } else {
    header.classList.add("header-hide");
  }

  lastScrolledPos = window.scrollY;
};

addEventOnElem(window, "scroll", headerSticky);

/*scroll reveal effect*/

const sections = document.querySelectorAll("[data-section]");

const scrollReveal = function () {
  for (let i = 0; i < sections.length; i++) {
    if (sections[i].getBoundingClientRect().top < window.innerHeight / 2) {
      sections[i].classList.add("active");
    }
  }
};

scrollReveal();

addEventOnElem(window, "scroll", scrollReveal);


/*update mobile cart count*/
function updateMobileCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  let count = 0;
  cart.forEach((item) => {
    count += item.quantity ? item.quantity : 1;
  });
  const mobileCartCount = document.getElementById("mobile-cart-count");
  if (mobileCartCount) mobileCartCount.textContent = count;
}

// Përditëso numrin kur faqja hapet dhe sa herë ndryshon shporta
updateMobileCartCount();
window.addEventListener("storage", updateMobileCartCount);
// Nëse ke funksion addToCart, thirr updateMobileCartCount() aty gjithashtu
function updateNavbarCartBadge() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  let count = 0;
  cart.forEach((item) => {
    count += item.quantity ? item.quantity : 1;
  });
  const cartBadge = document.querySelector(
    '.header-action-btn[aria-label="cart item"] .btn-badge'
  );
  if (cartBadge) cartBadge.textContent = count > 0 ? count : "";
}

// Përditëso badge kur faqja hapet dhe kur ndryshon localStorage
updateNavbarCartBadge();
window.addEventListener("storage", updateNavbarCartBadge);
// Nëse ke funksion addToCart, thirr updateNavbarCartBadge() aty gjithashtu
