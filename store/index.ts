import { createPinia, defineStore } from "pinia";
import { reactive, ref } from "vue";
import type { ChainInfo } from "../types";

export const useConnectedStore = defineStore(
  "connected",
  () => {
    const connected = ref<boolean>(false);
    const balance = ref<number>(0);
    const address = ref<string>("");
    const supportedChains = reactive({} as ChainInfo);

    const setConnected = (_connected: boolean) => {
      connected.value = _connected;
    };

    const setAddress = (_address: string) => {
      address.value = _address;
    };

    const setBalance = (_balance: number) => {
      balance.value = _balance;
    };

    const setSupportedChains = (_chains: Array<any>) => {
      Object.assign(supportedChains, _chains);
    };

    return {
      connected,
      address,
      balance,
      supportedChains,
      setConnected,
      setAddress,
      setBalance,
      setSupportedChains,
    };
  },
  {
    persist: {
      enabled: true,
    },
  }
);

export default createPinia();
