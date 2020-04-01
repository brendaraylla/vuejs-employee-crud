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

@Component({})
export default class TableContent extends Vue {
  @Prop({ type: String })
  private search!: string;

  @Prop()
  private employees!: any;

  private headers = [
    {
      text: 'Name',
      align: 'start',
      value: 'name',
    },
    { text: 'Age', value: 'age' },
    { text: 'Phone', value: 'phone', sortable: false },
    { text: 'Email', value: 'email' },
    { text: 'Role', value: 'role' },
    { text: 'Actions', value: 'actions', sortable: false },
  ];

  private editItem(data: any) {
    this.$emit('edit-item', data);
  }

  private deleteItem(data: any) {
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
    +media-xs
      tbody > tr
        display: flex
        flex-wrap: wrap
        align-items: center
        border-bottom: thin solid hsla(0,0%,100%,.12)
        padding: 10px 0
        > td
          width: 50%
          &:last-child
            border: none !important
          > .v-data-table__mobile-row__cell
            margin-left: 10px
            white-space: nowrap
            overflow: hidden
            text-overflow: ellipsis
    +media-min-sm
      thead > tr
        background-image: linear-gradient(to right, #486dce, #933bdc63) !important
</style>
