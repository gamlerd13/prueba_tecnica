<template>
    <div>
        <form class="max-w-sm mx-auto" @submit.prevent="submitForm">
            <div class="mb-5">
                <label for="nombre" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre del
                    Curso</label>
                <input type="text" id="nombre" v-model="curso.nombre" class="input-field"
                    placeholder="Ejemplo: Matemática" required />
            </div>
            <div class="mb-5">
                <label for="categoria"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Categoría</label>
                <input type="text" id="categoria" v-model="curso.categoria" class="input-field"
                    placeholder="Ejemplo: Química" required />
            </div>
            <div class="mb-5">
                <label for="descripcion"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descripción del curso</label>
                <textarea id="descripcion" v-model="curso.descripcion" class="input-field"
                    placeholder="Ejemplo: Curso dirigido sin créditos" required></textarea>
            </div>
            <div class="mb-5">
                <label for="cantidad" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cantidad de
                    alumnos</label>
                <input type="number" id="cantidad" v-model="curso.cantidadAlumnos" class="input-field"
                    placeholder="Ejemplo: 20" required />
            </div>
            <div class="mb-5">
                <label for="f_inicio" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha de
                    inicio</label>
                <input type="date" id="f_inicio" v-model="curso.inicio" class="input-field" required />
            </div>
            <div class="mb-5">
                <label for="f_fin" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha de
                    fin</label>
                <input type="date" id="f_fin" v-model="curso.fin" class="input-field" required />
            </div>
            <div class="mb-5">
                <label for="precio" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Precio</label>
                <input type="number" id="precio" v-model="curso.precio" class="input-field" placeholder="Ejemplo: 50"
                    required />
            </div>
            <div class="mb-5">
                <label for="alumnos" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Seleccionar
                    Alumnos</label>
                <select id="alumnos" v-model="curso.alumnos" multiple class="input-field" required>
                    <option v-for="alumno in alumnos" :key="alumno.id" :value="alumno.id">{{ alumno.nombres }}
                    </option>
                </select>
            </div>

            <button type="submit" class="btn-submit">Submit</button>
        </form>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const alumnos = ref([]);


const fetchAlumnos = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/alumnos`);
        let data = response.data
        console.log("data", data);
        alumnos.value = data;
    } catch (error) {
        console.error('Error al obtener los alumnos:', error);
    }
};
onMounted(fetchAlumnos);



const curso = {
    nombre: '',
    categoria: '',
    descripcion: '',
    cantidadAlumnos: '',
    inicio: '',
    fin: '',
    precio: '',
    alumnos: []
};

const submitForm = async () => {
    console.log(curso);
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/cursos`, {
            ...curso,
            alumnos: curso.alumnos.map(alumno => alumno.id)
        });
    } catch (error) {
        console.error('Error al enviar el formulario:', error);
    }
};
</script>
