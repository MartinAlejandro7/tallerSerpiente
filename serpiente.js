// 1. Capturamos el canvas y su contexto de dibujo
const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");
const TAMANIO_CELDA = 25
const serpiente = [
  { x: 9, y: 9 },
  { x: 10, y: 9 },
  { x: 11, y: 9 },
  { x: 11, y: 10 },
  { x: 11, y: 11 }

];
let direccionActual = "izquierda"
let intervaloSerpiente
let comida
let puntaje = 0
let velocidad = 500





// Primera pintura del juego al cargar la página
dibujarTodo();


function dibujarTablero() {
  ctx.strokeStyle = ("#2e2f8f")
  for (let x = 0; x < canvas.width; x = x + TAMANIO_CELDA) {
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, canvas.height)
    ctx.stroke();
  }
  for (let y = 0; y < canvas.height; y = y + TAMANIO_CELDA) {

    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(canvas.width, y)
    ctx.stroke();
  }
}

function pintarParte(lineaX, lineaY) {


  ctx.strokeStyle = ("#0a0303")
  let posicionX = lineaX * TAMANIO_CELDA;
  let posicionY = lineaY * TAMANIO_CELDA
  ctx.fillRect(posicionX, posicionY, TAMANIO_CELDA, TAMANIO_CELDA);
  ctx.strokeRect(posicionX, posicionY, TAMANIO_CELDA, TAMANIO_CELDA);


}
function pintarSerpiente() {
  for (let i = 0; i < serpiente.length; i++) {
    if (i === 0) {
      ctx.fillStyle = "#fbff00";// Amarillo para la cabeza
    } else {
      ctx.fillStyle = "#d62323"; // Rojo para el resto del cuerpo
    }
    pintarParte(serpiente[i].x, serpiente[i].y);
  }
}
// =========================
// FUNCIONES DE DIBUJO
// =========================
function moverDerecha() {
  let cabezaActual = serpiente[0];

  let nuevaCabeza = {
    x: cabezaActual.x + 1,
    y: cabezaActual.y

  }
  serpiente.unshift(nuevaCabeza)
  serpiente.pop()
}

function moverIzquierda() {
  let cabezaActual = serpiente[0]
  let nuevaCabeza = {
    x: cabezaActual.x - 1,
    y: cabezaActual.y
  }
  serpiente.unshift(nuevaCabeza);
  serpiente.pop()
}

function moverArriba() {
  let cabezaActual = serpiente[0]
  let nuevaCabeza = {
    x: cabezaActual.x,
    y: cabezaActual.y - 1
  }
  serpiente.unshift(nuevaCabeza)
  serpiente.pop();
}

function moverAbajo() {
  let cabezaActual = serpiente[0];
  let nuevaCabeza = {
    x: cabezaActual.x,
    y: cabezaActual.y + 1
  };
  serpiente.unshift(nuevaCabeza);
  serpiente.pop();


}

function cambiarDireccion(direccion) {

  if (direccionActual === "derecha" && direccion === "izquierda") {
    return;
  }

  if (direccionActual === "izquierda" && direccion === "derecha") {
    return;
  }

  if (direccionActual === "arriba" && direccion === "abajo") {
    return;
  }

  if (direccionActual === "abajo" && direccion === "arriba") {
    return;
  }

  direccionActual = direccion;
}

function iniciarJuego() {
  document.getElementById("estado").innerHTML = "Jugando";
  intervaloSerpiente = setInterval(moverSerpiente, velocidad);
}



function moverSerpiente() {

  console.log("moviendo")
  if (direccionActual === "derecha") {
    moverDerecha();
  } else if (direccionActual === "izquierda") {
    moverIzquierda();
  } else if (direccionActual === "arriba") {
    moverArriba();
  } else if (direccionActual === "abajo") {
    moverAbajo();
  }

 const cabeza = serpiente[0];
const cantidadCeldas = canvas.width / TAMANIO_CELDA;

if (
  cabeza.x < 0 ||
  cabeza.x >= cantidadCeldas ||
  cabeza.y < 0 ||
  cabeza.y >= cantidadCeldas ||
  chocaConCuerpo()
) {
  clearInterval(intervaloSerpiente);
  intervaloSerpiente = null;
  document.getElementById("estado").innerHTML = "Game Over";
  return;
}
  if (atrapaComida() === true) {
    puntaje = puntaje + 1
    document.getElementById("puntaje").innerHTML = puntaje

    comida = undefined;
    let cola = serpiente[serpiente.length - 1];

    if (direccionActual === "derecha") {
      serpiente.push({
        x: cola.x + 1,
        y: cola.y
      })

    } else if (direccionActual === "izquierda") {
      serpiente.push({
        x: cola.x,
        y: cola.y - 1
      })
    } else if (direccionActual === "arriba") {
      serpiente.push({
        x: cola.x,
        y: cola.y + 1
      });

    } else if (direccionActual === "abajo") {
      serpiente.push({
        x: cola.x,
        y: cola.y - 1
      });

    }
  }
  dibujarTodo();
}




function pausarJuego() {
  clearInterval(intervaloSerpiente)
}

function pintarComida() {

  if (comida == undefined) {

    comida = {
      x: Math.floor(Math.random() * (canvas.width / TAMANIO_CELDA)),
      y: Math.floor(Math.random() * (canvas.height / TAMANIO_CELDA))
    };

  }

  ctx.fillStyle = "green";
  ctx.strokeStyle = "green";

  pintarParte(comida.x, comida.y);
}

function atrapaComida() {
  if (comida === undefined) {
    return false;
  }
  let cabezaSerpiente = serpiente[0];
  if (cabezaSerpiente.x === comida.x && cabezaSerpiente.y === comida.y) {
    return true
  } else {
    return false
  }
}

function chocaConCuerpo() {
  let cabeza = serpiente[0];

  for (let i = 1; i < serpiente.length; i++) {
    if (
      cabeza.x === serpiente[i].x &&
      cabeza.y === serpiente[i].y
    ) {
      return true;
    }
  }

  return false;
}


function limpiarCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function reiniciarJuego() {
  clearInterval(intervaloSerpiente);

  serpiente.length = 0;

  serpiente.push(
    { x: 9, y: 9 },
    { x: 10, y: 9 },
    { x: 11, y: 9 },
    { x: 11, y: 10 },
    { x: 11, y: 11 }
  );

  direccionActual = "izquierda";
  comida = undefined;
  puntaje = 0;

  document.getElementById("puntaje").innerHTML = puntaje;
  document.getElementById("estado").innerHTML = "Listo";

  dibujarTodo();

  
}

function dibujarTodo() {
  limpiarCanvas();
  dibujarTablero();
  pintarSerpiente();
  pintarComida()
}

