import Swal from 'sweetalert2';
import axios from 'axios';

const btnEliminar = document.querySelector('#eliminar-proyecto');

if (btnEliminar) {
    btnEliminar.addEventListener('click', e => {
        const urlProyecto = e.target.dataset.proyectoUrl;
        //console.log(urlProyecto);

        Swal.fire({
            title: 'Esta Seguro?',
            text: "Confirma que desea eliminar el proyecto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si!, Borrar!',
            cancelButtonText: 'No!, cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
                //Enviar Peticion a Axios
                const url = `${location.origin}/proyectos/${urlProyecto}`;
                console.log(url);

                axios.delete(url, {params: {urlProyecto}})  
                    .then( function(res) {
                            console.log(res);

                            Swal.fire(
                                'Proyecto Eliminado!',
                                res.data,
                                'success'
                              );

                              //redireccionar al Inicio
                            //   setTimeout(()=> {
                            //         window.location.href = '/'
                            //   }, 3000)
                
                    })
                    .catch(()=> {
                        Swal.fire({
                            type: 'error',
                            title: 'Hubo un error',
                            text: 'No se pudo eliminar el proyecto'
                        }

                        )
                    })


            }
          })
    })
}

export default btnEliminar;