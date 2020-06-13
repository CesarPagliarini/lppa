var estado = [

    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
]

var turno = 1

var pintarFicha = function() {
    for( let y = 0; y < estado.length;y+=1){
        for(let x = 0;x < estado[y].length;x+=1){
            let celda = document.getElementById('fila' + y + '_columna' + x)
            if(estado[y][x] === 1){
                celda.className = "espacio jugador1"
            } else if (estado[y][x] === 2){
                celda.className = "espacio jugador2"
            }
        }
    }
}

for( let y = 0; y < estado.length;y+=1){
    for(let x = 0;x < estado[y].length;x+=1){
        let celda = document.getElementById('fila' + y + '_columna' + x)
        celda.onclick = function(){
            if (estado[y][x] == 0){
            estado[y][x] = turno
            turno = turno === 1 ? 2 : 1  // operador ternario . si turno=1 , le asigna 2... sino asigna 1
            document.getElementById("Turno").innerHTML = "Turno Jugador:" + turno
            document.getElementById("Turno").className = "jugador" + turno
            pintarFicha()
            }
        }
    }
}

pintarFicha()


