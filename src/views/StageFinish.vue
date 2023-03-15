<template>
  <div class="card">
    <div class="p-fluid grid">
      <div class="centered">
        <prime-message severity="info" :closable="false"> Благодарим за вашу оценку!</prime-message>
        <prime-knob class="centered-text mt-1 mb-1" v-model="timerCount" :max="10"/>
        <prime-button label="Начать с начала" class="p-button-lg" @click="start"/>
      </div>
    </div>
  </div>
</template>

<script>
import {mapMutations} from "vuex";

export default {
  data() {
    return {
      timerEnabled: false,
      timerCount: 10
    }
  },
  name: "StageFinish",
  methods: {
    ...mapMutations({
      clearModel: "app/CLEAR_MODEL"
    }),
    start(){
      this.pauseTimer()
      setTimeout(() => {
        this.timerCount = 10;
      }, 500);
      this.clearModel();
      this.$router.push({name: 'start'});
    },
    playTimer() {
      this.timerEnabled = true;
    },
    pauseTimer() {
      this.timerEnabled = false;
    },
  },
  watch: {
    //Синий таймер
    timerEnabled(value) {
      if (value) {
        setTimeout(() => {
          this.timerCount--;
        }, 1000);
      }
    },
    timerCount: {
      handler(value) {
        if (value > 0 && this.timerEnabled) {
          setTimeout(() => {
            this.timerCount--;
          }, 1000);
        }else if(value === 0){
          this.start()
        }
      },
      immediate: true // This ensures the watcher is triggered upon creation
    },
  },
  mounted(){
    this.playTimer()
  }
}
</script>

<style scoped>

</style>