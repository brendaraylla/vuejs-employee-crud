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
        primary: '#7a99ff',
        secondary: '#933bdc',
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
