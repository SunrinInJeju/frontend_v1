<template>
  <div class="index_view">
    <div class="index_page">
      <header>
        <img src="@/assets/images/logo_text.svg" />
        <div class="user_data">
          <p>{{ userData?.businessName }} ( {{ userData?.username }} )</p>
          <img src="@/assets/images/logo.svg" />
        </div>
      </header>
      <p class="request_text">참여 요청</p>
      <div class="request_panel">
        <div class="request" v-for="(i, n) in requestData" :key="n">
          <img :src="i.img" />
          <div class="info">
            <p class="name">{{ i.name }}</p>
            <div class="address">
              <img src="@/assets/images/location.svg" />
              <p>{{ i.address }}</p>
            </div>
            <div class="publisher">
              <img src="@/assets/images/publisher.svg" />
              <p v-for="(j, o) in i.publisher" :key="o">{{ j }}</p>
            </div>
          </div>
          <div class="button_panel">
            <button>거절</button>
            <button>수락</button>
            <img src="@/assets/images/check_orange.svg" />
          </div>
        </div>
      </div>
      <p class="product_text">유통 중인 상품</p>
      <div class="product_panel">
        <div class="product" v-for="(i, n) in productData" :key="n">
          <img :src="i.photo" />
          <div class="info">
            <p class="name">{{ i.title }}</p>
            <div class="address">
              <img src="@/assets/images/location.svg" />
              <p>{{ i.address }}</p>
            </div>
            <div class="expire">
              <img src="@/assets/images/expire.svg" />
              <p>{{ i.createdAt }}</p>
            </div>
            <!-- <div class="publisher">
              <img src="@/assets/images/publisher.svg" />
              <p v-for="(j, o) in i.publisher" :key="o">{{ j }}</p>
            </div> -->
          </div>
          <QRCodeVue3
            class="qr"
            :width="100"
            :height="100"
            :value="`${origin}/viewer/${i.id}`"
            :qrOptions="{ typeNumber: 0, mode: 'Byte', errorCorrectionLevel: 'H' }"
            :imageOptions="{ hideBackgroundDots: true, imageSize: 0.4, margin: 1 }"
            :dotsOptions="{
              color: '#FB805E',
              
            }"
            :image="logo"
            :backgroundOptions="{ color: '#F6F7F8' }"
            :cornersSquareOptions="{ color: '#FB805E' }"
            :cornersDotOptions="{ type: undefined, color: '#FB805E' }"
          />
        </div>
      </div>
      <footer>
        <div class="left">
          <img src="@/assets/images/logo_text_dark.svg" />
          <p>© 2022 Goranidan</p>
        </div>
        <div class="right">
          <p>@kjhcode @_kewool @ksb_seongbin @whiteout</p>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import QRCodeVue3 from "qrcode-vue3";
import logo from "@/assets/images/logo.svg";
import { getPipelineList } from "@/api/pipeline";
import { onMounted, ref } from "vue";
import { getUser } from "@/api/auth";

const origin = ref(window.location.origin);
console.log(origin.value);

const requestData = [
  {
    name: "우나핫귤",
    address: "제주특별자치도 서귀포시 성산읍",
    publisher: ["좋은유통", "매우유통"],
    img: "https://yt3.ggpht.com/OWP5IUNUf0ja8UZfD7qJJ8Qyw5Gr2zXwfavKM96L2x6XQVgDxwOdWp-JmAzeCDecL2yTpoyN=s240-c-k-c0x00ffffff-no-rj",
  },
  {
    name: "감규르방",
    address: "제주특별자치도 제주시 오등동",
    publisher: ["돌하르방"],
    img: "https://yt3.ggpht.com/OWP5IUNUf0ja8UZfD7qJJ8Qyw5Gr2zXwfavKM96L2x6XQVgDxwOdWp-JmAzeCDecL2yTpoyN=s240-c-k-c0x00ffffff-no-rj",
  },
  {
    name: "감규르방",
    address: "제주특별자치도 제주시 오등동",
    publisher: ["돌하르방"],
    img: "https://yt3.ggpht.com/OWP5IUNUf0ja8UZfD7qJJ8Qyw5Gr2zXwfavKM96L2x6XQVgDxwOdWp-JmAzeCDecL2yTpoyN=s240-c-k-c0x00ffffff-no-rj",
  },
];
const productData = ref();
const userData = ref();

onMounted(async () => {
  productData.value = await getPipelineList();
  userData.value = await getUser();
  console.log(productData.value);
});
// const productData = getPipelineList();

// const productData = [
//   {
//     name: "르르땅이 품질 보장하는 맛있는 귤",
//     address: "제주특별자치도 제주시 노형동",
//     expire: "2022-12-02T07:08:37.000",
//     publisher: ["WAK유통"],
//     qr: "https://www.naver.com",
//     img: "https://yt3.ggpht.com/OWP5IUNUf0ja8UZfD7qJJ8Qyw5Gr2zXwfavKM96L2x6XQVgDxwOdWp-JmAzeCDecL2yTpoyN=s240-c-k-c0x00ffffff-no-rj",
//   },
//   {
//     name: "모시깽한 귤",
//     address: "제주특별자치도 서귀포시 대정읍",
//     expire: "2022-12-02T07:08:37.000",
//     publisher: ["빠른유통", "버거유통"],
//     qr: "https://www.naver.com",
//     img: "https://yt3.ggpht.com/OWP5IUNUf0ja8UZfD7qJJ8Qyw5Gr2zXwfavKM96L2x6XQVgDxwOdWp-JmAzeCDecL2yTpoyN=s240-c-k-c0x00ffffff-no-rj",
//   },
//   {
//     name: "나랑놀아 귤",
//     address: "제주특별자치도 서귀포시 남원읍",
//     expire: "2022-12-02T07:08:37.000",
//     publisher: ["그냥유통"],
//     qr: "https://www.naver.com",
//     img: "https://yt3.ggpht.com/OWP5IUNUf0ja8UZfD7qJJ8Qyw5Gr2zXwfavKM96L2x6XQVgDxwOdWp-JmAzeCDecL2yTpoyN=s240-c-k-c0x00ffffff-no-rj",
//   },
//   {
//     name: "감귤감귤아",
//     address: "제주특별자치도 제주시 한림읍",
//     expire: "2022-12-02T07:08:37.000",
//     publisher: ["세균유통"],
//     qr: "https://www.naver.com",
//     img: "https://yt3.ggpht.com/OWP5IUNUf0ja8UZfD7qJJ8Qyw5Gr2zXwfavKM96L2x6XQVgDxwOdWp-JmAzeCDecL2yTpoyN=s240-c-k-c0x00ffffff-no-rj",
//   },
// ]
</script>

<style lang="scss" scoped>
@import "@/assets/scss/index.scss";
</style>
