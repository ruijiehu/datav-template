import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css/normalize.css'
import '@/style/reset.less'
// import { ElCarousel, ElCarouselItem } from 'element-plus'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import sourceUse from '@/common/register-components'

const app = createApp(App)

sourceUse(app)

app.use(ElementPlus)
app.use(store).use(router).mount('#app')
