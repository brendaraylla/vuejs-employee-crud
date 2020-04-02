<template lang="pug">
  .login
    .login__bg
    v-layout.login__content.pa-2(align-center justify-center)
      v-flex.xs12.sm6.md4
        v-card.login__card(width='100%')
          v-card-text
            h1.text-center.mb-5 Log in to your account!
            v-form(
              ref="form"
              lazy-validation
               @submit.prevent="submit"
            )
              v-text-field.mt-5(
                v-model="user.name"
                :counter="10"
                :rules="[rules.required]"
                required
                ref="name"
                label="Username"
              )
              v-text-field.my-5(
                v-model="user.password"
                name="input-10-2"
                label="Password"
                class="input-group--focused"
                :rules="[rules.required, rules.minLength]"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                required
                ref="password"
                @click:append="showPassword = !showPassword"
              )
              v-btn.primary(block type="submit" large) Log in
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class Login extends Vue {
  private showPassword = false;

  private formHasErrors = false;

  private rules = {
    required: (v: any) => !!v || 'Field required',
  }

  private user = {
    name: '',
    password: '',
  };

  private get getForm(): any {
    return {
      name: this.user.name,
      password: this.user.password,
    };
  }

  private validateForm() {
    this.formHasErrors = false;
    Object.keys(this.getForm).forEach((field) => {
      if (!this.getForm[field]) this.formHasErrors = true;
      this.$refs[field].validate(true);
    });
  }

  private async submit() {
    await this.validateForm();
    if (!this.formHasErrors) {
      localStorage.setItem('user', this.user.name);
      this.$store.dispatch('setName', this.user.name);
      this.$router.push({ name: 'employees' });
    }
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
    height: 60vh
    &::v-deep
      .v-card__text
        height: 100%
        display: flex
        flex-direction: column
        justify-content: center
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
