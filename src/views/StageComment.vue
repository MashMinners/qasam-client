<template>
  <div class="card">
    <div class="p-fluid grid">
      <div class="centered">
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
    </div>
  </div>
</template>

<script>
import SimpleKeyboard from "@/components/SimpleKeyboard.vue";
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";

export default {
  name: "StageComment",
  components: {SimpleKeyboard},
  methods: {
    ...mapMutations({
      keyboardOnChange: "app/KEYBOARD_ON_CHANGE"
    }),
    ...mapActions({
      sendVote: "app/sendVoteAction"
    }),
    finish(){
      this.$router.push('finish');
      this.sendVote()
    }
  },
  computed: {
    ...mapState({
      dtoRecordComment: state => state.app.dto.ratingRecordComment
    })
  }
}
</script>

<style scoped>

</style>