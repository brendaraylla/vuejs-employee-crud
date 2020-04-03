<template lang="pug">
  .snackbar.text-center
    v-snackbar(
      bottom
      v-model="showSnackbar"
      :timeout="snackbar.timeout || timeout"
      :color="getClass"
    )
      span {{ snackbar.message }}
      v-btn.white--text(
        icon
        text
        @click="showSnackbar = false"
      )
        v-icon mdi-close
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { SnackbarInterface } from './snackbar.interface';

@Component({})
export default class Snackbar extends Vue {
  @Prop({ type: Object, required: true })
  private snackbar!: SnackbarInterface;

  @Prop({ type: Boolean, default: false })
  private value!: boolean;

  private timeout = 4000;

  // eslint-disable-next-line class-methods-use-this
  private get getClass() {
    const style: any = {
      success: 'green darken-4',
      error: 'red darken-4',
    };
    return style[this.snackbar.type];
  }

  get showSnackbar(): boolean {
    return this.value || false;
  }

  set showSnackbar(value: boolean) {
    this.$emit('input', value);
    this.$emit(value ? 'open' : 'close');
  }

  private close() {
    this.showSnackbar = false;
  }
}
</script>
