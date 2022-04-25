<template>
  <div class="table">
    <table>
      <tr>
        <th v-for="header in headers" class="table__el">{{ header }}</th>
      </tr>
      <tr v-for="(save, i) in events" v-if="events.length">
        <td class="table__el">{{ i + 1 }}</td>
        <td class="table__el" v-for="key in keys">{{save[key]}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "EventsTable",
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters({
      events: 'contract/getEvents',
      isConnected: 'wallet/getIsConnected',
    }),
    keys() {
      return Object.keys(this.events[0]);
    },
    headers() {
      return this.$t(`table`);
    }
  },
  watch: {
    async isConnected() {
      await this.$store.dispatch('contract/pastEvents');
    }
  }
}
</script>

<style scoped>
.table__el {
  padding: 10px;
}
</style>
