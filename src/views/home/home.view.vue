<template lang="pug">
  .home
    div
      mobile-header(v-if="$vuetify.breakpoint.xsOnly")
      sidebar-component(v-else)
    v-content
      transition(name="slide-x-transition" mode="out-in")
        router-view
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SidebarComponent from '@/components/sidebar.component.vue';
import MobileHeader from '@/components/mobile-header.component.vue';

@Component({ components: { SidebarComponent, MobileHeader } })
export default class Home extends Vue {
  private created() {
    this.$store.dispatch('setName', localStorage.getItem('user'));
  }
}
</script>
