const jogo = document.querySelector("#jogo")
const barra = document.querySelector("#barra")
const pontosTexto = document.querySelector("#pontos")

let pontos = 0

let velocidadeBarra = 8

let esquerda = false
let direita = false

document.addEventListener("keydown", (event) => {
    if (event.key === 'arrowleft' || event.key === 'a') {
        esquerda = true

    }
    if (event.key === 'arrowright' || event.key === 'd') {
        direita = true
    }
})

document.addEventListener("keyup", (event) => {
    if (event.key === 'arrowleft' || event.key === 'a') {
        esquerda = false
    }
    if (event.key === 'arrowright' || event.key === 'd') {
        direita = false
    }
})

function criarBola() {
    const bola = document.createElement("div")
    bola.classList.add("bola")
    
    jogo.appendChild(bola)
    
     const x = Math.random() * (window.innerWidth-25)
    bola.style.left = x + "px"

    let y = 0;

    function cair(){
        y += 4
        bola.style.top = y + "px"

        const bolaRect = bola.getBoundingClientRect();
        const barraRect = barra.getBoundingClientRect();

        if(bolaRect.bottom >= barraRect.top && bolaRect.left < barraRect.right && bolaRect.right > barraRect.left
        ){
            pontos++
            pontosTexto.textContent = "Pontos:" + pontos
            bola.remove()
            return
        }

        if(y > window.innerHeight) {
            bola.remove()
            return
        }

        
            requestAnimationFrame(cair)
    }

    requestAnimationFrame(cair)
}

function moverBarra() {
    let x = barra.offsetLeft;

    if(esquerda) {
        x-=velocidadeBarra
    }
    if(direita) {
        x+=velocidadeBarra
    }

    if(x<0){
        x=0
    }
    if(x>window.innerWidth-barra.offsetWidth){
        x=window.innerWidth-barra.offsetWidth
    }
    barra.style.left=x+"px"
    barra.style.transform="none"

    requestAnimationFrame(moverBarra)
}

setInterval(criarBola,1000)

moverBarra()