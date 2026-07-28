
// 1. Capturamos el canvas y su contexto de dibujo
const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");
const TAMANIO_CELDA = 25




// Primera pintura del juego al cargar la página
dibujarTodo();


function dibujarTablero() {
  ctx.strokeStyle = ("#2e2f8f")
 

  for(let x=0; x<canvas.width; x= x + TAMANIO_CELDA){
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x,canvas.height)
    ctx.stroke();
  }

  for(let y=0; y<canvas.height; y = y +TAMANIO_CELDA){
   
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(canvas.width, y)
    ctx.stroke();
  }
}

function pintarParte(lineaX, lineaY){
  
  ctx.fillStyle = ("#fbff00")
  ctx.strokeStyle = ("#f00909")
  let posicionX = lineaX * TAMANIO_CELDA;
  let posicionY = lineaY * TAMANIO_CELDA
  ctx.fillRect(posicionX,posicionY,TAMANIO_CELDA,TAMANIO_CELDA);
  ctx.strokeRect(posicionX,posicionY,TAMANIO_CELDA,TAMANIO_CELDA);
  

}
// =========================
// FUNCIONES DE DIBUJO
// =========================

function limpiarCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function dibujarTodo() {
  limpiarCanvas();
  dibujarTablero();
  pintarParte(5,5)
  pintarParte(10,2)
  pintarParte(10,10)
  pintarParte((canvas.width-TAMANIO_CELDA)/TAMANIO_CELDA,(canvas.height-TAMANIO_CELDA)/TAMANIO_CELDA)
  pintarParte(0,(canvas.height-TAMANIO_CELDA)/TAMANIO_CELDA)
  pintarParte((canvas.width-TAMANIO_CELDA)/TAMANIO_CELDA,0)
 
}



