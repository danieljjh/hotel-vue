/* eslint-disable no-new */

import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./assets/style.css";

import leMarkdownEditor from "le-markdown-editor";

Vue.config.productionTip = false;
Vue.use(leMarkdownEditor);
Vue.use(ElementUI);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
