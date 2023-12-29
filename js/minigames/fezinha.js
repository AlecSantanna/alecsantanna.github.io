$(document).ready(function () {
  gerarNumeros();
});

function gerarNumeros() {
  var numeros = [];

  for (var i = 0; i < 6; i++) {
    var numeroAleatorio = Math.floor(Math.random() * 60) + 1;
    numeros.push(numeroAleatorio);
  }

  numeros.sort(function(a, b) {
    return a - b;
  });

  $('#numbers').html(numeros.join(', '))
}

function back() {
  history.go(-1)
}
