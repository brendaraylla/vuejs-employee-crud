<template lang="pug">
  .login
    .login__bg
    v-layout.login__content.pa-2(align-center justify-center)
      v-flex.xs12.sm6.md4
        v-card.login__card(width='100%')
          v-card-text
            h1.text-center.mb-5 Log in to your account!
            v-form.my-4(
              ref="form"
              v-model="valid"
              lazy-validation
            )
              v-text-field.mt-5(
                v-model="name"
                :counter="10"
                :rules="nameRules"
                label="Username"
                required
              )
              v-text-field.my-5(
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                name="input-10-2"
                label="Password"
                hint="At least 8 characters"
                value="wqfasds"
                class="input-group--focused"
                @click:append="showPassword = !showPassword"
              )
            v-layout.mt-5.login__action(justify-center)
              v-flex.xs12
                v-btn.primary(block large @click="login") Log in
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class Login extends Vue {
  private showPassword = false;

  private login() {
    this.$router.push({ name: 'employees' });
  }
}
</script>

<style lang="sass" scoped>
@import "@/assets/style/mobileFirst.sass"
.login
  height: 100%
  &__bg
    height: 100%
    background: url('/img/bg3.jpg')
    background-size: cover
    filter: blur(20px)
    background-position: center
  &__card
    background-color: rgba(0,0,0, 0.2) !important
    height: 70vh
    &::v-deep
      .v-card__text
        height: 100%
        display: flex
        flex-direction: column
        justify-content: space-around
    +media-min-sm
      height: auto
  &__action
    max-height: 50px
  &__content
    width: 100%
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
</style>
