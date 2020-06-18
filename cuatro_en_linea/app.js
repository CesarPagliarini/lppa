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


// Desarrollo del codigo
// #####################

//Funciones

var pintarFicha = function() {
    for( let y = 0; y < tablero.length;y+=1){
        for(let x = 0;x < tablero[y].length;x+=1){
            let celda = document.getElementById('fila' + y + '_columna' + x)
            if(tablero[y][x] === 1){
                celda.className = "espacio jugador1"
            } else if (tablero[y][x] === 2){
                celda.className = "espacio jugador2"
            }
        }
    }
}

var finDelJuegoHorizontal = function() {                          // Si 4 lugares contiguos en forma horizontal estan ocupados por el mismo color, termina el juego.
    for( let y=0; y < tablero.length; y+=1){
       for(let x=0; x<4; x+=1){
           if(tablero[y][x] === tablero[y][x+1] && tablero[y][x+1] === tablero[y][x+2] && tablero[y][x+2] === tablero[y][x+3] && tablero[y][x] !=0){
               alert("Fin del juego")
           }
       }
    }
}

var finDelJuegoVertical = function() {                          // Si 4 lugares contiguos en forma vertical estan ocupados por el mismo color, termina el juego.
    for( let x=0; x < tablero.length; x+=1){
       for(let y=0; y<3; y+=1){
           if(tablero[y][x] === tablero[y+1][x] && tablero[y+1][x] === tablero[y+2][x] && tablero[y+2][x] === tablero[y+3][x] && tablero[y][x] !=0){
               alert("Fin del juego")
           }
       }
    }
}

var finDelJuegoOblicuoDescendente = function() {                 // Si 4 lugares contiguos en forma oblicua (direccion al 4to cuadrante) estan ocupados por el mismo color
        for( let y=0; y<3; y+=1){                                // finaliza el juego
            for(let x=0; x<4; x+=1){
                if(tablero[y][x] === tablero[y+1][x+1] && tablero[y+1][x+1] === tablero[y+2][x+2] && tablero[y+2][x+2] === tablero[y+3][x+3] && tablero[y][x] !=0){
                    alert("Fin del juego")
                }
            }
        }
}

var finDelJuegoOblicuoAscendente = function() {                 // Si 4 lugares contiguos en forma oblicua (direccion al 1er cuadrante) estan ocupados por el mismo color
    for( let y=5; y>2; y-=1){                                   // finaliza el juego
        for(let x=0; x<4; x+=1){
            if(tablero[y][x] === tablero[y-1][x+1] && tablero[y-1][x+1] === tablero[y-2][x+2] && tablero[y-2][x+2] === tablero[y-3][x+3] && tablero[y][x] !=0){
                alert("Fin del juego")
            }
        }
    }
}


var finalDelJuego = function() {
    finDelJuegoHorizontal()
    finDelJuegoVertical()
    finDelJuegoOblicuoDescendente()            
    finDelJuegoOblicuoAscendente()
}


// Codigo principal
// ################

for( let y = 0; y < tablero.length; y+=1){
    for(let x = 0;x < tablero[y].length; x+=1){
        let celda = document.getElementById('fila' + y + '_columna' + x)
        celda.onclick = function(){
            let y = ocupacion[x]
            tablero[y][x] = turno
            ocupacion[x] = ocupacion[x] - 1
            turno = turno === 1 ? 2 : 1  // operador ternario . si turno=1 , le asigna 2... sino asigna 1
            document.getElementById("Turno").innerHTML = "Turno Jugador:" + turno
            document.getElementById("Turno").className = "jugador" + turno
            pintarFicha()
            finalDelJuego()
        }
    }
}




