<template>
  <div id="app">
    <HelloWorld />
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'app',
  components: {
    HelloWorld,
  },
  mounted() {
    window.addEventListener('visibilitychange', () => {
      switch (document.visibilityState) {
        case 'hidden':
          document.title = 'Loading Vue Modal ...';
          break;
        case 'visible':
          document.title = 'Welcome to Vue Modal';
          break;
        default:
          break;
      }
    });
  },
};
</script>
<style lang="stylus">
body {
  margin: 0;
}

#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
</style>
