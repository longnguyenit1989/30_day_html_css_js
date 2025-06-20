var content = document.querySelector(".content");
var input = document.querySelector(".content input");
var btnRemoveAll = document.querySelector(".remove-all")

var tags = [];

function render() {
  content.innerHTML = "";
  tags.forEach((tag, index) => {
    content.innerHTML += `<li>
          ${tag}
          <i class="fa-solid fa-xmark" onclick = "removeTag(${index})"></i>
        </li>`;
  });

  content.appendChild(input);
  input.focus();
}

function removeTag(index) {
  tags.splice(index, 1)
  render()
}

function removeAllTag() {
  tags = []
  render()
}

input.addEventListener('keydown', function(event) {
    if(event.key == 'Enter') {
      tags.push(input.value.trim());
      input.value = ''
      render();
    }
})

btnRemoveAll.addEventListener('click', removeAllTag)
