<template>
    <h2 class="text-center m-2">Agregar Nuevo Alumno</h2>
    <p v-if="mensaje" class="text-2xl text-center m-2 text-green-600">Agregar Nuevo Alumno</p>

    <div class="flex justify-center ">
        <form class="w-full max-w-lg border-2 p-4 rounded" @submit.prevent="submitForm">
            <div class="mb-5">
                <label for="nombres" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombres del
                    Alumno</label>
                <input type="text" id="nombres" v-model="alumno.nombres" class="input-field rounded w-full"
                    placeholder="..." required />
            </div>
            <div class="mb-5">
                <label for="apellidos"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Apellidos</label>
                <input type="text" id="apellidos" v-model="alumno.apellidos" class="input-field rounded w-full p-2"
                    placeholder="..." required />
            </div>
            <div class="mb-5">
                <label for="correo" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Correo</label>
                <input type="email" id="correo" v-model="alumno.correo" class="input-field rounded w-full p-2"
                    placeholder="example: asdff@gmail.com" required />
            </div>
            <div v-if="mensaje" class="bg-rose-600">
                <h3 class="{{ mensaje.color }}">{{ mensaje.mensaje }}</h3>
            </div>
            <div class="mb-5">
                <label for="codigo" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Codigo</label>
                <input type="text" id="codigo" v-model="alumno.codigo" class="input-field rounded w-full p-2"
                    placeholder="example: AXSAAA" required />
            </div>


            <button type="submit" class="btn-submit w-full">Enviar</button>
        </form>
    </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
const router = useRouter();

const alumno = ref({
    nombres: '',
    apellidos: '',
    correo: '',
    codigo: ''
});
const mensaje = ref("");

const mostrarMensaje = () => {
    setTimeout(() => {
        mensaje.value = "";
    }, 2000);//simular tiempo
};


const submitForm = async () => {

    // validad dni fronted
    let alumno_correo = alumno.value.correo
    let messajeServiceAllow = alumno_correo.split("@")[1]
    if (messajeServiceAllow !== "gmail.com" && messajeServiceAllow !== "outlook.com") {
        let renderMensaje = { mensaje: "solo dominios @outlook.com y @gmail.com por favor", color: "bg-rose-600" }
        mensaje.value = renderMensaje
        mostrarMensaje(renderMensaje)
        return
    }


    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/alumnos`, alumno.value);
        if (response.status == "201") {
            let renderMensaje = { mensaje: "Registro creado con exito", color: "bg-rose-600" }
            mensaje.value = renderMensaje
            mostrarMensaje(renderMensaje)
            router.push(`/alumno/${response.data.id}`);
        }
    } catch (error) {
        console.error('Error al enviar el formulario:', error);
    }
};
</script>
