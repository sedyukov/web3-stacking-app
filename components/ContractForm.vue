<template>
  <div class="contract-form">
    <div class="contract-form__el">
    <button :class="{ 'btn-disabled': !isConnected }" :disabled="!isConnected" class="default-button" @click="refresh">
      {{ $t(`buttons.refresh`) }}
    </button>
    <button :class="{ 'btn-disabled': !isConnected }" :disabled="!isConnected" class="default-button" @click="openModal">
      {{ $t(`buttons.claim`).toUpperCase() }}
    </button>
    </div>
    <ModalFee v-if="isModal" :fee="fee" @confirm="claim" @decline="decline"/>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import { getFee } from '~/utils/web3'
import BigNumber from "bignumber.js";
import {STACKING_CONTRACT} from "~/utils/abis/stackingContract";
import {shiftedBy} from "~/utils";

export default {
  name: "ContractForm",
  data() {
    return {
      isUpdated: true,
      isModal: false,
      currentAction: '',
      fee: ''
    }
  },
  computed: {
    ...mapGetters({
      isConnected: 'wallet/getIsConnected',
      address: 'contract/getContractAddress'
    }),
  },
  methods: {
    refresh() {
      this.$store.dispatch('contract/getClaimableAmount', this.mintAmount);
    },
    claim() {
      this.isModal = false;
      this.startLoading();
      this.$store.dispatch('contract/claim').then(() => this.update());
    },
    async openModal() {
      const fee = await getFee('claim', STACKING_CONTRACT, this.address)
      this.fee = shiftedBy(fee, '18');
      console.log(this.fee);
      this.isModal = true;
    },
    decline() {
      this.isModal = false;
    },
    async update() {
      await Promise.all([
        this.$store.dispatch('token/fetchUserDataToken'),
        this.$store.dispatch('contract/getClaimableAmount'),
        this.$store.dispatch('contract/pastEvents'),
      ])
      this.$store.commit('wallet/SET_IS_UPDATING', false);
    },
    startLoading() {
      this.$store.commit('wallet/SET_IS_UPDATING', true);
    }
  },
}
</script>

<style scoped lang="scss">
.contract-form {
  margin-top: 30px;
  &__el {
    button {
      margin-bottom: 15px;
    }
  }
}
</style>
