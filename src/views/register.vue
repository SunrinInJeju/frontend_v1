<script setup lang="ts">
import { register } from "@/api/auth";
import Buisness from "@/components/register/buisness.vue";
import Phone from "@/components/register/phone.vue";
import Standard from "@/components/register/standard.vue";
import { useAccountStore } from "@/stores/account";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const index = ref(0);
const next = ref(false);
const nextText = ref(false);

async function nextToggle(type: boolean, page: boolean) {
  if (type) {
    next.value = true;
  } else {
    if (next.value) {
      next.value = false;
      if (page) {
        if (index.value === 1) {
          nextText.value = true;
          index.value++;
        } else if (index.value === 2) {
          const accountStore = useAccountStore();
          await register({
            username: accountStore.username,
            password: accountStore.password,
            confirmCode: accountStore.confirmCode,
            tell: accountStore.tell,
            businessName: accountStore.businessName,
            businessNumber: accountStore.businessNumber,
          })
            .then(() => {
              router.push("/login");
            })
            .catch((err) => {
              console.log(err);
              window.location.reload();
            });
        } else {
          index.value++;
        }
      }
    }
  }
}

function back() {
  if (index.value === 0) {
    return;
  }
  index.value--;
  next.value = false;
}
</script>

<template>
  <div class="register">
    <div class="register_wrapper">
      <template v-if="index === 0">
        <Phone @next="nextToggle" />
      </template>

      <template v-if="index === 1">
        <Standard @next="nextToggle" />
      </template>

      <template v-if="index === 2">
        <Buisness @next="nextToggle" />
      </template>

      <div class="register_btn">
        <button @click="back">
          <img src="@/assets/images/back.svg" />
          <p>뒤로</p>
        </button>
        <button
          :class="{ button_enable: next }"
          @click="nextToggle(false, true)"
        >
          <p v-if="!nextText">다음</p>
          <img v-if="!nextText" src="@/assets/images/next.svg" />
          <p v-if="nextText">완료</p>
          <img v-if="nextText" src="@/assets/images/check_w.svg" />
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/register.scss";
</style>
