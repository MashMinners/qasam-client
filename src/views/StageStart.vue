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
  name: "StageStart",
  methods: {
    ...mapMutations({
      scanning: "app/SCANNING"
    }),
    ScanQR() {
      this.$router.push('/scanning');
      this.scanning();
      setTimeout(() => {
        document.getElementById('autofocus').focus();
      }, 500);
    },
  }
}
</script>

<style scoped>

</style>