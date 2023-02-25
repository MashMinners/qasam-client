<template>
  <div id="wrapper">
    <div id="app-header">
      <prime-message severity="info" :closable="false">{{ step.message }}</prime-message>
    </div>
    <div id="app-content">
      <div class="mt-1 mb-3">
        <prime-progress-bar :value = step.value></prime-progress-bar>
      </div>
      <prime-fieldset>
        <template #legend>
          {{ step.text }}
        </template>
        <div class="card">
          <div class="p-fluid grid">
            <div v-if="step.number === 0">
              <prime-button label="Начать" class="p-button-lg" @click = gotoFirst />
            </div>
            <div v-if="step.number === 1">
              <prime-input-text></prime-input-text>
              <prime-button label="Продолжить" class="p-button-lg" @click = gotoSecond />
            </div>
            <div v-if="step.number === 2">
              <prime-button label="Отлично" class="p-button-lg p-button-success" @click = gotoThird />
              <prime-button label="Нормально" class="p-button-lg p-button-warning" @click = gotoThird />
              <prime-button label="Плохо" class="p-button-lg p-button-danger" @click = gotoThird />
            </div>
            <div v-if="step.number === 3">
              <prime-textarea :autoResize="true" rows="5" cols="30"/>
              <prime-button label="Закончить" class="p-button-lg" @click="sendVote"/>
            </div>
            <div v-if="step.number === 4">
              <prime-message severity="info" :closable="false"> Благодарим за вашу оценку!</prime-message>
            </div>
          </div>
        </div>
      </prime-fieldset>
    </div>
    <div id="app-footer"></div>
    <div id="app-modals"></div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      step: {
        number: 0,
        text: 'Начало',
        message: 'Начните голосование',
        value: 0
      }
    }
  },
  components: {

  },
  computed:{

  },
  methods: {
    gotoFirst() {
      this.step.number = 1;
      this.step.text = 'Первый шаг';
      this.step.message = 'Отсканируйте выданный вам штрихкод'
      this.step.value = 20
    },
    gotoSecond() {
      this.step.number = 2;
      this.step.text = 'Второй шаг';
      this.step.message = 'Выбирите справедливую на ваш взгляд оценку'
      this.step.value = 40
    },
    gotoThird() {
      this.step.number = 3;
      this.step.text = 'Третий шаг';
      this.step.message = 'Отлично! Оставьте комментарий'
      this.step.value = 70
    },
    sendVote() {
      this.step.number = 4;
      this.step.text = 'Конец';
      this.step.message = 'Отлично! Оставьте комментарий'
      this.step.value = 100
    }
  }
}
</script>
<style>
#app-header{

}
#app-content{
  padding: 20px;
  border: 1px solid #dee2e6;
  min-height: calc(100vh - 110px)
}
#app-footer{
  background-color:blue;
}
</style>
