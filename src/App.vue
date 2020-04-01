
<template lang="pug">
  v-app
    transition(name="slide-x-transition" mode="out-in")
      router-view
</template>

<style lang="sass">
.v-btn.primary
   background-image: linear-gradient(to right, #486dce, #933bdc)
</style>
