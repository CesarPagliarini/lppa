var formulario = document.getElementById("formulario");

formulario.onsubmit = function(evt) {
    evt.preventDefault()
    let nombre = formulario.elements['nombre'].value
    let apellido = formulario.elements['apellido'].value
    let comentario = formulario.elements['comentarios'].value
    /*Verifica la longitud de los campos Nombre y Apellidos*/
    if (nombre.length<3 || apellido.length<3) 
        {
            alert("La longitud minima de los campos Nombre y Apellido es de 3 caracteres")     
            return false
            /*Verifica que no se ingresen numeros*/ 
        } else if(!isNaN(nombre) || !isNaN(apellido))
            {
                alert("Los campos Nombre y Apellido solo admiten letras")     
                return false
            }else if (comentario.length<5)
                {
                    alert('La longitud del comentario debe ser de al menos 5 caracteres')
                }
}
