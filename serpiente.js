
// 1. Capturamos el canvas y su contexto de dibujo
const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");
const TAMANIO_CELDA = 25
const serpiente = [
  {x:9,y:9},
  {x:10,y:9},
  {x:11,y:9},
  {x:11,y:10},
  {x:11,y:11}
  
];




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
  
  
  ctx.strokeStyle = ("#f00909")
  let posicionX = lineaX * TAMANIO_CELDA;
  let posicionY = lineaY * TAMANIO_CELDA
  ctx.fillRect(posicionX,posicionY,TAMANIO_CELDA,TAMANIO_CELDA);
  ctx.strokeRect(posicionX,posicionY,TAMANIO_CELDA,TAMANIO_CELDA);
  

}
function pintarSerpiente(){
  for (let i=0; i<serpiente.length; i++){
     if(i === 0){
      ctx.fillStyle = "#fbff00"; // Amarillo para la cabeza
    } else {
      ctx.fillStyle = "#d62323"; // Rojo para el resto del cuerpo
    }
    pintarParte(serpiente[i].x,serpiente[i].y);
  }
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
  pintarSerpiente();
 
}



