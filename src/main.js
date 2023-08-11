import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/index'
import CustomUI from '../modules/costom-ui'
// import { CusTransfer } from '../modules/costom-ui'

// createApp(App).use(CusTransfer).mount('#app')
createApp(App).use(router).use(CustomUI).mount('#app')
