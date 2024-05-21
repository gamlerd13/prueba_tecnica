<template>
    <div class="flex flex-col justify-center">
        <h2 class="text-center m-2">Editar Alumno</h2>

        <p class="text-center text-rose-600 text-2xl">Funcionalidad no permitida</p>
        <div class="flex justify-center " disable>
            <form class="w-full max-w-lg border-2 p-4 rounded" @submit.prevent="submitForm">
                <div class="mb-5">
                    <label for="nombres" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombres
                        del
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
                    <label for="correo"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Correo</label>
                    <input type="text" id="correo" v-model="alumno.correo" class="input-field rounded w-full p-2"
                        placeholder="example: asdff@gmail.com" required />
                </div>
                <div class="mb-5">
                    <label for="codigo"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Codigo</label>
                    <input type="text" id="codigo" v-model="alumno.codigo" class="input-field rounded w-full p-2"
                        placeholder="example: AXSAAA" required />
                </div>


                <button type="submit" class="btn-submit w-full">Enviar</button>
            </form>
        </div>
    </div>

</template>


<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const route = useRoute();
const alumno = ref({
    nombres: '',
    apellidos: '',
    correo: '',
    codigo: ''
});

const fetchAlumno = async () => {
    const id = route.params.id; // Obtener el ID de la ruta dinámica
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/alumno/${id}`);
        alumno.value = response.data;
    } catch (error) {
        console.error('Error al obtener el alumno:', error);
    }
};

onMounted(fetchAlumno);

const submitForm = async () => {
    const id = route.params.id; // Obtener el ID de la ruta dinámica
    try {
        const response = await axios.put(`${import.meta.env.VITE_API_URL}/alumnos/${id}`, alumno.value);
        if (response.status === 200) {
            router.push(`/alumno/${id}`);
        }
    } catch (error) {
        console.error('Error al enviar el formulario:', error);
    }
};
</script>
