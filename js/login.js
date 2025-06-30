// Validimi i formës së login-it me kontrolle të avancuara

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".form__content form");
  const usernameInput = form.querySelector('input[type="text"]');
  const passwordInput = form.querySelector('input[type="password"]');

  // Shto opsionin për të treguar fjalëkalimin
  let showPassBtn = document.createElement("button");
  showPassBtn.type = "button";
  showPassBtn.textContent = "Trego";
  showPassBtn.style.marginLeft = "8px";
  showPassBtn.style.background = "none";
  showPassBtn.style.border = "none";
  showPassBtn.style.color = "var(--spanish-gray)";
  showPassBtn.style.cursor = "pointer";
  showPassBtn.style.fontSize = "0.95rem";
  passwordInput.parentNode.insertBefore(showPassBtn, passwordInput.nextSibling);
  showPassBtn.addEventListener("click", function () {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      showPassBtn.textContent = "Fshih";
    } else {
      passwordInput.type = "password";
      showPassBtn.textContent = "Trego";
    }
  });

  // Validim në kohë reale për email/username
  usernameInput.addEventListener("input", function () {
    removeError(usernameInput);
    if (!usernameInput.value.trim()) {
      showError(usernameInput, "Ju lutem shkruani email-in ose username!");
    } else if (!usernameInput.value.includes("@")) {
      showError(usernameInput, "Email-i duhet të përmbajë simbolin @");
    } else if (
      !validateEmail(usernameInput.value.trim()) &&
      usernameInput.value.includes("@")
    ) {
      showError(
        usernameInput,
        "Ju lutem shkruani email-in në format të saktë!"
      );
    }
  });

  passwordInput.addEventListener("input", function () {
    removeError(passwordInput);
    if (!passwordInput.value.trim()) {
      showError(passwordInput, "Ju lutem shkruani fjalëkalimin!");
    } else if (passwordInput.value.length < 6) {
      showError(
        passwordInput,
        "Fjalëkalimi duhet të ketë të paktën 6 karaktere!"
      );
    }
  });

  form.addEventListener("submit", function (e) {
    let valid = true;
    removeError(usernameInput);
    removeError(passwordInput);

    if (!usernameInput.value.trim()) {
      showError(usernameInput, "Ju lutem shkruani email-in ose username!");
      valid = false;
    } else if (!usernameInput.value.includes("@")) {
      showError(usernameInput, "Email-i duhet të përmbajë simbolin @");
      valid = false;
    } else if (
      !validateEmail(usernameInput.value.trim()) &&
      usernameInput.value.includes("@")
    ) {
      showError(
        usernameInput,
        "Ju lutem shkruani email-in në format të saktë!"
      );
      valid = false;
    }
    if (!passwordInput.value.trim()) {
      showError(passwordInput, "Ju lutem shkruani fjalëkalimin!");
      valid = false;
    } else if (passwordInput.value.length < 6) {
      showError(
        passwordInput,
        "Fjalëkalimi duhet të ketë të paktën 6 karaktere!"
      );
      valid = false;
    }
    if (!valid) {
      e.preventDefault();
    }
  });

  function showError(input, message) {
    removeError(input);
    const error = document.createElement("div");
    error.className = "error-message";
    error.style.color = "red";
    error.style.fontSize = "0.95rem";
    error.style.marginBottom = "8px";
    error.textContent = message;
    input.parentNode.insertBefore(error, input.nextSibling);
  }

  function removeError(input) {
    const next = input.nextSibling;
    if (next && next.className === "error-message") {
      next.remove();
    }
  }

  function validateEmail(email) {
    // Kontroll bazik për email
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
});
