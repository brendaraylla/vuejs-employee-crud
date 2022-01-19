import {
  Module, VuexModule, Mutation, Action,
} from 'vuex-module-decorators';

@Module
export default class UserStore extends VuexModule {
  public name = '';

  public picture = '';

  @Mutation
  public SET_NAME(name: string) {
    this.name = name;
  }

  @Action({ commit: 'SET_NAME' })
  // eslint-disable-next-line class-methods-use-this
  public setName(name: string) {
    return name;
  }

  @Mutation
  public SET_PICTURE(picture: string) {
    this.picture = picture;
  }

  @Action({ commit: 'SET_PICTURE' })
  // eslint-disable-next-line class-methods-use-this
  public setPicture(picture: string) {
    return picture;
  }

  @Mutation
  public SET_CLEAR() {
    this.name = '';
    this.picture = '';
    localStorage.setItem('user', '');
  }
}
