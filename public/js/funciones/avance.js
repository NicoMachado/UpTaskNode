import Swal from 'sweetalert2';

export const actualizarAvance = () => {
    //Seleccionar las tareas Existentes

    const tareas = document.querySelectorAll('li.tarea');
    if (tareas.length) {
        //Seleccionar las tareas completadas

        const tareasCompletas = document.querySelectorAll('i.completo');

        //Calcular Avance
        const avance = Math.round((tareasCompletas.length / tareas.length) * 100) ;

        //Mostrar Avance
        const porcentaje = document.querySelector('#porcentaje');
        porcentaje.style.width = avance + '%';

        if (avance === 100) {
            Swal.fire(
                'Completaste el proyecto !',
                'Felicidades has completado el proyecto!',
                'success'
                );
        }
    }

}