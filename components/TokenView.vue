<template>
  <div class="stacking-token">
    <div class="stacking-token__title">STACKING TOKEN:</div>
    <div class="stacking-token__el">symbol: {{ stagingToken.symbol }}</div>
    <div class="stacking-token__el">decimals: {{ stagingToken.decimals }}</div>
    <div class="stacking-token__el">balance: {{ stagingToken.balance }}</div>
    <div class="stacking-token__el">allowance: 1000</div>
  </div>
</template>

<script lang="ts">
import Web3 from 'web3'
import Vue from 'vue'
import {mapGetters} from "vuex";
export default Vue.extend({
  name: 'StackingToken',
  data () {
    return {
    }
  },
  mounted() {
  },
  computed: {
    ...mapGetters({
      tokensMap: 'token/getTokensMap',
      tokensKeys: 'token/getTokensKeys',
      tokens: 'token/getTokens',
      stakerData: 'contract/getStakerData',
    }),
    stagingToken: function() {
      console.log(this.tokensMap[this.tokens[0]]);
      return this.tokensMap[this.tokens[0]];
    },
  },
  methods: {
  }
})
</script>

<style scoped>
.stacking-token__title {
  margin-bottom: 5px;
}
.stacking-token__el {
  padding: 5px;
}
</style>
