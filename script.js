let imagensSlide = document.querySelector('.slider-width')
let totalSlide = 0
let play = false
let tocar = 0
let currentSlide = 0
imagensSlide.innerHTML = ''

function goPrev(){
    currentSlide--
    if(currentSlide < 0){
        currentSlide = totalSlide - 1
    }
    updateMargin()
}

function goNext(){
    currentSlide++
    if(currentSlide > (totalSlide - 1)){
        currentSlide = 0
    }
    updateMargin()
}

function iniciarSlide() {
    let icone = document.querySelector('#play')
    if(play == false){
        tocar = setInterval(goNext, 2000)
        icone.classList.remove('fa', 'fa-play')
        icone.classList.add('fa', 'fa-pause')
        play = true
    } else {
        clearInterval(tocar)
        icone.classList.remove('fa', 'fa-pause')
        icone.classList.add('fa', 'fa-play')
        play = false
    }
    
}

function updateMargin(){
    let newMargin = (currentSlide * document.querySelector('.slider-item').clientWidth)
    document.querySelector('.slider-width').style.marginLeft = `-${newMargin}px`
}

function adicionarImagens(){
    document.querySelector('.menuInicial').style.display = 'none'
    document.querySelector('.slider').style.display = 'flex'
    document.querySelector('.slider-controls').style.display = 'flex'
    document.querySelector('.slider-controls').style.height = 
    `${document.getElementById('controlsPosition').clientHeight}px`
    let imagens = document.getElementById('imagem').files
    totalSlide = imagens.length

    document.querySelector('.slider-width').style.width = `calc(100vw * ${totalSlide})`

    if(totalSlide > 0){
        for(let i in imagens){
            imagensSlide.innerHTML += 
            `<div class="slider-item" style="background-image: url(${URL.createObjectURL(imagens[i])});">
            </div>`
        }

    } else {
        alert("Nenhuma imagem selecionada!")
        imagensSlide.innerHTML = ''
        document.querySelector('.slider').style.display = 'none'
        document.getElementById('imagem').value = ''
        document.querySelector('.menuInicial').style.display = 'flex'
        totalSlide = 0
    }
    
}

document.body.addEventListener('keyup', function(e){
    if(e.key === "Escape"){

        if(totalSlide > 0){
            imagensSlide.innerHTML = ''
            document.querySelector('.slider').style.display = 'none'
            document.getElementById('imagem').value = ''
            document.querySelector('.menuInicial').style.display = 'flex'
            totalSlide = 0
        }

    }
})

document.body.addEventListener('keyup', function(e){
    
        if(totalSlide > 0){
            if(e.key === "ArrowLeft"){
                goPrev()
            } else if (e.key === "ArrowRight"){
                goNext()
            }
        }
})

document.body.addEventListener('keypress', function(e){
    if(e.key === " "){

        iniciarSlide()

    }
})

function atualizaContador() {
    let quantImagens = document.getElementById('imagem').files.length
    if(quantImagens > 0){
        document.querySelector('.quantImagens').innerHTML = `${document.getElementById('imagem').files.length} imagens selecionadas!`
    } else {
        document.querySelector('.quantImagens').innerHTML = `Nenhuma imagem selecionada!`
    }
}

setInterval(atualizaContador, 100)
