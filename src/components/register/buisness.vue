<script setup lang="ts">
import { useAccountStore } from "@/stores/account";
import { ref } from "vue";

const emit = defineEmits(["next"]);

const king = ref("");
const num = ref("");

function check() {
  if (king.value.length > 0 && num.value.length === 12) {
    emit("next", true, false);
    useAccountStore().businessName = king.value;
    useAccountStore().businessNumber = num.value;
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
        <h1>사업자 정보를</h1>
        <h1>입력해주세요</h1>
      </div>
    </div>
    <div class="standard_input">
      <label class="register_label">
        <img src="@/assets/images/user.svg" />
        <input
          @focusout="check"
          v-model="king"
          type="text"
          placeholder="대표자명"
        />
      </label>
      <label class="register_label">
        <img src="@/assets/images/sharp.svg" />
        <input
          @focusout="check"
          v-model="num"
          type="text"
          placeholder="사업자등록번호"
        />
      </label>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/register.scss";
@import "@/assets/scss/standard.scss";
</style>
