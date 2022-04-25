<template>
  <div class="token-form">
    <div class="token-form__el">
      <label for="mintAmount">MINT:</label>
      <input :disabled="!isConnected" id="mintAmount" v-model="mintAmount" type="text" placeholder="mintAmount">
      <button :class="{ 'btn-disabled': !isConnected }" :disabled="!isConnected" class="default-button" @click="mint">
        MINT
      </button>
    </div>
    <div class="token-form__el">
      <label for="stakeAmount">STAKE:</label>
      <input :disabled="!isConnected" id="stakeAmount" v-model="stakeAmount" type="text" placeholder="stakeAmount">
      <button :class="{ 'btn-disabled': !isConnected }" :disabled="!isConnected" class="default-button" @click="actionBtnStake">
        {{ btnStakeText.toUpperCase() }}
      </button>
    </div>
    <div class="token-form__el">
      <label for="unstakeAmount">UNSTAKE:</label>
      <input :disabled="!isConnected" id="unstakeAmount" v-model="unstakeAmount" type="text" placeholder="unstakeAmount">
      <button :class="{ 'btn-disabled': !isConnected }" :disabled="!isConnected" class="default-button" @click="unstake">
        UNSTAKE
      </button>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import BigNumber from "bignumber.js";

export default {
  name: "TokenForm",
  data() {
    return {
      mintAmount: '0',
      stakeAmount: '0',
      unstakeAmount: '0',
      btnStakeText: 'stake',
      isStacking: false,
      isUpdated: true,
    }
  },
  computed: {
    ...mapGetters({
      allowance: 'token/getAllowance',
      isConnected: 'wallet/getIsConnected',
    }),
  },
  mounted() {
  },
  methods: {
    mint() {
      this.$store.dispatch('token/mintStaking', this.mintAmount);
      this.mintAmount = '0';
    },
    actionBtnStake() {
      // if (!this.isUpdated) {
      //   this.update();
      // }
      if (this.isStacking) {
        this.stake();
      } else {
        this.approve();
      }
    },
    stake() {
      this.$store.dispatch('contract/stake', this.stakeAmount);
      this.stakeAmount = '0';
    },
    approve() {
      this.$store.dispatch('token/approve', this.stakeAmount);
      this.stakeAmount = '0';
    },
    unstake() {
      this.$store.dispatch('token/stake', this.unstakeAmount);
      this.unstakeAmount = '0';
    },
    async update() {
      await Promise.all([
        this.$store.dispatch('token/fetchUserDataToken'),
        this.$store.dispatch('token/getAllowance')
      ])
      this.timer();
    },
    timer() {
      this.isUpdated = true;
      setTimeout(() => {
        console.log('expired');
        this.isUpdated = false;
      }, 10000)
    }
  },
  watch: {
    stakeAmount(val) {
      console.log(this.allowance[0]);
      const value = new BigNumber(val);
      const allowance = new BigNumber(this.allowance[0]);
      this.isStacking = !(value.comparedTo(allowance) === 1);
      this.btnStakeText =  this.isStacking ? 'stake' : 'approve';
    },

  }
}
</script>

<style scoped lang="scss">
.token-form {
  margin-top: 30px;
  &__el {
    margin-bottom: 15px;
    input {
      display: block;
      margin-bottom: 3px;
    }
  }
}
</style>
