
<template lang="pug">
  .employees
    v-container.employees__container
      employees-header(@search="setSearch" @new-employee="newEmployee")
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
import { snackbarEvent } from '@/services/snackbar-event';
import EmployeeService from '@/services/employee.service';
import TableContent from './table-content.component.vue';
import EmployeeDialog from './employee-dialog.component.vue';
import EmployeesHeader from './employees-header.component.vue';
import EmployeeInterface from './employee.interface';
import { SnackbarInterface } from '../../components/snackbar/snackbar.interface';

@Component({ components: { TableContent, EmployeeDialog, EmployeesHeader } })
export default class Home extends Vue {
  private showDialog = false;

  private search = '';

  private employees: EmployeeInterface[] = [];

  private employeeInFocus: EmployeeInterface = new EmployeeInterface();

  private isEditing = false;

  private isDeleting = false;

  private service: EmployeeService = new EmployeeService();

  private setSearch(value: string) {
    this.search = value;
  }

  private prepareEmployeeModal(data: EmployeeInterface) {
    this.employeeInFocus = { ...data };
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

  // eslint-disable-next-line class-methods-use-this
  private snackbarSuccess(type: string) {
    snackbarEvent.showSnackbar({
      type: 'success',
      message: `${type} employee success!`,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  private snackbarError(type: string) {
    snackbarEvent.showSnackbar({
      type: 'error',
      message: `Error ${type} employee. Please, try again!`,
    });
  }

  private putEmployee() {
    this.service.putEmployee(new EmployeeInterface(this.employeeInFocus))
      .then(() => {
        this.snackbarSuccess('Edit');
      }).catch(() => {
        this.snackbarError('edit');
      });
  }

  private postEmployee() {
    this.service.postEmployee(new EmployeeInterface(this.employeeInFocus))
      .then(() => {
        this.snackbarSuccess('Add');
      }).catch(() => {
        this.snackbarError('add');
      });
  }

  private modalSaveEmployee() {
    if (this.employeeInFocus.id) {
      this.putEmployee();
    } else {
      this.postEmployee();
    }
    this.closeAndCleanEditEmployee();
  }

  private modalDeleteEmployee() {
    this.service.deleteEmployee(this.employeeInFocus.id)
      .then(() => {
        this.snackbarSuccess('Delete');
      }).catch(() => {
        this.snackbarError('delete');
      });
    this.closeAndCleanEditEmployee();
  }

  private closeAndCleanEditEmployee() {
    this.toggleModal(false);
    setTimeout(() => {
      this.employeeInFocus = new EmployeeInterface();
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
    }).catch(() => {
      this.snackbarError('get');
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
</style>
