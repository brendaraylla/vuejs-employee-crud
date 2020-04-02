
<template lang="pug">
  .employees
    v-container.employees__container
      v-row(align="center" wrap)
        v-col(v-if="$vuetify.breakpoint.smAndUp" cols="6" sm="3")
          h1 Employees
        v-col(cols="12" sm="7" md="6")
          v-text-field(
            label="Search"
            v-model="search"
            append-icon="mdi-magnify"
          )
        v-col(cols="6" sm="2" md="3" align="end" :class="$vuetify.breakpoint.xsOnly ? 'pa-0' : ''")
          v-btn.employees__btn-new(color="primary" @click="newEmployee")
            v-icon(
                small
                class="mr-2"
              ) mdi-plus
            span New
      table-content.employees__table(
        :search="search"
        :employees="employees"
        @edit-item="editItem"
        @delete-item="deleteItem"
      )
      employee-dialog(
        v-model="showDialog"
        :edited-employee="employeeInFocus"
        :is-editing="isEditing"
        :is-deleting="isDeleting"
        @save="modalSaveEmployee"
        @delete="modalDeleteEmployee"
        @cancel="modalCancel"
      )
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import EmployeeService from '@/services/employee.service';
import TableContent from './table-content.component.vue';
import EmployeeDialog from './employee-dialog.component.vue';
import EmployeeInterface from './employee.interface';

@Component({ components: { TableContent, EmployeeDialog } })
export default class Home extends Vue {
  private showDialog = false;

  private search = '';

  private employees: EmployeeInterface[] = [];

  private employeeInFocus: EmployeeInterface = new EmployeeInterface();

  private indexOf = -1;

  private isEditing = false;

  private isDeleting = false;

  private service: EmployeeService = new EmployeeService();

  private prepareEmployeeModal(data: EmployeeInterface) {
    this.employeeInFocus = { ...data };
    this.indexOf = this.employees.indexOf(data);
    this.toggleModal(true);
  }

  private editItem(data: EmployeeInterface) {
    this.isEditing = true;
    this.prepareEmployeeModal(data);
  }

  private deleteItem(data: EmployeeInterface) {
    this.isDeleting = true;
    this.prepareEmployeeModal(data);
  }

  private toggleModal(value: boolean) {
    this.showDialog = value;
  }

  private modalCancel() {
    this.isEditing = false;
    this.isDeleting = false;
    this.toggleModal(false);
  }

  private modalSaveEmployee() {
    if (this.indexOf > -1) {
      this.service.putEmployee(new EmployeeInterface(this.employeeInFocus));
    } else {
      this.service.postEmployee(new EmployeeInterface(this.employeeInFocus));
    }
    this.closeAndCleanEditEmployee();
  }

  private modalDeleteEmployee() {
    this.service.deleteEmployee(this.employeeInFocus.id);
    this.closeAndCleanEditEmployee();
  }

  private closeAndCleanEditEmployee() {
    this.toggleModal(false);
    setTimeout(() => {
      this.employeeInFocus = new EmployeeInterface();
      this.indexOf = -1;
      this.isDeleting = false;
      this.isEditing = false;
      this.getEmployees();
    }, 300);
  }

  private newEmployee() {
    this.employeeInFocus = new EmployeeInterface();
    this.toggleModal(true);
  }

  private getEmployees() {
    this.service.getEmployees().then((resp: EmployeeInterface[]) => {
      this.employees = resp;
    });
  }

  private created() {
    this.getEmployees();
  }
}
</script>

<style lang="sass" scoped>
@import "@/assets/style/mobileFirst.sass"
.employees
  +media-xs
    &__container
      padding-top: 0
    &__table
      margin-bottom: 30px
    &__btn-new
      position: fixed
      bottom: 10px
      right: 10px
      z-index: 1
</style>
