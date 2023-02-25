<template>
  <div id="wrapper">
    <div id="app-header">
      <prime-message severity="info" :closable="false">{{ step.message }}</prime-message>
    </div>
    <div id="app-content">
      <div class="mt-1 mb-3">
        <prime-progress-bar :value = step.value :show-value="false"></prime-progress-bar>
      </div>
      <prime-fieldset>
        <template #legend>
          {{ step.text }}
        </template>
        <div class="card">
          <div class="p-fluid grid">
            <div class="centered" v-if="step.number === 0">
              <prime-button label="Начать" class="p-button-lg" @click = gotoFirst />
            </div>
            <div class="centered" v-if="step.number === 1">
              <prime-input-text v-model="dto.ratingRecordId" @input="gotoSecond" autofocus/>
            </div>
            <div class="centered" style="width:50%" v-if="step.number === 2">
              <div>
                <img class="employee-photo centered" src="./storage/Chervinsky.png" width="300">
                <p class="employee-full-name">{{employee.employeeSurname + ' ' + employee.employeeFirstName  + ' ' + employee.employeeSecondName}}</p>

                <p class="employee-position">{{employee.employeePosition}}</p>
              </div>
              <div class="p-fluid grid">
                <div class="field col-4">
                  <prime-button class="p-button-lg p-button-success" label="Отлично"  @click = gotoThird(5) />
                </div>
                <div class="field col-4">
                  <prime-button class="p-button-lg p-button-warning" label="Нормально"  @click = gotoThird(3) />
                </div>
                <div class="field col-4">
                  <prime-button class="p-button-lg p-button-danger" label="Плохо"  @click = gotoThird(1) />
                </div>
              </div>
            </div>
            <div class="centered" v-if="step.number === 3">
              <prime-textarea v-model="dto.ratingRecordComment" :autoResize="true" rows="5" cols="30"/>
              <prime-button label="Закончить" class="p-button-lg" @click="sendVote"/>
            </div>
            <Transition>
              <div class="centered" v-if="step.number === 4">
                <prime-message severity="info" :closable="false"> Благодарим за вашу оценку!</prime-message>
              </div>
            </Transition>
          </div>
        </div>
      </prime-fieldset>
    </div>
    <div id="app-footer"></div>
    <div id="app-modals"></div>
  </div>
</template>
<script>

import axios from "axios";

export default {
  data() {
    return {
      step: {
        number: 0,
        text: 'Начало',
        message: 'Начните голосование',
        value: 0
      },
      dto: {
        ratingRecordId: '',
        ratingRecordValue: 0,
        ratingRecordComment: ''
      },
      employee: {
        employeeSurname: '',
        employeeFirstName: '',
        employeeSecondName: '',
        employeePosition: '',
        employeePhoto: 'Chervinsky.png'
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
      this.step.message = 'Отсканируйте выданный вам штрихкод';
      this.step.value = 20;
    },
    async gotoSecond() {
      const params = {ratingRecordId: this.dto.ratingRecordId}
      const response = await axios.get('http://192.168.0.10/?XDEBUG_SESSION_START=PHPSTORM', {params});
      if(response.data.status === 'not voted'){
        //State Machine
        this.step.number = 2;
        this.step.text = 'Второй шаг';
        this.step.message = 'Выбирите справедливую на ваш взгляд оценку';
        this.step.value = 40;
        //Сотрудник
        this.employee.employeeSurname = response.data.body.employeeSurname
        this.employee.employeeFirstName = response.data.body.employeeFirstName
        this.employee.employeeSecondName = response.data.body.employeeSecondName
        this.employee.employeePosition = response.data.body.employeePosition
        this.employee.employeePhoto = response.data.body.employeePhoto
      }
    },
    gotoThird(value) {
      this.step.number = 3;
      this.step.text = 'Третий шаг';
      this.step.message = 'Отлично! Оставьте комментарий';
      this.step.value = 70;
      this.dto.ratingRecordValue = value;
    },
    async sendVote() {
      const stringified = (JSON.parse(JSON.stringify(this.dto)))
      const response = await axios.post('http://192.168.0.10/?XDEBUG_SESSION_START=PHPSTORM', {
        ratingRecordId: this.dto.ratingRecordId,
        ratingRecordValue: this.dto.ratingRecordValue,
        ratingRecordComment: this.dto.ratingRecordComment});
      this.step.number = 4;
      this.step.text = 'Конец';
      this.step.message = 'Оценка завершена';
      this.step.value = 100;

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
.centered {
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
}
.employee-photo{
  border: solid 1px;
  border-radius: 10px;
}
.employee-full-name {
  font-weight: bold;
  font-size: 24px;
  text-align: center;
}
.employee-position{
  text-align: center;
  font-size: 20px;
  font-style: italic;
}
</style>
