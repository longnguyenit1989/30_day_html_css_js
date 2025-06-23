let toastSuccess = document.querySelector(".toast.success");
let toastWarning = document.querySelector(".toast.warning");
let toastError = document.querySelector(".toast.error");

let btnToastSuccess = document.querySelector(".control .success");
let btnToastWarning = document.querySelector(".control .warning");
let btnToastError = document.querySelector(".control .error");

let showingToastSuccess = false;
let showingToastWarning = false;
let showingToastError = false;

btnToastSuccess.addEventListener("click", function () {
  if (showingToastSuccess === true) {
    return;
  }
  showingToastSuccess = true;
  toastSuccess.classList.remove("hide");
  setTimeout(() => {
    toastSuccess.classList.add("hide");
    showingToastSuccess = false;
  }, 2000);
});

btnToastWarning.addEventListener("click", function () {
  if (showingToastWarning === true) {
    return;
  }
  showingToastWarning = true;
  toastWarning.classList.remove("hide");
  setTimeout(() => {
    toastWarning.classList.add("hide");
    showingToastWarning = false;
  }, 2000);
});

btnToastError.addEventListener("click", function () {
  if (showingToastError === true) {
    return;
  }
  showingToastError = true;
  toastError.classList.remove("hide");
  setTimeout(() => {
    toastError.classList.add("hide");
    showingToastError = false;
  }, 2000);
});
