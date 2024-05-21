<template>

    <div class="flex flex-col">

        <div v-if="mensaje" class="{{ mensaje.tipo }}">
            <h3 class="{{ mensaje.tipo }}">{{ mensaje.mensaje }}</h3>
        </div>
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div class="overflow-hidden">
                    <table class="min-w-full text-left text-sm font-light text-surface dark:text-white">
                        <thead class="border-b border-neutral-200 font-medium dark:border-white/10">
                            <tr>
                                <th scope="col" class="px-6 py-4">#id</th>
                                <th scope="col" class="px-6 py-4">Nombre</th>
                                <th scope="col" class="px-6 py-4">Categoría</th>
                                <th scope="col" class="px-6 py-4">Descripción</th>
                                <th scope="col" class="px-6 py-4">Cantidad</th>
                                <th scope="col" class="px-6 py-4">Inicio</th>
                                <th scope="col" class="px-6 py-4">Fin</th>
                                <th scope="col" class="px-6 py-4">Precio</th>
                                <th scope="col" class="px-6 py-4">Alumnos</th>
                                <th scope="col" class="px-6 py-4">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="curso in cursos" :key="curso.id"
                                class="border-b border-neutral-200 dark:border-white/10">
                                <td class="wrap px-6 py-4 font-medium">{{ curso.id }}</td>
                                <td class="wrap px-6 py-4">{{ curso.nombre }}</td>
                                <td class="wrap px-6 py-4">{{ curso.categoria }}</td>
                                <td class="wrap px-6 py-4">{{ curso.descripcion }}</td>
                                <td class="whitespace-nowrap px-6 py-4">{{ curso.cantidadAlumnos }}</td>
                                <td class="whitespace-nowrap px-6 py-4">{{ curso.inicio }}</td>
                                <td class="whitespace-nowrap px-6 py-4">{{ curso.fin }}</td>
                                <td class="whitespace-nowrap px-6 py-4">{{ curso.precio }}</td>
                                <td class="wrap px-6 py-4">{{ curso.alumnos }}</td>
                                <td class="whitespace-nowrap px-6 py-4">
                                    <button @click="editCurso(curso)"
                                        class="bg-blue-500 text-white px-3 py-1 rounded">Editar</button>
                                    <button @click="deleteCurso(curso.id)"
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

const cursos = ref([]);
const mensaje = ref("");
const router = useRouter();


const arrayToStringAlunos = (curso_alumnos) => {
    curso_alumnos.map(e => {
        if (e) {
            return e.alumno.nombres
        }
        else {
            return e
        }
    }).toString()
}


const fetchCursos = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/cursos`);
        let data = response.data.map((curso) => {
            if (Array.isArray(curso.categoria)) {
                return {
                    ...curso,
                    categoria: curso.categoria.toString(),
                    alumnos: arrayToStringAlunos(curso.alumnos)
                };
            } else {
                return {
                    ...curso,
                    alumnos: curso.alumnos.map(e => {
                        if (e) {
                            return e.alumno.nombres
                        }
                        else {
                            return e
                        }
                    }).toString()
                }
            }
        })
        cursos.value = data;
    } catch (error) {
        console.error('Error al obtener los cursos:', error);
    }
};



const editCurso = (curso) => {
    router.push(`/curso/${curso.id}/edit`);
};

// mensaje

const mostrarMensaje = () => {
    setTimeout(() => {
        mensaje.value = "";
    }, 3000);
};
// logica para eliminar curso
const deleteCurso = async (id) => {

    try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/cursos/${id}`);
        cursos.value = cursos.value.filter(curso => curso.id !== id);

        let renderMensaje = { mensaje: `El curso con id ${id} se eliminó exitosamente`, color: "bg-green-600" }
        mensaje.value = renderMensaje
        mostrarMensaje(renderMensaje)

    } catch (error) {
        let renderMensaje = { mensaje: "Error al crear curso", tipo: "bg-rose-600" }
        mensaje.value = renderMensaje
        mostrarMensaje(renderMensaje)
    }
};

onMounted(fetchCursos);
</script>

<style scoped>
/* Tus estilos aquí */
</style>