import InputText from 'primevue/inputtext';
import Button from "primevue/button";

import Fieldset from 'primevue/fieldset';
import Tooltip from 'primevue/tooltip';
import Dialog from 'primevue/dialog';
import ToastService from 'primevue/toastservice';
import Message from 'primevue/message';
import ProgressBar from 'primevue/progressbar';
import Textarea from 'primevue/textarea';
import ('primevue/resources/themes/tailwind-light/theme.css')
import ('primevue/resources/primevue.min.css')
import ('primeicons/primeicons.css')
import ('primeflex/primeflex.css');
export default {
  modules: [
      InputText, Button, Fieldset, ProgressBar, Dialog,  Message, Textarea
  ],
  directives: [
        {name: "tooltip", subject: Tooltip}
    ],
  options: [
      {
          ripple: true
      }
  ],
  services: [
      {name: "toast", subject: ToastService}
  ]
}
