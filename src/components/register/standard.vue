<script setup lang="ts">
import { useAccountStore } from "@/stores/account";
import { ref } from "vue";

const id = ref("");
const pw = ref("");
const pw_check = ref("");
const pw_type = ref(false);
const emit = defineEmits(["next"]);

function pwCehck() {
  if (pw.value === pw_check.value && pw.value.length > 0) {
    pw_type.value = true;
    check();
  } else {
    pw_type.value = false;
    check();
  }
}

function check() {
  if (id.value.length > 0 && pw_type.value) {
    emit("next", true, false);
    useAccountStore().username = id.value;
    useAccountStore().password = pw.value;
  } else {
    emit("next", false, false);
  }
}
</script>

<template>
  <div class="default">
    <div class="default_title">
      <div class="default_title_sub">
        <p>회원가입</p>
      </div>
      <div class="default_title_main">
        <h1>기본 정보를</h1>
        <h1>입력해주세요</h1>
      </div>
    </div>
    <div class="standard_input">
      <label class="register_label">
        <img src="@/assets/images/user.svg" />
        <input
          v-model="id"
          @focusout="check"
          type="text"
          placeholder="아이디"
        />
      </label>
      <label class="register_label pw">
        <img src="@/assets/images/user.svg" />
        <input
          v-model="pw"
          @focusout="pwCehck"
          type="password"
          placeholder="비밀번호"
        />
        <img src="@/assets/images/check.svg" v-if="pw_type" />
      </label>
      <label class="register_label">
        <img src="@/assets/images/user.svg" />
        <input
          v-model="pw_check"
          @focusout="pwCehck"
          type="password"
          placeholder="비밀번호 확인"
        />
        <img src="@/assets/images/check.svg" v-if="pw_type" />
      </label>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/register.scss";
@import "@/assets/scss/standard.scss";
</style>
