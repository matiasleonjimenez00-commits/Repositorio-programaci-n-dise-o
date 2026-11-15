var visorContenido = document.querySelector('.visor-contenido');
 visorContenido.animate{
    [
      { opacity: 0, transform: 'scale(0.5)' },
      { opacity: 1, transform: 'scale(1)' }
    ],
    { duration: 500 }
};

for (var k = 0; k < fotos.length; k++) {
  fotos[k].addEventListener('click', function () {
    var foto = this;

    
    foto.animate{
      [
        { transform: 'scale(1)' },
        { transform: 'scale(0.9)' },
        { transform: 'scale(1)' }
      ],
      { duration: 300 }
    };

    // esperamos a que termine la animación y abrimos el visor
    setTimeout(function () {
      abrirVisor(foto);
    }, 250);
  });
}