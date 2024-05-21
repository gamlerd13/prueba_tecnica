<template>
    <div class="container mx-auto mt-10 text-black">
        <h2 class=" text-2xl font-bold mb-6">Actualizar Cursos</h2>
        <table class="min-w-full bg-white border border-gray-200">
            <thead>
                <tr class="bg-gray-200">
                    <th class="py-2 px-4 border-b">Nombre</th>
                    <th class="py-2 px-4 border-b">Categoría</th>
                    <th class="py-2 px-4 border-b">Descripción</th>
                    <th class="py-2 px-4 border-b">Cantidad Alumnos</th>
                    <th class="py-2 px-4 border-b">Inicio</th>
                    <th class="py-2 px-4 border-b">Fin</th>
                    <th class="py-2 px-4 border-b">Precio</th>
                    <th class="py-2 px-4 border-b">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="curso in cursos" :key="curso.id" class="border-b">
                    <td class="py-2 px-4">{{ curso.nombre }}</td>
                    <td class="py-2 px-4">{{ curso.categoria }}</td>
                    <td class="py-2 px-4">{{ curso.descripcion }}</td>
                    <td class="py-2 px-4">{{ curso.cantidadAlumnos }}</td>
                    <td class="py-2 px-4">{{ curso.inicio }}</td>
                    <td class="py-2 px-4">{{ curso.fin }}</td>
                    <td class="py-2 px-4">{{ curso.precio }}</td>
                    <td class="py-2 px-4">
                        <button @click="editCurso(curso)"
                            class="bg-blue-500 text-white px-3 py-1 rounded">Editar</button>
                        <button @click="deleteCurso(curso.id)"
                            class="bg-red-500 text-white px-3 py-1 rounded ml-2">Eliminar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const cursos = ref([]);
const router = useRouter();


const fetchCursos = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/cursos`);
        let data = response.data
        data = data.map((curso) => {
            if (typeof curso.categoria == "string") {
                return curso.categoria = curso.categoria.split(" ")
            } else {
                return curso
            }
        })
        cursos.value = data;
    } catch (error) {
        console.error('Error al obtener los cursos:', error);
    }
};



const editCurso = (curso) => {
    router.push(`/cursos/${curso.id}`);
};


// logica para eliminar curso
const deleteCurso = async (id) => {
    try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/cursos/${id}`);
        cursos.value = cursos.value.filter(curso => curso.id !== id);
        console.log(` Se elimino el curso con id ${id} `)
    } catch (error) {
        console.error('Error al eliminar el curso:', error);
    }
};

onMounted(fetchCursos);
</script>

<style scoped>
/* Tus estilos aquí */
</style>