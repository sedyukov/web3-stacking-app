<template>
    <div class="container">
      <div class="wallet">
        <button
          class="default-button"
          @click="connectWallet"
        >
          {{ $t(`main.wallet`) }}
        </button>
      </div>
      <Loader v-if="isUpdating"/>
      <div v-if="!firstLoading">
        <div class="content">
          <div class="content__right-row">
            <TokenView token-type="stacking"/>
            <TokenForm/>
          </div>
          <div class="content__left-row">
            <TokenView token-type="reward"/>
            <StackingInfo />
            <ContractForm />
          </div>
        </div>
        <div class="content scroll-area">
          <EventsTable/>
        </div>
      </div>
      <LocaleChanger />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import TokenView from "~/components/TokenView.vue";
import TokenForm from "~/components/TokenForm.vue";
import StackingInfo from "~/components/StackingInfo.vue";
import ContractForm from "~/components/ContractForm.vue";
import LocaleChanger from "~/components/LocaleChanger.vue"
import EventsTable from "~/components/EventsTable.vue"
import Loader from "~/components/Loader.vue"
import ModalFee from "~/components/ModalFee.vue"
import { mapActions, mapGetters } from 'vuex'
export default Vue.extend({
  name: 'IndexPage',
  components: {
    TokenView,
    StackingInfo,
    Loader,
    TokenForm,
    ContractForm,
    LocaleChanger,
    EventsTable,
    ModalFee
  },
  data() {
    return {
      firstLoading: true,
    }
  },
  async mounted () {
    await this.connectNode()
    this.$store.commit('wallet/SET_IS_UPDATING', false);
    this.firstLoading = false;
  },
  computed: {
    ...mapGetters({
      tokensMap: 'token/getTokensMap',
      tokensKeys: 'token/getTokensKeys',
      isUpdating: 'wallet/getIsUpdating',
      isModal: 'contract/getIsModal'
    })
  },
  methods: {
    ...mapActions({
      connectNode: 'wallet/connectNode',
      connectWallet: 'wallet/connectWallet',
      approve: 'token/approve'
    }),
  },
})
</script>

<style>
.content {
  display: flex;
  justify-content: space-evenly;
  margin-top: 100px;
}
.scroll-area {
  max-height: 400px;
  height: 35%;
  overflow-y: scroll;
  width: max-content;
  padding: 0 20px;
  margin: 100px auto;
}
.default-button {
  background: black;
  color: white;
  font-weight: 400;
  border-radius: 5px;
  width: 100%;
  max-width: 168px;
  height: 30px;
}
.btn-disabled {
  background: dimgrey;
  color: grey;
  cursor: not-allowed;
  font-weight: 400;
  border-radius: 5px;
  width: 100%;
  max-width: 168px;
  height: 30px;
}
</style>
