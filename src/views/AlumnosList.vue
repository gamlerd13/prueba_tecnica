<template>

    <div class="flex flex-col">

        <div v-if="mensaje" class="{{ mensaje.color }}">
            <h3 class="{{ mensaje.color }}">{{ mensaje.mensaje }}</h3>
        </div>
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div class="overflow-hidden">
                    <table class="min-w-full text-left text-sm font-light text-surface dark:text-white">
                        <thead class="border-b border-neutral-200 font-medium dark:border-white/10">
                            <tr>
                                <th scope="col" class="px-6 py-4">#id</th>
                                <th scope="col" class="px-6 py-4">Nombres</th>
                                <th scope="col" class="px-6 py-4">Apellidos</th>
                                <th scope="col" class="px-6 py-4">Email</th>
                                <th scope="col" class="px-6 py-4">Código</th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="alumno in alumnos" :key="alumno.id"
                                class="border-b border-neutral-200 dark:border-white/10">
                                <td class="wrap px-6 py-4 font-medium">{{ alumno.id }}</td>
                                <td class="wrap px-6 py-4">{{ alumno.nombres }}</td>
                                <td class="wrap px-6 py-4">{{ alumno.apellidos }}</td>
                                <td class="wrap px-6 py-4">{{ alumno.correo }}</td>
                                <td class="whitespace-nowrap px-6 py-4">{{ alumno.codigo }}</td>
                                <td class="whitespace-nowrap px-6 py-4">
                                    <button @click="editAlumno(alumno)"
                                        class="bg-blue-500 text-white px-3 py-1 rounded">Editar</button>
                                    <button @click="deleteAlumno(alumno.id)"
                                        class="bg-red-500 text-white px-3 py-1 rounded ml-2">Eliminar</button>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const alumnos = ref([]);
const mensaje = ref("");
const router = useRouter();


const fetchAlumnos = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/alumnos`);
        const data = response.data
        alumnos.value = data;
    } catch (error) {
        console.error('Error al obtener los alumnos:', error);
    }
};



const editAlumno = (alumno) => {
    router.push(`/alumno/${alumno.id}/edit`);
};

// mensaje

const mostrarMensaje = () => {
    setTimeout(() => {
        mensaje.value = "";
    }, 3000);
};
// logica para eliminar curso
const deleteAlumno = async (id) => {

    try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/alumnos/${id}`);
        alumnos.value = alumnos.value.filter(alumno => alumno.id !== id);

        let renderMensaje = { mensaje: `El alumno con id ${id} se eliminó exitosamente`, color: "bg-green-600" }
        mensaje.value = renderMensaje
        mostrarMensaje(renderMensaje)

    } catch (error) {
        let renderMensaje = { mensaje: "Error al crear alumno", tipo: "bg-rose-600" }
        mensaje.value = renderMensaje
        mostrarMensaje(renderMensaje)
    }
};

onMounted(fetchAlumnos);
</script>

<style scoped>
/* Tus estilos aquí */
</style>