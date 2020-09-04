/* eslint-disable no-new */

import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./assets/style.css";
import axios from "axios";
import VueAxios from "vue-axios";
import QS from "qs";

import leMarkdownEditor from "le-markdown-editor";

Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.prototype.$appName = "My App"

Vue.use(leMarkdownEditor);
Vue.use(ElementUI);
Vue.use(VueAxios, axios, QS);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
