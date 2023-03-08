<template>
  <div>
    <prime-fieldset>
      <template #legend>
        {{ stepTitle }}
      </template>
      <div class="card">
        <div class="p-fluid grid">
          <div class="centered" v-if="stepState === 'start'">
            <prime-button label="Начать" class="p-button-lg" @click = gotoFirst />
          </div>
        </div>
      </div>
    </prime-fieldset>
  </div>
</template>

<script>
import {mapGetters, mapMutations, mapState} from "vuex";

export default {
  name: "StepStart",
  methods: {
    ...mapMutations({
      firstStep: "app/FIRST_STEP"
    }),
    gotoFirst() {
      this.$router.push('/step-one');
      this.firstStep();
      setTimeout(() => {
        document.getElementById('autofocus').focus();
      }, 500);
    },
  },
  computed: {
    ...mapGetters({
      stepState: 'app/getStepState',
      stepTitle: 'app/getStepTitle',
    }),
    ...mapState({
      dtoRecordId: state => state.app.dto.ratingRecordId
    })
  }
}
</script>

<style scoped>

</style>