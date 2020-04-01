<template lang="pug">
  .employee-dialog.text-center
    v-dialog(
      v-model="showModal"
      persistent
      width="500"
      :fullscreen="$vuetify.breakpoint.xsOnly"
    )
      v-card
        v-card-title(
          class="headline employee-dialog__title black"
          primary-title
        ) {{ getTitle }} Employee
        v-card-text
          employee-dialog-content(
            :edited-employee="editedEmployee"
            :is-deleting="isDeleting"
          )
        v-divider
        v-card-actions
          v-spacer
          div(v-if="!isDeleting")
            v-btn.mr-2(
              color="primary lighten-3"
              text
              @click="cancel"
            ) Cancelar
            v-btn(
              color="primary lighten-3"
              @click="save"
            ) Salvar
          v-btn(
            v-else
            color="primary lighten-3"
            @click="deleteEmployee"
          ) Confirmar
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import EmployeeDialogContent from './employee-dialog-content.component.vue';
import EmployeeInterface from './employee.interface';

@Component({ components: { EmployeeDialogContent } })
export default class EmployeeDialog extends Vue {
  @Prop({ type: Boolean })
  private value?: boolean;

  @Prop({})
  private editedEmployee?: EmployeeInterface;

  @Prop({ type: Boolean })
  private isDeleting?: boolean;

  @Prop({ type: Boolean })
  private isEditing?: boolean;

  private set showModal(value: boolean | undefined) {
    this.$emit('input', value);
  }

  private get showModal(): boolean | undefined {
    return this.value;
  }

  private get getTitle() {
    if (this.isDeleting) return 'Delete';
    if (this.isEditing) return 'Edit';
    return 'New';
  }

  private save() {
    this.$emit('save');
  }

  private deleteEmployee() {
    this.$emit('delete-employee');
  }

  private cancel() {
    this.showModal = false;
  }
}
</script>

<style lang="sass" scoped>
.employee-dialog
  &__title
    background-image: linear-gradient(to right, #933bdc, #486dce6b)
</style>
