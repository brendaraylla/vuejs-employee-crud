<template lang="pug">
  .employee-dialog.text-center
    v-dialog(
      v-model="showModal"
      persistent
      width="500"
      :fullscreen="$vuetify.breakpoint.xsOnly"
    )
      v-card.employee-dialog__card
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
          v-btn.mr-2(
            color="primary lighten-3"
            text
            @click="cancel"
          ) Cancelar
          div
            v-btn(
              v-if="!isDeleting"
              color="primary lighten-3"
              @click="saveEmployee"
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

  private saveEmployee() {
    this.$emit('save');
  }

  private deleteEmployee() {
    this.$emit('delete');
  }

  private cancel() {
    this.$emit('cancel');
  }
}
</script>

<style lang="sass" scoped>
.employee-dialog
  &__card
    display: flex
    flex-direction: column
    justify-content: space-between
  &__title
    background-image: linear-gradient(to right, #933bdc, #486dce6b)
</style>
