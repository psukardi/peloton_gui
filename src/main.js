/*
 =========================================================
 * Vue Black Dashboard - v1.1.0
 =========================================================

 * Product Page: https://www.creative-tim.com/product/black-dashboard
 * Copyright 2018 Creative Tim (http://www.creative-tim.com)

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */
import Vue from "vue";
import VueRouter from "vue-router";
import RouterPrefetch from 'vue-router-prefetch'
import VueSocialSharing from 'vue-social-sharing'

import App from "./App";
import Ads from 'vue-google-adsense'

// TIP: change to import router from "./router/starterRouter"; to start with a clean layout
import router from "./router/index";

import BlackDashboard from "./plugins/blackDashboard";
import i18n from "./i18n"
import './registerServiceWorker'
import VModal from 'vue-js-modal';
Vue.use(BlackDashboard);
Vue.use(VueRouter);
Vue.use(RouterPrefetch);
Vue.use(VModal);
Vue.use(VueSocialSharing);
Vue.use(require('vue-script2'))
Vue.use(Ads.Adsense)
Vue.use(Ads.InArticleAdsense)
Vue.use(Ads.InFeedAdsense)

/* eslint-disable no-new */
new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount("#app");
