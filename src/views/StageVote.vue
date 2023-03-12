<template>
  <div class="card" v-if="status === 'not voted'">
      <div class="p-fluid grid">
        <Transition>
          <div class="centered" style="width:50%">
            <div>
              <img class="employee-photo centered" :src="require('@/storage/'+ employeePhoto)" width="300">
              <p class="employee-full-name">{{employeeFullname}}</p>
              <p class="employee-position">{{employeePosition}}</p>
            </div>
            <div class="p-fluid grid">
              <div class="field col-4">
                <prime-button class="p-button-lg p-button-success" label="Отлично"  @click = "vote('good')" />
              </div>
              <div class="field col-4">
                <prime-button class="p-button-lg p-button-warning" label="Нормально"  @click = "vote('normal')" />
              </div>
              <div class="field col-4">
                <prime-button class="p-button-lg p-button-danger" label="Плохо"  @click = "vote('bad')" />
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  <div class="card" v-else-if="status === 'voted'">
    <div class="p-fluid grid">
      <div class="centered">
        <prime-message severity="error" :closable="false"> Вы уже голосовали за данного врача!</prime-message>
        <prime-knob class="centered-text mt-1 mb-1" valueColor="#EF4444" rangeColor="#ffe7e6" textColor="#EF4444" v-model="timerCount" :max="10"/>
        <prime-button label="В начало" class="p-button-lg p-button-danger" @click="start"/>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";

export default {
  data() {
    return {
      timerEnabled: false,
      timerCount: 10
    }
  },
  name: "StepTwo",
  methods: {
    ...mapMutations({
      estimate: "app/ESTIMATE",
      clearModel: "app/CLEAR_MODEL"
    }),
    ...mapActions({
      checkUuid: "app/checkRatingRecordStatusAction"
    }),
    vote(grade) {
      this.$router.push('/comment');
      this.estimate(grade);
    },
    start(){
      this.pauseTimer()
      setTimeout(() => {
        this.finalTimerCount = 10;
        this.votedTimerCount = 10;
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
  computed: {
    ...mapGetters({
      //State
      status: 'app/ratingRecordStatus',
      //Employee
      employeeFullname: 'app/getEmployeeFullname',
      employeePosition: 'app/getEmployeePosition',
      employeePhoto: 'app/getEmployeePhoto',
    }),
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
    this.checkUuid((this.$route.params.uuid))
    if(this.status === 'voted'){
      this.playTimer()
    }
  }
}
</script>

<style scoped>

</style>