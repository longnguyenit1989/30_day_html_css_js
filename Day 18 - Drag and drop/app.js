const boxes = document.querySelectorAll(".box");
const targets = document.querySelectorAll(".target");

let currentTarget = null;

targets.forEach((target) => {
  target.addEventListener("dragstart", function () {
    this.classList.add("dragging");
    currentTarget = this;
  });

  target.addEventListener("dragend", function () {
    this.classList.remove("dragging");
    currentTarget = null;
  });
});

boxes.forEach((box) => {
  box.addEventListener("dragover", function (e) {
    e.preventDefault();
  });

  box.addEventListener("drop", function () {
    if (currentTarget && !this.querySelector(".target")) {
      this.appendChild(currentTarget);
    }
  });
});
