<template>
  <div>
      <div class="card">
        <div class="p-fluid grid">
          <div class="centered">
            <prime-input-text id="autofocus" :value="dtoRecordId" @input="Vote" />
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "StepOne",
  methods: {
    Vote(event){
      if (this.delayTimer) {
        clearTimeout(this.delayTimer);
        this.delayTimer = null;
      }
      this.delayTimer = setTimeout(()=>{
        this.$router.push('/vote'+ '/' + event.target.value);
      },500)
    }
  },
  computed: {
    ...mapState({
      dtoRecordId: state => state.app.dto.ratingRecordId
    })
  }
}
</script>

<style scoped>

</style>