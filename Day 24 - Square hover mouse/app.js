var container = document.querySelector(".container")

const squareCount = 200

function randomColor() {
    var charColor = "0123456789ABCDEF"
    var color = "#";

    for (let i = 0; i < 6; i++) {
        color += charColor[Math.floor(Math.random() * charColor.length)]
    }
    return color
}

for (let i = 0; i < squareCount; i++) {
    var square = document.createElement('div')
    square.classList.add('square')
  
    square.addEventListener('mouseenter', function(e) {
        let color = randomColor()
        this.style.background = color
        this.style.boxShadow = `0 0 10px ${color}, 0 0 100px ${color}`
    })

    square.addEventListener('mouseleave', function(e) {
        this.style.background = '#1d1d1d'
           this.style.boxShadow = '0 0 2px #000'
    })

    container.appendChild(square)
}

