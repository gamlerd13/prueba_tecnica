<template>
    <div class="min-h-screen bg-green-50 flex flex-col">
        <main class="container mx-auto flex-grow">
            <section class="my-8">
                <h2 class="text-3xl font-semibold text-green-700 text-center">Bienvenido a la Gestión de Cursos en Línea
                </h2>
                <p class="text-center text-green-600 mt-4">Administre sus cursos y alumnos de manera eficiente y
                    sencilla.</p>
            </section>
            <section class="my-8">
                <div class="grid md:grid-cols-2 gap-8">
                    <div class="bg-white p-6 rounded-lg shadow-lg">
                        <h3 class="text-2xl font-bold text-green-700">Cursos</h3>
                        <p class="mt-2 text-green-600">Agregue, edite y administre los cursos disponibles para sus
                            alumnos.</p>
                        <a href="/cursos" class="text-white"><button
                                class="mt-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-500">Gestionar
                                Cursos</button></a>
                    </div>
                    <div class="bg-white p-6 rounded-lg shadow-lg">
                        <h3 class="text-2xl font-bold text-green-700">Alumnos</h3>
                        <p class="mt-2 text-green-600">Inscriba, edite y administre la información de sus alumnos.</p>
                        <a href="/alumnos" class="text-white"><button
                                class="mt-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-500">Gestionar
                                Alumnos</button></a>
                    </div>
                </div>
            </section>
        </main>
        <footer class="bg-green-600 text-white py-4 mt-8">
            <div class="container mx-auto text-center">
                <p>&copy; 2024 -Prueba técnica de Sistema de Gestión de Cursos y alumnos. Todos los derechos reservados.
                </p>
            </div>
        </footer>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped></style>