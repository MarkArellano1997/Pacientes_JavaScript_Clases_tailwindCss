//Variables
const pacienteInput = document.querySelector('#paciente')
const propietarioInput = document.querySelector('#propietario')
const emailInput = document.querySelector('#email')
const telefonoInput = document.querySelector('#telefono')
const fechaInput = document.querySelector('#fecha')
const sintomasInput = document.querySelector('#sintomas')
const inputSubmit = document.querySelector('#formulario-cita input[type="submit"]')
const formulario = document.querySelector('#formulario-cita')
const contenedorCitas = document.querySelector('#citas')

const citasOBJ = {
    id: generarId(),
    paciente: '',
    propietario: '',
    email: '',
    telefono: '',
    fecha: '',
    sintomas: ''
}

//eventos

pacienteInput.addEventListener('input', sincronizarCitasObj)
propietarioInput.addEventListener('input', sincronizarCitasObj)
emailInput.addEventListener('input', sincronizarCitasObj)
telefonoInput.addEventListener('input', sincronizarCitasObj)
fechaInput.addEventListener('input', sincronizarCitasObj)
sintomasInput.addEventListener('input', sincronizarCitasObj)
inputSubmit.addEventListener('click', validarFormulario)

//classes

class Notificacion {

    constructor({ mensaje, tipo }) {
        this.mensaje = mensaje;
        this.tipo = tipo

        this.crear()
    }

    crear() {
        const divNotificacion = document.createElement('DIV')
        const divNotificacionAntigua = document.querySelector('.alert')
        divNotificacionAntigua?.remove()
        divNotificacion.textContent = this.mensaje
        divNotificacion.classList.add('text-center', 'text-sm', 'text-white', 'font-bold', 'my-5', 'p-3', 'alert', 'w-full', 'uppercase')
        this.tipo === 'error' ? divNotificacion.classList.add('bg-red-500') : divNotificacion.classList.add('bg-green-500')
        formulario.parentElement.insertBefore(divNotificacion, formulario)

        setTimeout(() => {
            divNotificacion.remove()
        }, 3000);
    }
}

class Citas {

    constructor() {
        this.citas = []
    }

    agregarArray(citas) {

        this.citas = [...this.citas, citas]
        this.crearMostrar()

    }

    editarCitar(citaActualizar) {
        this.citas = this.citas.map(cita => cita.id === citaActualizar.id ? citaActualizar : cita)
        this.crearMostrar()
    }

    eliminarCita(id){
        this.citas = this.citas.filter(cita => cita.id !== id)
        this.crearMostrar()
    }

    crearMostrar() {

        this.limpiar()

        if (this.citas.length ===0) {
            contenedorCitas.innerHTML = `<p class="text-xl mt-5 mb-10 text-center">No Hay Pacientes</p>`
            return
        }

        this.citas.forEach(cita => {
            const divCita = document.createElement('div');
            divCita.classList.add('mx-5', 'my-10', 'bg-white', 'shadow-md', 'px-5', 'py-10', 'rounded-xl', 'p-3');

            const paciente = document.createElement('p');
            paciente.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
            paciente.innerHTML = `<span class="font-bold uppercase">Paciente: </span> ${cita.paciente}`;

            const propietario = document.createElement('p');
            propietario.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
            propietario.innerHTML = `<span class="font-bold uppercase">Propietario: </span> ${cita.propietario}`;

            const email = document.createElement('p');
            email.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
            email.innerHTML = `<span class="font-bold uppercase">E-mail: </span> ${cita.email}`;

            const telefono = document.createElement('p');
            telefono.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
            telefono.innerHTML = `<span class="font-bold uppercase">Teléfono: </span> ${cita.telefono}`;

            const fecha = document.createElement('p');
            fecha.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
            fecha.innerHTML = `<span class="font-bold uppercase">Fecha: </span> ${cita.fecha}`;

            const sintomas = document.createElement('p');
            sintomas.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
            sintomas.innerHTML = `<span class="font-bold uppercase">Síntomas: </span> ${cita.sintomas}`;

            const divBotones = document.createElement('DIV')
            divBotones.classList.add('flex', 'justify-between')

            const btnEditar = document.createElement('button');
            btnEditar.classList.add('py-2', 'px-10', 'bg-indigo-600', 'hover:bg-indigo-700', 'text-white', 'font-bold', 'uppercase', 'rounded-lg', 'flex', 'items-center', 'gap-2');
            btnEditar.innerHTML = 'Editar <svg fill="none" class="h-5 w-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>'

            btnEditar.onclick = () => sincronizarInput(cita)

            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('py-2', 'px-10', 'bg-red-600', 'hover:bg-red-700', 'text-white', 'font-bold', 'uppercase', 'rounded-lg', 'flex', 'items-center', 'gap-2');
            btnEliminar.innerHTML = 'Eliminar <svg fill="none" class="h-5 w-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'

            btnEliminar.onclick = ()=>this.eliminarCita(cita.id)

            // Agregar al HTML
            divCita.appendChild(paciente);
            divCita.appendChild(propietario);
            divCita.appendChild(email);
            divCita.appendChild(telefono);
            divCita.appendChild(fecha);
            divCita.appendChild(sintomas);
            divBotones.appendChild(btnEditar)
            divBotones.appendChild(btnEliminar)
            divCita.appendChild(divBotones)
            contenedorCitas.appendChild(divCita);

        });

    }

    limpiar() {
        while (contenedorCitas.firstChild) {
            contenedorCitas.removeChild(contenedorCitas.firstChild)
        }
    }
}

const citas = new Citas()

//funciones
let editando = false

function sincronizarCitasObj(e) {
    citasOBJ[e.target.name] = e.target.value
}

function validarFormulario(e) {

    e.preventDefault()

    if (Object.values(citasOBJ).some(cita => cita.trim() === '')) {
        new Notificacion({
            mensaje: 'Todos los campos son obligatorios',
            tipo: 'error'
        })

        return
    }

    if (editando) {

        citas.editarCitar({...citasOBJ})

        new Notificacion({
            mensaje: 'Cambios guardados correctamente',
            tipo: 'exito'
        })
    } else {

        citas.agregarArray({ ...citasOBJ })

        new Notificacion({
            mensaje: 'La cita se creo correctamente',
            tipo: 'exito'
        })
    }

    vaciarCitasObj()
    formulario.reset()

    inputSubmit.value = 'Registrar Paciente'
}

function generarId() {
    return Math.random().toString(32).substring(2) + Date.now()
}

function vaciarCitasObj() {
    citasOBJ.id = generarId()
    citasOBJ.paciente = ''
    citasOBJ.propietario = ''
    citasOBJ.email = ''
    citasOBJ.telefono = ''
    citasOBJ.fecha = ''
    citasOBJ.sintomas = ''
}

function sincronizarInput(cita) {
    pacienteInput.value = cita.paciente
    propietarioInput.value = cita.propietario
    emailInput.value = cita.email
    telefonoInput.value = cita.telefono
    fechaInput.value = cita.fecha
    sintomasInput.value = cita.sintomas

    Object.assign(citasOBJ, cita)
    editando = true

    inputSubmit.value = 'Actualizar Paciente'

}