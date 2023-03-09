import connections from "@/configs/connections";
import axios from "axios";

export const appModule = {
    state:() => ({
        isVoted: false,
        step: {
            state: 'start', //first, second, third, finish, voted
            title: 'Начало',
            message: 'Начните оценку',
            completion: 0
        },
        dto: {
            ratingRecordId: '',
            ratingRecordGrade: '',
            ratingRecordComment: ''
        },
        employee: {
            employeeSurname: '',
            employeeFirstName: '',
            employeeSecondName: '',
            employeePosition: '',
            employeePhoto: ''
        }
    }),
    getters: {
        isVoted(state){
            return state.isVoted;
        },
        //Steps
        getStepTitle(state){
          return state.step.title;
        },
        getStepMessage(state){
            return state.step.message;
        },
        getStepCompletion(state){
            return state.step.completion;
        },
        //Employee
        getEmployeeFullname(state) {
            return state.employee.employeeSurname + ' ' + state.employee.employeeFirstName + ' ' + state.employee.employeeSecondName;
        },
        getEmployeePosition(state) {
            return state.employee.employeePosition;
        },
        getEmployeePhoto(state) {
            return state.employee.employeePhoto;
        }
    },
    mutations: {
        ['FIRST_STEP'](state){
            state.step.state = 'first';
            state.step.title = 'Первый шаг';
            state.step.message = 'Отсканируйте выданный вам штрихкод';
            state.step.completion = 20;
        },
        ['SECOND_STEP_NOT_VOTED'](state, response){
            //State machine
            state.step.state = 'second';
            state.step.title = 'Второй шаг';
            state.step.message = 'Выбирите справедливую на ваш взгляд оценку';
            state.step.completion = 40;
            //Employee
            state.employee.employeeSurname = response.data.body.employeeSurname
            state.employee.employeeFirstName = response.data.body.employeeFirstName
            state.employee.employeeSecondName = response.data.body.employeeSecondName
            state.employee.employeePosition = response.data.body.employeePosition
            state.employee.employeePhoto = response.data.body.employeePhoto
        },
        ['SECOND_STEP_VOTED'](state){
            state.step.state = 'voted';
            state.step.title = 'Ошибка';
            state.step.message = 'Вы уже голосовали за этого врача!';
            state.step.completion = 40;
        },
        ['ESTIMATE'](state, grade){
            state.step.state = 'third';
            state.step.title = 'Третий шаг';
            state.step.message = 'Отлично! Оставьте комментарий';
            state.step.completion = 70;
            state.dto.ratingRecordGrade = grade;
        },
        ['FINISH'](state){
            state.step.state = 'finish';
            state.step.title = 'Конец';
            state.step.message = 'Оценка завершена';
            state.step.completion = 100;
        },
        ['KEYBOARD_ON_CHANGE'](state, input){
            state.dto.ratingRecordComment = input;
        },
        ['SET_RATING_RECORD_ID'](state, ratingRecordId){
            state.dto.ratingRecordId = ratingRecordId;
        },
        ['CLEAR_MODEL'](state){
            state.step.state = 'start';
            state.step.title = 'Начало'
            state.step.message = 'Начните оценку'
            state.step.completion = 0;

            state.dto.ratingRecordId = '';
            state.dto.ratingRecordGrade = '';
            state.dto.ratingRecordComment = '';

            state.employee.employeeSurname = '';
            state.employee.employeeFirstName = '';
            state.employee.employeeSecondName = '';
            state.employee.employeePosition = '';
            state.employee.employeePhoto = '';
        },
    },
    actions: {
        async checkUuidAction({state, commit}, ratingRecordId) {
            const params = {ratingRecordId: ratingRecordId}
            const response = await axios.get(connections.api.production ? connections.api.production : connections.api.dev, {params});
            if(response.data.status === 'not voted'){
                commit('SECOND_STEP_NOT_VOTED', response)
                commit('SET_RATING_RECORD_ID', ratingRecordId)
                return false;
            }
            else {
                commit('SECOND_STEP_VOTED')
                return true;
            }
        },
        async sendVoteAction({state, commit}){
            const response = await axios.post(connections.api.production ? connections.api.production : connections.api.dev, {
                ratingRecordId: state.dto.ratingRecordId,
                ratingRecordGrade: state.dto.ratingRecordGrade,
                ratingRecordComment: state.dto.ratingRecordComment});
                commit('FINISH', response)
        }
    },
    namespaced: true
}