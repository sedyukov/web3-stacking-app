<template>
  <div class="stacking-token">
    <div class="stacking-token__title">{{ tokenType.toUpperCase() }} {{ $t(`main.token`).toUpperCase() }}:</div>
    <div class="stacking-token__el">{{ $t(`main.symbol`) }}: {{ stagingToken.symbol }}</div>
    <div class="stacking-token__el">{{ $t(`main.decimals`) }}: {{ stagingToken.decimals }}</div>
    <div class="stacking-token__el">{{ $t(`main.balance`) }}: {{ stagingToken.balance }}</div>
    <div class="stacking-token__el">{{ $t(`main.allowance`) }}: {{ allowance }}</div>
  </div>
</template>

<script>
import Vue from 'vue'
import {mapGetters} from "vuex";
import { getEthereum } from "~/utils/web3";
export default Vue.extend({
  name: 'TokenView',
  props: {
    tokenType: {
      type: String,
      required: true,
    },
  },
  data () {
    return {
    }
  },
  async mounted() {
  },
  computed: {
    ...mapGetters({
      tokensMap: 'token/getTokensMap',
      tokens: 'token/getTokens',
      isConnected: 'wallet/getIsConnected',
      allowances: 'token/getAllowance',
    }),
    stagingToken() {
      const type = this.tokenType === 'stacking' ? 0 : 1;
      return this.tokensMap[this.tokens[type]];
    },
    allowance() {
      const type = this.tokenType === 'stacking' ? 0 : 1;
      return this.allowances[type];
    },
  },
  watch: {
    isConnected(val) {
      if (val) {
        this.$store.dispatch('token/getAllowance');
      }
    },
    messages() {
      console.log('CHANGED');
    }
  },
  methods: {
    async getMessages() {
      const r = await getEthereum();
      r.on('message', () => {
      })
    },
  }
})
</script>

<style scoped lang="scss">
.stacking-token {
  &__title {
    margin-bottom: 5px;
  }
  &__el {
    padding: 5px;
  }
}
</style>
