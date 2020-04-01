<template lang="pug">
  .home
    sidebar-component
    v-content
      transition(name="slide-x-transition" mode="out-in")
        router-view
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SidebarComponent from '@/components/sidebar.component.vue';

@Component({ components: { SidebarComponent } })
export default class Home extends Vue {
  private created() {
    this.$store.dispatch('setName', localStorage.getItem('user'));
  }
}
</script>
