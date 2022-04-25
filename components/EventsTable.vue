<template>
  <div class="table">
    <table>
      <tr class="table__header">
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
import {getDate, getTime} from "~/utils";

export default {
  name: "EventsTable",
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters({
      eventsData: 'contract/getEvents',
      isConnected: 'wallet/getIsConnected',
    }),
    keys() {
      return Object.keys(this.events[0]);
    },
    headers() {
      return this.$t(`table`);
    },
    events() {
      return this.eventsData.map(el => {
        const formatted = {
        ...el,
          time: getTime(el.timestamp),
          date: getDate(el.timestamp, this.$i18n.locale)
        };
        delete formatted.timestamp;
        return formatted;
      })
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
th {
  background: white;
  position: sticky;
  top: 0;
  box-shadow: 0 2px 2px -1px rgba(0, 0, 0, 0.4);
}
</style>
