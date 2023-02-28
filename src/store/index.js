import { createStore } from 'vuex';
import {appModule} from "@/store/appModule";

export default createStore({
  modules: {
    app: appModule
  }
})
