<template lang="pug">
  .mobile-header
    v-toolbar.mobile-header__toolbar
      v-toolbar-title {{ getTitle }}
      v-spacer
      v-menu(transition="slide-y-transition" bottom offset-y)
        template(v-slot:activator="{ on }")
          v-btn(icon light v-on="on")
            v-avatar(size=40)
              v-img(src="https://randomuser.me/api/portraits/lego/1.jpg")
        v-list.pa-0
          v-list-item
            v-btn(@click="logout" text)
              v-icon mdi-logout
              span Logout
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class MobileHeader extends Vue {
  private get getTitle(): string {
    return this.$route.meta.title || '';
  }

  private logout() {
    localStorage.clear();
    this.$router.push({ name: 'login' });
  }
}
</script>

<style lang="sass" scoped>
.mobile-header
  &__toolbar
    background-image: linear-gradient(to top, #121c35, #4c345f)
</style>
