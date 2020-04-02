<template lang="pug">
  v-row
    v-col(cols="12")
      v-data-table(
        :headers="headers"
        :items="employees"
        :items-per-page="10"
        class="elevation-1 table-content"
        :search="search"
      )
        template(v-slot:item.actions="{ item }")
          v-icon(
            small
            class="mr-2"
            @click="editItem(item)"
          ) mdi-pencil
          v-icon(
            small
            @click="deleteItem(item)"
          ) mdi-delete
        template(v-slot:no-data)
          span No data available!
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import EmployeeInterface from './employee.interface';

@Component({})
export default class TableContent extends Vue {
  @Prop({ type: String })
  private search!: string;

  @Prop()
  private employees!: EmployeeInterface[];

  private headers = [
    {
      text: 'Name',
      align: 'start',
      value: 'name',
    },
    { text: 'Age', value: 'age' },
    { text: 'Phone', value: 'phone', sortable: false },
    { text: 'Email', value: 'email' },
    { text: 'Actions', value: 'actions', sortable: false },
  ];

  private editItem(data: EmployeeInterface) {
    this.$emit('edit-item', data);
  }

  private deleteItem(data: EmployeeInterface) {
    this.$emit('delete-item', data);
  }
}
</script>

<style lang="sass" scoped>
@import "@/assets/style/mobileFirst.sass"
.table-content
  background-image: linear-gradient(to right, #486dce21, #933bdc26)
  &::v-deep
    tr:hover
      background-image: linear-gradient(to right, #486dce8c, #933bdc42) !important
    thead > tr
      background-image: linear-gradient(to right, #486dce, #933bdc63)
    +media-xs
      tbody > tr
        display: flex
        flex-wrap: wrap
        align-items: center
        border-bottom: thin solid hsla(0,0%,100%,.12)
        padding: 10px 0
        > td
          width: 50%
          margin: auto
          &:last-child
            border: none !important
            > .v-data-table__mobile-row__header
              display: none
            > .v-data-table__mobile-row__cell
              margin: auto
          > .v-data-table__mobile-row__cell
            margin-left: 10px
            white-space: nowrap
            overflow: hidden
            text-overflow: ellipsis
</style>
