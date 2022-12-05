<script setup lang="ts">
const emit = defineEmits(["close"]);
const props = defineProps<{
  info: {
    name: string;
    date: string;
    tae: string;
    tell: string;
    address: string;
  };
}>();

function close() {
  emit("close");
}
</script>

<template>
  <div class="all">
    <div class="off" @click="close"></div>
    <div class="popup">
      <img src="@/assets/images/x.svg" @click="close" />
      <div class="popup_title">
        <h1>{{ props.info.name }}</h1>
      </div>
      <div class="popup_info">
        <div class="popup_item">
          <h1>참여일</h1>
          <p>{{ props.info.date }}</p>
        </div>
        <div class="popup_item">
          <h1>위치</h1>
          <p>{{ props.info.address }}</p>
        </div>
        <div class="popup_item">
          <h1>업태명</h1>
          <p>{{ props.info.tae }}</p>
        </div>
      </div>
      <button>
        <h1>전화하기</h1>
        <p>{{ props.info.tell }}</p>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/detail.scss";
</style>
