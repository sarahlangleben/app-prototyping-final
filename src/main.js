import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import BootstrapVueNext from 'bootstrap-vue-next'

import exampleData from "./data/example.json"

import annData from "./data/announcements.json"

import itineraryData from "./data/itinerary.json";

import dummyPosts from "./data/dummy-posts.json";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import './assets/main.css'

const app = createApp(App)

app.use(router)
app.use(BootstrapVueNext)


app.config.globalProperties.fixtures = {
  exampleData,
  annData,
  itineraryData,
  dummyPosts
  /* Add any more data json objects here. */
};
/* Access through `this.fixtures.exampleData[...]` */

app.mount('#app')
