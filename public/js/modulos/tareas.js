import axios from "axios";
import Swal from 'sweetalert2';

import {actualizarAvance} from '../funciones/avance';

const tareas = document.querySelector('.listado-pendientes')

if (tareas) {
    tareas.addEventListener('click', e => {
        //console.log(e.target.classList);
        if (e.target.classList.contains('fa-check-circle')) {
            
            const icono = e.target;
            const idTarea = icono.parentElement.parentElement.dataset.tarea;

            const url = `${location.origin}/tareas/${idTarea}`;
            
            axios.patch(url, { idTarea })
                .then( function(res){
                    console.log(res);
                    if (res.status === 200 ){
                        icono.classList.toggle('completo');
                        actualizarAvance();
                    }
                })
        }

        
        if (e.target.classList.contains('fa-trash')) {
            const tareaHTML = e.target.parentElement.parentElement,
                idTarea = tareaHTML.dataset.tarea;
                Swal.fire({
                    title: 'Desea borrar esta tarea?',
                    text: "Confirme que desea eliminar la tarea!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si!, Borrar!',
                    cancelButtonText: 'No!, cancelar'
                  }).then((result) => {
                    if (result.value){
                        //Enviar el Delete por medio de Axios
                        const url = `${location.origin}/tareas/${idTarea}`;
                        axios.delete(url, {params: {idTarea}})  
                            .then( function(res) {
                                console.log(res)
                                if (res.status === 200) {
                                    //Eliminar el Nodo
                                    tareaHTML.parentElement.removeChild(tareaHTML);
                                }
                                Swal.fire(
                                    'Tarea Eliminada!',
                                    res.data,
                                    'success'
                                    );
                                actualizarAvance();
                            })
                            .catch(()=> {
                                Swal.fire({
                                    type: 'error',
                                    title: 'Hubo un error',
                                    text: 'No se pudo eliminar la tarea!'
                                }
                                )
                            })


                    }  
                    // if (result.isConfirmed) {
                    //     //Enviar Peticion a Axios
                    // }
                  })
        }
    })
}

export default tareas;