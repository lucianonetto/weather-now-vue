<template>
  <Header />
  <Climates />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Header from '@/components/Header/index.vue';
import Climates from '@/components/Climates/index.vue';

@Options({
  components: {
    Header,
    Climates,
  },
})
export default class App extends Vue {}
</script>

<style lang="sass">
:root
  --background: 241, 241, 241
  --box-shadow: 51, 51, 51
  --divider: #EBEBEB
  --white: #FFFFFF
  --blue: #69A3FF
  --orange: #FF9632
  --red: #ED1946
  --grey: #737C84
  --grey-medium: #b4b4b4
body
  margin: 0
  font-family: Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  background-color: rgba(var(--background), 1)
</style>
