import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

/*
 * Import Bootstrap
 */
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

/*
 * Import Font Awesome Icons
 */
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

/* add icons to the library */
library.add(fas, far, fab)

/*
 * Axios setup
 */

import axios from 'axios'
axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL
axios.defaults.headers['Content-Type'] = 'application/json'

const app = createApp(App)
app.config.globalProperties.$http = axios

app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
