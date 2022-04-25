<template>
  <div class="container">
    <Loader v-show="loading"/>
    <div class="wallet">
      <button
        class="default-button"
        @click="connectWallet"
      >
        wallet
      </button>
    </div>
    <div class="loading" v-if="loading">loading...</div>
    <div class="content" v-else>
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
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import TokenView from "~/components/TokenView.vue";
import TokenForm from "~/components/TokenForm.vue";
import StackingInfo from "~/components/StackingInfo.vue";
import ContractForm from "~/components/ContractForm.vue";
import Loader from "~/components/Loader.vue"
import { mapActions, mapGetters } from 'vuex'
export default Vue.extend({
  name: 'IndexPage',
  components: {
    TokenView,
    StackingInfo,
    Loader,
    TokenForm,
    ContractForm
  },
  data() {
    return {
      loading: true,
    }
  },
  async mounted () {
    await this.connectNode()
    this.loading = false;
  },
  computed: {
    ...mapGetters({
      tokensMap: 'token/getTokensMap',
      tokensKeys: 'token/getTokensKeys',
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
  margin-top: 200px;
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
