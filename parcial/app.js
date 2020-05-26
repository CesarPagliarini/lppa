var formulario = document.getElementById("formulario");
formulario.onsubmit = function(evt) {
                                    evt.preventDefault()
                                    let nombre = formulario.elements['nombre'].value
                                    let apellido = formulario.elements['apellido'].value
                                    let email = formulario.elements['email'].value
                                    let edad = formulario.elements['edad'].value
                                    let sexo = formulario.elements['sexo'].value
                                    let musica = document.forms['formulario']["musica"].checked
                                    let deportes = document.forms['formulario']["deportes"].checked
                                    let juegos = document.forms['formulario']["juegos"].checked
                                    let tecnologia = document.forms['formulario']["tecnologia"].checked
                                    let pais = formulario.elements['pais'].value
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
                                                        /*Verifica que el numero ingresa este dentro del rango 0 - 100*/ 
                                                    }else if (edad>100 || edad<0)
                                                            {
                                                                alert("La edad permitida es de 0 a 100 años")
                                                                return false
                                                                /*Valida que al menos una de las opciones sea seleccionada*/
                                                            } else if (musica == false && deportes == false && juegos == false && tecnologia == false)
                                                                   {  
                                                                    alert("Debes seleccionar al menos una de las opciones")
                                                                    return false
                                                                   } else 
                                                                   console.log(nombre,apellido,email,edad,sexo,pais,musica,deportes,juegos,tecnologia,comentario)
                                    }