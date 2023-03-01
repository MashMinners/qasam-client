<template>
  <div id="wrapper">
    <div id="app-header">
      <prime-message severity="info" :closable="false">{{ stepMessage }}</prime-message>
    </div>
    <div id="app-content">
      <div class="mt-1 mb-3">
        <prime-progress-bar :value = stepCompletion :show-value="false"></prime-progress-bar>
      </div>
      <prime-fieldset>
        <template #legend>
          {{ stepTitle }}
        </template>
        <div class="card">
          <div class="p-fluid grid">
            <div class="centered" v-if="stepState === 'start'">
              <prime-button label="Начать" class="p-button-lg" @click = gotoFirst />
            </div>
            <!--Поставь v-show если что-->
            <div class="centered" v-if="stepState === 'first'">
                <prime-input-text id="autofocus" :value="dtoRecordId" @input="gotoSecond" />
            </div>
            <Transition>
              <div class="centered" style="width:50%" v-if="stepState === 'second'">
                <div>
                  <img class="employee-photo centered" :src="require('@/storage/'+ employeePhoto)" width="300">
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
            <div class="centered" v-if="stepState === 'third'">
                <prime-textarea
                    :autoResize="true"
                    rows="5"
                    cols="30"
                    :value="dtoRecordComment"
                    class="input"
                    placeholder="Оставьте комментарий"
                />
                <simple-keyboard @onChange="keyboardOnChange" :input="dtoRecordComment" style="width: 800px;"/>
                <prime-button label="Закончить" class="p-button-lg mt-3" @click="finish"/>
              </div>
            <div class="centered" v-if="stepState === 'finish'">
                <prime-message severity="info" :closable="false"> Благодарим за вашу оценку!</prime-message>
                <prime-knob class="centered-text mt-1 mb-1" v-model="finalTimerCount" :max="10"/>
                <prime-button label="Начать с начала" class="p-button-lg" @click="start"/>
              </div>
            <div class="centered" v-if="stepState ==='voted'">
              <prime-message severity="error" :closable="false"> Вы уже голосовали за данного врача!</prime-message>
              <prime-knob class="centered-text mt-1 mb-1" valueColor="#EF4444" rangeColor="#ffe7e6" textColor="#EF4444" v-model="votedTimerCount" :max="10"/>
              <prime-button label="В начало" class="p-button-lg p-button-danger" @click="start"/>
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
import SimpleKeyboard from "@/components/SimpleKeyboard.vue";
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";
export default {
  data() {
    return {
      /*step: {
        number: 0,
        text: 'Начало',
        message: 'Начните оценку',
        value: 0
      },*/
      /*dto: {
        ratingRecordId: '',
        ratingRecordValue: 0,
        ratingRecordComment: ''
      },*/
      /*employee: {
        employeeSurname: '',
        employeeFirstName: '',
        employeeSecondName: '',
        employeePosition: '',
        employeePhoto: ''
      },*/
      //Таймеры
      finalTimerEnabled: false,
      finalTimerCount: 10,
      votedTimerEnabled: false,
      votedTimerCount: 10,
      delayTimer: null
    }
  },
  components: {SimpleKeyboard},
  methods: {
    ...mapMutations({
      keyboardOnChange: "app/KEYBOARD_ON_CHANGE",
      firstStep: "app/FIRST_STEP",
      thirdStep: "app/THIRD_STEP",
      clearModel: "app/CLEAR_MODEL"
    }),
    ...mapActions({
      secondStep: "app/isVotedAction",
      sendVote: "app/sendVoteAction"
    }),
    gotoFirst() {
      this.firstStep();
      setTimeout(() => {
        document.getElementById('autofocus').focus();
      }, 500);
    },
    gotoSecond(id){
        if (this.delayTimer) {
          clearTimeout(this.delayTimer);
          this.delayTimer = null;
        }
        this.delayTimer = setTimeout(()=>{
          this.secondStep(id.target.value).then(function(response){
            //Понять как запустит от юда функцию
          })
        },500)
      },
    gotoThird(grade) {
      this.thirdStep(grade);
    },
    finish(){
      this.sendVote()
    },
    start(){
      //this.pauseFinalTimer()
      //this.pauseVotedTimer()
      setTimeout(() => {
        this.finalTimerCount = 10;
        this.votedTimerCount = 10;
      }, 500);
      this.clearModel();
    }
  },
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
  computed: {
    ...mapGetters({
      //STEPS
      stepState: 'app/getStepState',
      stepTitle: 'app/getStepTitle',
      stepMessage: 'app/getStepMessage',
      stepCompletion: 'app/getStepCompletion',
      //Employee
      employeeFullname: 'app/getEmployeeFullname',
      employeePosition: 'app/getEmployeePosition',
      employeePhoto: 'app/getEmployeePhoto',
    }),
    ...mapState({
      dtoRecordId: state => state.app.dto.ratingRecordId,
      dtoRecordComment: state => state.app.dto.ratingRecordComment
    })
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
        }else if(value === 0){
          this.clearModel()
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
        }else if(value === 0){
          this.clearModel()
        }
      },
      immediate: true // This ensures the watcher is triggered upon creation
    }
  },
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
  transition: opacity 1s ease;
}
.v-leave-active{

}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
