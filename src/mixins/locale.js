import { t } from 'web-vue2-front-end-lib/src/locale';

export default {
  methods: {
    t(...args) {
      return t.apply(this, args);
    }
  }
};
