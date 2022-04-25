<template>
  <div class="stacking-info">
    <div class="stacking-info__title">STACKING {{ $t(`main.info`).toUpperCase() }}:</div>
    <div class="stacking-info__el">{{ $t(`main.staked`) }}: {{ staked }}</div>
    <div class="stacking-info__el">{{ $t(`main.claimable`) }}: {{ claimable }}</div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "StackingInfo",
  computed: {
    ...mapGetters({
      staked: 'contract/getStakerData',
      claimable: 'contract/getClaimableAmount',
      isConnected: 'wallet/getIsConnected'
    }),
  },
  watch: {
    isConnected(val) {
      if (val) {
        this.$store.dispatch('contract/getStakerData')
        this.$store.dispatch('contract/getClaimableAmount')
      }
    },
  },
}
</script>

<style scoped lang="scss">
.stacking-info {
  margin-top: 30px;
  &__title {
    margin-bottom: 5px;
  }
  &__el {
    padding: 5px;
  }
}
</style>
