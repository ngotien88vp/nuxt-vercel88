import { defineNuxtPlugin } from '#app';
import Notifications, { notify }  from '@kyvg/vue3-notification'

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.use(Notifications);

    return {
      provide: {
        notification: notify
      }
    }
});

