import { defineStore } from "pinia";

export const useAccountStore = defineStore("account", {
  state: () => ({
    username: "",
    password: "",
    businessName: "",
    businessNumber: "",
    tell: "",
    confirmCode: "",
  }),
});
