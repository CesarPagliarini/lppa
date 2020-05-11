document.getElementById("numero0").addEventListener("click",cero);
document.getElementById("numero1").addEventListener("click",uno);
document.getElementById("numero2").addEventListener("click",dos);
document.getElementById("numero3").addEventListener("click",tres);
document.getElementById("numero4").addEventListener("click",cuatro);
document.getElementById("numero5").addEventListener("click",cinco);
document.getElementById("numero6").addEventListener("click",seis);
document.getElementById("numero7").addEventListener("click",siete);
document.getElementById("numero8").addEventListener("click",ocho);
document.getElementById("numero9").addEventListener("click",nueve);
document.getElementById("inverso").addEventListener("click",inverso);
document.getElementById("raiz").addEventListener("click",raiz);
document.getElementById("porcentaje").addEventListener("click",porcentaje);
document.getElementById("multiplicacion").addEventListener("click",producto);
document.getElementById("division").addEventListener("click",cociente);
document.getElementById("resta").addEventListener("click",resta);
document.getElementById("suma").addEventListener("click",suma);
document.getElementById("decimal").addEventListener("click",decimal);
document.getElementById("borrado").addEventListener("click",borrar);
document.getElementById("igual").addEventListener("click",resultado);


function cero() {
                    let actual = document.getElementById('visor').innerHTML;
                    let sumado = document.getElementById("numero0").innerHTML;
                    document.getElementById('visor').innerHTML = actual + sumado
                }


function uno()  {
                    let actual = document.getElementById('visor').innerHTML;
                    let sumado = document.getElementById("numero1").innerHTML;
                    document.getElementById('visor').innerHTML = actual + sumado
                }


function dos()  {
                    let actual = document.getElementById('visor').innerHTML;
                    let sumado = document.getElementById("numero2").innerHTML;
                    document.getElementById('visor').innerHTML = actual + sumado
                }


function tres() {
                    let actual = document.getElementById('visor').innerHTML;
                    let sumado = document.getElementById("numero3").innerHTML;
                    document.getElementById('visor').innerHTML = actual + sumado
                }


function cuatro() {
                    let actual = document.getElementById('visor').innerHTML;
                    let sumado = document.getElementById("numero4").innerHTML;
                    document.getElementById('visor').innerHTML = actual + sumado
                  }


function cinco() {
                    let actual = document.getElementById('visor').innerHTML;
                    let sumado = document.getElementById("numero5").innerHTML;
                    document.getElementById('visor').innerHTML = actual + sumado
                 }


function seis() {
                    let actual = document.getElementById('visor').innerHTML;
                    let sumado = document.getElementById("numero6").innerHTML;
                    document.getElementById('visor').innerHTML = actual + sumado
                }


function siete() {
                    let actual = document.getElementById('visor').innerHTML;
                    let sumado = document.getElementById("numero7").innerHTML;
                    document.getElementById('visor').innerHTML = actual + sumado
                }


function ocho() {
                    let actual = document.getElementById('visor').innerHTML;
                    let sumado = document.getElementById("numero8").innerHTML;
                    document.getElementById('visor').innerHTML = actual + sumado
                }


function nueve() {
                    let actual = document.getElementById('visor').innerHTML;
                    let sumado = document.getElementById("numero9").innerHTML;
                    document.getElementById('visor').innerHTML = actual + sumado
                 }

function suma() {
                      let actual = document.getElementById('visor').innerHTML;
                      let operacion = document.getElementById("suma").innerHTML;
                      document.getElementById('visor').innerHTML = actual + operacion
                     }


  
     