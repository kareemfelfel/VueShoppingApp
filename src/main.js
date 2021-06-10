import Vue from "vue";
import App from "./App.vue";
import vuetify from '@/plugins/vuetify';
import VueRouter from 'vue-router';
import ItemCard from './views/ItemCard'
import store from './store/store';
import addForm from './views/AddForm';
import editForm from './views/EditForm';

Vue.config.productionTip = false;
Vue.use(VueRouter);
const routes = [
	{
		path: '/',
		component: ItemCard,
        name: ItemCard
    },
    {
        path: "/addForm",
        component: addForm
    },
    {
        path: "/editForm/:id",
        component: editForm,
        name: "editForm",
    }
];
const router = new VueRouter({ routes });
new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount("#app");
