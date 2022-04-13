<template>
    <header :class="$style.header">
        <img :src="logo" :class="$style.logo" alt="Weather Now" />
    </header>
</template>

<script lang="ts">
import logo from '@/assets/logo.svg';

export default {
  name: 'header-component',
  setup() {
    return {
      logo,
    };
  },
};
</script>

<style lang="sass" module>
.header
    background-color: var(--white)
    height: 56px
    width: 100%
    display: flex
    align-items: center
    justify-content: center
    box-shadow: 0px 0px 2px 2px rgba(var(--box-shadow), .1)
    position: fixed
    top: 0
    left: 0
    z-index: 10
    img
        height:25px

</style>
