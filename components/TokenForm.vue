<template>
  <div class="token-form">
    <div class="token-form__el">
      <ValidationProvider rules="required|strictPositive|maxVal" v-slot="v">
        <label for="mintAmount">MINT:</label>
        <input :disabled="!isConnected" id="mintAmount" v-model="mintAmount" type="text">
        <button :class="{ 'btn-disabled': !isConnected || v.errors.length }" :disabled="!isConnected" class="default-button" @click="openModal('mint')">
          {{ $t(`buttons.mint`).toUpperCase() }}
        </button>
        <div v-if="v.errors.length">{{ $t('messages.notValid') }}</div>
      </ValidationProvider>
    </div>
    <div class="token-form__el">
      <ValidationProvider rules="required|strictPositive|maxApprove" v-slot="v">
        <label for="stakeAmount">STAKE:</label>
        <input :disabled="!isConnected" id="stakeAmount" v-model="stakeAmount" type="text">
        <button :class="{ 'btn-disabled': !isConnected || v.errors.length }" :disabled="!isConnected" class="default-button" @click="openModal('actionBtnStake')">
          {{ btnStakeText.toUpperCase() }}
        </button>
        <div v-if="v.errors.length">{{ $t('messages.notValid') }}</div>
      </ValidationProvider>
    </div>
    <div class="token-form__el">
      <ValidationProvider rules="required|strictPositive|maxUnstake" v-slot="v">
        <label for="unstakeAmount">UNSTAKE:</label>
        <input :disabled="!isConnected" id="unstakeAmount" v-model="unstakeAmount" type="text">
        <button :class="{ 'btn-disabled': !isConnected || v.errors.length }" :disabled="!isConnected" class="default-button" @click="openModal('unstake')">
          {{ $t(`buttons.unstake`).toUpperCase() }}
        </button>
        <div v-if="v.errors.length">{{ $t('messages.notValid') }}</div>
      </ValidationProvider>
    </div>
    <ModalFee v-if="isModal" :fee="fee" @confirm="confirm" @decline="decline"/>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import BigNumber from "bignumber.js";
import {getBalance, getFee, getStakedAmount, getUserAddress} from "~/utils/web3";
import {STACKING_CONTRACT} from "~/utils/abis/stackingContract";
import {shiftedBy} from "~/utils";
import {STACKING_ERC20} from "~/utils/abis/stacking";
import {extend, ValidationProvider} from "vee-validate";

export default {
  name: "TokenForm",
  components: {
    ValidationProvider,
  },
  data() {
    return {
      mintAmount: '1',
      stakeAmount: '1',
      unstakeAmount: '1',
      btnStakeText: 'stake',
      isStacking: true,
      isUpdated: true,
      isModal: false,
      currentAction: '',
      fee: '',
    }
  },
  computed: {
    ...mapGetters({
      allowance: 'token/getAllowance',
      isConnected: 'wallet/getIsConnected',
      tokens: 'token/getTokens',
      contractAddress: 'contract/getContractAddress',
      userData: 'token/getTokensMap',
    }),
  },
  mounted() {
  },
  methods: {
    mint() {
      this.startLoading();
      this.$store.dispatch('token/mintStaking', this.mintAmount).then(() => this.update());
      this.mintAmount = '1';
    },
    actionBtnStake() {
      this.startLoading();
      if (this.isStacking) {
        this.stake();
      } else {
        this.approve();
      }
    },
    stake() {
      this.$store.dispatch('contract/stake', this.stakeAmount).then(() => this.update());
      this.stakeAmount = '1';
    },
    approve() {
      this.$store.dispatch('token/approve', this.stakeAmount).then(() => this.update());
      this.stakeAmount = '1';
    },
    unstake() {
      this.startLoading();
      this.$store.dispatch('contract/unstake', this.unstakeAmount).then(() => this.update());
      this.unstakeAmount = '1';
    },
    async openModal(action) {
      await this.calcFee(action);
      this.currentAction = action;
      this.isModal = true;
    },
    async calcFee(action) {
      let fee;
      let amount;
      switch (action) {
        case 'mint':
          amount = shiftedBy(this.mintAmount, '-18');
          fee = await getFee(action, STACKING_ERC20, this.tokens[0], [getUserAddress(), amount]);
          break;
        case 'actionBtnStake':
          amount = shiftedBy(this.stakeAmount, '-18');
          if (this.isStacking) {
            fee = await getFee('stake', STACKING_CONTRACT, this.contractAddress, [amount]);
          } else {
            fee = await getFee('approve', STACKING_ERC20, this.tokens[0], [getUserAddress(), amount]);
          }
          break;
        case 'unstake':
          amount = shiftedBy(this.unstakeAmount, '-18');
          fee = await getFee(action, STACKING_CONTRACT, this.contractAddress, [amount]);
          break;
        default: break;
      }
      this.fee = shiftedBy(fee,'18');
    },
    confirm() {
      const action = this.currentAction;
      this.currentAction = '';
      this.isModal = false;
      switch (action) {
        case 'mint':
          this.mint();
          break;
        case 'actionBtnStake':
          this.actionBtnStake();
          break;
        case 'unstake':
          this.unstake();
          break;
        default: break;
      }
    },
    decline() {
      this.currentAction = '';
      this.isModal = false;
    },

    async update() {
      await Promise.all([
        this.$store.dispatch('token/fetchUserDataToken'),
        this.$store.dispatch('token/getAllowance'),
        this.$store.dispatch('contract/getClaimableAmount'),
        this.$store.dispatch('contract/getStakerData'),
        this.$store.dispatch('contract/pastEvents'),
      ])
      this.$store.commit('wallet/SET_IS_UPDATING', false);
    },
    startLoading() {
      this.$store.commit('wallet/SET_IS_UPDATING', true);
    }
  },
  watch: {
    stakeAmount(val) {
      const value = new BigNumber(val);
      const allowance = new BigNumber(this.allowance[0]);
      this.isStacking = !(value.comparedTo(allowance) === 1);
      this.btnStakeText =  this.isStacking ? this.$t(`buttons.stake`) : this.$t(`buttons.approve`);
    },
  }
}
extend('strictPositive', value => {
  return value > 0
});

extend('required', {
  validate(value) {
    return {
      required: true,
      valid: ['', null, undefined].indexOf(value) === -1
    };
  },
  computesRequired: true,
});

extend('maxUnstake', value => {
  const bigValue = new BigNumber(value);
  const bigStaked= new BigNumber(getStakedAmount())
  const isBigger = bigValue.comparedTo(bigStaked) === 1;
  return !isBigger;
});

extend('maxApprove', value => {
  const bigValue = new BigNumber(value);
  const bigBalance = new BigNumber(getBalance())
  const isBigger = bigValue.comparedTo(bigBalance) === 1;
  return !isBigger;
});

extend('maxVal', value => {
  return value <= Math.pow(10,18);
});

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
