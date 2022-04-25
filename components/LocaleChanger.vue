<template>
  <div class="locale-changer">
      <a
        href="#"
        class="nav-item dropdown-item"
        :class="{selected: this.$i18n.locale === 'ru'}"
        @click="changeLocale('ru')"
      >{{ $t(`main.rus`) }}</a>
      <a
        href="#"
        class="nav-item dropdown-item"
        :class="{selected: this.$i18n.locale === 'en'}"
        @click="changeLocale('en')"
      >{{ $t(`main.eng`) }}</a>
  </div>
</template>

<script>
export default {
  name: "LocaleChanger",
  methods: {
    changeLocale(locale) {
      this.$i18n.setLocale(locale);
    },
  },
}
</script>

<style scoped>
a {
  text-decoration: none;
  color: black;
  font-size: 18px;
}
.selected {
  text-decoration: underline;
}
.locale-changer {
  position: absolute;
  right: 30px;
  top: 10px;
}
</style>
