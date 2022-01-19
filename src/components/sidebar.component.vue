<template lang="pug">
  v-card
    v-navigation-drawer.sidebar(
      v-model="drawer"
      :mini-variant.sync="mini"
      :temporary="!mini"
      expand-on-hover
      permanent
      app
    )
      v-list-item.px-2.mt-2
        v-list-item-avatar
          v-img(:src="getPicture || 'https://randomuser.me/api/portraits/lego/1.jpg'")
        v-list-item-title.text-capitalize.ml-2.font-weight-bold
          | {{ getUser }}
        v-btn(
          icon
          @click.stop="mini = !mini"
        )
          v-icon mdi-chevron-left
      v-divider
      v-list(dense)
        v-list-item(
          v-for="item in items"
          :to="item.route"
          link
        )
          v-list-item-icon
            v-icon {{ item.icon }}
          v-list-item-content
            v-list-item-title {{ item.title }}
      template(v-slot:append)
        .pa-2
          v-btn.pl-3(text block @click="logout")
            v-icon mdi-logout
            span(v-if="!mini") Logout
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class SidebarComponent extends Vue {
  private drawer = true;

  private items = [
    { title: 'Employees', icon: 'mdi-account-group-outline', route: { name: 'employees' } },
  ];

  private mini = true;

  private get getUser() {
    return this.$store.state.User.name;
  }

  private get getPicture() {
    return this.$store.state.User.picture;
  }

  private logout() {
    // localStorage.clear();
    this.$store.commit('SET_CLEAR');

    this.$router.push({ name: 'login' });
  }
}
</script>

<style lang="sass" scoped>
.sidebar
  background-image: linear-gradient(to top, #121c35, #4c345f)
</style>
