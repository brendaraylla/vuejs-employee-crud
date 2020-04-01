
<template lang="pug">
  .employees
    v-container.employees__container
      v-row(align="center" wrap)
        v-col(cols="6" sm="3" order="1")
          h1 Employees
        v-col(cols="12" sm="7" md="6" order="3" order-sm="2")
          v-text-field(
            label="Search"
            v-model="search"
            append-icon="mdi-magnify"
          )
        v-col(cols="6" sm="2" md="3" align="end" order="2")
          v-btn(color="primary" @click="newEmployee")
            v-icon(
                small
                class="mr-2"
              ) mdi-plus
            span New
      table-content(
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
        @save="save"
        @delete-employee="deleteEmployee"
      )
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TableContent from './table-content.component.vue';
import EmployeeDialog from './employee-dialog.component.vue';
import EmployeeInterface from './employee.interface';

@Component({ components: { TableContent, EmployeeDialog } })
export default class Home extends Vue {
  private showDialog = false;

  private search = '';

  private employeeInFocus: EmployeeInterface = new EmployeeInterface();

  private indexOf = -1;

  private isEditing = false;

  private isDeleting = false;

  private employees: EmployeeInterface[] = [
    {
      id: 1,
      name: 'Frozen Yogurteeee as as dsa ',
      age: 159,
      phone: '4498493876',
      email: 'teste@email.comaaaaaaaaa',
      role: 'rolee',
    },
    {
      id: 2,
      name: 'Ice cream sandwich',
      age: 237,
      phone: '4498493876',
      email: 'teste@email.com',
      role: 'rolee',
    },
    {
      id: 3,
      name: 'Eclair',
      age: 262,
      phone: '4498493876',
      email: 'teste@email.com',
      role: 'rolee',
    },
    {
      id: 4,
      name: 'Cupcake',
      age: 305,
      phone: '4498493876',
      email: 'teste@email.com',
      role: 'rolee',
    },
    {
      id: 5,
      name: 'Cupcake5',
      age: 305,
      phone: '4498493876',
      email: 'teste@email.com',
      role: 'rolee',
    },
    {
      id: 6,
      name: 'Cupcake6',
      age: 305,
      phone: '4498493876',
      email: 'teste@email.com',
      role: 'rolee',
    },
    {
      id: 7,
      name: 'Cupcake6',
      age: 305,
      phone: '4498493876',
      email: 'teste@email.com',
      role: 'rolee',
    },
    {
      id: 8,
      name: 'Cupcake6',
      age: 305,
      phone: '4498493876',
      email: 'teste@email.com',
      role: 'rolee',
    },
    {
      id: 9,
      name: 'Cupcake6',
      age: 305,
      phone: '4498493876',
      email: 'teste@email.com',
      role: 'rolee',
    },
    {
      id: 10,
      name: 'Cupcake6',
      age: 305,
      phone: '4498493876',
      email: 'teste@email.com',
      role: 'rolee',
    },
    {
      id: 12,
      name: 'Ice cream sandwich',
      age: 237,
      phone: '4498493876',
      email: 'teste@email.com',
      role: 'rolee',
    },
    {
      id: 13,
      name: 'Eclair',
      age: 262,
      phone: '4498493876',
      email: 'teste@email.com',
      role: 'rolee',
    },
    {
      id: 14,
      name: 'Cupcake',
      age: 305,
      phone: '4498493876',
      email: 'teste@email.com',
      role: 'rolee',
    },
  ];

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

  private save() {
    if (this.indexOf > -1) {
      this.employees.splice(this.indexOf, 1, new EmployeeInterface(this.employeeInFocus));
    } else {
      this.employees.push(new EmployeeInterface(this.employeeInFocus));
    }
    this.closeAndCleanEditEmployee();
  }

  private closeAndCleanEditEmployee() {
    this.toggleModal(false);
    setTimeout(() => {
      this.employeeInFocus = new EmployeeInterface();
      this.indexOf = -1;
      this.isDeleting = false;
      this.isEditing = false;
    }, 300);
  }

  private newEmployee() {
    this.employeeInFocus = new EmployeeInterface();
    this.toggleModal(true);
  }

  private deleteEmployee() {
    this.employees.splice(this.indexOf, 1);
    this.closeAndCleanEditEmployee();
  }

  private toggleModal(value: boolean) {
    this.showDialog = value;
  }
}
</script>
