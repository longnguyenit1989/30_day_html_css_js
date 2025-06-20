var username = document.getElementById("username");
var email = document.getElementById("email");
var password = document.getElementById("password");
var confirmPassword = document.getElementById("confirm-password");

var form = document.querySelector("form");

function showError(input, message) {
  let parent = input.parentElement;
  let small = parent.querySelector("small");

  parent.classList.add("error");
  small.innerHTML = message;
}

function showSuccess(input) {
  let parent = input.parentElement;
  let small = parent.querySelector("small");

  parent.classList.remove("error");
  small.innerHTML = "";
}

function checkEmptyError(listInput) {
  let isEmptyError = false;

  listInput.forEach((input, index) => {
    input.value = input.value.trim();
    if (!input.value) {
      showError(input, "Please fill infor");
      isEmptyError = false;
    } else {
      showSuccess(input);
    }
  });

  return isEmptyError;
}

function checkEmailError(input) {
  const regexEmail =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  input.value = input.value.trim();

  let isEmailError = !regexEmail.test(input.value);

  if (isEmailError) {
    showError(input, "Email Invalid");
  } else {
    showSuccess(input);
  }

  return isEmailError;
}

function checkLengthError(input, min, max) {
  input.value = input.value.trim();

  if (input.value.length < min) {
    showError(input, `min is ${min} char`);
    return true;
  }

  if (input.value.length > max) {
    showError(input, `min is ${max} char`);
    return true;
  }

  showSuccess(input);
  return false;
}

function checkMatchPasswordError(passwordInput, cfPasswordInput) {
  if (passwordInput.value !== cfPasswordInput.value) {
    showError(cfPasswordInput, "Confirm Password not match");
    return true;
  }

  return false;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let isEmptyError = checkEmptyError([
    username,
    email,
    password,
    confirmPassword,
  ]);
  let isEmailError = checkEmailError(email);
  let isUsernameLengthError = checkLengthError(username, 3, 10);
  let isPasswordLengthError = checkLengthError(password, 3, 10);
  let isMatchPasswordError = checkMatchPasswordError(password, confirmPassword);

  if (
    isEmptyError ||
    isEmailError ||
    isUsernameLengthError ||
    isPasswordLengthError ||
    isMatchPasswordError
  ) {
    // do nothing
  } else {
    // call Api
  }
});
