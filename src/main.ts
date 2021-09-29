import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCheck,
  faExclamationTriangle,
  faInfoCircle,
  faPlus,
  faSync,
  faTimesCircle,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

library.add(faPlus);
library.add(faUser);
library.add(faInfoCircle);
library.add(faExclamationTriangle);
library.add(faCheck);
library.add(faTimesCircle)
library.add(faSync)

createApp(App)
  .use(store)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(router)
  .mount("#app");
