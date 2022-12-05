<script setup lang="ts">
import { login } from "@/api/auth";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useCookies } from "vue3-cookies";

const router = useRouter();
const { cookies } = useCookies();

const id = ref("");
const pw = ref("");

const pw_type = ref("password");

function togglePwType() {
  if (pw_type.value === "password") {
    pw_type.value = "text";
  } else {
    pw_type.value = "password";
  }
}

function redirectRegister() {
  router.push("/register");
}

async function loginClick() {
  await login({ username: id.value, password: pw.value }).then((res) => {
    cookies.set("token", res);
    router.push("/");
  });
}
</script>

<template>
  <div class="login">
    <div class="login_wrapper">
      <div class="login_title">
        <div class="login_title_top">
          <img src="@/assets/images/logo.svg" />
          <h1>귤루와 함께</h1>
        </div>
        <h1>투명한 귤 유통 관리</h1>
      </div>
      <div class="login_input">
        <label>
          <img src="@/assets/images/user.svg" />
          <input v-model="id" type="text" placeholder="아이디" />
        </label>
        <label>
          <div>
            <img src="@/assets/images/key.svg" />
            <input v-model="pw" :type="pw_type" placeholder="비밀번호" />
          </div>
          <img
            @click="togglePwType"
            class="hidden"
            src="@/assets/images/hidden.svg"
          />
        </label>
        <button @click="loginClick">
          <p>로그인</p>
          <img src="@/assets/images/enter.svg" />
        </button>
      </div>
      <div class="login_register">
        <p>계정이 없다면</p>

        <button @click="redirectRegister">회원가입</button>
      </div>
    </div>

    <p class="copy">&copy; 2022 Goranidan</p>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/login.scss";
</style>
