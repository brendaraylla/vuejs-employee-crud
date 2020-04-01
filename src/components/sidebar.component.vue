<template lang="pug">
  v-card
    v-navigation-drawer(
      v-model="drawer"
      :mini-variant.sync="mini"
      permanent
    )
      v-list-item(class="px-2")
        v-list-item-avatar
          v-img(src="https://randomuser.me/api/portraits/men/85.jpg")
        v-list-item-title John Leider

        v-btn(
          icon
          @click.stop="mini = !mini"
        )
          v-icon mdi-chevron-left

      v-divider

      v-list(dense)
        v-list-item(
          v-for="n in 3"
          link
        )
          //- :key="item.title"
          v-list-item-icon
            v-icon ICONE

          v-list-item-content
            v-list-item-title TITULO
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class SidebarComponent extends Vue {}
</script>

<style lang="sass" scoped>

</style>
