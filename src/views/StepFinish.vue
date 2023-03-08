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
export default {
  name: "StepFinish"
}
</script>

<style scoped>

</style>