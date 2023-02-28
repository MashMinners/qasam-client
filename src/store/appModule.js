export const appModule = {
    state:() => ({
        step: {
            state: 'start', //first, second, third, finish, voted
            title: 'Начало',
            message: 'Начните оценку',
            completion: 0
        },
        dto: {
            ratingRecordId: '',
            ratingRecordGrade: 0,
            ratingRecordComment: ''
        },
        employee: {
            employeeSurname: '',
            employeeFirstName: '',
            employeeSecondName: '',
            employeePosition: '',
            employeePhoto: ''
        },
    }),
    getters: {
        //Steps
        getStepState(state){
            return state.step.state;
        },
        getStepTitle(state){
          return state.step.title;
        },
        getStepMessage(state){
            return state.step.message;
        },
        getStepCompletion(state){
            return state.step.completion;
        },
        //DTO
        getRatingRecordId(state){
            return state.dto.ratingRecordId;
        },
        getRatingRecordGrade(state){
            return state.dto.ratingRecordGrade;
        },
        getRatingRecordComment(state){
            return state.dto.ratingRecordComment;
        }
    },
    mutations: {
        ['KEYBOARD_ON_CHANGE'](state, input){
            state.dto.ratingRecordComment = input;
        },
        /*['KEYBOARD_ON_INPUT_CHANGE'](state, input){

        }*/
        ['FIRST_STEP'](state){
            state.step.state = 'first';
            state.step.title = 'Первый шаг';
            state.step.message = 'Отсканируйте выданный вам штрихкод';
            state.step.completion = 20;
            setTimeout(() => {
                document.getElementById('autofocus').focus();
            }, 500);
        },
        ['SECOND_STEP'](state){

        }
    },
    actions: {

    },
    namespaced: true
}