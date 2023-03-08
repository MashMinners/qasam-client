<template>
  <div>
    <prime-fieldset>
      <template #legend>
        {{ stepTitle }}
      </template>
      <div class="card">
        <div class="p-fluid grid">
          <div class="centered">
            <prime-message severity="info" :closable="false"> Благодарим за вашу оценку!</prime-message>
            <prime-knob class="centered-text mt-1 mb-1" v-model="finalTimerCount" :max="10"/>
            <prime-button label="Начать с начала" class="p-button-lg" @click="start"/>
          </div>
        </div>
      </div>
    </prime-fieldset>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";

export default {
  name: "StepFinish",
  methods: {
    ...mapMutations({
      clearModel: "app/CLEAR_MODEL"
    }),
    start(){
      //this.pauseFinalTimer()
      //this.pauseVotedTimer()
      setTimeout(() => {
        this.finalTimerCount = 10;
        this.votedTimerCount = 10;
      }, 500);
      this.clearModel();
      this.$router.push({name: 'start'});
    }
  },
  computed: {
    ...mapGetters({
      //STEPS
      stepTitle: 'app/getStepTitle',
    })
  }
}
</script>

<style scoped>

</style>