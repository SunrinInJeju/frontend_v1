<script setup lang="ts">
import { onBeforeMount, watch } from "vue";
import { RouterView, useRoute, useRouter } from "vue-router";
import { useCookies } from "vue3-cookies";
import { getAPI } from "./api/index";

const route = useRoute();
const router = useRouter();
const { cookies } = useCookies();

function authCheck() {
  if (!getAPI.defaults.headers.common["Authorization"]) {
    if (cookies.get("token")) {
      getAPI.defaults.headers.common["Authorization"] = cookies.get("token");
    }
  }
}

watch(
  () => route.path,
  () => {
    authCheck();
    if (
      route.path !== "/login" &&
      route.path !== "/register" &&
      !cookies.get("token")
    ) {
      if (window.location.href.includes("viewer")) {
        return;
      }
      router.push("/login");
    }
  }
);

onBeforeMount(() => {
  authCheck();
  if (
    route.path !== "/login" &&
    route.path !== "/register" &&
    !cookies.get("token")
  ) {
    if (window.location.href.includes("viewer")) {
      return;
    }
    router.push("/login");
  }
});
</script>

<template>
  <RouterView />
</template>

<style lang="scss">
@import "@/assets/scss/global";
</style>
