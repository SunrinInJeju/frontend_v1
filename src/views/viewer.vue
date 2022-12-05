<script setup lang="ts">
import { getPipeInfo } from "@/api/pipeline";
import { getProducts } from "@/api/products";
import Detail from "@/components/register/detail.vue";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const popup = ref(false);
const product = ref();
const info = ref();
const clicked = ref(0);

function popupToggle(n: number) {
  popup.value = !popup.value;
  clicked.value = n;
}

onMounted(async () => {
  product.value = await getProducts({
    id: route.params.id as string,
  });
  if (!product.value.photo)
    product.value.photo =
      "http://src.hidoc.co.kr/image/lib/2017/12/5/20171205133155118_0.jpg";
  info.value = await getPipeInfo(product.value.pipelineId);
  console.log(product.value);
});
</script>

<template>
  <div class="viewer">
    <div class="viewer_title">
      <div class="viewer_title_text">
        <img src="@/assets/images/logo.svg" />
        <h1>{{ product?.title }}</h1>
      </div>
      <img :src="product?.photo" />
    </div>

    <div class="viewer_info">
      <div class="viewer_info_text">
        <h1>생산일</h1>
        <p>{{ product?.createdAt }}</p>
      </div>
      <div class="viewer_info_text">
        <h1>생산지</h1>
        <p>{{ product?.address }}</p>
      </div>

      <img src="@/assets/images/map.svg" />
    </div>

    <div class="viewer_line_wrapper">
      <div class="viewer_line"></div>
    </div>

    <div class="viewer_writer">
      <h1>생산자</h1>
      <div class="viewer_profile">
        <img :src="info?.img" />
        <div class="viewer_profile_text">
          <h1>{{ info?.username }}</h1>
          <h2>{{ info?.introduce }}</h2>
          <div class="viewer_profile_addr">
            <img src="@/assets/images/position.svg" />
            <p>{{ info?.address }}</p>
          </div>
        </div>
      </div>
      <button class="viewer_call">
        <h1>전화하기</h1>
        <p>{{ info?.tell }}</p>
      </button>
    </div>

    <div class="viewer_line_wrapper">
      <div class="viewer_line"></div>
    </div>

    <div class="viewer_join">
      <div class="viewer_join_title">
        <h1>유통 참여 업체</h1>
      </div>
      <div class="viewer_join_btns">
        <button
          v-for="(i, n) in info?.publisher"
          :key="n"
          @click="popupToggle(n)"
        >
          <h1>{{ i.name }}</h1>
          <div>
            <p>전체보기</p>
            <img src="@/assets/images/right.svg" />
          </div>
        </button>
      </div>
    </div>
  </div>

  <div class="footer">
    <div class="footer_wrapper">
      <img src="@/assets/images/logo_text_dark.svg" />
      <p>&copy; 2022 Goranidan</p>
    </div>
  </div>

  <template v-if="popup">
    <Detail :info="info?.publisher[clicked]" @close="popupToggle" />
  </template>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/viewer.scss";
</style>
