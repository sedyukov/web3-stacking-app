<template>
  <div class="modal">
    <div class=modal__text>
      {{ $t(`modal.fee`) }}: {{ fee }}. {{ $t(`modal.continue`) }}
    </div>
    <div class="modal__buttons">
      <button
        @click="confirm"
        class="default-button"
      >
        {{ $t(`main.yes`)}}
      </button>
      <button
        @click="decline"
        class="default-button"
      >
        {{ $t(`main.no`)}}
      </button>
    </div>
  </div>
</template>

<script>

export default {
  name: "ModalFee",
  props: {
    fee: {
      required: true,
      type: String
    }
  },
  methods: {
    confirm() {
      this.$emit('confirm')
    },
    decline() {
      this.$emit('decline')
    }
  },

}
</script>

<style scoped lang="scss">
.modal {
  position: absolute;
  box-shadow: 0 14px 28px rgba(0,0,0,0.25);
  background: white;
  border-radius: 10px;
  padding: 20px;
  width: 400px;
  top: calc(50% - 50px);
  left: calc(50% - 200px);
  &__buttons {
    display: flex;
    justify-content: space-evenly;
  }
  &__text {
    margin-bottom: 15px;
    text-align: center;
  }
}


</style>
