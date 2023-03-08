<template>
  <prime-fieldset>
    <template #legend>
      {{ stepTitle }}
    </template>
    <div class="card">
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
                <prime-button class="p-button-lg p-button-success" label="Отлично"  @click = "gotoThird('good')" />
              </div>
              <div class="field col-4">
                <prime-button class="p-button-lg p-button-warning" label="Нормально"  @click = "gotoThird('normal')" />
              </div>
              <div class="field col-4">
                <prime-button class="p-button-lg p-button-danger" label="Плохо"  @click = "gotoThird('bad')" />
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </prime-fieldset>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";

export default {
  name: "StepTwo",
  methods: {
    ...mapMutations({
      thirdStep: "app/THIRD_STEP"
    }),
    gotoThird(grade) {
      console.log(this.$route.params)
      this.$router.push('/comment');
      this.thirdStep(grade);
    }
  },
  computed: {
    ...mapGetters({
      stepState: 'app/getStepState',
      stepTitle: 'app/getStepTitle',
      //Employee
      employeeFullname: 'app/getEmployeeFullname',
      employeePosition: 'app/getEmployeePosition',
      employeePhoto: 'app/getEmployeePhoto',
    }),
  }
}
</script>

<style scoped>

</style>