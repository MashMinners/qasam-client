<template>
  <div id="wrapper">
    <component :is="layout">
    <div id="app-header">
      <prime-message severity="info" :closable="false">{{ stepMessage }}</prime-message>
    </div>
    <div id="app-content">
      <div class="mt-1 mb-3">
        <prime-progress-bar :value = stepCompletion :show-value="false"></prime-progress-bar>
      </div>
        <router-view v-slot="{ Component, route }">
          <prime-fieldset>
            <template #legend>
              {{ stepTitle }}
            </template>
            <component
                :is="Component"
                :key="route.meta.usePathKey ? route.path : undefined"
            />
          </prime-fieldset>
        </router-view>
    </div>
    </component>
  </div>
</template>
<script>
import {mapGetters} from "vuex";
import ControlPanelLayout from "@/layouts/ControlPanelLayout.vue";
export default {
  data() {
    return {
      finalTimerEnabled: false,
      finalTimerCount: 10,
      votedTimerEnabled: false,
      votedTimerCount: 10,
      delayTimer: null
    }
  },
  components: {
    ControlPanelLayout
  },
  computed: {
    layout () {
      console.log(this.$route.meta.layout)
      return (this.$route.meta.layout +'Layout' || 'ApplicationLayout')
    },
    ...mapGetters({
      //STEPS
      stepTitle: 'app/getStepTitle',
      stepMessage: 'app/getStepMessage',
      stepCompletion: 'app/getStepCompletion',
    })
  }
}
</script>
<style>
#app-header{

}
#app-content{
  padding: 20px;
  border: 1px solid #dee2e6;
  min-height: calc(100vh - 110px)
}
#app-footer{
  background-color:blue;
}
.centered {
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
}
.centered-text{
  text-align: center;
}
.employee-photo{
  border: solid 1px;
  border-radius: 10px;
}
.employee-full-name {
  font-weight: bold;
  font-size: 24px;
  text-align: center;
}
.employee-position{
  text-align: center;
  font-size: 20px;
  font-style: italic;
}
.v-enter-active{
  transition: opacity 1s ease;
}
.v-leave-active{

}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
