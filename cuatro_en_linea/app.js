// Declaracion de variables

var tablero = [

    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
]

var ocupacion = [5,5,5,5,5,5,5]

var turno = 1

var sumaTablero  = 0

var estadoPartida = "jugable"

var jugador1 = "Cesar"

var jugador2 = "Esteban"

var cronometro =  document.getElementById("cronometro");                

var cronometro_1 =  document.getElementById("cronometro_1");            

var cronometro_2 =  document.getElementById("cronometro_2");            

var tiempo_parcial = 0      // Cronometro parcial del juego, se reinicia con cada ficha pintada

var tiempo_jugador1 = 0     // Cronometro acumulativo del jugador 1

var tiempo_jugador2 = 0     // Cronometro acumulativo del jugador 2


// Desarrollo del codigo
// #####################

//Funciones
//#########


// Se encarga de pintar las fichas luego de cada click
var pintarFicha = function() {
     reiniciar_cronometro()
     for( let y = 0; y < tablero.length;y+=1){
        for(let x = 0;x < tablero[y].length;x+=1){
            let celda = document.getElementById('fila' + y + '_columna' + x)
            if(tablero[y][x] === 1){
                celda.className = "espacio jugador1"
            } else if (tablero[y][x] === 2){
                celda.className = "espacio jugador2"
            } else if (tablero[y][x] === 0){
                celda.className = "espacio"
            }
        }
    } 
}


// Determina si 4 fichas del mismo color se colocaron, de fomra consecutiva, en posicion horizontal
var finDelJuegoHorizontal = function() {                          // Si 4 lugares contiguos en forma horizontal estan ocupados por el mismo color, termina el juego.
    for( let y=0; y < tablero.length; y+=1){
       for(let x=0; x<4; x+=1){
           if(tablero[y][x] === tablero[y][x+1] && tablero[y][x+1] === tablero[y][x+2] && tablero[y][x+2] === tablero[y][x+3] && tablero[y][x] !=0){
               let ganador = vencedor(tablero[y][x])
               //alert("Gano jugador " + tablero[y][x])         // Debug
               //console.log(ganador)                           // Debug
               estadoPartida = "terminada"
               alert("Felicidades " + ganador + " has ganado la partida")
           }
       }
    }
}

// Determina si 4 fichas del mismo color se colocaron, de fomra consecutiva, en posicion vertical
var finDelJuegoVertical = function() {                          // Si 4 lugares contiguos en forma vertical estan ocupados por el mismo color, termina el juego.
    for( let x=0; x < tablero.length; x+=1){
       for(let y=0; y<3; y+=1){
           if(tablero[y][x] === tablero[y+1][x] && tablero[y+1][x] === tablero[y+2][x] && tablero[y+2][x] === tablero[y+3][x] && tablero[y][x] !=0){
            let ganador = vencedor(tablero[y][x])
            //alert("Gano jugador " + tablero[y][x])         // Debug
            //console.log(ganador)                           // Debug
            estadoPartida = "terminada"
            alert("Felicidades " + ganador + " has ganado la partida")
           }
       }
    }
}

// Determina si 4 fichas del mismo color se colocaron, de forma consecutiva, en posicion oblicua descendente (arriba-abajo)
var finDelJuegoOblicuoDescendente = function() {                 // Si 4 lugares contiguos en forma oblicua (direccion al 4to cuadrante) estan ocupados por el mismo color
        for( let y=0; y<3; y+=1){                                // finaliza el juego
            for(let x=0; x<4; x+=1){
                if(tablero[y][x] === tablero[y+1][x+1] && tablero[y+1][x+1] === tablero[y+2][x+2] && tablero[y+2][x+2] === tablero[y+3][x+3] && tablero[y][x] !=0){
                    let ganador = vencedor(tablero[y][x])
                    //alert("Gano jugador " + tablero[y][x])         // Debug
                    //console.log(ganador)                           // Debug
                    estadoPartida = "terminada"
                    alert("Felicidades " + ganador + " has ganado la partida")
                }
            }
        }
}


// Determina si 4 fichas del mismo color se colocaron, de forma consecutiva, en posicion oblicua descendente (abajo-arriba)
var finDelJuegoOblicuoAscendente = function() {                 // Si 4 lugares contiguos en forma oblicua (direccion al 1er cuadrante) estan ocupados por el mismo color
    for( let y=5; y>2; y-=1){                                   // finaliza el juego
        for(let x=0; x<4; x+=1){
            if(tablero[y][x] === tablero[y-1][x+1] && tablero[y-1][x+1] === tablero[y-2][x+2] && tablero[y-2][x+2] === tablero[y-3][x+3] && tablero[y][x] !=0){
                let ganador = vencedor(tablero[y][x])
               //alert("Gano jugador " + tablero[y][x])         // Debug
               //console.log(ganador)                           // Debug
               estadoPartida = "terminada"
               alert("Felicidades " + ganador + " has ganado la partida")
            }
        }
    }
}

// Determina si hay empate
var finDelJuegoEmpate = function() {                            // Si la sumatoria del contenido de casilleros de la tablero es igual a 63, el juego finaliza en empate.
     if(sumaTablero == 63){
        estadoPartida = "terminada"
        alert("El juego finalizo en empate")
     } 
}

var finalDelJuego = function() {
    finDelJuegoHorizontal()
    finDelJuegoVertical()
    finDelJuegoOblicuoDescendente()            
    finDelJuegoOblicuoAscendente()
    finDelJuegoEmpate()
}

// Crea una nueva partida
var nuevoJuego = function() {
    partidasJugadas()
    estadoPartida = "jugable"
    limpiaTablero()
    for(let x = 0;x < ocupacion.length;x+=1){
        ocupacion[x] = 5
    }
    pintarFicha()
    turno = 1
    sumaTablero  = 0
    tiempo_jugador1 = 0
    tiempo_jugador2 = 0
    //tiempo_jugador3 = 0
    document.getElementById("Turno").innerHTML = "Turno Jugador:" + vencedor(turno)
    document.getElementById("Turno").className = "jugador" + turno
    cronometro_1.innerHTML = "Cesar (seg) : " + tiempo_jugador1
    cronometro_2.innerHTML = "Esteban (seg) : " + tiempo_jugador2
}


// Limpia el tablero ,lo regresa a su esta primitivo (cero en todas las casillas)
var limpiaTablero = function(){
    for( let y = 0; y < tablero.length;y+=1){
        for(let x = 0;x < tablero[y].length;x+=1){
            tablero[y][x] = 0
        }
    }
}


// Continua un juego ya iniciado, en caso de no existir ninguno invoca a la funcion "nuevoJuego" para una nueva partida
var continuarJuego = function(valor){
    let partida = valor
    //console.log('valor ' + valor)      // Debug
    if(valor == null){   
        partida = localStorage.getItem('partidaActual')
        //console.log('partida ' + partida)       // Debug
    }else{
        partida = valor
        localStorage.setItem('partidaActual', partida)
    }
    let estadoPartidaAuxiliar = localStorage.getItem(partida + '_' + 'estadoPartida')
 
    if(partida !=null && estadoPartidaAuxiliar == 'jugable'){
        limpiaTablero()
        for(let y=0; y < tablero.length; y+=1){
            let cadena = localStorage.getItem(partida + "_" + 'estadoTablero' + y)
            if(cadena != null){
                tablero[y] = cadena.split(',').map(Number)
                pintarFicha()
            }
        }
        let turnoAuxiliar = localStorage.getItem(partida + "_" + 'estadoTurno')
        let ocupacionAuxiliar = localStorage.getItem(partida + "_" + 'estadoOcupacion')
        let sumaTableroAuxiliar = localStorage.getItem(partida + "_" + 'estadoSumaTablero')
        jugador1 = localStorage.getItem(partida + "_" + 'nombreJugador1')
        jugador2 = localStorage.getItem(partida + "_" + 'nombreJugador2')
        let tiempoJugador1Auxiliar = localStorage.getItem(partida + "_" + 'tiempoJugador1')
        let tiempoJugador2Auxiliar = localStorage.getItem(partida + "_" + 'tiempoJugador2')

        //console.log(turnoAuxiliar,sumaTableroAuxiliar)      // Debug
        if(ocupacionAuxiliar != null){
            ocupacion = ocupacionAuxiliar.split(',').map(Number)
            turno = Number.parseInt(turnoAuxiliar)
            sumaTablero = Number.parseInt(sumaTableroAuxiliar)
            tiempo_jugador1 = Number.parseInt(tiempoJugador1Auxiliar)
            tiempo_jugador2 = Number.parseInt(tiempoJugador2Auxiliar)
            document.getElementById("Turno").innerHTML = "Turno Jugador: " + vencedor(turno)
            document.getElementById("Turno").className = "jugador" + turno
            cronometro_1.innerHTML = jugador1 + " (seg)" + ": " + tiempo_jugador1
            cronometro_2.innerHTML = jugador2 + " (seg)" + ": " + tiempo_jugador2

        }
    }else{
        if(estadoPartidaAuxiliar == null){
            nuevoJuego()
        }else{
            alert('Juego finalizado, por favor seleccione otra partida') 
        }
    }
}


// Guarda los cambios en las partidas (estado del tablero, ocupacion del tablero, cantidad de partidas, etc)
var guardarPartida = function(y){
    
    let partida = localStorage.getItem('partidaActual')
    localStorage.setItem(partida + '_' + 'estadoTablero' + y, tablero[y])  // Guarda estado del tablero
    localStorage.setItem(partida + '_' + 'estadoOcupacion', ocupacion) // Guarda estado de la ocupacion
    localStorage.setItem(partida + '_' + 'estadoTurno', turno)         // Guarda valor del turno (1/2)
    localStorage.setItem(partida + '_' + 'estadoSumaTablero', sumaTablero)  // Guarda valor de sumaTablero
    localStorage.setItem(partida + '_' + 'estadoPartida', estadoPartida)  // Guarda el estado de la partida (jugable/terminada/null)
    localStorage.setItem(partida + '_' + 'nombreJugador1', jugador1)    // Guarda el nombre del jugador1
    localStorage.setItem(partida + '_' + 'nombreJugador2', jugador2)    // Guarda el nombre del jugador2
    localStorage.setItem(partida + '_' + 'tiempoJugador1', tiempo_jugador1)  // Guarda el acumulado en segundos del jugador1
    localStorage.setItem(partida + '_' + 'tiempoJugador2', tiempo_jugador2)  // Guarda el acumulado en segundos del jugador2
}


// Determina la cantidad de partidas jugadas y setea el valor a la partida actual
var partidasJugadas = function(){
    let partidas = 0
    let cantidadPartidas = localStorage.getItem('cantidadPartidas')
    if(cantidadPartidas != null){
        partidas = Number.parseInt(cantidadPartidas)
    } 
    partidas = partidas +1
    localStorage.setItem('cantidadPartidas', partidas)
    localStorage.setItem(partidas + '_estadoPartida', estadoPartida)
    localStorage.setItem('partidaActual', partidas)
    //console.log('partida_actual: ' + partidas)      // Debug
}


// Genera y muestra la tabla con el listado de las partidas (terminadas o en estado jugable)
var mostrarPartidasGuardadas = function(){
    let cantidadPartidas = localStorage.getItem('cantidadPartidas')
    var tabla = document.getElementById('tabla') 
    if(cantidadPartidas != null){
        let partidas = Number.parseInt(cantidadPartidas)
        for(let x = 1; x <=partidas ;x+=1){
            // Crea los elementos de la fila y las columnas (celdas)
            let fila = document.createElement('tr')
            let columna_numero_partida = document.createElement('td')
            let columna_nombre1 = document.createElement('td')
            let columna_nombre2 = document.createElement('td')
            let columna_estado = document.createElement('td')
            // Asigna un id al campo columna_numero_partida
            let nombre = "partida_" + x
            columna_numero_partida.setAttribute("id", nombre);
            // Asigna a las variables locales el valor de los campos
            let numero_partida = x
            let jugador_a = localStorage.getItem(x + "_" + 'nombreJugador1')
            let jugador_b = localStorage.getItem(x + "_" + 'nombreJugador2')
            let situacion_partida = localStorage.getItem(x + "_" + 'estadoPartida')
            // Inserta el valor obtenido dentro de las celdas creadas          
            columna_numero_partida.appendChild(document.createTextNode(numero_partida))
            columna_nombre1.appendChild(document.createTextNode(jugador_a))
            columna_nombre2.appendChild(document.createTextNode(jugador_b))
            columna_estado.appendChild(document.createTextNode(situacion_partida))
            // Agrega las celdas a la fila
            fila.appendChild(columna_numero_partida)
            fila.appendChild(columna_nombre1)
            fila.appendChild(columna_nombre2)
            fila.appendChild(columna_estado)
            // Agrega la fila a la tabla
            tabla.appendChild(fila)
        }  
    } document.getElementById('tabla').style.display = 'inline'
}

// Determina el nombre del vencedor
var vencedor = function(numero){
    var ganador = " "
    switch (numero){
        case 1:
            ganador = jugador1 
            break;
        case 2:
            ganador = jugador2
            break;
    }
    return ganador
}

// Incrementa los contadores de tiempo de los jugadores
var sumarTiempos = function(jugador,tiempo){
    switch (jugador){
        case 1:
            tiempo_jugador1 = tiempo_jugador1 + tiempo
            cronometro_1.innerHTML = vencedor(jugador) + " (seg) " + ": " + tiempo_jugador1
            break;
        case 2:
            tiempo_jugador2 = tiempo_jugador2 + tiempo
            cronometro_2.innerHTML = vencedor(jugador) + " (seg) " + ": " + tiempo_jugador2
            break;
    }
 }

// reinicia el cronometro del juego
var reiniciar_cronometro = function(){
    tiempo_parcial = 0
    cronometro.innerHTML = "Tiempo consumido: " + tiempo_parcial;
}






// Codigo principal
// ################

continuarJuego(null)

var tiempo = window.setInterval(function(){
    tiempo_parcial++;
    cronometro.innerHTML = "Tiempo consumido: " + tiempo_parcial;
},1000);

document.getElementById("Turno").innerHTML = "Turno Jugador:" + vencedor(turno)
for( let y = 0; y < tablero.length; y+=1){
    for(let x = 0;x < tablero[y].length; x+=1){
        let celda = document.getElementById('fila' + y + '_columna' + x)
        celda.onclick = function(){     
        let y = ocupacion[x]
        tablero[y][x] = turno
        ocupacion[x] = ocupacion[x] - 1
        sumaTablero = sumaTablero + turno
        sumarTiempos(turno,tiempo_parcial)              
        turno = turno === 1 ? 2 : 1  // operador ternario . si turno=1 , le asigna 2... sino asigna 1
        document.getElementById("Turno").innerHTML = "Turno Jugador:" + vencedor(turno)
        document.getElementById("Turno").className = "jugador" + turno
        pintarFicha()
        finalDelJuego()
        guardarPartida(y)
        }
        let reiniciar = document.getElementById('reiniciar')
        reiniciar.onclick = nuevoJuego
        let mostrarPartidas = document.getElementById('partidas_guardadas')
        mostrarPartidas.onclick = function(){
            mostrarPartidasGuardadas()
            let cantidadPartidas = localStorage.getItem('cantidadPartidas')
            for(let x = 1; x <= cantidadPartidas; x+=1){
                let juego = document.getElementById('partida_' + x)
                //alert(juego)                                              // Debug
                juego.onclick = function(){
                    let juego_valor = juego.innerHTML
                    //alert(juego_valor)                                    // Debug
                    continuarJuego(juego_valor)
                }
            }
        }
    }
}



