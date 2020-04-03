
<template lang="pug">
  v-app
    snackbar(:snackbar="snackbarInfo" v-model="showSnackbar")
    transition(name="slide-x-transition" mode="out-in")
      router-view
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { snackbarEvent } from '@/services/snackbar-event';
import { SnackbarInterface } from '@/components/snackbar/snackbar.interface';
import Snackbar from '@/components/snackbar/snackbar.component.vue';

@Component({ components: { Snackbar } })
export default class App extends Vue {
  private showSnackbar = false;

  private snackbarInfo: SnackbarInterface = {
    type: '',
    message: '',
  };

  private created() {
    snackbarEvent.eventBus.$on('show-snackbar', (payload: SnackbarInterface) => {
      this.showSnackbar = true;
      this.snackbarInfo = payload;
    });
  }
}
</script>

<style lang="sass">
.v-btn.primary
   background-image: linear-gradient(to right, #486dce, #933bdc)
</style>
