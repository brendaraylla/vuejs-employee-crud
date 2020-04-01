import {
  Module, VuexModule, Mutation, Action,
} from 'vuex-module-decorators';

@Module
export default class UserStore extends VuexModule {
  public name = '';

  @Mutation
  public SET_NAME(name: string) {
    this.name = name;
  }

  @Action({ commit: 'SET_NAME' })
  // eslint-disable-next-line class-methods-use-this
  public setName(name: string) {
    return name;
  }
}
