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
document.getElementById("opuesto").addEventListener("click",opuesto);
document.getElementById("raiz").addEventListener("click",raiz);
document.getElementById("potencia").addEventListener("click",potencia);
document.getElementById("multiplicacion").addEventListener("click",producto);
document.getElementById("division").addEventListener("click",cociente);
document.getElementById("resta").addEventListener("click",resta);
document.getElementById("suma").addEventListener("click",suma);
document.getElementById("decimal").addEventListener("click",decimal);
document.getElementById("borrado").addEventListener("click",borrar);
document.getElementById("igual").addEventListener("click",resultado);


function cero() {
                    let pantalla = document.getElementById('visor').innerHTML;
                    let digito = document.getElementById("numero0").innerHTML;
                    document.getElementById('visor').innerHTML = pantalla + digito
                }


function uno()  {
                    let pantalla = document.getElementById('visor').innerHTML;
                    let digito = document.getElementById("numero1").innerHTML;
                    document.getElementById('visor').innerHTML = pantalla + digito
                }


function dos()  {
                    let pantalla = document.getElementById('visor').innerHTML;
                    let digito = document.getElementById("numero2").innerHTML;
                    document.getElementById('visor').innerHTML = pantalla + digito
                }


function tres() {
                    let pantalla = document.getElementById('visor').innerHTML;
                    let digito = document.getElementById("numero3").innerHTML;
                    document.getElementById('visor').innerHTML = pantalla + digito
                }


function cuatro() {
                    let pantalla = document.getElementById('visor').innerHTML;
                    let digito = document.getElementById("numero4").innerHTML;
                    document.getElementById('visor').innerHTML = pantalla + digito
                  }


function cinco() {
                    let pantalla = document.getElementById('visor').innerHTML;
                    let digito = document.getElementById("numero5").innerHTML;
                    document.getElementById('visor').innerHTML = pantalla + digito
                 }


function seis() {
                    let pantalla = document.getElementById('visor').innerHTML;
                    let digito = document.getElementById("numero6").innerHTML;
                    document.getElementById('visor').innerHTML = pantalla + digito
                }


function siete() {
                    let pantalla = document.getElementById('visor').innerHTML;
                    let digito = document.getElementById("numero7").innerHTML;
                    document.getElementById('visor').innerHTML = pantalla + digito
                }


function ocho() {
                    let pantalla = document.getElementById('visor').innerHTML;
                    let digito = document.getElementById("numero8").innerHTML;
                    document.getElementById('visor').innerHTML = pantalla + digito
                }


function nueve() {
                    let pantalla = document.getElementById('visor').innerHTML;
                    let digito = document.getElementById("numero9").innerHTML;
                    document.getElementById('visor').innerHTML = pantalla + digito
                 }

function suma() {
                      let pantalla = document.getElementById('visor').innerHTML;
                      let operacion = document.getElementById("suma").innerHTML;
                      document.getElementById('visor').innerHTML = pantalla + operacion
                     }

function resta() {
                    let pantalla = document.getElementById('visor').innerHTML;
                    let operacion = document.getElementById("resta").innerHTML;
                    document.getElementById('visor').innerHTML = pantalla + operacion
                }
  
function producto() {
                    let pantalla = document.getElementById('visor').innerHTML;
                    let operacion = document.getElementById("multiplicacion").innerHTML;
                    document.getElementById('visor').innerHTML = pantalla + operacion
                    } 
                    
function cociente() {
                    let pantalla = document.getElementById('visor').innerHTML;
                    let operacion = document.getElementById("division").innerHTML;
                    document.getElementById('visor').innerHTML = pantalla + operacion
                    }
                    
function decimal() {
                    let pantalla = document.getElementById('visor').innerHTML;
                    let operacion = document.getElementById("decimal").innerHTML;
                    document.getElementById('visor').innerHTML = pantalla + operacion
                    } 

function resultado() {
                    let pantalla = document.getElementById('visor').innerHTML;
                    let suma = pantalla.indexOf("+");
                    let resta = pantalla.indexOf("-");
                    let producto = pantalla.indexOf("*");
                    let cociente = pantalla.indexOf("%");
                    if (suma !== -1){
                            digitos = pantalla.split("+");
                            document.getElementById('visor').innerHTML = parseInt(digitos[0]) + parseInt(digitos[1]);
                                  } else if (resta !== -1) {
                                                         digitos = pantalla.split("-");
                                                         document.getElementById('visor').innerHTML = parseInt(digitos[0]) - parseInt(digitos[1]);
                                                         } else if (producto !== -1) {
                                                                                   digitos = pantalla.split("*");
                                                                                   document.getElementById('visor').innerHTML = parseInt(digitos[0]) * parseInt(digitos[1]);
                                                                                   } else if (cociente !== -1) {
                                                                                                             digitos = pantalla.split("%");
                                                                                                             document.getElementById('visor').innerHTML = parseInt(digitos[0]) / parseInt(digitos[1]);
                                                                                                             }

                    } 

function borrar(){
                   document.getElementById('visor').innerHTML = "";
                   }

function opuesto(){
                  let pantalla = document.getElementById('visor').innerHTML;
                  let resultado = pantalla * -1;
                  document.getElementById('visor').innerHTML = resultado
                  }

function potencia(){
                   let pantalla = document.getElementById('visor').innerHTML;
                   let resultado = Math.pow(pantalla, 2);
                   document.getElementById('visor').innerHTML = resultado
                   }

function raiz(){
                let pantalla = document.getElementById('visor').innerHTML;
                let resultado = Math.sqrt(pantalla);
                document.getElementById('visor').innerHTML = resultado
                }