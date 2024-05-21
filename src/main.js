import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import router from "../src/router"

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'



const app = createApp(App)
app.component('VueDatePicker', VueDatePicker);//datapicker
app.use(router).mount('#app')
