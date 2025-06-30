
// Funksionaliteti për butonin 'PAGUAJ TANI'
document.addEventListener("DOMContentLoaded", function () {
  const payBtn = document.querySelector(".cart-pay-btn");
  if (payBtn) {
    payBtn.addEventListener("click", function () {
      alert("Pagesa u realizua me sukses! ");
    });
  }
});
