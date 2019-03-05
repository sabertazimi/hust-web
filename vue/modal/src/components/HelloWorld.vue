<template>
  <div class="hello-world">
    <div class="button" @click="toggleModal">Open the Modal</div>
    <modal />
  </div>
</template>

<script>
import Modal from '@/components/Modal.vue';

export default {
  name: 'HelloWorld',
  components: {
    Modal,
  },
  methods: {
    toggleModal() {
      this.$emit('toggleModal');
    },
  },
};
</script>

<style scoped lang="stylus">
.hello-world {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .button {
    background: #fff;
    padding: 0.5rem 1.2rem;
    border-radius: 20px;
    box-shadow: 0 1.5px 3px 0 rgba(0, 0, 0, 0.16);
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
