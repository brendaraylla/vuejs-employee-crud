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
              v-row(align="center")
                v-col(cols="12")
                  h5(class="text-center") or connect with your facebook account
              facebook-login(
                :key="componentKey"
                class="fb-button"
                appId="3246529549007417"
                @login="onLogin"
                @logout="onLogout"
                @get-initial-status="getUserData"
                @sdk-loaded="sdkLoaded"
              )
</template>

<script lang="ts">
import facebookLogin from 'facebook-login-vuejs';
import { Component, Vue, Watch } from 'vue-property-decorator';

@Component({ components: { facebookLogin } })
export default class Login extends Vue {
  private showPassword = false;

  private formHasErrors = false;

  private isConnected = false;

  private componentKey = 1;

  private name = '';

  private email = '';

  private personalID = '';

  private picture = '';

  private FB: any = [];

  private rules = {
    required: (v: any) => !!v || 'Field required',
  }

  private user = {
    name: '',
    password: '',
    personalID: '',
    email: '',
    picture: '',
  };

  private get getForm(): any {
    return {
      name: this.user.name,
      password: this.user.password,
    };
  }

  private validateForm() {
    const ref: any = this.$refs;
    this.formHasErrors = false;
    Object.keys(this.getForm).forEach((field) => {
      if (!this.isConnected && (!this.getForm[field] || !(this.getForm.name === 'admin' && this.getForm.password === 'admin123'))) this.formHasErrors = true;
      ref[field].validate(true);
    });
  }

  private async submit() {
    await this.validateForm();
    if (!this.formHasErrors || this.isConnected) {
      localStorage.setItem('user', this.user.name);
      this.$store.dispatch('setName', this.user.name);
      this.$store.dispatch('setPicture', this.user.picture);
      this.$router.push({ name: 'employees' });
    }
  }

  private getUserData() {
    console.log('getuser');
    this.FB.api('/me', 'GET', { fields: 'id,name,email,picture' },
      (user: { id: string; email: string; name: string; picture: { data: { url: string } } }) => {
        this.user.personalID = user.id;
        this.user.email = user.email;
        this.user.name = user.name;
        this.user.picture = user.picture.data.url;
      });
    this.submit();
  }

  sdkLoaded(payload: any) {
    console.log('sdkloaded', payload.FB);
    this.isConnected = payload.isConnected;
    this.FB = payload.FB;
    if (this.isConnected) this.getUserData();
  }

  onLogin() {
    console.log('onLogin');
    this.isConnected = true;
    // this.getUserData();
  }

  onLogout() {
    console.log('logout');
    this.$store.commit('SET_CLEAR');
    this.isConnected = false;
    // localStorage.clear();
    // this.$router.push({ name: 'login' });
  }

  @Watch('isConnected')
  onPropertyChanged() {
    console.log('watchhhh', this.componentKey);
    this.componentKey += 1;
    console.log('watchhhh this.FB', this.FB);
  }
}
</script>

<style lang="sass" scoped>
@import "@/assets/style/mobileFirst.sass"
.login
  height: 100%
  &__bg
    height: 100%
    background: url('/vuejs-employee-crud/img/bg3.jpg')
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

.fb-button
  width: 100%
  padding: 0
  &::v-deep
    button
      width: 100%
      height: 44px
      border-radius: 4px
    .spinner
      height: 30px

</style>
