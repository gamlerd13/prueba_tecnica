<template>
    <div>

        Aca se veran los detalles de los alumnos
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const alumnos = ref([]);
const router = useRouter();

const fetchAlumnos = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/alumnos`);
        let data = response.data
        alumnos.value = data;
    } catch (error) {
        console.error('Error al obtener los alumnos:', error);
    }
};
onMounted(fetchAlumnos);
</script>

<style lang="scss" scoped></style>