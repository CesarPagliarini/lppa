// Desarrollo del codigo


//Funciones

var mostrar_listado = function(respuesta_en_json){
    var tabla = document.getElementById('tabla')
    for(let y = 0; y < respuesta_en_json.data.length;y+=1){
        // Crea los elementos de la fila y las columnas (celdas)
         let fila = document.createElement('tr')
         let columna_id = document.createElement('td')
         let columna_nombre = document.createElement('td')
         let columna_salario = document.createElement('td')
         let columna_edad = document.createElement('td')
         // Asigna a las variables locales el valor de los campos
         let id = respuesta_en_json.data[y].id
         let nombre = respuesta_en_json.data[y].employee_name
         let salario = respuesta_en_json.data[y].employee_salary
         let edad = respuesta_en_json.data[y].employee_age
         //console.log(id,nombre,salario,edad)                      //Debug
         // Inserta el valor obtenido dentro de las celdas creadas          
         columna_id.appendChild(document.createTextNode(id))
         columna_nombre.appendChild(document.createTextNode(nombre))
         columna_salario.appendChild(document.createTextNode(salario))
         columna_edad.appendChild(document.createTextNode(edad))
         // Agrega las celdas a la fila
         fila.appendChild(columna_id)
         fila.appendChild(columna_nombre)
         fila.appendChild(columna_salario)
         fila.appendChild(columna_edad)
         // Agrega la fila a la tabla
         tabla.appendChild(fila)
     }
     localStorage.setItem('datos', JSON.stringify(respuesta_en_json))
     document.getElementById('mensaje').style.display = 'none'
}


// Codigo principal
// ################

// Verifica si existen datos guardados en el LocalStorage, si es asi muestra el mensaje "Actualizando" en // lugar de "Cargando"
let datos_guardados = localStorage.getItem('datos')
        if(datos_guardados != null){
            document.getElementById('mensaje').innerHTML = "Actualizando"
        }

//fetch('http://dummy.restaexample.com/api/v1/employees')                          //Para prueba del catch
fetch('http://dummy.restapiexample.com/api/v1/employees')
    .then(function(respuesta){
        respuesta.json()
            .then(function(respuesta_en_json){
               //console.log(respuesta_en_json)                                     //Debug
               mostrar_listado(respuesta_en_json)
            })
    })

    .catch(function(error){
        let listado = JSON.parse(localStorage.getItem('datos'))
        //console.log(JSON.parse(listado))                                          //Debug

        if (listado != null){
            mostrar_listado(listado)
        } else {
            document.getElementById('mensaje').innerHTML = 'Fallo la conexion con la API externa y no poseemos datos guardados para su consulta'
            document.getElementById('tabla').style.display = 'none'
        }
    })