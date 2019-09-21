import Vue from 'vue'
import 'es6-promise/auto'
import config from '@/config/config'
import App from './AppIncluded'
import store from './store'

import mixin from './mixins/include'
Vue.mixin(mixin);

import moment from 'moment'
import 'moment/locale/ja'
moment.locale('en');
Vue.filter('dateFormat', function (date, format='LLL') {
  return moment(date).format(format);
});

import * as filters from './filters';
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

const chatBoxId = config.chatBoxId

document.addEventListener('DOMContentLoaded', () => {
  const elms = document.getElementsByTagName('body')
  if (elms.length == 1) {
    const chatBox = document.createElement('div')
    chatBox.setAttribute('id', chatBoxId)

    elms[0].appendChild(chatBox);

    new Vue({
      el: '#' + chatBoxId,
      store,
      render: h => h(App)
    })
  }
});
