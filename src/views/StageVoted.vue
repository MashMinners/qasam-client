<template>
  <div>
    <prime-fieldset>
      <template #legend>
        {{ stepTitle }}
      </template>
      <div class="card">
        <div class="p-fluid grid">
          <div class="centered">
            <prime-message severity="error" :closable="false"> Вы уже голосовали за данного врача!</prime-message>
            <prime-knob class="centered-text mt-1 mb-1" valueColor="#EF4444" rangeColor="#ffe7e6" textColor="#EF4444" v-model="votedTimerCount" :max="10"/>
            <prime-button label="В начало" class="p-button-lg p-button-danger" @click="start"/>
          </div>
        </div>
      </div>
    </prime-fieldset>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";

export default {
  name: "StepVoted",
  methods:{
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