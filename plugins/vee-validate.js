import Vue from 'vue';
import { ValidationProvider, extend } from 'vee-validate';

// Add a rule.
extend('secret', {
  validate: value => value === 'example',
  message: 'This is not the magic word'
});
extend('positive', value => {
  return value >= 0;
});

// Register it globally
Vue.component('ValidationProvider', ValidationProvider);
