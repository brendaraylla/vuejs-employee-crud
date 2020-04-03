import Vue from 'vue';
import { SnackbarInterface } from '@/components/snackbar/snackbar.interface';

class SnackbarEvent {
  public eventBus: Vue;

  constructor() {
    this.eventBus = new Vue();
  }

  showSnackbar(payload: SnackbarInterface) {
    this.eventBus.$emit('show-snackbar', payload);
  }
}

/* eslint-disable import/prefer-default-export */
export const snackbarEvent = new SnackbarEvent();
