import '@mdi/font/css/materialdesignicons.css';
import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: '#486dce',
        // primary: '#30586f',
        secondary: '#933bdc',
        // secondary: '#714f66',
      },
    },
  },
  options: {
    customProperties: true,
  },
  icons: {
    iconfont: 'mdi',
  },
});
