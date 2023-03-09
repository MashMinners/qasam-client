<template>
  <div class="card">
    <div class="p-fluid grid">
      <div class="centered">
        <prime-button label="Начать" class="p-button-lg" @click = ScanQR />
      </div>
    </div>
  </div>
</template>

<script>
import {mapMutations} from "vuex";

export default {
  name: "StepStart",
  methods: {
    ...mapMutations({
      firstStep: "app/FIRST_STEP"
    }),
    ScanQR() {
      this.$router.push('/scanning');
      this.firstStep();
      setTimeout(() => {
        document.getElementById('autofocus').focus();
      }, 500);
    },
  }
}
</script>

<style scoped>

</style>