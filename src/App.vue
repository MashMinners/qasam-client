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
            <!--Поставь v-show если что-->
            <div class="centered" v-if="step.number === 1">
                <prime-input-text id="autofocus" v-model="dto.ratingRecordId" @input="gotoSecond" />
            </div>
            <Transition>
              <div class="centered" style="width:50%" v-if="step.number === 2">
                <div>
                  <img class="employee-photo centered" :src="require('@/storage/'+ employee.employeePhoto)" width="300">
                  <!--<img class="employee-photo centered" src="./storage/Chervinsky.png" width="300">-->
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
            </Transition>
            <div class="centered" v-if="step.number === 3">
                <prime-textarea v-model="dto.ratingRecordComment" :autoResize="true" rows="5" cols="30"/>
                <prime-button label="Закончить" class="p-button-lg" @click="sendVote"/>
              </div>
            <div class="centered" v-if="step.number === 4">
                <prime-message severity="info" :closable="false"> Благодарим за вашу оценку!</prime-message>
                <prime-knob class="centered-text mt-1 mb-1" v-model="finalTimerCount" :max="10"/>
                <prime-button label="Начать с начала" class="p-button-lg" @click="clearModel"/>
              </div>
            <div class="centered" v-if="step.number === 5">
              <prime-message severity="error" :closable="false"> Вы уже голосовали за данного врача!</prime-message>
              <prime-knob class="centered-text mt-1 mb-1" valueColor="#EF4444" rangeColor="#ffe7e6" textColor="#EF4444" v-model="votedTimerCount" :max="10"/>
              <prime-button label="В начало" class="p-button-lg p-button-danger" @click="clearModel"/>
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
import axios from "axios";
export default {
  data() {
    return {
      step: {
        number: 0,
        text: 'Начало',
        message: 'Начните оценку',
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
        employeePhoto: ''
      },
      //Таймеры
      finalTimerEnabled: false,
      finalTimerCount: 10,
      votedTimerEnabled: false,
      votedTimerCount: 10
    }
  },
  components: {

  },
  computed:{

  },
  watch: {
    //Синий таймер
    finalTimerEnabled(value) {
      if (value) {
        setTimeout(() => {
          this.finalTimerCount--;
        }, 1000);
      }
    },
    finalTimerCount: {
      handler(value) {
        if (value > 0 && this.finalTimerEnabled) {
          setTimeout(() => {
            this.finalTimerCount--;
          }, 1000);
        }
      },
      immediate: true // This ensures the watcher is triggered upon creation
    },
    //Красный таймер
    votedTimerEnabled(value) {
      if (value) {
        setTimeout(() => {
          this.votedTimerCount--;
        }, 1000);
      }
    },
    votedTimerCount: {
      handler(value) {
        if (value > 0 && this.votedTimerEnabled) {
          setTimeout(() => {
            this.votedTimerCount--;
          }, 1000);
        }
      },
      immediate: true // This ensures the watcher is triggered upon creation
    }
  },
  methods: {
    playFinalTimer() {
      this.finalTimerEnabled = true;
    },
    pauseFinalTimer() {
      this.finalTimerEnabled = false;
    },
    playVotedTimer() {
      this.votedTimerEnabled = true;
    },
    pauseVotedTimer() {
      this.votedTimerEnabled = false;
    },
    gotoFirst() {
      this.step.number = 1;
      this.step.text = 'Первый шаг';
      this.step.message = 'Отсканируйте выданный вам штрихкод';
      this.step.value = 20;
      setTimeout(() => {
        document.getElementById('autofocus').focus();
      }, 500);
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
      else {
        this.playVotedTimer();
        setTimeout(() => {
          this.clearModel()
        }, 10000);
        this.step.number = 5;
        this.step.text = 'Ошибка';
        this.step.message = 'Вы уже голосовали за этого врача!';
        this.step.value = 40;
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
      const response = await axios.post('http://192.168.0.10/?XDEBUG_SESSION_START=PHPSTORM', {
        ratingRecordId: this.dto.ratingRecordId,
        ratingRecordValue: this.dto.ratingRecordValue,
        ratingRecordComment: this.dto.ratingRecordComment});
      this.step.number = 4;
      this.step.text = 'Конец';
      this.step.message = 'Оценка завершена';
      this.step.value = 100;
      this.playFinalTimer()
      setTimeout(() => {
        this.clearModel()
      }, 10000);
    },
    clearModel(){
      this.pauseFinalTimer()
      this.pauseVotedTimer()
      setTimeout(() => {
        this.finalTimerCount = 10;
        this.votedTimerCount = 10;
      }, 500);

      this.step.number = 0;
      this.step.text = 'Начало'
      this.step.message = 'Начните оценку'
      this.step.value = 0;

      this.dto.ratingRecordId = '';
      this.dto.ratingRecordValue = 0;
      this.dto.ratingRecordComment = '';

      this.employee.employeeSurname = '';
      this.employee.employeeFirstName = '';
      this.employee.employeeSecondName = '';
      this.employee.employeePosition = '';
      this.employee.employeePhoto = '';
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
.centered-text{
  text-align: center;
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
.v-enter-active{
  transition: opacity 1.5s ease;
}
.v-leave-active{

}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
