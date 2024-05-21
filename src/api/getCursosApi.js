import { ref } from "vue";
import axios from "axios";

export const useCursos = () => {
  const cursos = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const fetchCursos = async () => {
    loading.value = true;
    error.value = null;

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/cursos`
      );
      cursos.value = response.data;
    } catch (err) {
      error.value = err.message || "Error al obtener los cursos";
    } finally {
      loading.value = false;
    }
  };

  return {
    cursos,
    loading,
    error,
    fetchCursos,
  };
};
