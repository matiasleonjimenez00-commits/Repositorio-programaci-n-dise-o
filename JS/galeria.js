var fotos = document.querySelectorAll('.foto-galeria');
var botonesFiltro = document.querySelectorAll('.filtro');
var visor = document.getElementById('visor');
var visorImg = document.getElementById('visor-img');
var visorTexto = document.getElementById('visor-texto');
var botonesVisor = {
  cerrar: document.getElementById('visor-cerrar'),
  anterior: document.getElementById('visor-anterior'),
  siguiente: document.getElementById('visor-siguiente')
};
var visibles = [];
var actual = 0;

function calcularVisibles() {
  visibles = Array.prototype.filter.call(fotos, function (foto) {
    return !foto.classList.contains('oculta');
  });
}

function filtrar(categoria) {
  for (var i = 0; i < fotos.length; i++) {
    var coincide = categoria === 'todas' ||
      categoria === fotos[i].getAttribute('data-categoria');
    fotos[i].classList.toggle('oculta', !coincide);
  }
  calcularVisibles();
}

function mostrarFoto() {
  var foto = visibles[actual];
  if (!foto) return;

  var imagen = foto.querySelector('img');
  var leyenda = foto.querySelector('figcaption');
  visorImg.src = imagen.src;
  visorImg.alt = imagen.alt;
  visorTexto.textContent = leyenda ? leyenda.textContent : imagen.alt;

  var contenido = visor.querySelector('.visor-contenido');
  if (contenido.animate) {
    contenido.animate(
      [
        { opacity: 0, transform: 'scale(0.9)' },
        { opacity: 1, transform: 'scale(1)' }
      ],
      { duration: 250 }
    );
  }
}

function abrirVisor(foto) {
  calcularVisibles();
  actual = visibles.indexOf(foto);
  if (actual < 0) return;

  mostrarFoto();
  visor.classList.add('abierto');
  document.body.style.overflow = 'hidden';
}

function cerrarVisor() {
  visor.classList.remove('abierto');
  document.body.style.overflow = '';
}

function cambiarFoto(direccion) {
  if (!visibles.length) return;
  actual = (actual + direccion + visibles.length) % visibles.length;
  mostrarFoto();
}

for (var i = 0; i < botonesFiltro.length; i++) {
  botonesFiltro[i].addEventListener('click', function () {
    for (var j = 0; j < botonesFiltro.length; j++) {
      botonesFiltro[j].classList.remove('activo');
    }
    this.classList.add('activo');
    filtrar(this.getAttribute('data-filtro'));
  });
}

for (var k = 0; k < fotos.length; k++) {
  fotos[k].addEventListener('click', function () {
    if (this.animate) {
      this.animate(
        [
          { transform: 'scale(1)' },
          { transform: 'scale(0.96)' },
          { transform: 'scale(1)' }
        ],
        { duration: 200 }
      );
    }
    abrirVisor(this);
  });
}

botonesVisor.cerrar.addEventListener('click', cerrarVisor);
botonesVisor.anterior.addEventListener('click', function () {
  cambiarFoto(-1);
});
botonesVisor.siguiente.addEventListener('click', function () {
  cambiarFoto(1);
});
visor.addEventListener('click', function (evento) {
  if (evento.target === visor) cerrarVisor();
});
document.addEventListener('keydown', function (evento) {
  if (!visor.classList.contains('abierto')) return;
  if (evento.key === 'Escape') cerrarVisor();
  if (evento.key === 'ArrowRight') cambiarFoto(1);
  if (evento.key === 'ArrowLeft') cambiarFoto(-1);
});

calcularVisibles();