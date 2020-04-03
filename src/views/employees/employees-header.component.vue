<template lang="pug">
  v-row(align="center" wrap)
    v-col(v-if="$vuetify.breakpoint.smAndUp" cols="6" sm="3")
      h1 Employees
    v-col(cols="12" sm="7" md="6")
      v-text-field(
        label="Search"
        :value="search"
        @input="emitSearch"
        append-icon="mdi-magnify"
      )
    v-col(cols="6" sm="2" md="3" align="end" :class="$vuetify.breakpoint.xsOnly ? 'pa-0' : ''")
      v-btn.employees-header__btn-new(color="primary" @click="newEmployee")
        v-icon(
            small
            class="mr-2"
          ) mdi-plus
        span New
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({})
export default class EmployeesHeader extends Vue {
  private search = '';

  private emitSearch(value: string) {
    this.search = value;
    this.$emit('search', this.search);
  }

  private newEmployee() {
    this.$emit('new-employee');
  }
}
</script>

<style lang="sass" scoped>
@import "@/assets/style/mobileFirst.sass"
.employees-header
  +media-xs
    &__btn-new
      position: fixed
      bottom: 10px
      right: 10px
      z-index: 1
</style>
