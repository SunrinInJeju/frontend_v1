<script setup lang="ts">
import { confirmTell, requestJoin } from "@/api/auth";
import { useAccountStore } from "@/stores/account";
import { ref } from "vue";

const phone = ref("");
const typeAuth = ref(false);
const auth = ref("");
const authType = ref(false);

const emit = defineEmits(["next"]);

// 인증번호가 맞으면 emit 으로 다음으로 넘기기

async function sendClick() {
  if (phone.value.length === 11) {
    typeAuth.value = true;
    await requestJoin({ tell: phone.value });
  } else {
    alert("전화번호를 정확히 입력해주세요.");
  }
}

async function checkAuth() {
  const res = await confirmTell({ tell: phone.value, confirmCode: auth.value });
  if (res.success) {
    authType.value = true;
    emit("next", true, false);
    useAccountStore().tell = phone.value;
    useAccountStore().confirmCode = auth.value;
  }
}
</script>

<template>
  <div class="default">
    <div class="default_title">
      <p class="default_title_sub">회원가입</p>
      <div class="default_title_main">
        <h1>전화번호를</h1>
        <h1>인증해주세요</h1>
      </div>
    </div>
    <div class="phone_input">
      <div class="phone_number">
        <label class="register_label">
          <img src="@/assets/images/telephone.svg" />
          <input v-model="phone" type="text" placeholder="전화번호" />
        </label>
        <button @click="sendClick">문자 전송</button>
      </div>
      <label class="register_label phone_label" v-if="typeAuth">
        <img src="@/assets/images/vertify.svg" />
        <input
          @focusout="checkAuth"
          @keypress.enter="checkAuth"
          v-model="auth"
          type="text"
          placeholder="인증번호"
        />
        <img src="@/assets/images/check.svg" v-if="authType" />
      </label>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/register.scss";
@import "@/assets/scss/phone.scss";
</style>
