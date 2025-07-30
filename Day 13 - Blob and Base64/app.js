var upload = document.querySelector('#mypicture')
var preview = document.querySelector('.preview')
var errorText = document.querySelector('.error')

upload.addEventListener('change', function(e) {
    var file = upload.files[0]
    
    if(!file) {
        return
    }

    if(!file.name.endsWith('.jpg')) {
        errorText.innerHTML = "Image must type jpg"
        return
    } else {
        errorText.innerHTML = ''
    }

    if(file.size / (1024 * 1024) > 5) {
        errorText.innerHTML = "Image size is too smaller 5 mb"
        return
    } else {
        errorText.innerHTML = ''
    }

    var img = document.createElement('img')
    // img.src = URL.createObjectURL(upload.files[0])


    var fileReader = new FileReader()
    fileReader.readAsDataURL(file)
    fileReader.onloadend = function(e) {
        console.log('load ok', e.target.result)
        img.src = e.target.result
    }

    preview.appendChild(img)
})