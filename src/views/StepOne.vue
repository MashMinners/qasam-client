<template>
  <div>
    <prime-fieldset>
      <template #legend>
        {{ stepTitle }}
      </template>
      <div class="card">
        <div class="p-fluid grid">
          <div class="centered">
            <prime-input-text id="autofocus" :value="dtoRecordId" @input="gotoSecond" />
          </div>
        </div>
      </div>
    </prime-fieldset>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapState} from "vuex";

export default {
  name: "StepOne",
  methods: {
    ...mapActions({
      secondStep: "app/isVotedAction"
    }),
    gotoSecond(id){
      this.$router.push('/step-two');
      if (this.delayTimer) {
        clearTimeout(this.delayTimer);
        this.delayTimer = null;
      }
      this.delayTimer = setTimeout(()=>{
        this.secondStep(id.target.value);
      },500)
    }
  },
  computed: {
    ...mapGetters({
      stepState: 'app/getStepState',
      stepTitle: 'app/getStepTitle'
    }),
    ...mapState({
      dtoRecordId: state => state.app.dto.ratingRecordId
    })
  }
}
</script>

<style scoped>

</style>