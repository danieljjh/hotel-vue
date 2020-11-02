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
import VueMoment from "vue-moment"
import moment from "moment-timezone"

import leMarkdownEditor from "le-markdown-editor";

Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.prototype.$appName = "My App";
Vue.prototype.$api = process.env.VUE_APP_API_ENDPOINT;
// Vue.prototype.$api = "https://hotel.i568.me/ht";
axios.defaults.headers.post["Content-Type"] = "application/json"; // 切换环境js

Vue.use(leMarkdownEditor);
Vue.use(ElementUI);
Vue.use(VueAxios, axios, QS);
Vue.use(VueMoment, {
    moment
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
