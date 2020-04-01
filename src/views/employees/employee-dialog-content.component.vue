<template lang="pug">
  v-row.employee-dialog-content(wrap)
    v-col(cols="12" sm="6")
      v-text-field.mt-5(
        v-model="editedEmployee.name"
        :counter="15"
        :rules="nameRules"
        label="Name"
        :disabled="isDeleting"
        required
      )
    v-col(cols="12" sm="6")
      v-text-field.mt-5(
        v-model="editedEmployee.age"
        label="Age"
        :disabled="isDeleting"
      )
    v-col(cols="12" sm="6")
      v-text-field.mt-5(
        v-model="editedEmployee.phone"
        label="Phone"
        :disabled="isDeleting"
      )
    v-col(cols="12" sm="6")
      v-text-field.mt-5(
        v-model="editedEmployee.email"
        label="Email"
        :disabled="isDeleting"
      )
    v-col(cols="12" sm="6")
      v-text-field.mt-5(
        v-model="editedEmployee.role"
        label="Role"
        :disabled="isDeleting"
      )
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import EmployeeInterface from './employee.interface';

@Component({})
export default class EmployeeDialogContent extends Vue {
  @Prop()
  private editedEmployee?: EmployeeInterface;

  @Prop({ type: Boolean })
  private isDeleting?: boolean;
}
</script>

<style lang="sass" scoped>

</style>
