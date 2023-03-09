<template>
  <div class="card" v-if="!isVoted">
      <div class="p-fluid grid">
        <Transition>
          <div class="centered" style="width:50%">
            <div>
              <!--<img class="employee-photo centered" :src="require('@/storage/'+ employeePhoto)" width="300">-->
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
  <div class="card" v-else>
    <div class="p-fluid grid">
      <div class="centered">
        <prime-message severity="error" :closable="false"> Вы уже голосовали за данного врача!</prime-message>
        <prime-knob class="centered-text mt-1 mb-1" valueColor="#EF4444" rangeColor="#ffe7e6" textColor="#EF4444" v-model="votedTimerCount" :max="10"/>
        <prime-button label="В начало" class="p-button-lg p-button-danger" @click="start"/>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";

export default {
  name: "StepTwo",
  methods: {
    ...mapMutations({
      estimate: "app/ESTIMATE"
    }),
    ...mapActions({
      checkUuid: "app/checkUuidAction"
    }),
    vote(grade) {
      this.$router.push('/comment');
      this.estimate(grade);
    }
  },
  computed: {
    ...mapGetters({
      //State
      isVoted: 'app/isVoted',
      //Employee
      employeeFullname: 'app/getEmployeeFullname',
      employeePosition: 'app/getEmployeePosition',
      employeePhoto: 'app/getEmployeePhoto',
    }),
  },
  mounted(){
    this.checkUuid((this.$route.params.uuid))
  }
}
</script>

<style scoped>

</style>